export const APP = {
  name: "Code Roaster",
  edition: "देशी Edition",
  version: "v2.6",
  tagline: "Your code. Our problem now. Desi debugging, powered by Gemini.",
  event: "DevFest Nashik 2026",
  organizer: "Google Developer Groups Nashik",
} as const;

export const AI = {
  model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
  modelLabel: "Gemini 3.5 Flash-Lite",
  maxAttempts: 3,
} as const;

export const ROAST_LEVELS = [
  {
    id: "halka",
    label: "Halka (Dry)",
    emoji: "🍋",
    description: "Mild and deadpan. Gentle jabs, mostly helpful critique without burning bridges.",
  },
  {
    id: "tikha",
    label: "Tikha (Sharp)",
    emoji: "🔥",
    description: "Pointed, spicy and witty. Direct roasts calling out bad habits and logic holes.",
  },
  {
    id: "zanzanit",
    label: "Zanzanit (Savage)",
    emoji: "💀",
    description: "Maximum burn, Nashik style. Brutally honest, savage, but technically razor-sharp.",
  },
] as const;

export const PERSONAS = [
  {
    id: "hostel_bhau",
    label: "Hostel Bhau",
    tagline: "Nashikkar Senior",
    description: "Chai-sipping college senior who has seen it all and has zero patience for bad code.",
  },
  {
    id: "sharma_ji",
    label: "Sharma ji ka Beta",
    tagline: "The Unbeatable Overachiever",
    description: "Constantly compares your O(n^2) code to his FAANG internship algorithms.",
  },
  {
    id: "strict_prof",
    label: "Strict Professor",
    tagline: "HOD of Disappointment",
    description: "Will deduct internal marks and threaten detention for missing edge cases.",
  },
  {
    id: "standup_comic",
    label: "Stand-up Roaster",
    tagline: "Punchline Specialist",
    description: "Turns your stack trace into a viral comedy special.",
  },
  {
    id: "campus_recruiter",
    label: "Campus Recruiter",
    tagline: "Resume Shredder",
    description: "Reviews your code like a resume getting rejected within 3 seconds.",
  },
] as const;

export const LANGUAGES = [
  { id: "python", label: "Python", extension: "py" },
  { id: "javascript", label: "JavaScript", extension: "js" },
  { id: "typescript", label: "TypeScript", extension: "ts" },
  { id: "java", label: "Java", extension: "java" },
  { id: "c", label: "C", extension: "c" },
  { id: "cpp", label: "C++", extension: "cpp" },
  { id: "go", label: "Go", extension: "go" },
  { id: "rust", label: "Rust", extension: "rs" },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "tikha",
  persona: "hostel_bhau",
} as const;

export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
} as const;

export const SAMPLE = {
  language: "python",
  code: `def calculate_attendance(attended, total):
    # Bhau logic - proxy lagai kya?
    ratio = attended / total
    if ratio = 0.75:
        status = "Allowed for Exam"
    else:
        status = "Detained"
    print("Attendance: " + ratio)
    return status

# Test run
print(calculate_attendance(54, 75))`,
  errorMessage: `Traceback (most recent call last):
  File "attendance.py", line 4
    if ratio = 0.75:
             ^
SyntaxError: invalid syntax. Maybe you meant '==' or ':='?`,
} as const;
