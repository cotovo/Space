import React, { useEffect, useRef } from "react";

interface IridescenceProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  className?: string;
}

export default function Iridescence({
  color = [0.14, 0.55, 0.88], // 高亮亮天蓝虹彩
  speed = 0.8,
  amplitude = 0.25,
  mouseReact = true,
  className = "",
}: IridescenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseReact) return;
      mouse.current.targetX = e.clientX / window.innerWidth;
      mouse.current.targetY = e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let t = 0;

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      t += 0.008 * speed;

      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      ctx.clearRect(0, 0, w, h);

      // Create Soft Radial Liquid Ambient Waves
      const count = 3;
      for (let i = 0; i < count; i++) {
        const mx = mouse.current.x * w + Math.sin(t + i * 1.5) * 80;
        const my = mouse.current.y * h + Math.cos(t * 0.8 + i * 1.2) * 80;
        const radius = Math.max(w, h) * (0.5 + i * 0.18 + Math.sin(t * 0.5) * amplitude);

        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, radius);
        const r = Math.round(color[0] * 255);
        const g = Math.round(color[1] * 255);
        const b = Math.round(color[2] * 255);

        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.32 - i * 0.06})`);
        grad.addColorStop(0.45, `rgba(${r / 2}, ${g / 1.4}, ${b}, ${0.15 - i * 0.03})`);
        grad.addColorStop(1, "rgba(7, 9, 14, 0)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [color, speed, amplitude, mouseReact]);

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
