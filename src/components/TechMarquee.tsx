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

export const TECH_ITEMS = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Vue.js", icon: SiVuedotjs },
  { name: "Nuxt", icon: SiNuxt },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Python", icon: SiPython },
  { name: "C", icon: SiC },
  { name: "C++", icon: SiCplusplus },
  { name: "Rust", icon: SiRust },
  { name: "Go", icon: SiGo },
  { name: "Docker", icon: SiDocker },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Redis", icon: SiRedis },
  { name: "MySQL", icon: SiMysql },
  { name: "Drizzle ORM", icon: SiDrizzle },
  { name: "SQLite", icon: SiSqlite },
  { name: "Nginx", icon: SiNginx },
  { name: "Figma", icon: SiFigma },
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "Svelte", icon: SiSvelte },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "JavaScript", icon: SiJavascript },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss },
];

export default function TechMarquee() {
  const list = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="w-full overflow-hidden py-3.5 my-4 border-y border-white/10 bg-white/[0.015] backdrop-blur-md select-none relative group">
      {/* Edge Blur Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#07090e] via-[#07090e]/80 to-transparent z-10 pointer-events-none" />

      <div className="flex gap-3.5 w-max animate-marquee group-hover:[animation-play-state:paused]">
        {list.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-[var(--t-signal)]/60 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all duration-300 text-xs font-mono font-semibold text-white/80 hover:text-white shrink-0 cursor-default"
            >
              <Icon className="w-4 h-4 text-[var(--t-signal)] shrink-0" />
              <span>{tech.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
