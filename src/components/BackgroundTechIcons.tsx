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

const ROW_1 = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Vue.js", icon: SiVuedotjs },
  { name: "Nuxt", icon: SiNuxt },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Python", icon: SiPython },
  { name: "C", icon: SiC },
  { name: "C++", icon: SiCplusplus },
];

const ROW_2 = [
  { name: "Rust", icon: SiRust },
  { name: "Go", icon: SiGo },
  { name: "Docker", icon: SiDocker },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Redis", icon: SiRedis },
  { name: "MySQL", icon: SiMysql },
  { name: "Drizzle", icon: SiDrizzle },
  { name: "SQLite", icon: SiSqlite },
  { name: "Nginx", icon: SiNginx },
];

const ROW_3 = [
  { name: "Figma", icon: SiFigma },
  { name: "Spring", icon: SiSpringboot },
  { name: "Svelte", icon: SiSvelte },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "JavaScript", icon: SiJavascript },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss },
];

export default function BackgroundTechIcons() {
  const row1List = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2List = [...ROW_2, ...ROW_2, ...ROW_2];
  const row3List = [...ROW_3, ...ROW_3, ...ROW_3];

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20 flex flex-col justify-around py-8 select-none"
      aria-hidden="true"
    >
      {/* Row 1 - Left Flow */}
      <div className="flex gap-16 md:gap-24 w-max animate-marquee transform -rotate-1">
        {row1List.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`r1-${idx}`} className="flex items-center gap-3 shrink-0">
              <Icon className="w-10 h-10 md:w-14 md:h-14 text-white/50 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]" />
            </div>
          );
        })}
      </div>

      {/* Row 2 - Right Flow */}
      <div className="flex gap-16 md:gap-24 w-max animate-marquee-reverse transform rotate-1">
        {row2List.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`r2-${idx}`} className="flex items-center gap-3 shrink-0">
              <Icon className="w-10 h-10 md:w-14 md:h-14 text-[var(--t-signal)]/50 drop-shadow-[0_0_12px_var(--t-signal)]" />
            </div>
          );
        })}
      </div>

      {/* Row 3 - Left Flow */}
      <div className="flex gap-16 md:gap-24 w-max animate-marquee transform -rotate-1">
        {row3List.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={`r3-${idx}`} className="flex items-center gap-3 shrink-0">
              <Icon className="w-10 h-10 md:w-14 md:h-14 text-white/40 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
