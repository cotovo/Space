import React from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNuxt,
  SiTailwindcss,
  SiPython,
  SiC,
  SiCplusplus,
  SiRust,
  SiGo,
  SiDocker,
  SiNodedotjs,
  SiRedis,
  SiMysql,
  SiDrizzle,
  SiSqlite,
  SiNginx,
  SiFigma,
  SiSpringboot,
  SiSvelte,
  SiGit,
  SiGithub,
  SiJavascript,
  SiHtml5,
  SiCss,
} from "@icons-pack/react-simple-icons";

export const VIBRANT_ICONS = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Nuxt", icon: SiNuxt, color: "#00DC82" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Rust", icon: SiRust, color: "#F74C00" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Drizzle ORM", icon: SiDrizzle, color: "#C5F74F" },
  { name: "SQLite", icon: SiSqlite, color: "#003B57" },
  { name: "Nginx", icon: SiNginx, color: "#009639" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "Svelte", icon: SiSvelte, color: "#FF3E00" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
];

export default function PureVibrantIconStream() {
  const list = [...VIBRANT_ICONS, ...VIBRANT_ICONS];

  return (
    <div
      className="w-full max-w-5xl mx-auto overflow-hidden py-3 select-none relative group pointer-events-none my-1"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div className="flex gap-7 sm:gap-11 w-max animate-marquee group-hover:[animation-play-state:paused] items-center">
        {list.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${idx}`}
              className="p-1.5 transition-all duration-300 transform hover:scale-125 cursor-default shrink-0 pointer-events-auto"
              title={item.name}
            >
              <Icon
                className="w-7 h-7 sm:w-9 sm:h-9 shrink-0"
                style={{
                  color: item.color,
                  filter: `drop-shadow(0 0 10px ${item.color}B0)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
