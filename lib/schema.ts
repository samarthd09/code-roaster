import { SEVERITIES } from "@/config/app.config";
import { Schema, Type } from "@google/genai";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "The main savage yet witty roast paragraph in Hinglish and simple English.",
    },
    score: {
      type: Type.INTEGER,
      description: "Calculated roast score from 0 (clean code) to 100 (disaster code).",
    },
    scoreLabel: {
      type: Type.STRING,
      description: "Short punchy rubber-stamp verdict in Hinglish e.g. 'ATTENDANCE SHORT, CODE BHI SHORT'.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of identified issues ordered from most to least severe.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue appears.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the bug.",
          },
          title: {
            type: Type.STRING,
            description: "Short punchy issue name in Hinglish.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problematic code line(s) copied from the submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "What went wrong and why, delivered with humor.",
          },
          expected: {
            type: Type.STRING,
            description: "Technically precise solution or fix instructions.",
          },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete, fully fixed, executable code in the target language.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Final encouraging yet sharp 1-2 sentence takeaway for the developer.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
