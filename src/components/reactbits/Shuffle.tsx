import React, { useState, useEffect, useRef } from 'react';

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  shuffleTimes?: number;
  scrambleCharset?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  className = '',
  style = {},
  duration = 0.5,
  shuffleTimes = 5,
  scrambleCharset = DEFAULT_CHARSET,
  tag = 'span'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startShuffle = () => {
    let count = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      count++;
      const shuffled = text
        .split('')
        .map(char => {
          if (char === ' ') return ' ';
          return scrambleCharset[Math.floor(Math.random() * scrambleCharset.length)];
        })
        .join('');
      setDisplayText(shuffled);

      if (count >= shuffleTimes) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, (duration * 1000) / shuffleTimes);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const Tag = tag as any;

  return (
    <Tag
      className={`inline-block font-mono cursor-pointer transition-colors ${className}`}
      style={style}
      onMouseEnter={() => {
        setIsHovered(true);
        startShuffle();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </Tag>
  );
};

export default Shuffle;
