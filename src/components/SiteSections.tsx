import React, { useRef } from "react";
import {
  Activity,
  ArrowUpRight,
  Braces,
  Compass,
  History,
  MapPin,
  Shield,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { PROJECTS, TIMELINE } from "../data/site";

// Import ReactBits Text Animation & Effects Components
import BlurText from "./reactbits/BlurText";
import DecryptedText from "./reactbits/DecryptedText";
import ShinyText from "./reactbits/ShinyText";
import ScrambledText from "./reactbits/ScrambledText";
import ScrollReveal from "./reactbits/ScrollReveal";
import Shuffle from "./reactbits/Shuffle";
import SplitText from "./reactbits/SplitText";

const EASE = [0.83, 0, 0.17, 1] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  key?: string | number;
}) {
  const reduceMotion = useReducedMotion() === true;
  return (
    <motion.section
      initial={reduceMotion ? false : { y: 16, opacity: 0 }}
      whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.section>
  );
}

export default function SiteSections() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="content"
      ref={containerRef}
      className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-12 pt-8 md:pt-12 pb-10 md:pb-14 flex flex-col gap-12 md:gap-16"
    >
      {/* About Section - Seamless Editorial Layout */}
      <Reveal>
        <div id="about" className="flex flex-col gap-6 md:gap-8 relative py-1 scroll-mt-28">
          {/* Section Header Tag */}
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-[var(--t-signal)] uppercase px-4 py-1.5 w-fit rounded-full border border-white/10 bg-black/40 shadow-sm">
            <span className="text-white/30">01 /</span>
            <Compass className="w-3.5 h-3.5 text-[var(--t-signal)] animate-spin-slow" />
            <DecryptedText text="ABOUT" speed={50} maxIterations={12} />
          </div>

          {/* Main Grid: Statement + Micro Stat Chips */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Statement with Modern Cyber & Glassmorphism Design */}
            <div className="lg:col-span-7 flex flex-col gap-3.5">
              <div className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
                <span>我是</span>
                <span className="font-mono text-[var(--t-signal)] drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                  kerntau
                </span>
                <span className="text-[var(--t-signal)] font-mono text-xl sm:text-2xl font-normal animate-pulse">_</span>
              </div>

              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white/90 leading-snug tracking-tight flex flex-wrap items-center gap-x-2.5 gap-y-2">
                <span>一名</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-[var(--t-signal)]/40 bg-[var(--t-signal)]/10 backdrop-blur-md text-[var(--t-signal)] font-mono text-base sm:text-lg md:text-xl font-bold shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:border-[var(--t-signal)]/80 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--t-signal)] animate-pulse" />
                  信息安全专业
                </span>
                <span>学生，</span>
              </div>

              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white/85 leading-snug tracking-tight">
                持续实践{" "}
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent font-black drop-shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                  前端与全栈工程
                </span>
                。
              </div>
            </div>

            {/* Right: Modern Micro-Stat Chips */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 w-full">
              {/* Focus Chip */}
              <div className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[var(--t-signal)]/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.18)] transition-all duration-300 transform hover:-translate-y-0.5">
                <div className="flex items-center gap-3.5">
                  <Shield className="w-4.5 h-4.5 text-[var(--t-signal)] shrink-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_var(--t-signal)] transition-all" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Focus</span>
                    <span className="text-xs font-bold text-white font-mono group-hover:text-[var(--t-signal)] transition-colors">
                      <DecryptedText text="Security / Web" speed={40} maxIterations={10} />
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/20 group-hover:text-[var(--t-signal)] transition-colors">01</span>
              </div>

              {/* Base Chip */}
              <div className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[var(--t-signal)]/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.18)] transition-all duration-300 transform hover:-translate-y-0.5">
                <div className="flex items-center gap-3.5">
                  <MapPin className="w-4.5 h-4.5 text-[var(--t-signal)] shrink-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_var(--t-signal)] transition-all" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Base</span>
                    <span className="text-xs font-bold text-white">
                      <ShinyText text="湖北 · 十堰" speed={3} />
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/20 group-hover:text-[var(--t-signal)] transition-colors">02</span>
              </div>

              {/* Status Chip */}
              <div className="group flex items-center justify-between p-3.5 md:p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[var(--t-signal)]/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.18)] transition-all duration-300 transform hover:-translate-y-0.5">
                <div className="flex items-center gap-3.5">
                  <Activity className="w-4.5 h-4.5 text-[var(--t-signal)] shrink-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_var(--t-signal)] transition-all" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Status</span>
                    <span className="text-xs font-bold text-[var(--t-signal)] flex items-center gap-1.5">
                      <span className="shrink-0 w-5 h-5 inline-flex items-center justify-center overflow-hidden">
                        <ThinkingOrb size={20} state="shaping" theme="dark" />
                      </span>
                      Building
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/20 group-hover:text-[var(--t-signal)] transition-colors">03</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Projects Section */}
      <Reveal>
        <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-[var(--t-signal)] uppercase mb-6 md:mb-7 px-4 py-1.5 w-fit rounded-full border border-white/10 bg-black/40 shadow-sm">
          <span className="text-white/30">02 /</span>
          <Braces className="w-3.5 h-3.5 text-[var(--t-signal)]" />
          <DecryptedText text="PROJECTS" speed={50} maxIterations={12} />
        </div>

        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {PROJECTS.map((project, index) => (
            <a
              key={project.name}
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-5 md:py-8 px-3.5 md:px-6 transition-all duration-500 hover:bg-gradient-to-r hover:from-[var(--t-signal)]/10 hover:via-white/[0.02] hover:to-transparent relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--t-signal)] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_var(--t-signal)]" />

              <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center gap-1.5 min-w-0">
                <span className="text-sm font-mono font-bold text-white/30 group-hover:text-[var(--t-signal)] group-hover:drop-shadow-[0_0_8px_var(--t-signal)] transition-all shrink-0">
                  0{index + 1}
                </span>
                <ScrambledText
                  radius={50}
                  scrambleChars=".:/*#"
                  className="text-xs font-mono text-white/50 group-hover:text-white/80 tracking-widest uppercase cursor-default truncate max-w-[200px] md:max-w-none transition-colors"
                >
                  {project.stack}
                </ScrambledText>
              </div>

              <div className="md:col-span-3 flex items-center min-w-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[var(--t-signal)] transition-colors">
                  <ShinyText text={project.name} speed={4} />
                </h3>
              </div>

              <div className="md:col-span-6 flex items-start md:items-center justify-between gap-4 md:gap-6 min-w-0">
                <div className="text-xs sm:text-sm text-white/60 group-hover:text-white/90 transition-colors leading-relaxed min-w-0 flex-1 break-words">
                  <SplitText
                    text={project.description}
                    splitType="words"
                    delay={0.015}
                  />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[var(--t-signal)] group-hover:drop-shadow-[0_0_10px_var(--t-signal)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all shrink-0 mt-0.5 md:mt-0" />
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      {/* Log Section */}
      <Reveal>
        <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-[var(--t-signal)] uppercase mb-6 md:mb-7 px-4 py-1.5 w-fit rounded-full border border-white/10 bg-black/40 shadow-sm">
          <span className="text-white/30">03 /</span>
          <History className="w-3.5 h-3.5 text-[var(--t-signal)]" />
          <DecryptedText text="LOG" speed={50} maxIterations={12} />
        </div>

        <div className="relative border-l border-white/10 ml-3 pl-3 md:border-l-0 md:ml-0 md:pl-0">
          <div className="hidden md:block absolute left-[25%] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--t-signal)]/60 via-white/15 to-transparent -ml-px pointer-events-none" />

          <div className="flex flex-col gap-3 md:gap-4">
            {TIMELINE.map((entry) => (
              <div
                key={`${entry.date}-${entry.title}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-0 py-3.5 md:py-4.5 px-3 md:px-5 rounded-xl transition-all duration-300 hover:bg-white/[0.03] hover:translate-x-1 relative"
              >
                {/* Mobile Left Dot */}
                <div className="md:hidden absolute -left-[17px] top-5 w-2.5 h-2.5 rounded-full bg-black border border-white/30 group-hover:border-[var(--t-signal)] group-hover:shadow-[0_0_10px_var(--t-signal)] transition-all duration-300 flex items-center justify-center">
                   <div className="w-1 h-1 rounded-full bg-[var(--t-signal)]/60 group-hover:bg-[var(--t-signal)] group-hover:animate-ping transition-colors" />
                </div>

                <div className="md:col-span-3 flex md:justify-end items-center md:items-start md:pr-10 relative mb-1 md:mb-0">
                  <div className="hidden md:flex absolute right-0 top-2.5 w-3 h-3 rounded-full bg-black border border-white/30 items-center justify-center translate-x-1.5 group-hover:border-[var(--t-signal)] group-hover:shadow-[0_0_14px_var(--t-signal)] transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--t-signal)]/60 group-hover:bg-[var(--t-signal)] group-hover:animate-ping transition-colors" />
                  </div>

                  <div className="text-xs md:text-sm font-mono font-bold tracking-widest text-[var(--t-signal)]/80 group-hover:text-[var(--t-signal)] group-hover:drop-shadow-[0_0_6px_var(--t-signal)] transition-all">
                    <Shuffle text={entry.date} shuffleTimes={4} />
                  </div>
                </div>

                <div className="md:col-span-9 md:pl-10 flex flex-col gap-1.5">
                  <h3 className="text-base md:text-lg font-bold text-white/90 group-hover:text-white transition-colors">
                    <ShinyText text={entry.title} speed={5} />
                  </h3>
                  <div className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed max-w-2xl">
                    <ScrollReveal enableBlur={true} baseOpacity={0.2} blurStrength={3}>
                      {entry.description}
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
