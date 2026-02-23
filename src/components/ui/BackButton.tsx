/**
 * Shared Back button used across quiz screens.
 * Styled for dark theme with accent focus ring.
 */
interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function BackButton({
  onClick,
  label = "Back",
  className = "",
}: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 text-[rgba(255,255,255,0.7)] hover:text-white text-[0.875rem] mb-6 focus:outline-none focus:ring-2 focus:ring-[#5b6670] focus:ring-offset-2 focus:ring-offset-[#2e343b] rounded px-2 py-1 -ml-2 transition-colors duration-150 self-start ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}
