import React, { useEffect, useRef, useState } from 'react';

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?',
  className = '',
  style = {},
  children
}) => {
  const [displayText, setDisplayText] = useState(children);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDisplayText(children);
  }, [children]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const chars = children.split('');
    const charWidth = rect.width / (chars.length || 1);

    const newChars = chars.map((char, index) => {
      if (char === ' ') return ' ';
      const charX = index * charWidth + charWidth / 2;
      const charY = rect.height / 2;
      const dist = Math.hypot(mouseX - charX, mouseY - charY);

      if (dist < radius) {
        const randomIndex = Math.floor(Math.random() * scrambleChars.length);
        return scrambleChars[randomIndex];
      }
      return char;
    });

    setDisplayText(newChars.join(''));
  };

  const handlePointerLeave = () => {
    setDisplayText(children);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`font-mono transition-colors duration-150 ${className}`}
      style={style}
    >
      <span>{displayText}</span>
    </div>
  );
};

export default ScrambledText;
