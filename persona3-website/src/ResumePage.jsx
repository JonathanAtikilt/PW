import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackButton from "./PageBackButton";

const ITEMS = [
  { id: "education", badge: "I", title: "EDUCATION", subtitle: "UCSC CS + APPLIED MATH", rank: 4 },
  { id: "skills", badge: "II", title: "SKILLS", subtitle: "ML · AGENTS · SYSTEMS", rank: 5 },
  { id: "projects", badge: "III", title: "PROJECTS", subtitle: "LINKUP / PLOTGUARD / NEMOPILOT", rank: 5 },
  { id: "experience", badge: "IV", title: "EXPERIENCE", subtitle: "SYNTRONIC / AMAZON · LABS", rank: 4 },
];

const RESUME_SECTIONS = [
  {
    index: "01",
    title: "EDUCATION LOG",
    progress: "3.7",
    subtitle: "FOUNDATION FOR ML ENGINEERING",
    chips: ["ML", "Systems", "Applied Math", "Research-ready"],
    rows: [
      { index: "01", title: "UC Santa Cruz — Computer Science", status: "B.S./M.S." },
      { index: "02", title: "Applied Mathematics (minor)", status: "STEM" },
      { index: "03", title: "Expected graduation", status: "June 2027" },
      { index: "04", title: "GPA", status: "3.7/4.0" },
      {
        index: "05",
        title: "Request resume PDF",
        status: "EMAIL",
        href: "mailto:atikiltjonathan@gmail.com?subject=Resume%20Request",
      },
    ],
    bullets: [
      "Coursework: Machine Learning, Algorithms, Computer Systems Design, Architecture, and advanced math for modeling.",
      "Trained to move from experiment design → training → evaluation → deployable API/product surfaces.",
      "Seeking ML/AI engineering internships where ranking systems, agents, and interpretability meet production constraints.",
    ],
  },
  {
    index: "02",
    title: "SKILL GRID",
    progress: "STACK",
    subtitle: "FEATURED TECHNOLOGIES",
    chips: ["PyTorch", "XGBoost", "FastAPI", "Next.js", "pgvector", "Docker", "K8s"],
    rows: [
      { index: "01", title: "Languages: Python, C/C++, Java, JS/TS, SQL, Bash", status: "CORE" },
      { index: "02", title: "ML: PyTorch, TensorFlow, scikit-learn, XGBoost, PCA, clustering", status: "MODEL" },
      { index: "03", title: "AI systems: RAG, embeddings, reranking, agent orchestration", status: "GENAI" },
      { index: "04", title: "Product stack: FastAPI, Next.js, Supabase, REST, ETL, Chrome MV3", status: "SHIP" },
    ],
    bullets: [
      "Designs reproducible ML pipelines with clear feature engineering, training, evaluation, and serving boundaries.",
      "Builds agentic and retrieval systems with scoped planning, vector search, and reranked context injection.",
      "Ships full-stack interfaces that expose model outputs in recruiter- and user-friendly form.",
    ],
  },
  {
    index: "03",
    title: "PROJECT LOG",
    progress: "3/3",
    subtitle: "APPLIED ML / AI PRODUCTS",
    chips: ["ML Pipeline", "NLP System", "Agentic RAG"],
    rows: [
      { index: "01", title: "LinkUp — ranking & chemistry ML", status: "ML PIPE" },
      { index: "02", title: "PlotGuard — personalized spoiler defense", status: "NLP SYS" },
      { index: "03", title: "NemoPilot — agentic RAG MVP builder", status: "RAG" },
      { index: "04", title: "Code & demos on GitHub", status: "REPOS", href: "https://github.com/JonathanAtikilt?tab=repositories" },
    ],
    blocks: [
      {
        title: "LINKUP · ML PIPELINE",
        bullets: [
          "Problem: estimate player style, tactical fit, chemistry, and coach–team compatibility from noisy performance data.",
          "Data/scale: 839 Premier League players · 18 normalized per-90 features · PCA embeddings · MiniBatchKMeans archetypes.",
          "Models: XGBoost archetype classification + compatibility/ranking layer for human-behavior-style matching.",
          "Pipeline: ingest → normalize per-90 stats → embed → cluster roles → score chemistry/coach fit → serve rankings.",
          "Why it matters: turns tabular sports intelligence into an interpretable recommendation engine for squad decisions.",
        ],
      },
      {
        title: "PLOTGUARD · NLP SYSTEM",
        bullets: [
          "Problem: spoiler risk is personal—depends on what you've actually watched, not generic keyword blocklists.",
          "Approach: Chrome MV3 extension with local watch-progress graph, NLP spoiler classification, entity matching, weighted risk scoring.",
          "System: real-time DOM scanning + user feedback labels to personalize blocking thresholds per show/page.",
          "Stack: MV3 service worker, on-device progress store, NLP scoring module, DOM heuristics, lightweight UI controls.",
          "Why it matters: demonstrates applied NLP + systems design on live web content with privacy-first local state.",
        ],
      },
      {
        title: "NEMOPILOT · AGENTIC RAG",
        bullets: [
          "Problem: MVP specs need grounded retrieval and scoped planning—not unconstrained codegen.",
          "Architecture: Next.js UI · FastAPI services · Supabase pgvector · NVIDIA Nemotron · OpenClaw orchestration.",
          "Pipeline: chunk/embed docs → vector retrieve → rerank → agent plan → scoped MVP artifact generation.",
          "Evaluation: relevance of retrieved context, plan adherence, and end-to-end latency across RAG stages.",
          "Why it matters: production-shaped agentic stack aligned with ML/AI internship expectations (RAG + orchestration).",
        ],
      },
    ],
  },
  {
    index: "04",
    title: "EXPERIENCE LOG",
    progress: "3/3",
    subtitle: "CONTRACT · RESEARCH · RF VALIDATION",
    chips: ["RF Testing", "LLM XAI", "SNN", "Docker/K8s"],
    rows: [
      { index: "01", title: "Project Engineer — Syntronic → Amazon RF", status: "2026" },
      { index: "02", title: "Neuromorphic Computing Group (UCSC)", status: "2024-25" },
      { index: "03", title: "AIEA Lab — LLM interpretability", status: "2025" },
      { index: "04", title: "NCG lab site", status: "LINK", href: "https://ncg.ucsc.edu/" },
      { index: "05", title: "AIEA lab site", status: "LINK", href: "https://aiea-lab.github.io/" },
    ],
    bullets: [
      "Syntronic contract (May 2026–Present): RF validation and hardware testing for Amazon's RF team.",
      "Log measurement data, document anomalies, and support cross-functional engineering handoffs.",
      "NCG: sports analytics with spiking neural networks—20% faster Python SNN training via modular batching/refactors.",
      "Built player-tracking feature pipelines (extraction, temporal sequences, reproducible experiment logs).",
      "AIEA: Docker/Kubernetes LLM interpretability runs across 10k+ NLP samples for neuron activation analysis.",
      "Supported compositional neuron explanation workflows for mapping LLM activations to interpretable concepts.",
    ],
  },
];

