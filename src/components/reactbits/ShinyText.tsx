import React from "react";

interface ShinyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  key?: React.Key;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
  ...props
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text ${
        disabled
          ? ""
          : "animate-shiny bg-gradient-to-r from-neutral-200 via-sky-400 to-neutral-200 bg-[length:200%_100%] text-transparent"
      } ${className}`}
      style={{
        animationDuration: animationDuration,
      }}
      {...props}
    >
      {text}
    </span>
  );
}
