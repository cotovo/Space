import { useEffect, useState } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover";
}

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()",
  className = "",
  parentClassName = "",
  encryptedClassName = "text-[var(--t-signal)] opacity-80 font-mono",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (animateOn === "hover" && !isHovered) {
      setDisplayText(text);
      return;
    }

    let currentIteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (currentIteration / maxIterations > index / text.length) {
              return char;
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      currentIteration++;
      if (currentIteration >= maxIterations + text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, characters, animateOn, isHovered]);

  return (
    <span
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={displayText === text ? className : encryptedClassName}>
        {displayText}
      </span>
    </span>
  );
}
