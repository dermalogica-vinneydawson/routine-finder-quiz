/**
 * QuizScreen - Renders the intro step (Q1) and questions Q2–Q5.
 * Handles progress bar, navigation, and answer selection.
 */
import { useState, useEffect } from "react";
import {
  QUIZ_QUESTIONS,
  QUESTION_ORDER,
  type QuestionId,
} from "../data/quizData";
import { IntroStep } from "./IntroStep";
import { TypewriterText } from "./TypewriterText";
import { LightbulbIcon } from "./LightbulbIcon";
import { BackButton } from "./ui/BackButton";
import { FixedNavBars } from "./ui/FixedNavBars";
import { DesktopProgressBar } from "./ui/DesktopProgressBar";
import { BG_GRADIENT } from "../constants/style";
import type { QuizState } from "../App";

interface QuizScreenProps {
  state: QuizState;
  viewStep: number;
  setViewStep: (v: number | ((prev: number) => number)) => void;
  showingIntro: boolean;
  introComplete: boolean;
  onIntroUpdate: (field: "firstName" | "lastName" | "age", value: string) => void;
  onIntroContinue: () => void;
  onAnswer: (questionId: QuestionId, value: string) => void;
  onBack: (target?: QuestionId | "intro" | "email" | "home") => void;
}

