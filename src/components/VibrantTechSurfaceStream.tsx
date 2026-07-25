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

export const VIBRANT_TECHS = [
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

export default function VibrantTechSurfaceStream() {
  const list = [...VIBRANT_TECHS, ...VIBRANT_TECHS];

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-xl p-5 md:p-6 my-6 md:my-8 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] group">
      {/* Surface Header Label */}
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-white/70 uppercase">
          <span className="w-2 h-2 rounded-full bg-[var(--t-signal)] shadow-[0_0_10px_var(--t-signal)] animate-pulse" />
          <span>TECH STACK ECOSYSTEM</span>
        </div>
        <span className="text-[10px] font-mono text-white/30 hidden sm:block">From @blog/about</span>
      </div>

      {/* Surface Flowing Icons Stream Container */}
      <div className="relative overflow-hidden py-2">
        {/* Surface Side Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 md:gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {list.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.name}-${idx}`}
                className="group/item flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.1] hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 shrink-0 cursor-default"
                style={{
                  boxShadow: `0 4px 20px -5px ${item.color}25`,
                }}
              >
                <Icon
                  className="w-7 h-7 md:w-9 md:h-9 shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                  style={{
                    color: item.color,
                    filter: `drop-shadow(0 0 10px ${item.color}90)`,
                  }}
                />
                <span className="text-sm font-mono font-bold text-white/90 group-hover/item:text-white transition-colors">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
