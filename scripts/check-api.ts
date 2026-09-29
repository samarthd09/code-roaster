import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function main() {
  console.log("--------------------------------------------------");
  console.log(`🔥 Testing Code Roaster API Connection (${AI.modelLabel})`);
  console.log("--------------------------------------------------");

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "tikha",
      persona: "hostel_bhau",
      errorMessage: SAMPLE.errorMessage,
    });

    console.log("✅ Success! Gemini returned roast result:\n");
    console.log(`🎯 Verdict Stamp: [${result.scoreLabel || "VERDICT"}] (Score: ${result.score}/100)`);
    console.log(`💬 Roast:\n"${result.roast}"\n`);
    console.log(`⚠️ Issues Found (${result.issues.length}):`);
    result.issues.forEach((issue, idx) => {
      console.log(`   ${idx + 1}. [Line ${issue.line}] ${issue.severity}: ${issue.title}`);
      console.log(`      Diagnosis: ${issue.diagnosis}`);
      console.log(`      Expected: ${issue.expected}`);
    });
    console.log("\n✨ Corrected Code Preview:\n" + result.correctedCode.slice(0, 150) + "...\n");
    console.log(`💡 Takeaway: "${result.takeaway}"\n`);
    console.log("--------------------------------------------------");
    console.log("🚀 API check PASSED successfully!");
    console.log("--------------------------------------------------");
  } catch (error: any) {
    console.error("❌ API check FAILED:");
    console.error(error.message || error);
    process.exit(1);
  }
}

main();
