import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startWhen) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timeout = setTimeout(() => {
      onStart?.();

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic easeOut

        const currentCount =
          direction === "up"
            ? Math.floor(from + (to - from) * easeProgress)
            : Math.floor(from - (from - to) * easeProgress);

        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(to);
          onEnd?.();
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [to, from, direction, delay, duration, startWhen, onStart, onEnd]);

  const formatted = count.toLocaleString().replace(/,/g, separator);

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
}
