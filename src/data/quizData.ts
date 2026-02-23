/**
 * Quiz content and configuration.
 * SHOPIFY: Edit QUIZ_QUESTIONS, AGE_OPTIONS, and blurb copy as needed.
 * QUESTION_ORDER determines the flow; QUESTION_TO_PARAM maps to URL/state keys.
 */

export type QuestionId =
  | "Q2_TIMING"
  | "Q3_CONCERN"
  | "Q4_TIER"
  | "Q5_SENSITIVITY";

export interface QuizQuestion {
  id: QuestionId;
  question: string;
  options: string[];
  educationalBlurb?: string;
  /** Number of columns for answer layout on desktop (768px+). Default 1. Use 2 for longer option lists. */
  columns?: 1 | 2;
}

export const AGE_OPTIONS = [
  "Under 18",
  "18–24",
  "25–34",
  "35–44",
  "45–54",
  "55+",
  "Prefer not to say",
];

export const Q1_EDUCATIONAL_BLURB =
  "Your name lets us personalize your experience. Your age helps us determine which professional-grade product lines are formulated for your skin's current needs — younger skin requires different active ingredients than mature skin.";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "Q2_TIMING",
    question: "When do you usually do your skincare routine?",
    options: [
      "Mostly in the morning",
      "Mostly at night",
      "Morning and night",
    ],
    educationalBlurb:
      "Morning and evening routines serve different purposes — AM protects against environmental damage while PM focuses on repair and recovery.",
  },
  {
    id: "Q3_CONCERN",
    question: "What is your top skin concern right now?",
    columns: 2,
    options: [
      "Breakouts / acne",
      "Sensitivity / redness",
      "Dullness / uneven tone",
      "Dark spots / hyperpigmentation",
      "Fine lines / wrinkles",
      "Loss of firmness / elasticity",
      "Stressed skin / environmental damage",
      "Dryness / dehydration",
      "Oiliness & clogged pores",
      "Just want to maintain healthy skin",
    ],
    educationalBlurb:
      "Identifying your primary concern helps us match you with Dermalogica's targeted treatment franchises, each formulated by skin therapists for specific results.",
  },
  {
    id: "Q4_TIER",
    question: "Which best describes how you like to care for your skin?",
    options: [
      "I want a simple routine that's easy to stick to",
      "I'm comfortable with a few extra steps if they make a difference",
      "I enjoy a full routine and want the most advanced results",
    ],
    educationalBlurb:
      "There's no wrong answer here — whether you prefer 2 steps or 7, we'll build a routine that fits your lifestyle.",
  },
  {
    id: "Q5_SENSITIVITY",
    question: "How does your skin usually react to new products?",
    options: [
      "Very sensitive / easily irritated",
      "Sometimes sensitive",
      "Rarely sensitive",
    ],
    educationalBlurb:
      "Sensitivity levels help us recommend gentler formulations or flag ingredients to introduce gradually.",
  },
];

export const QUESTION_ORDER: QuestionId[] = [
  "Q2_TIMING",
  "Q3_CONCERN",
  "Q4_TIER",
  "Q5_SENSITIVITY",
];

/** Maps question IDs to URL param names and QuizState keys */
export const QUESTION_TO_PARAM: Record<QuestionId, string> = {
  Q2_TIMING: "timing",
  Q3_CONCERN: "concern",
  Q4_TIER: "tier",
  Q5_SENSITIVITY: "sensitivity",
};
