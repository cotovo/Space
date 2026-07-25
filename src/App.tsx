import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe,
  Mail,
  Menu,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  SiBilibili,
  SiFacebook,
  SiGithub,
  SiGmail,
  SiQq,
  SiTelegram,
  SiWechat,
  SiX,
} from "@icons-pack/react-simple-icons";
import { FeishuIcon, OutlookIcon } from "./components/BrandLogos";
import PetCompanion, { type PetReaction } from "./components/PetCompanion";
import SignatureBackdrop from "./components/SignatureBackdrop";
import SiteSections from "./components/SiteSections";
import PureVibrantIconStream from "./components/PureVibrantIconStream";
import { DESTINATIONS } from "./data/site";
import ClickSpark from "./components/reactbits/ClickSpark";
import CountUp from "./components/reactbits/CountUp";
import Magnet from "./components/reactbits/Magnet";
import Particles from "./components/reactbits/Particles";
import PixelSnow from "./components/reactbits/PixelSnow";
import TrueFocus from "./components/reactbits/TrueFocus";
import RotatingText from "./components/reactbits/RotatingText";
import Iridescence from "./components/reactbits/Iridescence";

type ThemeMode = "light" | "dark";

const containerReveal = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL = "kerntau@outlook.com";
const YEAR = new Date().getFullYear();
const SECTION_IDS = ["intro", "about", "projects", "log"];
const NAV_ITEMS = [
  { label: "关于", href: "#about", id: "about" },
  { label: "项目", href: "#projects", id: "projects" },
  { label: "记录", href: "#log", id: "log" },
];
const BANNERS = [
  { prefix: "新域名 ", label: "coox.one", href: "https://coox.one", suffix: " 已上线" },
  { prefix: "知识库现已迁移至 ", label: "kb.cot.wiki", href: "https://kb.cot.wiki", suffix: "" },
];

const heroReveal = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
};

let sharedAudioContext: AudioContext | null = null;

function playWindChime() {
  try {
    const AudioContextConstructor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return;
    if (!sharedAudioContext || sharedAudioContext.state === "closed")
      sharedAudioContext = new AudioContextConstructor();
    if (sharedAudioContext.state === "suspended") void sharedAudioContext.resume();

    const context = sharedAudioContext;
    const now = context.currentTime;
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5];
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, now + index * 0.07);
      gain.gain.linearRampToValueAtTime(0.09 - index * 0.012, now + 0.035 + index * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4 + index * 0.18);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + index * 0.07);
      oscillator.stop(now + 1.6 + index * 0.18);
    });
  } catch {
    // Audio is optional
  }
}

