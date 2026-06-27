import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageBackButton from "./PageBackButton";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    upper: [
      "Project Engineer at Syntronic, supporting Amazon's RF team.",
      "Interested in agentic ML, ranking models, and interpretable AI products.",
    ],
    lower: "who i am",
    subtitle: "SYNTRONIC → AMAZON RF · UCSC · GPA 3.7 · JUNE 2027",
    chips: ["RF Validation", "Agentic ML", "Ranking", "RAG"],
  },
  {
    upper: [
      "Applied ML systems: human behavior modeling, compatibility",
      "and ranking engines, agent orchestration, and sports/media",
      "intelligence built for real decision workflows.",
    ],
    lower: "what i explore",
    subtitle: "RESEARCH + PRODUCT ML",
    chips: ["Behavior modeling", "Recommendations", "NLP", "Sports ML"],
  },
  {
    upper: [
      "Production pipelines first—feature engineering, training,",
      "evaluation, API surfaces, and interfaces that make model",
      "output legible to users and reviewers.",
    ],
    lower: "how i build",
    subtitle: "FEATURED BUILDS",
    chips: ["LinkUp", "PlotGuard", "NemoPilot"],
  },
  {
    upper: [
      "Agentic orchestration, retrieval-augmented generation,",
      "ranking/recommendation models, interpretable ML, and",
      "sports/media intelligence systems.",
    ],
    lower: "current focus",
    subtitle: "TARGETING ML / AI ENGINEERING ROLES",
    chips: ["Agents", "pgvector RAG", "XGBoost", "XAI", "MV3 NLP"],
  },
];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "who", label: "WHO I AM", handle: "ML Engineer · Syntronic/Amazon RF", href: "mailto:atikiltjonathan@gmail.com", icon: "🎮", barIcon: icon1, bars: 1, newBars: [0], counts: ["3.7"],
    links: ["Applied ML systems", "Interpretable AI products"],
    stats: [
      { tag: "ML", value: "ENG", color: "#9147ff" },
      { tag: "CS", value: "UCSC", color: "#bf94ff" },
    ],
  },
  {
    id: "explore", label: "WHAT I EXPLORE", handle: "Ranking · Agents · XAI", href: "https://www.linkedin.com/in/jatikilt/", icon: "📷", barIcon: icon2, bars: 2, newBars: [0], counts: ["20%", "10K+"],
    links: ["Neuromorphic sports analytics (NCG)", "LLM neuron explanations (AIEA)"],
    stats: [
      { tag: "RANK", value: "ML", color: "#e1306c" },
      { tag: "RAG", value: "SYS", color: "#f77737" },
    ],
  },
  {
    id: "build", label: "HOW I BUILD", handle: "Ship ML Products", href: "mailto:atikiltjonathan@gmail.com", icon: "🎵", barIcon: icon3, bars: 3, newBars: [2], counts: ["839", "MV3", "RAG"],
    links: ["LinkUp · ML pipeline & chemistry", "PlotGuard · NLP spoiler system", "NemoPilot · agentic RAG MVP builder"],
    stats: [
      { tag: "ML", value: "PIPE", color: "#00f2ea" },
      { tag: "APP", value: "SHIP", color: "#ff0050" },
    ],
  },
  {
    id: "focus", label: "CURRENT FOCUS", handle: "Agents · RAG · Ranking", href: "https://www.linkedin.com/in/jatikilt/", icon: "🎮", barIcon: icon1, bars: 4, newBars: [3], counts: ["RAG", "XAI"],
    links: ["Agentic orchestration", "Retrieval + reranking", "Recommendation models"],
    stats: [
      { tag: "NOW", value: "ML", color: "#9147ff" },
      { tag: "GOAL", value: "AI", color: "#bf94ff" },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  const selectBar = useCallback((index) => {
    setActive(index);
    setRevealed(true);
  }, []);

  const goBack = useCallback(() => {
    if (revealed) setRevealed(false);
    else navigate("/");
  }, [revealed, navigate]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        setActive((i) => Math.max(0, i - 1));
        return;
      }
      if (e.key === "ArrowDown") {
        setActive((i) => Math.min(ITEMS.length - 1, i + 1));
        return;
      }
      if (e.key === "ArrowRight") {
        if (revealed) setActive((i) => Math.min(ITEMS.length - 1, i + 1));
        else selectBar(active);
        return;
      }
      if (e.key === "ArrowLeft") {
        if (revealed && active > 0) setActive((i) => i - 1);
        else goBack();
        return;
      }
      if (e.key === "Enter") selectBar(active);
      if (e.key === "Escape" || e.key === "Backspace") goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goBack, revealed, selectBar]);

  return (
    <div id="menu-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300&display=swap');

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 50;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
        }
        .sc-root.revealed {
          z-index: 5;
          pointer-events: none;
        }
        .sc-root.revealed .sc-bar-outer {
          opacity: 0;
          transform: translateX(-120%);
          pointer-events: none;
          transition:
            opacity 0.28s ease,
            transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-dim {
          position: absolute;
          inset: 0;
          z-index: 12;
          background: rgba(40, 45, 54, 0.68);
          pointer-events: none;
          animation: sc-dim-in 0.32s ease-out;
        }

        @keyframes sc-dim-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes sc-reveal-bar-in {
          0% {
            opacity: 0;
            transform: translateX(-120px) rotate(-20deg) scaleX(0.72);
          }
          60% {
            opacity: 0.96;
            transform: translateX(18px) rotate(-20deg) scaleX(1.03);
          }
          100% {
            opacity: 0.92;
            transform: translateX(0) rotate(-20deg) scaleX(1);
          }
        }

        @keyframes sc-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(78px) skewX(-8deg) scale(0.94);
            filter: blur(8px);
          }
          55% {
            opacity: 0.9;
            transform: translateX(-8px) skewX(-8deg) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 0.96;
            transform: translateX(0) skewX(-8deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        .sc-main-portrait-shell {
          position: absolute;
          top: 0;
          right: -3vw;
          z-index: 13;
          pointer-events: none;
          width: 43vw;
          height: 100vh;
          overflow: hidden;
          opacity: 0;
          transform: translateX(24px) skewX(-8deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sc-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-8deg) scale(1);
          animation: sc-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-reveal-panel {
          position: absolute;
          top: 44vh;
          left: max(-2vw, calc(-1 * env(safe-area-inset-left)));
          width: min(88vw, calc(100vw - max(16px, env(safe-area-inset-left)) - 8px));
          max-width: calc(100vw - max(16px, env(safe-area-inset-left)) - 8px);
          height: 60vh;
          z-index: 12;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(215, 13, 44, 0.82),
            28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 0%;
          width: 100%;
          height: 40%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff;
          text-align: center;
          overflow-x: hidden;
          overflow-y: auto;
          box-sizing: border-box;
          padding: 8px 0;
        }
        .sc-reveal-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 2px;
          color: #8df6ff;
          margin-bottom: 4px;
          overflow-wrap: anywhere;
          word-break: break-word;
          max-width: 100%;
          padding: 0 12px;
          text-align: center;
        }
        .sc-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 20px;
          letter-spacing: 0.5px;
          line-height: 1.15;
          overflow-wrap: anywhere;
          word-break: break-word;
          max-width: 100%;
          padding: 0 12px;
        }
        .sc-reveal-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px 0;
          max-width: 100%;
        }
        .sc-reveal-chip {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: 1.2px;
          padding: 3px 8px;
          border: 1px solid rgba(141, 246, 255, 0.45);
          color: rgba(255, 255, 255, 0.88);
          background: rgba(0, 0, 0, 0.35);
          clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
        }
        .sc-reveal-lower-bar {
          position: absolute;
          top: 58%;
          right: 0;
          width: 48%;
          height: 20%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 22px;
          letter-spacing: 0.4px;
          text-transform: lowercase;
          padding-left: 22px;
          padding-right: 12px;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        @media (max-width: 520px) {
          .sc-reveal-upper-line { font-size: clamp(13px, 3.8vw, 20px); }
          .sc-reveal-lower-bar { font-size: clamp(13px, 4.2vw, 22px); }
          .sc-label { font-size: clamp(16px, 4.2vw, 28px); letter-spacing: 1px; }
          .sc-bar-outer:nth-child(2) .sc-label {
            font-size: clamp(13px, 3.6vw, 22px);
            letter-spacing: 0.5px;
          }
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
          transform-origin: top right;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: min(45vw, calc(100vw - max(16px, env(safe-area-inset-left)) - 12px));
          max-width: calc(100vw - max(16px, env(safe-area-inset-left)) - 12px);
          height: 64px;
          transition:
            height 0.28s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.25s ease,
            transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.25s ease;
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          opacity: 1;
          transition:
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.28s ease;
          cursor: pointer;
          pointer-events: auto;
          display: block;
          border: none;
          background: none;
          padding: 5px 0;
          margin: 0;
          font: inherit;
          color: inherit;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }
        .sc-bar-outer:focus-visible {
          outline: 2px solid rgba(133, 244, 255, 0.75);
          outline-offset: 3px;
        }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }
        .sc-bar-outer:nth-child(4) { transition-delay: 240ms; }

        /* Selected bar — full highlight (click or keyboard, not hover) */
        .sc-bar-outer.active .sc-bar {
          height: 90px;
          transform: translateX(10px);
          box-shadow:
            0 10px 28px rgba(0, 0, 0, 0.72),
            0 0 32px rgba(196, 0, 26, 0.42);
          filter: brightness(1.08);
        }
        .sc-bar-outer.active .sc-bar-red {
          height: 90px;
          opacity: 1;
        }

        /* Keyboard-selected before reveal — subtle cue only */
        .sc-bar-outer.selected:not(.active) .sc-bar {
          transform: translateX(4px);
          filter: brightness(1.04);
        }
        .sc-bar-outer.selected:not(.active) .sc-label {
          color: rgba(255, 255, 255, 0.95);
        }

        /* Light hover hint only — does not select or reveal */
        .sc-bar-outer:hover:not(.active):not(.selected) .sc-bar {
          transform: translateX(2px);
          filter: brightness(1.02);
        }

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 5px; left: 0;
          width: min(45vw, calc(100vw - max(16px, env(safe-area-inset-left)) - 12px));
          max-width: calc(100vw - max(16px, env(safe-area-inset-left)) - 12px);
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.22s ease, height 0.28s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
          pointer-events: none;
        }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
          min-width: 0;
          overflow: hidden;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: 78px;
          min-width: 0;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          max-width: 100%;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease, transform 0.25s ease;
          user-select: none;
          min-width: 0;
          max-width: 100%;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: center;
        }
        .sc-bar-outer.active .sc-label {
          color: #111111;
          transform: scale(1.02);
        }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 14;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
      `}</style>

      <nav className={`sc-root${revealed ? " revealed" : ""}`} aria-label="About sections">
        {ITEMS.map((item, i) => (
          <button
            type="button"
            key={item.id}
            className={`sc-bar-outer${revealed && active === i ? " active" : ""}${!revealed && active === i ? " selected" : ""}${mounted ? " mounted" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              selectBar(i);
            }}
            aria-pressed={active === i && revealed}
            aria-label={`${item.label}. Click or press Enter to reveal.`}
          >
            <div className="sc-bar-red" aria-hidden="true" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i % CHARS.length]} alt="" />
              <div className="sc-bar-fill" aria-hidden="true" />
              <div className="sc-bar-shade" aria-hidden="true" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {revealed && <div key={`dim-${active}`} className="sc-dim" />}
      {revealed && (
        <div key={`panel-${active}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].subtitle && (
              <div className="sc-reveal-subtitle">{REVEAL_CONTENT[active].subtitle}</div>
            )}
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
            {REVEAL_CONTENT[active].chips && (
              <div className="sc-reveal-chips">
                {REVEAL_CONTENT[active].chips.map((chip) => (
                  <span className="sc-reveal-chip" key={chip}>{chip}</span>
                ))}
              </div>
            )}
          </div>
          <div className="sc-reveal-lower-bar">{REVEAL_CONTENT[active].lower}</div>
        </div>
      )}
      {revealed && (
        <div key={`nav-${active}`} className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}
      {revealed && (
        <div key={`portrait-${active}`} className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img
            className="sc-main-portrait"
            src={MAIN_IMAGES[active % MAIN_IMAGES.length]}
            alt=""
          />
        </div>
      )}

      <PageBackButton
        mounted={mounted}
        backdrop={false}
        label={revealed ? "ABOUT ME" : "MAIN MENU"}
        onBack={goBack}
        hints={revealed ? [["↑↓ / ←→", "SWITCH"], ["ESC", "BACK"]] : [
          ["↑↓", "SELECT"],
          ["→ / ↵", "REVEAL"],
        ]}
      />
    </div>
  );
}
