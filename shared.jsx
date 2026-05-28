// shared.jsx — Common phone-frame chrome, status bar, exam header, palette

const { useState, useEffect, useRef, Fragment } = React;

// ===== Icons (inline SVG) =====
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 2 }) => {
  const paths = {
    'arrow-left':  <g><path d="M19 12H5M12 19l-7-7 7-7" /></g>,
    'arrow-right': <g><path d="M5 12h14M12 5l7 7-7 7" /></g>,
    'menu':        <g><path d="M3 6h18M3 12h18M3 18h18" /></g>,
    'close':       <g><path d="M18 6L6 18M6 6l12 12" /></g>,
    'check':       <g><path d="M20 6L9 17l-5-5" /></g>,
    'play':        <g><path d="M5 3l14 9-14 9V3z" fill={color} stroke="none" /></g>,
    'pause':       <g><path d="M6 4h4v16H6zM14 4h4v16h-4z" fill={color} stroke="none" /></g>,
    'mic':         <g><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" /></g>,
    'stop':        <g><rect x="6" y="6" width="12" height="12" rx="2" fill={color} stroke="none" /></g>,
    'clock':       <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
    'timer':       <g><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2M9 2h6" /></g>,
    'flag':        <g><path d="M4 21V5a2 2 0 0 1 2-2h11l-2 4 2 4H6v10" /></g>,
    'bookmark':    <g><path d="M5 4v18l7-5 7 5V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" /></g>,
    'help':        <g><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 17h.01" /></g>,
    'calculator':  <g><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0" /></g>,
    'settings':    <g><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1 0 2.8 2 2 0 0 1-2.8 0l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></g>,
    'headphones':  <g><path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1v-7h3v5zM3 19a2 2 0 0 0 2 2h1v-7H3v5z" /></g>,
    'pencil':      <g><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></g>,
    'volume':      <g><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></g>,
    'eye':         <g><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></g>,
    'eye-off':     <g><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></g>,
    'list':        <g><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></g>,
    'award':       <g><circle cx="12" cy="8" r="6" /><path d="M9 13.5L7 22l5-3 5 3-2-8.5" /></g>,
    'replay':      <g><path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></g>,
    'share':       <g><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></g>,
    'chevron-right': <g><path d="M9 18l6-6-6-6" /></g>,
    'chevron-down':  <g><path d="M6 9l6 6 6-6" /></g>,
    'chevron-up':    <g><path d="M18 15l-6-6-6 6" /></g>,
    'wifi-test':   <g><path d="M5 12a10 10 0 0 1 14 0M2 8.82a15 15 0 0 1 20 0M8.5 16.43a5 5 0 0 1 7 0" /><circle cx="12" cy="20" r="1" fill={color} /></g>,
    'sparkles':    <g><path d="M12 3v6m0 6v6M3 12h6m6 0h6M5.6 5.6l4.2 4.2m4.4 4.4l4.2 4.2M5.6 18.4l4.2-4.2m4.4-4.4l4.2-4.2" /></g>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
};

// ===== Status bar (iOS-like) =====
function StatusBar({ time = '9:41', onDark = false }) {
  const color = onDark ? 'white' : '#111827';
  return (
    <div className={"status-bar" + (onDark ? ' on-dark' : '')} style={{ color }}>
      <span>{time}</span>
      <div className="right">
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill={color}>
          <rect x="0"  y="7" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5"/>
          <rect x="9"  y="3" width="3" height="8" rx="0.5"/>
          <rect x="13.5" y="1" width="3" height="10" rx="0.5"/>
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill={color}>
          <path d="M8 11l-1.5-1.5a2.12 2.12 0 0 1 3 0L8 11zm3.4-3.4a6 6 0 0 0-6.8 0L3.2 6.2a8 8 0 0 1 9.6 0l-1.4 1.4zm2.8-2.8a10 10 0 0 0-12.4 0L.4 3.4a12 12 0 0 1 15.2 0l-1.4 1.4z" />
        </svg>
        {/* battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke={color} fill="none"/>
          <rect x="2" y="2" width="19" height="9" rx="1.5" fill={color}/>
          <rect x="23.5" y="4.5" width="1.5" height="4" rx="0.5" fill={color}/>
        </svg>
      </div>
    </div>
  );
}

// ===== App header (back / title / right action) =====
function AppHeader({ title, onBack, right, center = true }) {
  return (
    <div className="app-header">
      {onBack ? (
        <button className="icon-btn" onClick={onBack} aria-label="Back">
          <Icon name="arrow-left" />
        </button>
      ) : <div style={{ width: 36 }} />}
      <div className="title" style={{ textAlign: center ? 'center' : 'left' }}>{title}</div>
      {right || <div style={{ width: 36 }} />}
    </div>
  );
}

// ===== Phone frame wrapper =====
function PhoneFrame({ children, dark }) {
  return (
    <div className={"phone-shell" + (dark ? ' theme-dark' : '')}>
      <div className="phone-screen">{children}</div>
    </div>
  );
}

// ===== Exam header (top band with candidate / timer / actions) =====
function ExamTopBar({ candidate, timer, onHelp, onSettings, examTitle, tools }) {
  return (
    <>
      <div className="exam-top">
        <div className="candidate">
          Thí sinh
          <b>{candidate}</b>
        </div>
        <div className="timer">
          <span className="time">{timer.label}</span>
          <span>{timer.section}</span>
        </div>
        <div className="actions">
          {tools && tools.map((t) => (
            <button key={t.key} className="tool-btn" onClick={t.onClick} aria-label={t.label}>
              <Icon name={t.icon} size={18} />
            </button>
          ))}
          <button className="tool-btn" onClick={onHelp} aria-label="Help">
            <Icon name="help" size={18} />
          </button>
        </div>
      </div>
      <div className="exam-band">{examTitle}</div>
    </>
  );
}

// ===== Question palette (bottom bar with prev/next and numbered cells) =====
function QuestionPalette({ total, current, answered, marked, onJump, onPrev, onNext, prevLabel, nextLabel }) {
  return (
    <div className="palette-bar">
      <button className="nav-btn" onClick={onPrev} disabled={current === 0} aria-label="Previous">
        <Icon name="arrow-left" size={18} />
      </button>
      <div className="palette-strip">
        {Array.from({ length: total }).map((_, i) => {
          const cls = ['palette-cell'];
          if (i === current) cls.push('current');
          else if (answered.has(i)) cls.push('answered');
          if (marked.has(i)) cls.push('marked');
          return (
            <button key={i} className={cls.join(' ')} onClick={() => onJump(i)}>
              {i + 1}
            </button>
          );
        })}
      </div>
      <button className="nav-btn" onClick={onNext} aria-label="Next">
        <Icon name="arrow-right" size={18} />
      </button>
    </div>
  );
}

// ===== Modal (bottom sheet) =====
function BottomSheet({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {title && <h3>{title}</h3>}
        {children}
        {footer && <div style={{ marginTop: 12 }}>{footer}</div>}
      </div>
    </div>
  );
}

// ===== Formatting helpers =====
function fmtTime(seconds) {
  if (seconds == null || seconds < 0) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

Object.assign(window, {
  Icon, StatusBar, AppHeader, PhoneFrame, ExamTopBar, QuestionPalette,
  BottomSheet, fmtTime,
});
