import { useNavigate } from "react-router-dom";
import { playClickSound } from "./clickAudio";

export default function PageBackButton({
  mounted = true,
  label = "MAIN MENU",
  hints = [],
  backdrop = true,
}) {
  const navigate = useNavigate();

  const goHome = () => {
    playClickSound();
    navigate("/");
  };

  return (
    <>
      <style>{`
        .p3-screen-backdrop {
          position: absolute;
          inset: 0;
          z-index: 5;
          margin: 0;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          pointer-events: all;
        }
        .p3-screen-backdrop:focus-visible {
          outline: 2px solid rgba(133, 244, 255, 0.55);
          outline-offset: -4px;
        }

        .p3-page-nav-dock {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 100;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          padding: 0 24px max(20px, env(safe-area-inset-bottom));
          pointer-events: none;
          opacity: 0;
          transform: translateY(10px);
          transition:
            opacity 0.4s ease 0.45s,
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .p3-page-nav-dock.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .p3-page-back-bar {
          flex: 0 1 auto;
          min-width: min(320px, 72vw);
          min-height: 56px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 22px 12px 16px;
          background: #10185f;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.88);
          border: none;
          cursor: pointer;
          pointer-events: all;
          transition:
            transform 0.18s ease,
            background 0.18s ease,
            box-shadow 0.18s ease;
        }
        .p3-page-back-bar:hover,
        .p3-page-back-bar:focus-visible {
          transform: translateX(-5px);
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
        }

        .p3-page-back-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          line-height: 1;
          color: #c4001a;
          animation: p3-back-arrow 0.8s ease-in-out infinite;
        }
        .p3-page-back-key {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          line-height: 1;
          color: #9ffbff;
          border: 1px solid rgba(156, 247, 255, 0.45);
          padding: 3px 8px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
          transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }
        .p3-page-back-bar:hover .p3-page-back-key,
        .p3-page-back-bar:focus-visible .p3-page-back-key {
          color: #041238;
          border-color: #041238;
          background: #85f4ff;
        }
        .p3-page-back-label {
          font-family: 'Anton', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          line-height: 1;
          color: #a5f6ff;
          transition: color 0.18s ease;
        }
        .p3-page-back-bar:hover .p3-page-back-label,
        .p3-page-back-bar:focus-visible .p3-page-back-label {
          color: #000;
        }

        .p3-page-nav-hints {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          padding-bottom: 4px;
          font-family: 'Bebas Neue', sans-serif;
          pointer-events: none;
        }
        .p3-page-nav-hint-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.24);
        }
        .p3-page-nav-key {
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 3px;
          padding: 1px 6px;
          font-size: 11px;
        }

        @keyframes p3-back-arrow {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.45; }
        }

        @media (max-width: 520px) {
          .p3-page-nav-dock {
            flex-direction: column-reverse;
            align-items: stretch;
            padding: 0 14px max(14px, env(safe-area-inset-bottom));
          }
          .p3-page-back-bar {
            min-width: 0;
            width: 100%;
          }
          .p3-page-nav-hints {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-end;
          }
          .p3-page-back-label { font-size: 22px; }
        }
      `}</style>

      {backdrop && (
        <button
          type="button"
          className="p3-screen-backdrop"
          onClick={goHome}
          aria-label="Click empty area to return to main menu"
          tabIndex={-1}
        />
      )}

      <div className={`p3-page-nav-dock${mounted ? " mounted" : ""}`}>
        <button
          type="button"
          className="p3-page-back-bar"
          onClick={goHome}
          aria-label="Back to main menu"
        >
          <span className="p3-page-back-arrow">◄</span>
          <span className="p3-page-back-key">ESC</span>
          <span className="p3-page-back-label">{label}</span>
        </button>

        {hints.length > 0 && (
          <div className="p3-page-nav-hints" aria-hidden="true">
            {hints.map(([key, text]) => (
              <div className="p3-page-nav-hint-row" key={`${key}-${text}`}>
                <span className="p3-page-nav-key">{key}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
