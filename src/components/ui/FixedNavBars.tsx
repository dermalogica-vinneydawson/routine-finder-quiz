/**
 * FixedNavBars - Full-bleed fixed back and CTA bars for mobile.
 * Renders outside the card, attached to viewport edges.
 * Top bar includes back button + progress bar. Hidden on desktop (md+).
 */
import { BackButton } from "./BackButton";
import { PROGRESS_TRACK, COLOR_ACCENT } from "../../constants/style";

const BAR_BG = "rgba(43, 48, 56, 0.9)";
const BAR_BORDER = "rgba(255, 255, 255, 0.06)";

interface FixedNavBarsProps {
  onBack: () => void;
  cta: React.ReactNode;
  /** Progress 0-100. When provided, progress bar is shown in top bar. */
  progress?: number;
}

export function FixedNavBars({
  onBack,
  cta,
  progress = 100,
}: FixedNavBarsProps) {
  return (
    <>
      {/* Mobile: fixed top bar (back button + progress bar) */}
      <div
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: BAR_BG,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${BAR_BORDER}`,
        }}
      >
        <div style={{ padding: "12px 16px" }}>
          <BackButton onClick={onBack} className="!mb-0" />
        </div>
        <div
          className="w-full"
          style={{
            height: 3,
            marginTop: 4,
            backgroundColor: PROGRESS_TRACK,
          }}
        >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: COLOR_ACCENT,
            transition: "width 300ms ease",
          }}
        />
        </div>
      </div>

      {/* Mobile: fixed CTA bar at bottom */}
      <div
        className="fixed left-0 right-0 z-50 md:hidden"
        style={{
          bottom: 0,
          background: BAR_BG,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          paddingTop: 12,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
          borderTop: `1px solid ${BAR_BORDER}`,
        }}
      >
        {cta}
      </div>
    </>
  );
}
