// screens-pre.jsx — Pre-exam: Overview, Instructions, System Check

const SECTIONS = [
  { key: 'listening', name: 'Listening', minutes: 30, count: 40, color: '#3B82F6', icon: 'headphones' },
  { key: 'reading',   name: 'Reading',   minutes: 60, count: 40, color: '#0EA5E9', icon: 'list' },
  { key: 'writing',   name: 'Writing',   minutes: 60, count: 2,  color: '#8B5CF6', icon: 'pencil' },
  { key: 'speaking',  name: 'Speaking',  minutes: 14, count: 3,  color: '#F59E0B', icon: 'mic' },
];

const PAST_ATTEMPTS = [
  { date: '12/05/2026', band: '7.0' },
  { date: '28/04/2026', band: '6.5' },
];

// ===== Screen: Overview (pre-exam) =====
function ScreenOverview({ go }) {
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader title="Chi tiết đề thi" onBack={() => go('home')} />
      <div className="scroll-y" style={{ padding: 16 }}>

        {/* Hero card */}
        <div style={{
          padding: 18,
          borderRadius: 20,
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          color: 'white',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.8, marginBottom: 6 }}>
            IELTS ACADEMIC · CAMBRIDGE 18
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.25, marginBottom: 12 }}>
            Test 1 — Full Academic Mock Exam
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, opacity: 0.9, marginBottom: 16 }}>
            <div><div style={{ opacity: 0.7, marginBottom: 2 }}>Thời gian</div><b>2 giờ 44 phút</b></div>
            <div><div style={{ opacity: 0.7, marginBottom: 2 }}>Câu hỏi</div><b>85 câu</b></div>
            <div><div style={{ opacity: 0.7, marginBottom: 2 }}>Trạng thái</div>
              <b style={{ color: '#6EE7B7' }}>Đã mua</b></div>
          </div>
          <button className="btn block" style={{ background: 'white', color: '#1E3A8A', fontWeight: 800 }} onClick={() => go('instructions')}>
            <Icon name="play" size={16} /> Bắt đầu thi
          </button>
        </div>

        {/* Sections list */}
        <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', margin: '6px 4px 10px' }}>Cấu trúc bài thi</div>
        {SECTIONS.map((s, i) => (
          <div key={s.key} className="section-item">
            <div className="icon-tile" style={{ background: s.color }}>
              <Icon name={s.icon} size={20} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <div className="name">{s.name}</div>
              <div className="meta">{s.minutes} phút · {s.count} {s.key === 'writing' ? 'task' : 'câu'}</div>
            </div>
            <div className="chip muted">Phần {i + 1}</div>
          </div>
        ))}

        {/* Past attempts */}
        <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', margin: '16px 4px 10px' }}>Lần làm gần đây</div>
        <div className="card" style={{ padding: 0 }}>
          {PAST_ATTEMPTS.map((a, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 14,
              borderTop: i > 0 ? '1px solid var(--divider)' : 'none',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: 'var(--accent-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', fontWeight: 800, fontSize: 14,
              }}>{a.band}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>Band {a.band}</div>
                <div style={{ color: 'var(--text-2)', fontSize: 12 }}>{a.date}</div>
              </div>
              <Icon name="chevron-right" size={18} color="var(--text-3)" />
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>
      <div className="home-indicator" />
    </div>
  );
}

