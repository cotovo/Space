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
import BlurText from "./reactbits/BlurText";
import SpotlightCard from "./reactbits/SpotlightCard";

const EASE = [0.83, 0, 0.17, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number; key?: string | number }) {
  const reduceMotion = useReducedMotion() === true;
  return (
    <motion.section
      initial={reduceMotion ? false : { y: 20, opacity: 0 }}
      whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function SiteSections() {
  return (
    <section id="content" className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 pt-16 md:pt-24 pb-32 flex flex-col gap-24 md:gap-32">
        
        {/* About Section */}
        <Reveal>
          <SpotlightCard className="grid grid-cols-1 md:grid-cols-12 border border-white/10 bg-white/[0.02] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md p-0" spotlightColor="rgba(56, 189, 248, 0.12)">
            
            {/* Left Col: Header & Intro Statement */}
            <div className="md:col-span-7 lg:col-span-8 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center gap-6 bg-white/[0.01]">
              <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-widest text-[var(--t-signal)] uppercase">
                <Compass className="w-4 h-4 text-[var(--t-signal)]" />
                <span>ABOUT</span>
              </div>
              <BlurText
                text="我是 kerntau，一名信息安全专业学生，也在持续实践前端与全栈工程。"
                delay={80}
                animateBy="words"
                className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-relaxed tracking-wide drop-shadow-md"
              />
            </div>

            {/* Right Col: Status Stack */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col divide-y divide-white/10">
              {/* Focus */}
              <div className="flex-1 p-6 md:p-8 flex items-center gap-4 hover:bg-[var(--t-signal)]/10 transition-colors cursor-default">
                  <Shield className="w-5 h-5 text-[var(--t-signal)] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-0.5">Focus</span>
                    <span className="text-sm font-bold text-white">Security / Web</span>
                  </div>
              </div>
              {/* Base */}
              <div className="flex-1 p-6 md:p-8 flex items-center gap-4 hover:bg-[var(--t-signal)]/10 transition-colors cursor-default">
                  <MapPin className="w-5 h-5 text-[var(--t-signal)] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-0.5">Base</span>
                    <span className="text-sm font-bold text-white">湖北 · 十堰</span>
                  </div>
              </div>
              {/* Status */}
              <div className="flex-1 p-6 md:p-8 flex items-center gap-4 hover:bg-[var(--t-signal)]/10 transition-colors cursor-default">
                  <Activity className="w-5 h-5 text-[var(--t-signal)] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-0.5">Status</span>
                    <span className="text-sm font-bold text-[var(--t-signal)] flex items-center gap-2">
                      <span className="shrink-0 w-5 h-5 inline-flex items-center justify-center overflow-hidden">
                        <ThinkingOrb size={20} state="shaping" theme="dark" />
                      </span>
                      Building
                    </span>
                  </div>
              </div>
            </div>

          </SpotlightCard>
        </Reveal>

        {/* Projects Section */}
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-widest text-[var(--t-muted)] uppercase mb-8 px-4 py-2 w-fit rounded-full border border-white/10 bg-black/40">
            <Braces className="w-3.5 h-3.5 text-[var(--t-signal)]" />
            <span>PROJECTS</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {PROJECTS.map((project, index) => (
              <SpotlightCard
                key={project.name}
                spotlightColor="rgba(255, 255, 255, 0.1)"
                className="p-0 border border-white/10 bg-white/[0.02]"
              >
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 p-6 md:p-8 transition-colors duration-300 rounded-2xl"
                >
                  <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center gap-2">
                    <span className="text-sm font-mono font-bold text-white/30 group-hover:text-[var(--t-signal)] transition-colors">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                      {project.stack}
                    </span>
                  </div>
                  
                  <div className="md:col-span-3 flex items-center">
                    <h3 className="text-xl md:text-2xl font-black text-white/90 group-hover:text-white uppercase tracking-tight">
                      {project.name}
                    </h3>
                  </div>

                  <div className="md:col-span-6 flex items-center justify-between gap-6">
                    <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors leading-relaxed">
                      {project.description}
                    </p>
                    <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </a>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>

        {/* Log Section */}
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-widest text-[var(--t-muted)] uppercase mb-10 px-4 py-2 w-fit rounded-full border border-white/10 bg-black/40">
            <History className="w-3.5 h-3.5 text-[var(--t-signal)]" />
            <span>LOG</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 relative">
            {/* Desktop Timeline Line */}
            <div className="hidden md:block absolute left-[25%] top-4 bottom-4 w-px bg-white/10 -ml-px pointer-events-none" />
            
            {TIMELINE.map((entry, index) => (
              <div key={`${entry.date}-${entry.title}`} className="col-span-12 grid grid-cols-1 md:grid-cols-12 group hover:bg-white/[0.04] transition-colors rounded-2xl p-4 md:p-6 -mx-2 md:-mx-6">
                
                {/* Date & Node (Left side of timeline) */}
                <div className="md:col-span-3 flex md:justify-end items-center md:items-start md:pr-12 relative mb-2 md:mb-0">
                  {/* Node */}
                  <div className="hidden md:flex absolute right-0 top-1 w-3 h-3 rounded-full bg-black border border-white/30 items-center justify-center translate-x-1.5 group-hover:border-[var(--t-signal)] group-hover:shadow-[0_0_12px_var(--t-signal)] transition-all">
                    <div className="w-1 h-1 rounded-full bg-[var(--t-signal)] group-hover:bg-[var(--t-signal)] transition-colors" />
                  </div>
                  
                  <time className="text-sm font-mono font-bold tracking-widest text-[var(--t-signal)]/80 group-hover:text-[var(--t-signal)] transition-colors">
                    {entry.date}
                  </time>
                </div>

                {/* Content (Right side of timeline) */}
                <div className="md:col-span-9 md:pl-12 flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">{entry.title}</h3>
                  <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed max-w-2xl">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </section>
  );
}