export function QuizScreen({
  state,
  viewStep,
  setViewStep,
  showingIntro,
  introComplete: _introComplete, // eslint-disable-line @typescript-eslint/no-unused-vars -- Required by App
  onIntroUpdate,
  onIntroContinue,
  onAnswer,
  onBack,
}: QuizScreenProps) {
  const [expandedLearnMore, setExpandedLearnMore] = useState<QuestionId | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const quizAnswers: Record<QuestionId, string> = {
    Q2_TIMING: state.timing,
    Q3_CONCERN: state.concern,
    Q4_TIER: state.tier,
    Q5_SENSITIVITY: state.sensitivity,
  };

  const currentQuestionId = QUESTION_ORDER[viewStep - 1] as QuestionId | undefined;
  const currentQuestion = currentQuestionId
    ? QUIZ_QUESTIONS.find((q) => q.id === currentQuestionId)
    : null;

  const totalSteps = 5;
  const currentStepIndex = showingIntro || viewStep === 0 ? 1 : viewStep + 1;
  const progress = Math.min(100, (currentStepIndex / totalSteps) * 100);

  const canContinue =
    selectedOption !== null || (currentQuestionId && quizAnswers[currentQuestionId] !== "");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- Reset UI state when question changes */
    setExpandedLearnMore(null);
    setSelectedOption(null);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [currentQuestionId]);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleContinue = () => {
    if (!currentQuestionId) return;
    const value = selectedOption ?? quizAnswers[currentQuestionId];
    if (value) {
      onAnswer(currentQuestionId, value);
      setViewStep((prev) => prev + 1);
    }
  };

  const handleBackClick = () => {
    onBack(viewStep === 1 ? "intro" : QUESTION_ORDER[viewStep - 2]);
  };

  const toggleLearnMore = () => {
    setExpandedLearnMore((prev) =>
      prev === currentQuestionId ? null : (currentQuestionId ?? null)
    );
  };

  const RadioIndicator = ({ selected }: { selected: boolean }) => (
    <div
      className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150"
      style={{
        borderColor: selected ? "#5b6670" : "rgba(255, 255, 255, 0.25)",
        backgroundColor: selected ? "#5b6670" : "transparent",
      }}
    >
      {selected && (
        <div className="rounded-full bg-white" style={{ width: 8, height: 8 }} />
      )}
    </div>
  );

  if (showingIntro || viewStep === 0) {
    return (
      <div
        className="min-h-[100dvh] min-h-screen flex flex-col overflow-y-auto"
        style={{ background: BG_GRADIENT }}
      >
        <DesktopProgressBar progress={progress} />
        <div className="flex-1 flex flex-col items-start md:items-center justify-start md:justify-center min-h-0 pt-[72px] pb-[92px] md:pt-6 md:pb-6 px-3 md:px-8">
          <div key="intro" className="w-full md:max-w-[960px] flex flex-col md:my-auto">
            <IntroStep
              firstName={state.firstName}
              lastName={state.lastName}
              age={state.age}
              onUpdate={onIntroUpdate}
              onContinue={onIntroContinue}
              onBack={() => onBack("home")}
              progress={progress}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion || !currentQuestionId) return null;

  return (
    <div
      className="min-h-[100dvh] min-h-screen flex flex-col overflow-y-auto"
      style={{ background: BG_GRADIENT }}
    >
      <DesktopProgressBar progress={progress} />
      <div className="flex-1 flex flex-col items-start md:items-center justify-start md:justify-center min-h-0 pt-[72px] pb-[92px] md:pt-6 md:pb-6 px-3 md:px-8">
        <div key={currentQuestionId} className="w-full md:max-w-[780px] flex flex-col md:my-auto">
          <FixedNavBars
            onBack={handleBackClick}
            progress={progress}
            cta={
              <button
                type="button"
                onClick={canContinue ? handleContinue : undefined}
                disabled={!canContinue}
                className={`w-full min-h-[56px] py-4 px-6 rounded-lg font-semibold text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] transition-all duration-200 ${
                  canContinue
                    ? "bg-white text-[#5b6670] hover:bg-[#f0f0f0] active:bg-[#e5e5e5]"
                    : "bg-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.3)] cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            }
          />
          <div className="w-full rounded-2xl bg-[rgba(55,63,72,0.65)] backdrop-blur-[16px] border border-[rgba(91,102,112,0.2)] md:mx-auto overflow-hidden py-4 px-4 sm:p-8">
            <div className="hidden md:block">
              <BackButton onClick={handleBackClick} />
            </div>
            <h2 className="w-full max-w-full break-words whitespace-normal text-[1.375rem] md:text-[1.75rem] font-bold text-white mb-6">
              <TypewriterText
                text={currentQuestion.question}
                skip={false}
                speed={30}
                className="block"
              />
            </h2>

            <div
              className={`${
                currentQuestion.columns === 2
                  ? "space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0"
                  : "space-y-3"
              }`}
              role="radiogroup"
              aria-label={currentQuestion.question}
            >
              {currentQuestion.options.map((option, i) => {
                const isSelected =
                  selectedOption !== null
                    ? selectedOption === option
                    : (currentQuestionId && quizAnswers[currentQuestionId] === option);
                return (
                  <button
                    key={option}
                    type="button"
                    tabIndex={0}
                    onClick={() => handleSelect(option)}
                    role="radio"
                    aria-checked={isSelected}
                    className={`answer-card w-full min-h-[56px] flex items-center gap-4 text-left py-4 px-5 rounded-xl border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] text-[1rem] sm:text-[1.0625rem] animate-fade-in stagger-${String(i + 1)} ${
                      isSelected
                        ? "border-[#5b6670] bg-[rgba(91,102,112,0.2)] text-white"
                        : "border-[rgba(91,102,112,0.15)] bg-[rgba(91,102,112,0.08)] text-white hover:bg-[rgba(91,102,112,0.14)]"
                    }`}
                  >
                    <RadioIndicator selected={isSelected} />
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {currentQuestion.educationalBlurb && (
              <div className={`mt-6 text-left animate-fade-in stagger-${String(currentQuestion.options.length + 1)}`}>
                <button
                  type="button"
                  onClick={toggleLearnMore}
                  className={`flex items-center gap-2 text-[0.875rem] rounded px-2 py-1 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] self-start ${
                    expandedLearnMore === currentQuestionId
                      ? "text-white"
                      : "text-[rgba(255,255,255,0.7)] hover:text-white"
                  }`}
                >
                  <LightbulbIcon className="shrink-0" />
                  {expandedLearnMore === currentQuestionId ? "Hide" : "Why we ask this"}
                </button>
                {expandedLearnMore === currentQuestionId && (
                  <div className="overflow-hidden border-t border-[rgba(91,102,112,0.2)] mt-2 pt-3 text-left w-full">
                    <p className="text-[rgba(255,255,255,0.7)] text-[0.875rem] leading-[1.6]">
                      {currentQuestion.educationalBlurb}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className={`hidden md:block mt-6 animate-fade-in stagger-${String(currentQuestion.options.length + 2)}`}>
              <button
                type="button"
                onClick={canContinue ? handleContinue : undefined}
                disabled={!canContinue}
                className={`w-full min-h-[56px] py-4 px-6 rounded-lg font-semibold text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] transition-all duration-200 ${
                  canContinue
                    ? "bg-white text-[#5b6670] hover:bg-[#f0f0f0] active:bg-[#e5e5e5]"
                    : "bg-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.3)] cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
