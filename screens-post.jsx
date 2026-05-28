// screens-post.jsx — Post-exam: Submitting, Congratulations, Results

// ============================================================
// SUBMITTING (loading)
// ============================================================
function ScreenSubmitting({ go }) {
  const [step, setStep] = useState(0);
  const steps = [
    'Đang tải lên câu trả lời...',
    'Đang chấm điểm Listening...',
    'Đang chấm điểm Reading...',
    'Đang phân tích Writing & Speaking...',
    'Tổng hợp kết quả...',
  ];

  useEffect(() => {
    const ids = steps.map((_, i) => setTimeout(() => setStep(i), i * 800));
    const done = setTimeout(() => go('congrats'), steps.length * 800 + 400);
    return () => { ids.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  const pct = Math.min(100, Math.round(((step + 1) / steps.length) * 100));

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 24 }}>
        <div className="spinner" style={{ width: 56, height: 56, borderWidth: 4 }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
            Đang xử lý bài thi
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', minHeight: 20 }}>
            {steps[step]}
          </div>
        </div>
        <div style={{
          width: '100%', maxWidth: 280, height: 6, borderRadius: 999,
          background: 'var(--divider)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${pct}%`, background: 'var(--accent)',
            borderRadius: 999, transition: 'width 400ms ease',
          }} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{pct}%</div>
      </div>
      <div className="home-indicator" />
    </div>
  );
}

// ============================================================
// CONGRATULATIONS
// ============================================================
function ScreenCongrats({ go }) {
  return (
    <div className="screen">
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="card" style={{
          padding: 28, width: '100%', textAlign: 'center',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: 24,
            background: '#F0FDF4', border: '1px solid #BBF7D0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
          }}>
            <Icon name="check" size={40} color="#15803D" strokeWidth={3} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
            Nộp bài thành công
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 20 }}>
            Bài làm của bạn đã được ghi nhận. Kết quả Listening và Reading có ngay.
            Writing & Speaking sẽ được chấm trong vòng 24 giờ.
          </div>
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }} />

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
            <div style={{
              flex: 1, padding: 12, borderRadius: 12, background: 'var(--accent-soft)',
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 700, marginBottom: 2 }}>SỐ CÂU</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-dark)' }}>85</div>
            </div>
            <div style={{
              flex: 1, padding: 12, borderRadius: 12, background: '#F0FDF4',
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 700, marginBottom: 2 }}>THỜI GIAN</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#15803D' }}>2:38</div>
            </div>
          </div>

          <button className="btn dark block lg" onClick={() => go('results')}>
            Xem kết quả
          </button>
          <button className="btn outline block" style={{ marginTop: 8 }} onClick={() => go('overview')}>
            Về trang chi tiết
          </button>
        </div>
      </div>
      <div className="home-indicator" />
    </div>
  );
}

// ============================================================
// RESULTS
// ============================================================
const RESULT_DATA = {
  overall: 7.5,
  skills: [
    { name: 'Listening', band: 8.0, fill: 0.89, correct: 36, total: 40 },
    { name: 'Reading',   band: 7.5, fill: 0.83, correct: 33, total: 40 },
    { name: 'Writing',   band: 7.0, fill: 0.77, status: 'Đã chấm' },
    { name: 'Speaking',  band: 7.5, fill: 0.83, status: 'Đã chấm' },
  ],
  time: { Listening: '29:42', Reading: '57:18', Writing: '58:50', Speaking: '13:08' },
  strengths: [
    'Nắm chắc từ vựng học thuật (Reading)',
    'Phát âm tự nhiên, ngữ điệu linh hoạt (Speaking)',
    'Theo dõi tốt thông tin chi tiết (Listening Section 1, 2)',
  ],
  weaknesses: [
    'Cấu trúc đoạn văn Task 2 còn rời rạc (Writing)',
    'Bỏ sót thông tin trong dạng câu hỏi multiple choice (Listening Section 4)',
    'Một số liên kết ý chưa rõ ràng (Writing Task 1)',
  ],
  review: [
    { id: 1, section: 'L', q: 'Tên người gọi điện', userAnswer: 'Mark Henderson', correct: true },
    { id: 2, section: 'L', q: 'Số điện thoại', userAnswer: '0784 553 218', correct: true },
    { id: 3, section: 'L', q: 'Ngày nhận phòng', userAnswer: '15/7', correct: false, expected: '15 July' },
    { id: 4, section: 'R', q: 'Tea originated in Japan.', userAnswer: 'FALSE', correct: true },
    { id: 5, section: 'R', q: 'Lu Yu wrote the first book...', userAnswer: 'NOT GIVEN', correct: false, expected: 'TRUE' },
    { id: 6, section: 'R', q: 'Buddhist monks were the first...', userAnswer: 'FALSE', correct: true },
  ],
};

