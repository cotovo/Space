import React, { useEffect, useRef } from "react";

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children?: React.ReactNode;
  className?: string;
}

export default function ClickSpark({
  sparkColor = "#38bdf8",
  sparkSize = 10,
  sparkRadius = 25,
  sparkCount = 8,
  duration = 400,
  extraScale = 1.0,
  children,
  className = "",
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<
    Array<{
      x: number;
      y: number;
      angle: number;
      startTime: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeCanvas = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    for (let i = 0; i < sparkCount; i++) {
      sparksRef.current.push({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const currentRadius = sparkRadius * progress * extraScale;
        const currentSize = sparkSize * (1 - progress);

        const x = spark.x + Math.cos(spark.angle) * currentRadius;
        const y = spark.y + Math.sin(spark.angle) * currentRadius;

        ctx.beginPath();
        ctx.arc(x, y, Math.max(0, currentSize / 2), 0, 2 * Math.PI);
        ctx.fillStyle = sparkColor;
        ctx.shadowColor = sparkColor;
        ctx.shadowBlur = 6;
        ctx.fill();

        return true;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrameId);
  }, [sparkColor, sparkSize, sparkRadius, duration, extraScale]);

  return (
    <div className={`relative ${className}`} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-50 w-full h-full"
      />
      {children}
    </div>
  );
}
