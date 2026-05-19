import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "education", badge: "I", title: "EDUCATION", subtitle: "UCSC / CS + APPLIED MATH", rank: 4 },
  { id: "skills", badge: "II", title: "SKILLS", subtitle: "ML / SYSTEMS / FULL STACK", rank: 5 },
  { id: "projects", badge: "III", title: "PROJECTS", subtitle: "LINKUP / PLOTGUARD / NEMOPILOT", rank: 5 },
  { id: "experience", badge: "IV", title: "EXPERIENCE", subtitle: "RESEARCH / ML PIPELINES", rank: 4 },
];

const RESUME_SECTIONS = [
  {
    index: "01",
    title: "EDUCATION LOG",
    progress: "3.84",
    rows: [
      { index: "01", title: "UC Santa Cruz", status: "B.S./M.S." },
      { index: "02", title: "Computer Science", status: "June 2027" },
      { index: "03", title: "Applied Mathematics", status: "Minor" },
      { index: "04", title: "GPA", status: "3.84/4.0" },
    ],
    bullets: [
      "Coursework: Machine Learning, Data Structures and Algorithms, Computer Systems Design, Computer Architecture.",
      "Math foundation: Linear Algebra, Probability and Statistics, Discrete Math, Dynamical Systems, Computational Methods.",
      "Focused on ML systems, data processing, full-stack product work, and research-ready engineering.",
    ],
  },
  {
    index: "02",
    title: "SKILL GRID",
    progress: "LV 5",
    rows: [
      { index: "01", title: "Python / C / C++ / Java / JavaScript / SQL / Bash", status: "Languages" },
      { index: "02", title: "PyTorch / TensorFlow / scikit-learn / XGBoost", status: "ML" },
      { index: "03", title: "Docker / Kubernetes / Linux / GitHub / CI/CD", status: "Systems" },
      { index: "04", title: "FastAPI / Next.js / REST APIs / Supabase / ETL", status: "Stack" },
    ],
    bullets: [
      "Builds ML pipelines, API services, and data systems with reproducible experiment structure.",
      "Comfortable moving between model work, backend services, and product-facing interfaces.",
      "Works with spiking neural networks, NLP workflows, pgvector retrieval, and applied analytics.",
    ],
  },
  {
    index: "03",
    title: "PROJECT LOG",
    progress: "3/3",
    rows: [
      { index: "01", title: "LinkUp - ML Soccer Chemistry Platform", status: "Feb 2025" },
      { index: "02", title: "PlotGuard - Personalized Spoiler Detection", status: "May 2026" },
      { index: "03", title: "NemoPilot - Agentic RAG MVP Builder", status: "May 2026" },
    ],
    bullets: [
      "LinkUp models player style, tactical roles, chemistry fit, and coach-team compatibility across 839 Premier League players.",
      "PlotGuard uses local watch progress, NLP risk scoring, DOM scanning, and feedback labels for personalized spoiler filtering.",
      "NemoPilot combines Nemotron, Supabase pgvector, embeddings, reranking, and agent planning into grounded MVP generation.",
    ],
  },
  {
    index: "04",
    title: "RESEARCH LOG",
    progress: "2/2",
    rows: [
      { index: "01", title: "Sports Analytics - UCSC Neuromorphic Computing Lab", status: "2024-25" },
      { index: "02", title: "Neuron Explanations for LLMs - UCSC AIEA Lab", status: "2025" },
    ],
    bullets: [
      "Improved Python spiking neural network training workflow runtime by 20% through modular refactoring and batching.",
      "Built scalable player-tracking data workflows for feature extraction, filtering, temporal sequences, and reproducible logs.",
      "Deployed Docker/Kubernetes LLM interpretability experiments across 10k+ NLP samples for neuron activation analysis.",
    ],
  },
];

export default function ResumePage({ src, initialActive = 1 }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(initialActive);
  const [mounted, setMounted] = useState(false);
  const activeSection = RESUME_SECTIONS[active];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
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
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
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
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
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
          margin-top: 18px;
          max-width: 100%;
          overflow: hidden;
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
            padding: 16px 14px;
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

        <div className="resume-detail-panel">
          <div className="resume-detail-top">
            <div className="resume-detail-top-index">{activeSection.index}</div>
            <div className="resume-detail-top-title">{activeSection.title}</div>
            <div className="resume-detail-top-progress">{activeSection.progress}</div>
          </div>

          <div className="resume-detail-list">
            {activeSection.rows.map((row) => (
              <div className="resume-detail-row" key={row.index}>
                <div className="resume-detail-row-index">{row.index}</div>
                <div className="resume-detail-row-title">{row.title}</div>
                <div className="resume-detail-status">{row.status}</div>
              </div>
            ))}
          </div>

          <div className="resume-detail-bottom">
            <div className="resume-detail-bottom-title">DETAILS</div>
            <div className="resume-detail-bullets">
              {activeSection.bullets.map((bullet) => (
                <div className="resume-detail-bullet" key={bullet}>- {bullet}</div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
