import React, { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const hexInt = parseInt(cleanHex, 16);
  if (isNaN(hexInt)) return [255, 255, 255];
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

export default function Particles({
  className = "",
  quantity = 35,
  staticity = 40,
  ease = 40,
  size = 0.5,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<
    Array<{
      x: number;
      y: number;
      translateX: number;
      translateY: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      dx: number;
      dy: number;
      magnetism: number;
    }>
  >([]);
  const mouseCoords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [color, refresh]);

  const onMouseMove = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      const x = clientX - rect.left - canvasSize.current.w / 2;
      const y = clientY - rect.top - canvasSize.current.h / 2;
      mouseCoords.current = { x, y };
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = [];
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return { x, y, translateX, translateY, size: pSize, alpha, targetAlpha, dx, dy, magnetism };
  };

  const drawParticles = () => {
    for (let i = 0; i < quantity; i++) {
      circles.current.push(circleParams());
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ): number => {
    const rel = (value - start1) / (stop1 - start1);
    return start2 + rel * (stop2 - start2);
  };

  const animate = () => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    const rgb = hexToRgb(color);

    circles.current.forEach((circle, i) => {
      // Handle edge collision / loop
      const edge = [
        circle.x + circle.translateX - circle.size < 0,
        circle.x + circle.translateX + circle.size > canvasSize.current.w,
        circle.y + circle.translateY - circle.size < 0,
        circle.y + circle.translateY + circle.size > canvasSize.current.h,
      ];

      if (edge[0] || edge[1]) circle.dx = -circle.dx;
      if (edge[2] || edge[3]) circle.dy = -circle.dy;

      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;

      // Mouse attraction / repulsion
      mouse.current.x += (mouseCoords.current.x - mouse.current.x) / ease;
      mouse.current.y += (mouseCoords.current.y - mouse.current.y) / ease;

      const dx = mouse.current.x - (circle.x - canvasSize.current.w / 2);
      const dy = mouse.current.y - (circle.y - canvasSize.current.h / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 200) {
        const force = remapValue(dist, 0, 200, 1, 0);
        circle.translateX -= (dx / dist) * force * circle.magnetism;
        circle.translateY -= (dy / dist) * force * circle.magnetism;
      } else {
        circle.translateX *= 0.95;
        circle.translateY *= 0.95;
      }

      if (circle.alpha < circle.targetAlpha) {
        circle.alpha += 0.02;
      }

      context.current!.beginPath();
      context.current!.arc(
        circle.x + circle.translateX,
        circle.y + circle.translateY,
        circle.size,
        0,
        2 * Math.PI
      );
      context.current!.fillStyle = `rgba(${rgb.join(",")}, ${circle.alpha})`;
      context.current!.fill();
    });

    window.requestAnimationFrame(animate);
  };

  return (
    <div className={`pointer-events-none ${className}`} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
