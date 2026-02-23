/**
 * HomeScreen - Landing page with CTA to start the quiz.
 */
import { BACKGROUND_IMAGE, AVATAR_IMAGE } from "../constants/urls";

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={BACKGROUND_IMAGE}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />
      </div>

      <div className="relative flex min-h-[100dvh] min-h-screen items-center justify-center overflow-y-auto py-4 sm:py-6 px-4 sm:px-6">
        <div className="w-full md:max-w-[780px] rounded-none sm:rounded-2xl bg-[rgba(55,63,72,0.65)] backdrop-blur-[16px] border border-[rgba(91,102,112,0.2)] p-5 sm:p-10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <img
              src={AVATAR_IMAGE}
              alt=""
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center border border-[rgba(255,255,255,0.1)]"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
            />
          </div>

          <h1 className="w-full max-w-full break-words whitespace-normal text-[1.375rem] md:text-[1.75rem] font-bold text-white text-center mb-3">
            Routine Finder Quiz
          </h1>

          <p className="text-white text-center text-[0.875rem] sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
            Answer a few quick questions to get personalized Dermalogica
            recommendations inspired by our professional skin therapists
          </p>

          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 md:gap-3 text-white text-[0.875rem] mb-8 text-center">
            <span>Personalized to your skin</span>
            <span
              className="hidden md:inline-block shrink-0 w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.4)]"
              aria-hidden
            />
            <span>Takes under 2 minutes</span>
            <span
              className="hidden md:inline-block shrink-0 w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.4)]"
              aria-hidden
            />
            <span>Expert-guided recommendations</span>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="w-full min-h-[56px] py-4 px-6 rounded-lg bg-white text-[#5b6670] font-semibold text-sm uppercase tracking-wider hover:bg-[#f0f0f0] active:bg-[#e5e5e5] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b]"
          >
            DISCOVER YOUR ROUTINE →
          </button>
        </div>
      </div>
    </div>
  );
}