// ===== Screen: Instructions =====
function ScreenInstructions({ go }) {
  const rules = [
    { icon: 'clock',       text: 'Bài thi gồm 4 phần liên tục: Listening, Reading, Writing và Speaking.' },
    { icon: 'timer',       text: 'Thời gian mỗi phần đếm ngược độc lập. Hết giờ sẽ tự động chuyển phần.' },
    { icon: 'flag',        text: 'Bạn có thể đánh dấu câu hỏi để xem lại trong phần đang làm.' },
    { icon: 'bookmark',    text: 'Câu trả lời được lưu tự động. Không thể quay lại phần đã hoàn thành.' },
    { icon: 'volume',      text: 'Phần Listening chỉ phát một lần duy nhất. Hãy chuẩn bị tai nghe.' },
    { icon: 'eye-off',     text: 'Không mở ứng dụng khác trong khi thi để tránh huỷ kết quả.' },
  ];
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader title="Hướng dẫn làm bài" onBack={() => go('overview')} />
      <div className="scroll-y" style={{ padding: 16 }}>
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>
            Trước khi bắt đầu
          </div>
          <div style={{ color: 'var(--text-2)', fontSize: 13, lineHeight: 1.5 }}>
            Hãy đảm bảo môi trường yên tĩnh, kết nối mạng ổn định và tai nghe sẵn sàng.
          </div>
        </div>

        {rules.map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 4px' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: 'var(--accent-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name={r.icon} size={18} color="var(--accent)" />
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)', paddingTop: 8 }}>
              {r.text}
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 14, padding: 14, borderRadius: 12,
          background: '#FFFBEB', border: '1px solid #FDE68A',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Icon name="help" size={16} color="#B45309" />
            <div style={{ fontWeight: 800, color: '#B45309', fontSize: 13 }}>Lưu ý quan trọng</div>
          </div>
          <div style={{ fontSize: 12, color: '#92400E', lineHeight: 1.5 }}>
            Bạn không thể tạm dừng bài thi sau khi đã bắt đầu. Hãy chắc chắn bạn có đủ thời gian.
          </div>
        </div>
      </div>
      <div style={{ padding: 16, paddingTop: 8, borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <button className="btn primary block lg" onClick={() => go('systemcheck')}>
          Tôi đã hiểu, tiếp tục
        </button>
      </div>
      <div className="home-indicator" />
    </div>
  );
}

// ===== Screen: System Check =====
function ScreenSystemCheck({ go }) {
  const [tests, setTests] = useState({
    headphones: 'pending', mic: 'pending', net: 'pending',
  });
  const [running, setRunning] = useState(null);

  useEffect(() => {
    // auto-run network test on mount
    setTimeout(() => runTest('net'), 400);
  }, []);

  const runTest = (key) => {
    setRunning(key);
    setTests((t) => ({ ...t, [key]: 'pending' }));
    setTimeout(() => {
      setTests((t) => ({ ...t, [key]: 'ok' }));
      setRunning(null);
    }, 1200);
  };

  const allOk = Object.values(tests).every((v) => v === 'ok');

  const items = [
    { key: 'headphones', icon: 'headphones', name: 'Tai nghe',       desc: 'Phát đoạn âm thanh ngắn để kiểm tra' },
    { key: 'mic',        icon: 'mic',        name: 'Micro',          desc: 'Cho phần thi Speaking' },
    { key: 'net',        icon: 'wifi-test',  name: 'Kết nối mạng',   desc: 'Đang kiểm tra tự động' },
  ];

  return (
    <div className="screen">
      <StatusBar />
      <AppHeader title="Kiểm tra hệ thống" onBack={() => go('instructions')} />
      <div className="scroll-y" style={{ padding: 16 }}>
        <div style={{
          padding: 16, borderRadius: 16, background: 'var(--accent-soft)',
          color: 'var(--accent-dark)', marginBottom: 14,
        }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Sẵn sàng vào phòng thi</div>
          <div style={{ fontSize: 12, lineHeight: 1.5 }}>
            Kiểm tra thiết bị trước khi bắt đầu. Mọi hạng mục cần đạt trạng thái OK.
          </div>
        </div>

        {items.map((it) => {
          const status = tests[it.key];
          return (
            <div key={it.key} className="card tight" style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: status === 'ok' ? '#ECFDF5' : 'var(--divider)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon name={it.icon} size={20} color={status === 'ok' ? 'var(--correct)' : 'var(--text-2)'} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{it.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{it.desc}</div>
              </div>
              {status === 'ok' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--correct)', fontWeight: 700, fontSize: 12 }}>
                  <Icon name="check" size={16} /> OK
                </div>
              ) : running === it.key ? (
                <div className="spinner" style={{ width: 22, height: 22, borderWidth: 2.5 }} />
              ) : (
                <button className="btn sm outline" onClick={() => runTest(it.key)}>
                  Kiểm tra
                </button>
              )}
            </div>
          );
        })}

        <div style={{ marginTop: 14, padding: 14, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', marginBottom: 8 }}>Thí sinh</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 999, background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800,
            }}>NV</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>Nguyễn Văn An</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)' }}>ID: ED-2026-0418</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: 16, paddingTop: 8, borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <button
          className={"btn block lg " + (allOk ? 'primary' : 'ghost')}
          disabled={!allOk}
          onClick={() => go('listening')}
        >
          {allOk ? 'Vào phòng thi' : 'Hoàn tất kiểm tra để tiếp tục'}
        </button>
      </div>
      <div className="home-indicator" />
    </div>
  );
}

// ===== Screen: Home launcher =====
const FLOW = [
  { key: 'home',         label: 'Home' },
  { key: 'overview',     label: 'Chi tiết đề thi' },
  { key: 'instructions', label: 'Hướng dẫn' },
  { key: 'systemcheck',  label: 'Kiểm tra' },
  { key: 'listening',    label: 'Listening' },
  { key: 'reading',      label: 'Reading' },
  { key: 'writing',      label: 'Writing' },
  { key: 'speaking',     label: 'Speaking' },
  { key: 'submitting',   label: 'Đang chấm' },
  { key: 'congrats',     label: 'Hoàn tất' },
  { key: 'results',      label: 'Kết quả' },
];

function ScreenHome({ go }) {
  return (
    <div className="screen">
      <StatusBar />
      <div style={{
        padding: '16px 16px 12px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Chào buổi sáng,</div>
        <div style={{ fontWeight: 800, fontSize: 22, color: 'var(--text)' }}>Nguyễn V. An</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{
          padding: 18, borderRadius: 18,
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          color: 'white', marginBottom: 16,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.8, marginBottom: 4 }}>
            IELTS · BÀI THI THỬ
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
            Cambridge 18 — Test 1
          </div>
          <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 14 }}>
            Full Academic mock · 2 giờ 44 phút
          </div>
          <button className="btn block" style={{ background: 'white', color: '#1E3A8A', fontWeight: 800, height: 44 }} onClick={() => go('overview')}>
            <Icon name="play" size={14} /> Vào phòng thi
          </button>
        </div>

        <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', margin: '6px 4px 10px' }}>
          Xem trước các màn hình
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {FLOW.slice(1).map((f) => (
            <button key={f.key} onClick={() => go(f.key)} className="card tight" style={{
              cursor: 'pointer', textAlign: 'left', border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 700 }}>
                {String(FLOW.findIndex((x) => x.key === f.key)).padStart(2, '0')}
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13, marginTop: 2 }}>
                {f.label}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="home-indicator" />
    </div>
  );
}

Object.assign(window, { ScreenHome, ScreenOverview, ScreenInstructions, ScreenSystemCheck, SECTIONS, FLOW });
