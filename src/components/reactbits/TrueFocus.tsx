import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export default function TrueFocus({
  sentence = "kerntau",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#38bdf8",
  glowColor = "rgba(56, 189, 248, 0.4)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActive, setLastActive] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const updatePosition = () => {
      if (!wordRefs.current[currentIndex] || !containerRef.current) return;
      const parentRect = containerRef.current.getBoundingClientRect();
      const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

      setLastActive({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [currentIndex]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setCurrentIndex(index);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-wrap items-center justify-center gap-4 ${className}`}
    >
      {lastActive && (
        <motion.div
          className="pointer-events-none absolute top-0 left-0 rounded-lg border-2"
          initial={{ opacity: 0 }}
          animate={{
            x: lastActive.x - 6,
            y: lastActive.y - 4,
            width: lastActive.width + 12,
            height: lastActive.height + 8,
            opacity: 1,
          }}
          transition={{ duration: animationDuration, ease: "easeOut" }}
          style={{
            borderColor: borderColor,
            boxShadow: `0 0 15px ${glowColor}`,
          }}
        />
      )}

      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            onMouseEnter={() => handleMouseEnter(index)}
            className="relative cursor-pointer transition-all duration-300 select-none z-10"
            style={{
              filter: isActive ? "none" : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.45,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
