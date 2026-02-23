/**
 * IntroStep (Q1) - Collects first name, last name, and age.
 */
import { useState } from "react";
import { AGE_OPTIONS, Q1_EDUCATIONAL_BLURB } from "../data/quizData";
import { TypewriterText } from "./TypewriterText";
import { LightbulbIcon } from "./LightbulbIcon";
import { BackButton } from "./ui/BackButton";
import { FixedNavBars } from "./ui/FixedNavBars";

interface IntroStepProps {
  firstName: string;
  lastName: string;
  age: string;
  onUpdate: (field: "firstName" | "lastName" | "age", value: string) => void;
  onContinue: () => void;
  onBack: () => void;
  /** Progress 0-100 for mobile fixed top bar. */
  progress?: number;
}

export function IntroStep({
  firstName,
  lastName,
  age,
  onUpdate,
  onContinue,
  onBack,
  progress = 0,
}: IntroStepProps) {
  const [expandedLearnMore, setExpandedLearnMore] = useState(false);

  const canContinue = firstName.trim() !== "" && age !== "";

  return (
    <>
      <FixedNavBars
        onBack={onBack}
        progress={progress}
        cta={
          <button
            type="button"
            onClick={canContinue ? onContinue : undefined}
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

      <div className="w-full md:max-w-[960px] rounded-2xl bg-[rgba(55,63,72,0.65)] backdrop-blur-[16px] border border-[rgba(91,102,112,0.2)] md:mx-auto md:my-auto overflow-hidden py-4 px-4 sm:p-8">
        <div className="hidden md:block">
          <BackButton onClick={onBack} />
        </div>
        <h2 className="w-full max-w-full break-words whitespace-normal text-[1.375rem] md:text-[1.75rem] font-bold text-white mb-2">
          <TypewriterText text="Let's get to know you" skip={false} speed={30} />
        </h2>
        <p className="text-white text-[0.875rem] mb-6 animate-fade-in stagger-1">
          We&apos;ll use this to personalize your routine results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="animate-fade-in stagger-2">
            <label htmlFor="firstName" className="sr-only">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => onUpdate("firstName", e.target.value)}
              placeholder="First name"
              className="w-full min-h-[56px] py-3 px-4 rounded-xl bg-[rgba(91,102,112,0.1)] border border-[rgba(91,102,112,0.2)] text-white placeholder-[rgba(255,255,255,0.5)] text-[1rem] focus:outline-none focus:border-[#5b6670] focus:ring-2 focus:ring-[#5b6670]/30 transition-colors"
            />
          </div>
          <div className="animate-fade-in stagger-3">
            <label htmlFor="lastName" className="sr-only">
              Last name (optional)
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => onUpdate("lastName", e.target.value)}
              placeholder="Last name (optional)"
              className="w-full min-h-[56px] py-3 px-4 rounded-xl bg-[rgba(91,102,112,0.1)] border border-[rgba(91,102,112,0.2)] text-white placeholder-[rgba(255,255,255,0.5)] text-[1rem] focus:outline-none focus:border-[#5b6670] focus:ring-2 focus:ring-[#5b6670]/30 transition-colors"
            />
          </div>
        </div>

        <div className="animate-fade-in stagger-4">
          <label className="block text-white text-[1rem] font-medium mb-3">
            How old are you?
          </label>

          <div className="flex flex-col gap-2 w-full mb-6 md:hidden">
            {AGE_OPTIONS.map((option, i) => {
              const isSelected = age === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onUpdate("age", option)}
                  className={`answer-card w-full min-h-[56px] flex items-center gap-4 text-left py-4 px-5 rounded-xl border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] text-[1rem] animate-fade-in stagger-${String(5 + i)} ${
                    isSelected
                      ? "border-[#5b6670] bg-[rgba(91,102,112,0.2)] text-white"
                      : "border-[rgba(91,102,112,0.15)] bg-[rgba(91,102,112,0.08)] text-white hover:bg-[rgba(91,102,112,0.14)]"
                  }`}
                >
                  <div
                    className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150"
                    style={{
                      borderColor: isSelected ? "#5b6670" : "rgba(255, 255, 255, 0.25)",
                      backgroundColor: isSelected ? "#5b6670" : "transparent",
                    }}
                  >
                    {isSelected && (
                      <div className="rounded-full bg-white" style={{ width: 8, height: 8 }} />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex flex-row flex-nowrap gap-2 mb-6 pt-1 pb-2">
            {AGE_OPTIONS.map((option, i) => {
              const isSelected = age === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onUpdate("age", option)}
                  className={`answer-card flex items-center gap-2 py-2.5 px-4 rounded-full border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] text-[1.0625rem] whitespace-nowrap animate-fade-in stagger-${String(5 + i)} ${
                    isSelected
                      ? "border-[#5b6670] bg-[rgba(91,102,112,0.2)] text-white"
                      : "border-[rgba(91,102,112,0.15)] bg-[rgba(91,102,112,0.08)] text-white hover:bg-[rgba(91,102,112,0.14)]"
                  }`}
                >
                  <div
                    className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150"
                    style={{
                      borderColor: isSelected ? "#5b6670" : "rgba(255, 255, 255, 0.25)",
                      backgroundColor: isSelected ? "#5b6670" : "transparent",
                    }}
                  >
                    {isSelected && (
                      <div className="rounded-full bg-white" style={{ width: 8, height: 8 }} />
                    )}
                  </div>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 text-left animate-fade-in stagger-12">
          <button
            type="button"
            onClick={() => setExpandedLearnMore((p) => !p)}
            className={`inline-flex items-center gap-2 text-[0.875rem] rounded px-2 py-1 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] ${
              expandedLearnMore
                ? "text-white"
                : "text-[rgba(255,255,255,0.7)] hover:text-white"
            }`}
          >
            <LightbulbIcon className="shrink-0" />
            {expandedLearnMore ? "Hide" : "Why we ask this"}
          </button>
          {expandedLearnMore && (
            <div className="border-t border-[rgba(91,102,112,0.2)] mt-2 pt-3 w-full text-left">
              <p className="text-[rgba(255,255,255,0.7)] text-[0.875rem] leading-[1.6]">
                {Q1_EDUCATIONAL_BLURB}
              </p>
            </div>
          )}
        </div>

        <div className="hidden md:block mt-6 animate-fade-in stagger-13">
          <button
            type="button"
            onClick={canContinue ? onContinue : undefined}
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
    </>
  );
}