export default function ResumePage({ src, initialActive = 1 }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(initialActive);
  const [mounted, setMounted] = useState(false);
  const detailScrollRef = useRef(null);
  const activeSection = RESUME_SECTIONS[active];

  useEffect(() => {
    if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;
  }, [active]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate("/");
      if (e.key === "Escape" || e.key === "Backspace") navigate("/");
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>

      <PageBackButton mounted={mounted} hints={[["↑↓", "SELECT"]]} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
          max-width: calc(100% - 12px);
          overflow-wrap: anywhere;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          min-width: 0;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
          min-width: 0;
          flex: 1;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: auto;
          min-height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 4px 18px;
          transition: background 0.22s ease;
          min-width: 0;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1.1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
          max-width: 100%;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          max-width: calc(100% - 4.5vw);
          height: min(78vh, calc(100dvh - 12vh));
          max-height: min(78vh, calc(100dvh - 12vh));
          z-index: 12;
          padding: 0;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
          pointer-events: all;
        }
        .resume-detail-header {
          flex-shrink: 0;
          padding: 22px 24px 12px;
          position: relative;
          z-index: 2;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.98) 0%, rgba(12, 22, 88, 0.95) 100%);
          box-shadow: 0 8px 16px rgba(5, 10, 45, 0.45);
        }
        .resume-detail-scroll {
          flex: 1 1 auto;
          min-height: 0;
          overflow-x: hidden;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          padding: 8px 24px 28px;
          pointer-events: auto;
          touch-action: pan-y;
        }
        .resume-detail-scroll-hint {
          flex-shrink: 0;
          padding: 6px 24px 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-align: center;
          color: rgba(141, 246, 255, 0.45);
          pointer-events: none;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 64px minmax(0, 1fr) 74px;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 34px;
          line-height: 0.92;
          letter-spacing: 1px;
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 2px;
          line-height: 1;
          text-align: right;
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
          max-width: 100%;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr) minmax(0, max-content);
          align-items: center;
          gap: 10px;
          min-height: 56px;
          padding: 0 12px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
          max-width: 100%;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 18px;
          line-height: 1.08;
          color: #f2fcff;
          overflow-wrap: anywhere;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 6px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          text-align: center;
          white-space: normal;
          overflow-wrap: anywhere;
          max-width: 100%;
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 16px;
          line-height: 1.18;
          color: #edfaff;
          overflow-wrap: anywhere;
        }

        .resume-detail-subtitle {
          position: relative;
          margin: 12px 0 4px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 2px;
          color: #91f5ff;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .resume-detail-chips {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }
        .resume-detail-chip {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 1.1px;
          padding: 4px 8px;
          color: #041238;
          background: #8df6ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
        }
        a.resume-detail-row-link {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        a.resume-detail-row-link:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        a.resume-detail-row-link:hover .resume-detail-status {
          background: #d3fdff;
        }

        .sc-footer {
          position: fixed;
          bottom: 24px;
          right: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
          pointer-events: none;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 3px;
          padding: 1px 6px;
          font-size: 11px;
        }

        @media (max-width: 768px) {
          .resume-stack {
            width: min(47vw, calc(100% - 5.6vw));
          }
          .resume-detail-top {
            grid-template-columns: 52px minmax(0, 1fr) minmax(0, max-content);
          }
        }

        @media (max-width: 520px) {
          .resume-title { font-size: clamp(34px, 10vw, 56px); }
          .resume-rank-number { font-size: clamp(44px, 12vw, 70px); }
          .resume-subtitle { font-size: clamp(20px, 5.5vw, 28px); }
          .resume-detail-panel {
            width: min(58vw, calc(100vw - 6vw));
            max-width: calc(100vw - 6vw);
          }
          .resume-detail-header {
            padding: 16px 14px 10px;
          }
          .resume-detail-scroll {
            padding: 6px 14px 20px;
          }
          .resume-detail-top {
            grid-template-columns: 40px minmax(0, 1fr) minmax(0, max-content);
            padding: 0 10px;
          }
          .resume-detail-top-title { font-size: clamp(22px, 6vw, 34px); }
          .resume-detail-top-progress { font-size: clamp(22px, 5.5vw, 32px); }
          .resume-detail-row-title { font-size: clamp(13px, 3.6vw, 18px); }
          .resume-detail-status { font-size: clamp(12px, 3.2vw, 16px); }
          .resume-detail-bullet { font-size: clamp(13px, 3.5vw, 16px); }
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="resume-detail-panel" key={activeSection.index}>
          <div className="resume-detail-header">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">{activeSection.index}</div>
              <div className="resume-detail-top-title">{activeSection.title}</div>
              <div className="resume-detail-top-progress">{activeSection.progress}</div>
            </div>

            {activeSection.subtitle && (
              <div className="resume-detail-subtitle">{activeSection.subtitle}</div>
            )}
            {activeSection.chips && (
              <div className="resume-detail-chips">
                {activeSection.chips.map((chip) => (
                  <span className="resume-detail-chip" key={chip}>{chip}</span>
                ))}
              </div>
            )}
          </div>

          <div className="resume-detail-scroll" ref={detailScrollRef}>
          <div className="resume-detail-list">
            {activeSection.rows.map((row) => {
              const inner = (
                <>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </>
              );
              if (row.href) {
                return (
                  <a
                    key={row.index}
                    className="resume-detail-row resume-detail-row-link"
                    href={row.href}
                    target={row.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={row.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  >
                    {inner}
                  </a>
                );
              }
              return (
                <div className="resume-detail-row" key={row.index}>
                  {inner}
                </div>
              );
            })}
          </div>

          {activeSection.blocks ? (
            activeSection.blocks.map((block) => (
              <div className="resume-detail-bottom" key={block.title}>
                <div className="resume-detail-bottom-title">{block.title}</div>
                <div className="resume-detail-bullets">
                  {block.bullets.map((bullet) => (
                    <div className="resume-detail-bullet" key={bullet}>- {bullet}</div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DETAILS</div>
              <div className="resume-detail-bullets">
                {activeSection.bullets.map((bullet) => (
                  <div className="resume-detail-bullet" key={bullet}>- {bullet}</div>
                ))}
              </div>
            </div>
          )}
          </div>
          <div className="resume-detail-scroll-hint" aria-hidden="true">SCROLL FOR MORE</div>
        </div>

      </div>

    </div>
  );
}
