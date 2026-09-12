import React, { useEffect, useState, useRef } from 'react';

interface CyberDecryptTextProps {
  text: string;
  className?: string;
  delay?: number;
  triggerOnHover?: boolean;
}

const CYBER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%#$&*@§ΔXΩΨ';

export const CyberDecryptText: React.FC<CyberDecryptTextProps> = ({
  text,
  className = '',
  delay = 0,
  triggerOnHover = false,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const hasAnimatedRef = useRef(false);

  const startDecrypt = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    let iteration = 0;
    const totalLength = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < iteration) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join('')
      );

      iteration += 1 / 3;

      if (iteration >= totalLength) {
        setDisplayText(text);
        setIsDecrypting(false);
        clearInterval(interval);
      }
    }, 30);
  };

  useEffect(() => {
    if (!triggerOnHover && !hasAnimatedRef.current) {
      const timer = setTimeout(() => {
        hasAnimatedRef.current = true;
        startDecrypt();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [text, delay, triggerOnHover]);

  return (
    <span
      className={`inline-block font-mono cursor-default transition-colors duration-200 ${
        isDecrypting ? 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : ''
      } ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover) startDecrypt();
      }}
    >
      {displayText}
    </span>
  );
};
