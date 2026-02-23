/**
 * Routine Finder Quiz - Main App
 *
 * Flow: Home → Intro (name/age) → Q2–Q5 → Email → Redirect to results
 * State is preserved when navigating back. Answers are passed as URL params
 * to the results page.
 */
import { useState, useCallback } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { QuizScreen } from "./components/QuizScreen";
import { EmailScreen } from "./components/EmailScreen";
import {
  QUESTION_ORDER,
  QUESTION_TO_PARAM,
  type QuestionId,
} from "./data/quizData";

export interface QuizState {
  firstName: string;
  lastName: string;
  age: string;
  timing: string;
  concern: string;
  tier: string;
  sensitivity: string;
  email?: string;
}

type Screen = "home" | "quiz" | "email";

const INITIAL_STATE: QuizState = {
  firstName: "",
  lastName: "",
  age: "",
  timing: "",
  concern: "",
  tier: "",
  sensitivity: "",
};

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [state, setState] = useState<QuizState>(INITIAL_STATE);
  const [showingIntro, setShowingIntro] = useState(true);
  const [viewStep, setViewStep] = useState(0);

  const handleStart = useCallback(() => {
    setScreen("quiz");
    setShowingIntro(true);
    setViewStep(0);
  }, []);

  const handleIntroUpdate = useCallback(
    (field: "firstName" | "lastName" | "age", value: string) => {
      setState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleIntroContinue = useCallback(() => {
    setShowingIntro(false);
    setViewStep(1);
  }, []);

  const handleAnswer = useCallback((questionId: QuestionId, value: string) => {
    const stateKey = QUESTION_TO_PARAM[questionId] as keyof QuizState;
    if (stateKey) {
      setState((prev) => ({ ...prev, [stateKey]: value }));
    }
  }, []);

  const handleBack = useCallback(
    (target?: QuestionId | "intro" | "email" | "home") => {
      if (target === "home") {
        setScreen("home");
        return;
      }
      if (target === "email") {
        setViewStep(4);
        setShowingIntro(false);
        return;
      }
      if (target === "intro" || !target) {
        setShowingIntro(true);
        setViewStep(0);
        return;
      }
      const stepMap: Record<QuestionId, number> = {
        Q2_TIMING: 1,
        Q3_CONCERN: 2,
        Q4_TIER: 3,
        Q5_SENSITIVITY: 4,
      };
      const step = stepMap[target];
      if (step !== undefined) {
        setViewStep(step);
        setShowingIntro(step === 0);
      }
    },
    []
  );

  const introComplete =
    state.firstName.trim() !== "" && state.age !== "";
  const quizAnswersCount = [state.timing, state.concern, state.tier, state.sensitivity].filter(
    (v) => v !== ""
  ).length;
  const allQuizAnswered = quizAnswersCount === QUESTION_ORDER.length;

  const answersAsParams = (): Record<string, string> => {
    const params: Record<string, string> = {
      firstName: state.firstName,
      lastName: state.lastName,
      age: state.age,
      timing: state.timing,
      concern: state.concern,
      tier: state.tier,
      sensitivity: state.sensitivity,
    };
    if (state.email) params.email = state.email;
    return params;
  };

  if (screen === "home") {
    return <HomeScreen onStart={handleStart} />;
  }

  if (screen === "quiz") {
    const showEmail = introComplete && allQuizAnswered && viewStep === 5;
    if (showEmail) {
      return (
        <EmailScreen
          answers={answersAsParams()}
          onRedirect={() => {}}
          onBack={handleBack}
        />
      );
    }

    return (
      <QuizScreen
        state={state}
        viewStep={viewStep}
        setViewStep={setViewStep}
        showingIntro={showingIntro}
        introComplete={introComplete}
        onIntroUpdate={handleIntroUpdate}
        onIntroContinue={handleIntroContinue}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    );
  }

  return null;
}

export default App;
