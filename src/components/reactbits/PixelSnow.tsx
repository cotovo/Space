import React, { useEffect, useRef } from "react";

interface PixelSnowProps {
  className?: string;
  pixelSize?: number;
  snowflakeCount?: number;
  speed?: number;
  color?: string;
  variant?: "square" | "plus";
}

interface Flake {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  depth: number;
}

export default function PixelSnow({
  className = "",
  pixelSize = 3,
  snowflakeCount = 60,
  speed = 1.0,
  color = "#ffffff",
  variant = "square",
}: PixelSnowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const flakes: Flake[] = [];
    const initFlakes = () => {
      flakes.length = 0;
      for (let i = 0; i < snowflakeCount; i++) {
        const depth = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
        flakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.max(1, Math.round(pixelSize * depth)),
          speedY: (Math.random() * 0.8 + 0.4) * speed * depth * 1.5,
          speedX: (Math.random() - 0.5) * 0.3 * speed,
          opacity: depth * 0.7 + 0.15,
          depth,
        });
      }
    };

    initFlakes();

    const drawSquare = (x: number, y: number, size: number, opacity: number) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      // Snap to pixel grid for authentic retro 8-bit look
      const gridX = Math.floor(x / size) * size;
      const gridY = Math.floor(y / size) * size;
      ctx.fillRect(gridX, gridY, size, size);
    };

    const drawPlus = (x: number, y: number, size: number, opacity: number) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      const s = Math.max(1, Math.floor(size / 3));
      const gridX = Math.floor(x);
      const gridY = Math.floor(y);
      ctx.fillRect(gridX, gridY - s, s, s * 3);
      ctx.fillRect(gridX - s, gridY, s * 3, s);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        flake.y += flake.speedY;
        flake.x += flake.speedX + Math.sin(flake.y * 0.01) * 0.2;

        // Reset flake when it goes off screen
        if (flake.y > canvas.height) {
          flake.y = -flake.size * 2;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width) {
          flake.x = 0;
        } else if (flake.x < 0) {
          flake.x = canvas.width;
        }

        if (variant === "plus" && flake.size > 2) {
          drawPlus(flake.x, flake.y, flake.size, flake.opacity);
        } else {
          drawSquare(flake.x, flake.y, flake.size, flake.opacity);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pixelSize, snowflakeCount, speed, color, variant]);

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
