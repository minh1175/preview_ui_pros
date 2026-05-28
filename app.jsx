// app.jsx — Main app: navigation, Tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3B82F6",
  "density": "regular",
  "dark": false,
  "showFlowMap": false
}/*EDITMODE-END*/;

// ============================================================
// Mini flow map (overlay near the phone showing where we are)
// ============================================================
function FlowMap({ current, go }) {
  return (
    <div style={{
      width: 220, background: '#181b22', color: 'white', borderRadius: 16,
      padding: 14, fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, letterSpacing: 1, marginBottom: 10 }}>
        FLOW MAP
      </div>
      {FLOW.map((f, i) => {
        const active = f.key === current;
        return (
          <button
            key={f.key}
            onClick={() => go(f.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '8px 10px', borderRadius: 8, marginBottom: 2,
              background: active ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left',
              fontSize: 12,
            }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: 999,
              background: active ? '#3B82F6' : 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 800,
            }}>{i}</div>
            <span style={{ opacity: active ? 1 : 0.7, fontWeight: active ? 700 : 500 }}>
              {f.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// App root
// ============================================================
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('home');

  const go = (key) => setScreen(key);

  // Apply theme via CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', t.accent);
    // derive dark/soft from the accent
    root.style.setProperty('--accent-dark', shadeColor(t.accent, -20));
    root.style.setProperty('--accent-soft', tintColor(t.accent, 0.9));
  }, [t.accent]);

  const screens = {
    home:         <ScreenHome         go={go} />,
    overview:     <ScreenOverview     go={go} />,
    instructions: <ScreenInstructions go={go} />,
    systemcheck:  <ScreenSystemCheck  go={go} />,
    listening:    <ScreenListening    go={go} />,
    reading:      <ScreenReading      go={go} />,
    writing:      <ScreenWriting      go={go} />,
    speaking:     <ScreenSpeaking     go={go} />,
    submitting:   <ScreenSubmitting   go={go} />,
    congrats:     <ScreenCongrats     go={go} />,
    results:      <ScreenResults      go={go} />,
  };

  return (
    <div className={'stage ' + (t.dark ? 'theme-dark' : '') + ' density-' + t.density}>
      <PhoneFrame dark={t.dark}>
        {screens[screen]}
      </PhoneFrame>

      {t.showFlowMap && <FlowMap current={screen} go={go} />}

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={['#3B82F6', '#0EA5E9', '#8B5CF6', '#F59E0B', '#10B981']}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakToggle
          label="Dark mode"
          value={t.dark}
          onChange={(v) => setTweak('dark', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakToggle
          label="Show flow map"
          value={t.showFlowMap}
          onChange={(v) => setTweak('showFlowMap', v)}
        />

        <TweakSection label="Jump to screen" />
        <TweakSelect
          label="Screen"
          value={screen}
          options={FLOW.map((f) => ({ value: f.key, label: f.label }))}
          onChange={(v) => setScreen(v)}
        />
      </TweaksPanel>
    </div>
  );
}

// ===== Color helpers =====
function shadeColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) + Math.round(2.55 * percent);
  const g = ((num >> 8) & 0xFF) + Math.round(2.55 * percent);
  const b = (num & 0xFF) + Math.round(2.55 * percent);
  const c = (x) => Math.max(0, Math.min(255, x));
  return '#' + ((c(r) << 16) | (c(g) << 8) | c(b)).toString(16).padStart(6, '0');
}
function tintColor(hex, mix) {
  // mix toward white by `mix` (0 = base, 1 = white)
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) + (255 - (num >> 16)) * mix;
  const g = ((num >> 8) & 0xFF) + (255 - ((num >> 8) & 0xFF)) * mix;
  const b = (num & 0xFF) + (255 - (num & 0xFF)) * mix;
  return '#' + ((Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b)).toString(16).padStart(6, '0');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
