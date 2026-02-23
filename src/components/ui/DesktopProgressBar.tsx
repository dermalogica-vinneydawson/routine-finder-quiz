/**
 * DesktopProgressBar - Fixed at top of viewport, desktop only.
 * Slim 3-4px bar, edge-to-edge. Hidden on mobile (progress is in FixedNavBars).
 */
import { PROGRESS_TRACK, COLOR_ACCENT } from "../../constants/style";

interface DesktopProgressBarProps {
  progress: number;
}

export function DesktopProgressBar({ progress }: DesktopProgressBarProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 hidden md:block"
      style={{
        height: 3,
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
  );
}