function fallbackCopy(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  return copied;
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

function PreciseUptime() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  useEffect(() => {
    const start = new Date("2025-11-10T00:07:03").getTime();
    let animId: number;

    const update = () => {
      const diff = Math.max(0, Date.now() - start);
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      const milliseconds = Math.floor(diff % 1000);

      setTime({ days, hours, minutes, seconds, milliseconds });
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <span className="font-mono tabular-nums inline-flex items-center gap-1 text-xs">
      <span className="text-white font-bold">{time.days}d</span>
      <span className="text-white/30 font-normal">:</span>
      <span className="text-white font-bold">{String(time.hours).padStart(2, "0")}h</span>
      <span className="text-white/30 font-normal">:</span>
      <span className="text-white font-bold">{String(time.minutes).padStart(2, "0")}m</span>
      <span className="text-white/30 font-normal">:</span>
      <span className="text-white font-bold">{String(time.seconds).padStart(2, "0")}s</span>
      <span className="text-white/30 font-normal">:</span>
      <span className="text-[var(--t-signal)] font-bold min-w-[3.2ch] inline-block text-right drop-shadow-[0_0_6px_var(--t-signal)]">
        {String(time.milliseconds).padStart(3, "0")}ms
      </span>
    </span>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [toast, setToast] = useState<string | null>(null);
  const [reaction, setReaction] = useState<PetReaction | null>(null);
  const [activeQR, setActiveQR] = useState<{ title: string; src: string; color: string; desc: string; icon: ReactNode } | null>(null);
  const [isPlayingBGM, setIsPlayingBGM] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toastTimer = useRef<number | null>(null);
  const activeSection = useActiveSection();
  const reduceMotion = useReducedMotion() === true;

  const toggleBGM = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch((err) => {
        console.warn("BGM play failed:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#07090E" : "#F8FAFC");
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      setTheme(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => () => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    setTheme(next);
    setReaction({ id: Date.now(), type: "theme" });
  };

  const handleCopy = async (textToCopy: string = EMAIL) => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(textToCopy);
      copied = true;
    } catch {
      copied = fallbackCopy(textToCopy);
    }

    setToast(copied ? (textToCopy as any) : "error");
    setReaction({ id: Date.now(), type: copied ? "copied" : "error" });
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  };

  const ThemeIcon = theme === "light" ? Moon : Sun;

  return (
    <MotionConfig reducedMotion="user">
      <ClickSpark sparkColor={theme === "dark" ? "#38bdf8" : "#0284c7"} sparkCount={10} duration={400}>
        <main className="site-root" aria-label="kerntau 个人主页">
        <audio
          ref={audioRef}
          src="/bgm.mp3"
          loop
          preload="auto"
          onPlay={() => setIsPlayingBGM(true)}
          onPause={() => setIsPlayingBGM(false)}
        />

        <Iridescence className="fixed inset-0 z-0 opacity-100 pointer-events-none" color={theme === "dark" ? [0.14, 0.55, 0.88] : [0.01, 0.45, 0.75]} speed={0.8} />
        <PixelSnow className="fixed inset-0 z-0 opacity-70 pointer-events-none" pixelSize={2.5} snowflakeCount={75} speed={0.85} color={theme === "dark" ? "#ffffff" : "#38bdf8"} />
        {/* Global Lighter Blur Mask */}
        <div className="fixed inset-0 z-0 bg-black/10 backdrop-blur-md pointer-events-none" />
        <Particles className="fixed inset-0 z-0 pointer-events-none" quantity={35} size={0.55} color={theme === "dark" ? "#ffffff" : "#38bdf8"} />
        
        <a className="skip-link" href="#content">跳到主要内容</a>

        <section 
          id="intro" 
          className="relative z-10 min-h-dvh flex items-center justify-center px-4 md:px-8 py-10 md:py-14"
        >

          <motion.div
            className="hero-content flex flex-col items-center justify-center text-center py-2 md:py-4 z-10 w-full max-w-5xl"
            variants={containerReveal}
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12, delayChildren: reduceMotion ? 0 : 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div variants={heroReveal} className="w-full flex flex-col items-center justify-center z-10 gap-0 relative px-4" style={{ willChange: "transform, opacity" }}>


              {/* Pure Vibrant Brand Icons Horizontal Stream - Placed Above Signature */}
              <motion.div variants={heroReveal} className="w-full z-20 -mb-8 md:-mb-6">
                <PureVibrantIconStream />
              </motion.div>

              <div className="-my-6 md:-my-2 w-full">
                <SignatureBackdrop />
              </div>
              
              <div className="flex items-center gap-2 text-xs md:text-sm font-mono font-semibold text-white/70">
                <span className="tracking-widest uppercase">IDENTITY //</span>
                <RotatingText
                  texts={["SECURITY RESEARCHER", "FULLSTACK DEVELOPER", "CREATIVE ENGINEER"]}
                  mainClassName="px-3 py-1 bg-white/[0.04] text-[var(--t-signal)] font-bold rounded-lg border border-[var(--t-signal)]/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  staggerFrom="last"
                  staggerDuration={0.02}
                  rotationInterval={2800}
                />
              </div>
            </motion.div>

            {/* Standalone Separate Floating Contact Buttons */}
            <motion.div 
              variants={heroReveal} 
              className="flex flex-wrap items-center justify-center gap-2.5 md:gap-4 mt-3 md:mt-8 z-20 max-w-2xl px-4"
            >
              {[
                { id: 'github', label: 'GITHUB', icon: <SiGithub className="w-5 h-5 text-white" />, href: 'https://github.com/kerntau', hoverStyle: "hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_22px_rgba(255,255,255,0.35)]" },
                { id: 'wechat', label: 'WECHAT', icon: <SiWechat className="w-5 h-5 text-[#07C160]" />, qr: { title: "微信 (WeChat)", src: "/wechat.png", color: "#07C160", desc: "扫一扫添加微信好友", icon: <SiWechat className="w-5 h-5 text-white" /> }, hoverStyle: "hover:border-[#07C160]/80 hover:bg-[#07C160]/15 hover:shadow-[0_0_22px_rgba(7,193,96,0.4)]" },
                { id: 'qq', label: 'QQ', icon: <SiQq className="w-5 h-5 text-[#1296DB]" />, qr: { title: "腾讯 QQ", src: "/feishu.png", color: "#1296DB", desc: "扫一扫添加 QQ 好友", icon: <SiQq className="w-5 h-5 text-white" /> }, hoverStyle: "hover:border-[#1296DB]/80 hover:bg-[#1296DB]/15 hover:shadow-[0_0_22px_rgba(18,150,219,0.4)]" },
                { id: 'feishu', label: 'FEISHU', icon: <FeishuIcon className="w-5 h-5 text-[#3370FF]" />, qr: { title: "飞书 (Feishu)", src: "/qq.jpg", color: "#3370FF", desc: "扫一扫添加飞书联系人", icon: <FeishuIcon className="w-5 h-5 text-white" /> }, hoverStyle: "hover:border-[#3370FF]/80 hover:bg-[#3370FF]/15 hover:shadow-[0_0_22px_rgba(51,112,255,0.4)]" },
                { id: 'bilibili', label: 'BILIBILI', icon: <SiBilibili className="w-5 h-5 text-[#FF6699]" />, href: 'https://space.bilibili.com/9655855', hoverStyle: "hover:border-[#FF6699]/80 hover:bg-[#FF6699]/15 hover:shadow-[0_0_22px_rgba(255,102,153,0.4)]" },
                { id: 'twitter', label: 'TWITTER', icon: <SiX className="w-5 h-5 text-white" />, href: 'https://x.com/Kerntau', hoverStyle: "hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_22px_rgba(255,255,255,0.35)]" },
                { id: 'telegram', label: 'TELEGRAM', icon: <SiTelegram className="w-5 h-5 text-[#229ED9]" />, href: 'https://t.me/Kerntau', hoverStyle: "hover:border-[#229ED9]/80 hover:bg-[#229ED9]/15 hover:shadow-[0_0_22px_rgba(34,158,217,0.4)]" },
                { id: 'facebook', label: 'FACEBOOK', icon: <SiFacebook className="w-5 h-5 text-[#1877F2]" />, href: 'https://www.facebook.com/profile.php?id=61584118511046', hoverStyle: "hover:border-[#1877F2]/80 hover:bg-[#1877F2]/15 hover:shadow-[0_0_22px_rgba(24,119,242,0.4)]" },
                { id: 'gmail', label: toast === "kerntau@gmail.com" ? "COPIED" : "GMAIL", icon: toast === "kerntau@gmail.com" ? <Check className="w-5 h-5 text-[#EA4335]" /> : <SiGmail className="w-5 h-5 text-[#EA4335]" />, action: 'copy', email: 'kerntau@gmail.com', hoverStyle: "hover:border-[#EA4335]/80 hover:bg-[#EA4335]/15 hover:shadow-[0_0_22px_rgba(234,67,53,0.4)]" },
                { id: 'outlook', label: toast === "kerntau@outlook.com" ? "COPIED" : "OUTLOOK", icon: toast === "kerntau@outlook.com" ? <Check className="w-5 h-5 text-[#0078D4]" /> : <OutlookIcon className="w-5 h-5 text-[#0078D4]" />, action: 'copy', email: 'kerntau@outlook.com', hoverStyle: "hover:border-[#0078D4]/80 hover:bg-[#0078D4]/15 hover:shadow-[0_0_22px_rgba(0,120,212,0.4)]" },
              ].map(link => {
                const commonClasses = `group relative p-2.5 md:p-3 rounded-full bg-slate-950/40 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_20px_-4px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer ${link.hoverStyle}`;
                const tooltip = (
                  <span className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-mono font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-xl border border-white/10 tracking-wider">
                    {link.label}
                  </span>
                );
                
                let content = null;
                if (link.href) {
                  content = (
                    <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className={commonClasses} aria-label={link.label}>
                      {link.icon}
                      {tooltip}
                    </a>
                  );
                } else if (link.qr) {
                  content = (
                    <button key={link.id} type="button" onClick={() => setActiveQR(link.qr)} className={commonClasses} aria-label={link.label}>
                      {link.icon}
                      {tooltip}
                    </button>
                  );
                } else if (link.action === 'copy') {
                  content = (
                    <button key={link.id} type="button" onClick={() => handleCopy(link.email)} className={commonClasses} aria-label={link.label}>
                      {link.icon}
                      {tooltip}
                    </button>
                  );
                }

                return content ? (
                  <Magnet key={link.id} padding={60} magnetStrength={3}>
                    {content}
                  </Magnet>
                ) : null;
              })}
            </motion.div>

            {/* Minimalist Premium QR Modal */}
            <AnimatePresence>
              {activeQR && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setActiveQR(null)}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 0.94, opacity: 0, y: 12 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.94, opacity: 0, y: 12 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-[320px] p-4 rounded-3xl bg-white/95 backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-white/40 flex flex-col items-center cursor-default select-none overflow-hidden"
                  >
                    {/* Seamless Header */}
                    <div className="w-full flex items-center justify-between pb-3 px-1">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-7 h-7 rounded-xl flex items-center justify-center shadow-sm shrink-0"
                          style={{ backgroundColor: activeQR.color }}
                        >
                          {activeQR.icon}
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 tracking-wider font-mono">{activeQR.title}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveQR(null)}
                        className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
                        aria-label="关闭"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Seamless QR Image Card */}
                    <div className="w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                      <img 
                        src={activeQR.src} 
                        alt={activeQR.title} 
                        className="w-full h-auto object-cover rounded-2xl" 
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Scroll Down Arrow - Positioned at true bottom of section */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-white/70 hover:text-[var(--t-signal)] transition-all cursor-pointer z-30 drop-shadow-[0_0_8px_var(--t-signal)]"
            onClick={() => {
              const el = document.getElementById('about') || document.getElementById('content');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] font-mono tracking-widest uppercase mb-1 font-bold">Scroll</span>
            <ChevronDown className="w-5 h-5 text-[var(--t-signal)]" />
          </motion.div>
        </section>

        <div className="relative z-10 w-full border-t border-white/10">
          <SiteSections />

          <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 py-5 md:py-6 mt-6 md:mt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
            {/* Left: Copyright & Brand Tag */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--t-signal)] shadow-[0_0_8px_var(--t-signal)] shrink-0" />
              <span className="font-bold text-white">© {YEAR} KERNTAU</span>
              <span className="text-white/20">/</span>
              <span className="text-white/40 hidden sm:inline">KEEP BUILDING</span>
            </div>

            {/* Center: Live Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>

            {/* Right: Precise Millisecond Uptime & Back to Top */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] shadow-inner text-white/70 backdrop-blur-md">
                <span className="text-white/40 text-[11px]">RUNNING //</span>
                <PreciseUptime />
              </div>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-[var(--t-signal)]/60 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] text-white text-xs font-mono font-bold transition-all duration-300 shadow-sm cursor-pointer shrink-0"
                aria-label="返回顶部"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5 text-[var(--t-signal)] group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_6px_var(--t-signal)] transition-all" />
              </button>
            </div>
          </footer>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              className="toast"
              role={toast === "error" ? "alert" : "status"}
              aria-live={toast === "error" ? "assertive" : "polite"}
              initial={{ opacity: 0, y: 16, x: "-50%", scale: 0.92 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: -10, x: "-50%", scale: 0.95 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              {toast === "error" ? "复制失败" : `${toast} 已复制到剪贴板`}
            </motion.div>
          )}
        </AnimatePresence>
        
        <PetCompanion 
          activeSection={activeSection} 
          reaction={reaction} 
          isPlayingBGM={isPlayingBGM}
          onToggleBGM={toggleBGM}
        />
      </main>
      </ClickSpark>
    </MotionConfig>
  );
}
