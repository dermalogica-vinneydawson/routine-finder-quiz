import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  skip?: boolean;
}

export function TypewriterText({
  text,
  speed = 30,
  onComplete,
  className = '',
  skip = false,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState(skip ? text : '');
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (skip || !text) {
      /* eslint-disable react-hooks/set-state-in-effect -- Skip path: show full text immediately */
      setDisplayed(text || '');
      /* eslint-enable react-hooks/set-state-in-effect */
      onComplete?.();
      return;
    }

    indexRef.current = 0;
    setDisplayed('');

    const tick = () => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      if (indexRef.current < text.length) {
        timeoutRef.current = setTimeout(tick, speed);
      } else {
        onComplete?.();
      }
    };

    const startDelay = setTimeout(() => {
      timeoutRef.current = setTimeout(tick, speed);
    }, 50);

    return () => {
      clearTimeout(startDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, skip, speed, onComplete]);

  return <span className={className}>{displayed}</span>;
}
