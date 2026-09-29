import { AI, SAMPLE } from "@/config/app.config";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";
import { GoogleGenAI } from "@google/genai";

function friendlyErrorMessage(status: number | undefined, message: string): string {
  if (status === 400) {
    return `Invalid request to Gemini API (400): ${message}. Check your input or prompt formatting.`;
  }
  if (status === 403) {
    return "Gemini API key is invalid or lacks necessary permissions (403). Please verify your key at https://aistudio.google.com/apikey and check .env.local.";
  }
  if (status === 404) {
    return `Model not found (404). Check the model specified in config/app.config.ts (currently '${AI.model}').`;
  }
  if (status === 429) {
    return "Bhai, itni bhi jaldi kya hai? Rate limit reached (429). Thoda ruk, roast ko bhi marinate hone do! Please retry in a few seconds.";
  }
  if (status === 503) {
    return "Bhau, Gemini ne chai break le li! Service temporarily unavailable (503). Retrying...";
  }
  return message || "An unexpected error occurred while communicating with Gemini.";
}

// Built-in workshop offline fallback for attendance sample
const OFFLINE_SAMPLE_RESULT: RoastResult = {
  roast:
    "Yeh code nahi, Panchavati Express ki general boghi hai — bheed bohot hai aur track ka koi bharosa nahi! Variable ka naam 'ratio' rakha hai par logic mein koi ratio ya proportionality nahi dikh rahi. Sharma ji ka beta nursery mein '=' aur '==' ka difference sikh gaya tha, aur tum DevFest mein attendance system tod rahe ho.",
  score: 72,
  scoreLabel: "ATTENDANCE SHORT, CODE BHI SHORT",
  issues: [
    {
      line: 4,
      severity: "FATAL BUG",
      title: "Syntax & Logic Blunder: Assignment in Condition",
      codeSnippet: "if ratio = 0.75:",
      diagnosis:
        "Bhai, single '=' assignment operator hota hai, condition check karne ke liye '==' lagate hai. Yaha Python SyntaxError phek dega!",
      expected: "Use 'if ratio >= 0.75:' or 'if ratio == 0.75:' for comparison.",
    },
    {
      line: 7,
      severity: "FATAL BUG",
      title: "TypeError: Concatenating String and Float",
      codeSnippet: 'print("Attendance: " + ratio)',
      diagnosis:
        "String aur float ko '+' se direct concatenate kar rahe ho? Nashik ki misal pav mein gulab jamun mat dalo yaar!",
      expected: 'Convert to str: print("Attendance: " + str(ratio)) or use f-string: print(f"Attendance: {ratio}")',
    },
  ],
  correctedCode: `def calculate_attendance(attended: int, total: int) -> str:
    # Nashik DevFest Verified Fix
    if total <= 0:
        return "Invalid Total: Total classes must be > 0"
    
    ratio = attended / total
    status = "Allowed for Exam" if ratio >= 0.75 else "Detained"
    print(f"Attendance: {ratio * 100:.1f}%")
    return status

# Test run
print(calculate_attendance(54, 75))`,
  takeaway:
    "Chinta mat kar. Code bhi gym jaisa hai — repeat karoge toh better hoga. Always check your comparison operators and use f-strings in Python!",
};

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  // Workshop fallback if no key is supplied and user tests the sample
  if (!apiKey || apiKey.trim() === "" || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    // If it's the sample code or empty key, return sample fallback with a friendly hint
    if (request.code.includes("calculate_attendance") || request.code.includes("attended / total")) {
      return OFFLINE_SAMPLE_RESULT;
    }
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key from https://aistudio.google.com/apikey, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = buildUserPrompt(request);

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: prompt,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim() === "") {
        throw new Error("Received empty response from Gemini.");
      }

      const parsed = JSON.parse(responseText);

      return {
        roast: parsed.roast ?? "Bhai, code toh dekh liya... par sabd kam pad gaye.",
        score: typeof parsed.score === "number" ? parsed.score : 65,
        scoreLabel: parsed.scoreLabel ?? "CODE REVIEW COMPLETED",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? request.code,
        takeaway: parsed.takeaway ?? "Code likhte raho, better hote rahoge!",
      };
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode || (err?.response ? err.response.status : undefined);

      if (status === 503 && attempt < AI.maxAttempts) {
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      // If it's the sample code and API fails, provide offline fallback for workshops
      if (request.code.includes("calculate_attendance") && attempt === AI.maxAttempts) {
        return OFFLINE_SAMPLE_RESULT;
      }

      const friendly = friendlyErrorMessage(status, err?.message || String(err));
      throw new Error(friendly);
    }
  }

  throw new Error(friendlyErrorMessage(503, lastError ? String(lastError) : "Max retries exceeded"));
}