function ScreenResults({ go }) {
  const [tab, setTab] = useState('summary');

  return (
    <div className="screen">
      <StatusBar />
      <AppHeader
        title="Kết quả bài thi"
        onBack={() => go('overview')}
        right={
          <button className="icon-btn" aria-label="Share"><Icon name="share" size={18} /></button>
        }
      />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero band score */}
        <div style={{
          background: 'linear-gradient(180deg, #1E3A8A 0%, #3B82F6 100%)',
          padding: '24px 16px 28px',
          color: 'white',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, textAlign: 'center', letterSpacing: 1, marginBottom: 4 }}>
            IELTS ACADEMIC · OVERALL BAND
          </div>
          <BandCircle score={RESULT_DATA.overall} />
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, opacity: 0.9 }}>
            <Icon name="award" size={16} color="white" /> Tốt — Tương đương C1 (CEFR)
          </div>
        </div>

        {/* Tab switcher */}
        <div className="seg" style={{ margin: '12px 16px 8px' }}>
          <button className={tab === 'summary' ? 'active' : ''} onClick={() => setTab('summary')}>Tổng quan</button>
          <button className={tab === 'review' ? 'active' : ''} onClick={() => setTab('review')}>Xem lại</button>
          <button className={tab === 'insights' ? 'active' : ''} onClick={() => setTab('insights')}>Phân tích</button>
        </div>

        <div style={{ padding: '8px 16px 24px' }}>
          {tab === 'summary' && (
            <>
              <div className="card" style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 10 }}>
                  Điểm theo kỹ năng
                </div>
                {RESULT_DATA.skills.map((s) => (
                  <div key={s.name} className="skill-row">
                    <div className="skill-name">{s.name}</div>
                    <div className="bar">
                      <div className="bar-fill" style={{ width: `${s.fill * 100}%` }} />
                    </div>
                    <div className="skill-score">{s.band.toFixed(1)}</div>
                  </div>
                ))}
              </div>

              <div className="card" style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 10 }}>
                  Thời gian làm bài
                </div>
                {Object.entries(RESULT_DATA.time).map(([k, v]) => (
                  <div key={k} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0', borderBottom: '1px solid var(--divider)',
                  }}>
                    <span style={{ color: 'var(--text-2)', fontSize: 13 }}>{k}</span>
                    <span style={{ color: 'var(--text)', fontWeight: 700, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="card">
                <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 10 }}>
                  Số câu đúng (L + R)
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <StatPill label="Listening" value="36 / 40" color="#3B82F6" />
                  <StatPill label="Reading"   value="33 / 40" color="#0EA5E9" />
                </div>
              </div>
            </>
          )}

          {tab === 'review' && (
            <>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 10 }}>
                Hiển thị {RESULT_DATA.review.length} câu đầu tiên · Toàn bộ 80 câu hỏi trắc nghiệm có trên web.
              </div>
              {RESULT_DATA.review.map((r) => (
                <div key={r.id} className="card tight" style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 6, fontSize: 11, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: r.section === 'L' ? '#DBEAFE' : '#E0F2FE',
                      color: r.section === 'L' ? '#1E40AF' : '#0369A1',
                    }}>{r.section}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)' }}>Câu {r.id}</div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4,
                      color: r.correct ? 'var(--correct)' : 'var(--wrong)', fontWeight: 700, fontSize: 12 }}>
                      <Icon name={r.correct ? 'check' : 'close'} size={14} />
                      {r.correct ? 'Đúng' : 'Sai'}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5, marginBottom: 6 }}>
                    {r.q}
                  </div>
                  <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                    <div style={{
                      flex: 1, padding: '6px 10px', borderRadius: 8,
                      background: r.correct ? '#F0FDF4' : '#FEF2F2',
                      color: r.correct ? '#15803D' : '#B91C1C',
                    }}>
                      <div style={{ fontSize: 10, opacity: 0.7, fontWeight: 700 }}>Bạn chọn</div>
                      {r.userAnswer}
                    </div>
                    {!r.correct && r.expected && (
                      <div style={{
                        flex: 1, padding: '6px 10px', borderRadius: 8,
                        background: '#F0FDF4', color: '#15803D',
                      }}>
                        <div style={{ fontSize: 10, opacity: 0.7, fontWeight: 700 }}>Đáp án đúng</div>
                        {r.expected}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 'insights' && (
            <>
              <div className="card" style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: '#F0FDF4',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name="sparkles" size={16} color="#15803D" />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>Điểm mạnh</div>
                </div>
                {RESULT_DATA.strengths.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', alignItems: 'flex-start' }}>
                    <Icon name="check" size={14} color="var(--correct)" />
                    <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5, flex: 1 }}>{s}</div>
                  </div>
                ))}
              </div>

              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: '#FEF2F2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name="flag" size={16} color="#B91C1C" />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>Cần cải thiện</div>
                </div>
                {RESULT_DATA.weaknesses.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', alignItems: 'flex-start' }}>
                    <Icon name="chevron-right" size={14} color="var(--wrong)" />
                    <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5, flex: 1 }}>{s}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', gap: 8 }}>
        <button className="btn outline" style={{ flex: 1 }} onClick={() => go('overview')}>
          <Icon name="replay" size={14} /> Làm lại
        </button>
        <button className="btn primary" style={{ flex: 1 }} onClick={() => go('overview')}>
          Hoàn tất
        </button>
      </div>
      <div className="home-indicator" />
    </div>
  );
}

function BandCircle({ score }) {
  // Build the conic gradient from the score (0–9)
  const pct = (score / 9) * 100;
  return (
    <div style={{
      width: 140, height: 140, borderRadius: 999, margin: '0 auto',
      background: `conic-gradient(white ${pct}%, rgba(255,255,255,0.2) 0)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 118, height: 118, borderRadius: 999, background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(4px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.3)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: 1 }}>BAND</div>
        <div style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: -1 }}>
          {score.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

function StatPill({ label, value, color }) {
  return (
    <div style={{
      flex: 1, padding: '12px 14px', borderRadius: 12,
      background: 'var(--surface-2)', border: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', marginBottom: 4 }}>
        {label.toUpperCase()}
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenSubmitting, ScreenCongrats, ScreenResults });
