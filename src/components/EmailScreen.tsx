/**
 * EmailScreen - Optional email capture before redirecting to results.
 * User can submit email or skip. Answers are passed as URL params.
 */
import { useState } from "react";
import { BackButton } from "./ui/BackButton";
import { FixedNavBars } from "./ui/FixedNavBars";
import { DesktopProgressBar } from "./ui/DesktopProgressBar";
import { RESULTS_URL } from "../constants/urls";
import { BG_GRADIENT } from "../constants/style";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EmailScreenProps {
  answers: Record<string, string>;
  onRedirect: (params: Record<string, string>) => void;
  onBack: (target?: "intro" | "email" | "home") => void;
}

function buildQueryString(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

export function EmailScreen({
  answers,
  onRedirect,
  onBack,
}: EmailScreenProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = EMAIL_REGEX.test(email.trim());

  const buildParams = (includeEmail = false): Record<string, string> => {
    const params: Record<string, string> = { ...answers };
    if (includeEmail && email.trim()) {
      params.email = email.trim();
    }
    return params;
  };

  const redirect = (params: Record<string, string>) => {
    const search = buildQueryString(params);
    const url = search ? `${RESULTS_URL}?${search}` : RESULTS_URL;
    onRedirect(params);
    window.location.href = url;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isValidEmail) {
      redirect(buildParams(true));
    } else if (email.trim()) {
      setError("Please enter a valid email address.");
    } else {
      setError("Please enter your email address.");
    }
  };

  const handleSkip = () => {
    redirect(buildParams(false));
  };

  return (
    <div
      className="min-h-[100dvh] min-h-screen flex flex-col items-start md:items-center justify-start md:justify-center overflow-y-auto pt-[72px] pb-[92px] md:pt-6 md:pb-6 px-3 md:px-6"
      style={{ background: BG_GRADIENT }}
    >
      <DesktopProgressBar progress={100} />
      <div className="w-full md:max-w-[780px] flex flex-col md:my-auto">
        <FixedNavBars
          onBack={() => onBack("email")}
          progress={100}
          cta={
            <>
              <button
                type="submit"
                form="email-form"
                className="w-full min-h-[56px] py-4 px-6 rounded-lg bg-white text-[#5b6670] font-semibold text-sm uppercase tracking-wider hover:bg-[#f0f0f0] active:bg-[#e5e5e5] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] disabled:bg-[rgba(255,255,255,0.15)] disabled:text-[rgba(255,255,255,0.3)] disabled:cursor-not-allowed"
              >
                SEND MY ROUTINE
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="w-full mt-4 text-[rgba(255,255,255,0.7)] text-[0.875rem] hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] rounded py-2"
              >
                Skip — just show my results
              </button>
            </>
          }
        />

        <div className="w-full rounded-2xl bg-[rgba(55,63,72,0.65)] backdrop-blur-[16px] border border-[rgba(91,102,112,0.2)] overflow-hidden py-4 px-4 sm:p-8">
          <div className="hidden md:block">
            <BackButton onClick={() => onBack("email")} />
          </div>
          <h2 className="w-full max-w-full break-words whitespace-normal text-[1.375rem] md:text-[1.75rem] font-bold text-white mb-3">
            Almost there — want your results sent to your inbox?
          </h2>
          <p className="text-white text-[0.875rem] sm:text-base mb-6">
            Get your personalized routine plus exclusive skin health tips from
            our skin therapists.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" id="email-form">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                className="w-full min-h-[56px] py-4 px-5 rounded-xl bg-[rgba(91,102,112,0.1)] border border-[rgba(91,102,112,0.2)] text-white placeholder-[rgba(255,255,255,0.5)] text-[1rem] focus:outline-none focus:border-[#5b6670] focus:ring-2 focus:ring-[#5b6670]/30 transition-colors"
                aria-invalid={!!error}
                aria-describedby={error ? "email-error" : undefined}
              />
              {error && (
                <p
                  id="email-error"
                  className="text-red-400 text-[0.875rem] mt-2"
                >
                  {error}
                </p>
              )}
            </div>
          </form>

          <div className="hidden md:block mt-6">
            <button
              type="submit"
              form="email-form"
              className="w-full min-h-[56px] py-4 px-6 rounded-lg bg-white text-[#5b6670] font-semibold text-sm uppercase tracking-wider hover:bg-[#f0f0f0] active:bg-[#e5e5e5] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] disabled:bg-[rgba(255,255,255,0.15)] disabled:text-[rgba(255,255,255,0.3)] disabled:cursor-not-allowed"
            >
              SEND MY ROUTINE
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="w-full mt-4 text-[rgba(255,255,255,0.7)] text-[0.875rem] hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] rounded py-2"
            >
              Skip — just show my results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
