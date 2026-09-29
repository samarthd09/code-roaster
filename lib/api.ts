import { RoastRequest, RoastResult } from "@/types/roast";

export async function requestRoast(payload: RoastRequest): Promise<RoastResult> {
  let response: Response;

  try {
    response = await fetch("/api/roast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err: any) {
    throw new Error("Could not reach the server. Is `npm run dev` still running?");
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data) {
    const errorMsg = data?.error || `Server error (${response.status}): Failed to generate roast.`;
    throw new Error(errorMsg);
  }

  return data as RoastResult;
}
