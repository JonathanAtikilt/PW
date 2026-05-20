import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackButton from "./PageBackButton";

const LABS = [
  {
    id: "aiea",
    badge: "I",
    title: "AIEA LAB",
    subtitle: "LLM INTERPRETABILITY / XAI",
    rank: 5,
    url: "https://aiea-lab.github.io/",
  },
  {
    id: "ncg",
    badge: "II",
    title: "NCG LAB",
    subtitle: "NEUROMORPHIC / SPORTS ML",
    rank: 5,
    url: "https://ncg.ucsc.edu/",
  },
];

const EXPERIENCE_SECTIONS = [
  {
    index: "01",
    title: "AIEA LAB LOG",
    progress: "2025",
    rows: [
      { index: "01", title: "AI Explainability & Alignment Lab", status: "UCSC" },
      { index: "02", title: "Neuron Explanations for LLMs", status: "ROLE" },
      { index: "03", title: "Leilani H. Gilpin", status: "PI" },
      { index: "04", title: "aiea-lab.github.io", status: "LINK", href: "https://aiea-lab.github.io/" },
    ],
    knownFor: [
      "UCSC lab focused on explainable, trustworthy AI — neuro-symbolic methods (NeSy Law), XAI for mental health and LLM behavior, and compositional neuron explanations.",
      "Research spans legal AI, hallucination analysis, explainable autograding, and open-vocabulary compositional explanations for neuron alignment.",
      "Publishes work on guaranteed optimal compositional explanations and knowledge-augmented LLM reasoning.",
    ],
    myRole: [
      "Researched neuron-level explanations for large language models — mapping activations to interpretable concepts across large NLP corpora.",
      "Deployed Docker and Kubernetes pipelines for LLM interpretability experiments across 10,000+ text samples with reproducible experiment tracking.",
      "Supported scalable activation analysis workflows used to study how neurons encode linguistic and reasoning patterns in modern LLMs.",
    ],
    url: "https://aiea-lab.github.io/",
  },
  {
    index: "02",
    title: "NCG LAB LOG",
    progress: "2024-25",
    rows: [
      { index: "01", title: "Neuromorphic Computing Group", status: "UCSC" },
      { index: "02", title: "Sports Analytics · Spiking Neural Networks", status: "ROLE" },
      { index: "03", title: "Jason Eshraghian", status: "PI" },
      { index: "04", title: "ncg.ucsc.edu", status: "LINK", href: "https://ncg.ucsc.edu/" },
    ],
    knownFor: [
      "Brain-inspired computing at UC Santa Cruz — algorithms, architectures, and circuits that learn efficiently from neuroscience principles.",
      "Maintains snnTorch, a widely used spiking-neural-network library (100,000+ downloads), plus research on MatMul-free LMs and SpikeGPT.",
      "Applies neuromorphic vision and forecasting in medicine, energy, and aerospace; collaborates across hospitals and industry.",
    ],
    myRole: [
      "Built sports-analytics pipelines with spiking neural networks — player tracking, temporal feature sequences, and reproducible experiment logs.",
      "Improved Python SNN training workflow runtime by 20% through modular refactoring, batching, and cleaner experiment structure.",
      "Engineered scalable data workflows for feature extraction, filtering, and sequence modeling to support neuromorphic ML experiments.",
    ],
    url: "https://ncg.ucsc.edu/",
  },
];

export default function ExperiencePage({ src, initialActive = 0 }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(initialActive);
  const [mounted, setMounted] = useState(false);
  const activeSection = EXPERIENCE_SECTIONS[active];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(LABS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate("/");
      if (e.key === "Escape" || e.key === "Backspace") navigate("/");
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen" className="experience-screen">
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>

      <PageBackButton mounted={mounted} hints={[["↑↓", "SELECT LAB"]]} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .experience-screen .resume-list-tag {
          letter-spacing: 3px;
        }

        .experience-lab-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          padding: 10px 16px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 1.5px;
          color: #041238;
          background: #8df6ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          text-decoration: none;
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .experience-lab-link:hover {
          transform: translateX(4px);
          background: #d3fdff;
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
          color: #041238;
        }
        a.resume-detail-row-link:hover .resume-detail-row-title {
          color: #8df6ff;
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
          top: 12vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          pointer-events: none;
          transform: scale(0.92);
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
          height: 128px;
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
          font-size: 26px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .experience-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(41vw, 640px);
          max-width: calc(100% - 4.5vw);
          min-height: 78vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: all;
        }
        .experience-detail-panel::before {
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
          font-size: 32px;
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
          font-size: 17px;
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
          margin-top: 16px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 12px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 15px;
          line-height: 1.2;
          color: #edfaff;
          overflow-wrap: anywhere;
        }

        @media (max-width: 768px) {
          .resume-stack {
            width: min(47vw, calc(100% - 5.6vw));
          }
          .experience-detail-panel {
            position: relative;
            top: auto;
            right: auto;
            width: 100%;
            max-width: 100%;
            min-height: auto;
            margin: 0 4vw 6vw;
          }
        }

        @media (max-width: 520px) {
          .resume-title { font-size: clamp(34px, 10vw, 56px); }
          .resume-rank-number { font-size: clamp(44px, 12vw, 70px); }
          .resume-subtitle { font-size: clamp(18px, 5vw, 26px); }
          .resume-card { height: 112px; }
          .experience-detail-panel {
            width: min(58vw, calc(100vw - 6vw));
            padding: 16px 14px;
          }
          .resume-detail-top-title { font-size: clamp(20px, 5.5vw, 32px); }
          .resume-detail-bullet { font-size: clamp(13px, 3.5vw, 15px); }
        }
      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LABS</div>
          {LABS.map((lab, index) => (
            <div
              key={lab.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 70}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{lab.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{lab.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{lab.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{lab.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="experience-detail-panel">
          <div className="resume-detail-top">
            <div className="resume-detail-top-index">{activeSection.index}</div>
            <div className="resume-detail-top-title">{activeSection.title}</div>
            <div className="resume-detail-top-progress">{activeSection.progress}</div>
          </div>

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
                    target="_blank"
                    rel="noopener noreferrer"
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

          <div className="resume-detail-bottom">
            <div className="resume-detail-bottom-title">WHAT THE LAB IS KNOWN FOR</div>
            <div className="resume-detail-bullets">
              {activeSection.knownFor.map((bullet) => (
                <div className="resume-detail-bullet" key={bullet}>
                  - {bullet}
                </div>
              ))}
            </div>
          </div>

          <div className="resume-detail-bottom">
            <div className="resume-detail-bottom-title">MY ROLE</div>
            <div className="resume-detail-bullets">
              {activeSection.myRole.map((bullet) => (
                <div className="resume-detail-bullet" key={bullet}>
                  - {bullet}
                </div>
              ))}
            </div>
          </div>

          <a
            className="experience-lab-link"
            href={activeSection.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            VISIT LAB SITE ↗
          </a>
        </div>
      </div>

    </div>
  );
}

