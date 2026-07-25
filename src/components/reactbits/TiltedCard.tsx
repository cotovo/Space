import React, { useRef, useState } from "react";

interface TiltedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  className?: string;
  key?: React.Key;
}

export default function TiltedCard({
  children,
  maxTilt = 15,
  perspective = 1000,
  scale = 1.02,
  className = "",
  ...props
}: TiltedCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * maxTilt;
    const rX = -((mouseY - height / 2) / (height / 2)) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
      }}
      className={`inline-block w-full ${className}`}
      {...props}
    >
      <div
        className="w-full transition-transform duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
