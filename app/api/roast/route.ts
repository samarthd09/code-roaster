import { DEFAULTS, LANGUAGES, LIMITS, PERSONAS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, PersonaId, RoastLevel } from "@/types/roast";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body provided." },
        { status: 400 }
      );
    }

    const rawCode = typeof body?.code === "string" ? body.code : "";
    const rawError = typeof body?.errorMessage === "string" ? body.errorMessage.trim() : "";
    const rawLang = typeof body?.language === "string" ? body.language : "";
    const rawLevel = typeof body?.roastLevel === "string" ? body.roastLevel : "";
    const rawPersona = typeof body?.persona === "string" ? body.persona : "";

    // Validation
    if (!rawCode || rawCode.trim() === "") {
      return NextResponse.json(
        { error: "No code provided. I can't roast the void!" },
        { status: 400 }
      );
    }

    if (rawCode.length > LIMITS.maxCodeLength) {
      return NextResponse.json(
        {
          error: `Code exceeds maximum allowed limit of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
        },
        { status: 400 }
      );
    }

    if (rawError.length > LIMITS.maxErrorMessageLength) {
      return NextResponse.json(
        {
          error: `Error message exceeds maximum allowed limit of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
        },
        { status: 400 }
      );
    }

    // Fallbacks
    const language: LanguageId = LANGUAGES.some((l) => l.id === rawLang)
      ? (rawLang as LanguageId)
      : DEFAULTS.language;

    const roastLevel: RoastLevel = ROAST_LEVELS.some((r) => r.id === rawLevel)
      ? (rawLevel as RoastLevel)
      : DEFAULTS.roastLevel;

    const persona: PersonaId = PERSONAS.some((p) => p.id === rawPersona)
      ? (rawPersona as PersonaId)
      : DEFAULTS.persona;

    const result = await analyzeCode({
      language,
      code: rawCode,
      roastLevel,
      persona,
      errorMessage: rawError || undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Roast API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during code roasting." },
      { status: 500 }
    );
  }
}
