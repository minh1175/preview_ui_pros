// screens-exam.jsx — In-exam screens for Listening, Reading, Writing, Speaking

// ============================================================
// LISTENING
// ============================================================
const LISTENING_QUESTIONS = [
  { id: 1,  prompt: 'Tên người gọi điện đặt phòng là ___?', answer: 'Mark Henderson' },
  { id: 2,  prompt: 'Số điện thoại liên hệ: ___', answer: '0784 553 218' },
  { id: 3,  prompt: 'Ngày nhận phòng: ___ tháng ___', answer: '15 tháng 7' },
  { id: 4,  prompt: 'Loại phòng đã đặt:', kind: 'mcq', options: ['Single Room', 'Double Room', 'Family Suite', 'Penthouse'] },
  { id: 5,  prompt: 'Số đêm lưu trú: ___ đêm', answer: '3' },
  { id: 6,  prompt: 'Yêu cầu đặc biệt:', kind: 'mcq', options: ['Tầm nhìn ra biển', 'Phòng không hút thuốc', 'Tầng cao', 'Gần thang máy'] },
  { id: 7,  prompt: 'Khách hàng sẽ thanh toán bằng:', kind: 'mcq', options: ['Tiền mặt', 'Thẻ tín dụng', 'Chuyển khoản', 'Voucher'] },
  { id: 8,  prompt: 'Tổng chi phí ước tính (£): ___', answer: '420' },
  { id: 9,  prompt: 'Bữa sáng bao gồm trong giá phòng:', kind: 'mcq', options: ['Có', 'Không', 'Tuỳ chọn thêm', 'Không rõ'] },
  { id: 10, prompt: 'Số xác nhận đặt phòng: ___', answer: 'HX-90412' },
];

function ScreenListening({ go }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState(new Set());
  const [secondsLeft, setSecondsLeft] = useState(30 * 60 - 142);
  const [playing, setPlaying] = useState(true);
  const [audioPos, setAudioPos] = useState(72);
  const audioTotal = 30 * 60;

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
      if (playing) setAudioPos((p) => Math.min(audioTotal, p + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  const q = LISTENING_QUESTIONS[current];
  const answered = new Set(Object.keys(answers).map((k) => parseInt(k)));
  const setAnswer = (val) => setAnswers((a) => ({ ...a, [current]: val }));
  const toggleMark = () => setMarked((m) => {
    const n = new Set(m);
    n.has(current) ? n.delete(current) : n.add(current);
    return n;
  });

  return (
    <div className="screen">
      <StatusBar />
      <ExamTopBar
        candidate="Nguyễn V. An"
        timer={{ label: fmtTime(secondsLeft), section: 'Listening' }}
        examTitle="IELTS ACADEMIC · LISTENING · PART 1"
        tools={[]}
        onHelp={() => go('overview')}
      />

      {/* Audio player */}
      <div className="audio-bar">
        <button className="play" onClick={() => setPlaying((p) => !p)}>
          <Icon name={playing ? 'pause' : 'play'} size={14} color="#0F172A" />
        </button>
        <div className="audio-track">
          <div className="audio-fill" style={{ width: `${(audioPos / audioTotal) * 100}%` }} />
        </div>
        <div className="audio-time">{fmtTime(audioPos)} / {fmtTime(audioTotal)}</div>
      </div>

      <div className="exam-section-title">
        <div className="label">Section 1 · Questions 1–10</div>
        <button className="chip muted" onClick={toggleMark} style={{ border: 'none', cursor: 'pointer', background: marked.has(current) ? '#FEE2E2' : 'var(--divider)', color: marked.has(current) ? 'var(--wrong)' : 'var(--text-2)' }}>
          <Icon name="bookmark" size={12} /> {marked.has(current) ? 'Đã đánh dấu' : 'Đánh dấu'}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', background: 'var(--surface)' }}>
        <div style={{
          padding: 14, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', marginBottom: 14,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', marginBottom: 6, letterSpacing: 0.5 }}>
            BỐI CẢNH
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text)' }}>
            Bạn sẽ nghe một cuộc gọi giữa khách hàng và nhân viên đặt phòng khách sạn.
            Hoàn thành phiếu thông tin bên dưới. Viết <b>KHÔNG QUÁ HAI TỪ và/hoặc một số</b> cho mỗi câu trả lời.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{
            minWidth: 32, height: 32, padding: '0 8px', borderRadius: 8, background: '#111827', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14,
          }}>{q.id}</div>
          <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.5 }}>
            {q.prompt}
          </div>
        </div>

        {q.kind === 'mcq' ? (
          q.options.map((opt, i) => {
            const sel = answers[current] === opt;
            return (
              <div key={i} className={'option-row' + (sel ? ' selected' : '')} onClick={() => setAnswer(opt)}>
                <div className="option-bullet">{String.fromCharCode(65 + i)}</div>
                <div className="option-text">{opt}</div>
              </div>
            );
          })
        ) : (
          <input
            type="text"
            value={answers[current] || ''}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Nhập câu trả lời..."
            style={{
              width: '100%', padding: '14px 16px', fontSize: 15,
              border: '1.5px solid var(--border)', borderRadius: 12,
              background: 'var(--surface)', color: 'var(--text)',
              outline: 'none', fontFamily: 'inherit',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
        )}

        <div style={{ marginTop: 18, fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}>
          Đoạn ghi âm sẽ KHÔNG được phát lại. Hãy nghe kỹ.
        </div>
      </div>

      <QuestionPalette
        total={LISTENING_QUESTIONS.length}
        current={current}
        answered={answered}
        marked={marked}
        onJump={setCurrent}
        onPrev={() => setCurrent((c) => Math.max(0, c - 1))}
        onNext={() => {
          if (current >= LISTENING_QUESTIONS.length - 1) go('reading');
          else setCurrent((c) => c + 1);
        }}
      />
      <div className="home-indicator" />
    </div>
  );
}

// ============================================================
// READING
// ============================================================
const READING_PASSAGE = {
  title: 'The History of Tea',
  paragraphs: [
    { letter: 'A', text: 'Tea is one of the world\'s most consumed beverages, second only to water. Archaeological evidence suggests that tea has been cultivated and consumed in China for over 4,700 years. According to legend, the Chinese Emperor Shen Nung discovered tea by accident in 2737 BC when leaves from a wild tea bush blew into his pot of boiling water.' },
    { letter: 'B', text: 'During the Tang Dynasty (618–907 AD), tea drinking became widespread across China and was elevated to an art form. The scholar Lu Yu wrote The Classic of Tea, the first comprehensive treatise on the subject, describing the cultivation, preparation, and ceremonial use of the beverage.' },
    { letter: 'C', text: 'Tea reached Japan in the 9th century through Buddhist monks who had studied in China. Japanese tea culture evolved into the elaborate cha-no-yu, or tea ceremony, emphasising harmony, respect, purity, and tranquility — principles that continue to define the practice today.' },
    { letter: 'D', text: 'European traders first encountered tea in the early 1600s when Portuguese merchants brought it back from East Asia. By the 1660s, tea had become fashionable in England, popularised by Catherine of Braganza, the Portuguese queen consort of King Charles II, who introduced the daily habit to the British court.' },
    { letter: 'E', text: 'The British East India Company\'s monopoly on tea imports created enormous demand and shaped global trade routes. To reduce dependency on Chinese tea, the British established vast plantations in India during the 19th century, transforming regions like Assam and Darjeeling into major tea-producing areas that still dominate world production today.' },
  ],
};

const READING_QUESTIONS = [
  { id: 1, kind: 'tfng', text: 'Tea originated in Japan.' },
  { id: 2, kind: 'tfng', text: 'Lu Yu wrote the first book on tea during the Tang Dynasty.' },
  { id: 3, kind: 'tfng', text: 'Buddhist monks were the first to drink tea in China.' },
  { id: 4, kind: 'tfng', text: 'Catherine of Braganza made tea popular in England.' },
  { id: 5, kind: 'match', text: 'In which paragraph is the British East India Company mentioned?', options: ['A','B','C','D','E'] },
  { id: 6, kind: 'mcq', text: 'According to the passage, Japanese tea ceremony emphasises:',
    options: ['Speed and efficiency', 'Harmony and tranquility', 'Strength and bitterness', 'Luxury and wealth'] },
  { id: 7, kind: 'gap', text: 'Tea was first cultivated in ___ over 4,700 years ago.' },
];

function ScreenReading({ go }) {
  const [tab, setTab] = useState('passage');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState(new Set());
  const [secondsLeft, setSecondsLeft] = useState(60 * 60 - 312);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const q = READING_QUESTIONS[current];
  const answered = new Set(Object.keys(answers).map((k) => parseInt(k)));
  const setAnswer = (v) => setAnswers((a) => ({ ...a, [current]: v }));
  const toggleMark = () => setMarked((m) => {
    const n = new Set(m); n.has(current) ? n.delete(current) : n.add(current); return n;
  });

  return (
    <div className="screen">
      <StatusBar />
      <ExamTopBar
        candidate="Nguyễn V. An"
        timer={{ label: fmtTime(secondsLeft), section: 'Reading' }}
        examTitle="IELTS ACADEMIC · READING · PASSAGE 1"
        tools={[]}
        onHelp={() => go('overview')}
      />

      <div className="seg">
        <button className={tab === 'passage' ? 'active' : ''} onClick={() => setTab('passage')}>Đoạn văn</button>
        <button className={tab === 'questions' ? 'active' : ''} onClick={() => setTab('questions')}>Câu hỏi</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 16px', background: 'var(--surface)' }}>
        {tab === 'passage' ? (
          <div className="passage">
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>
              {READING_PASSAGE.title}
            </div>
            {READING_PASSAGE.paragraphs.map((p) => (
              <p key={p.letter}>
                <span className="para-letter">{p.letter}</span>
                {p.text}
              </p>
            ))}
            <div style={{
              padding: 12, borderRadius: 10, background: 'var(--accent-soft)',
              fontSize: 12, color: 'var(--accent-dark)', marginTop: 8,
            }}>
              <b>Mẹo:</b> Bạn có thể chuyển sang tab "Câu hỏi" bất cứ lúc nào và quay lại đây.
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 700 }}>
                Câu {q.id} / {READING_QUESTIONS.length}
              </div>
              <button className="chip muted" onClick={toggleMark} style={{ border: 'none', cursor: 'pointer', background: marked.has(current) ? '#FEE2E2' : 'var(--divider)', color: marked.has(current) ? 'var(--wrong)' : 'var(--text-2)' }}>
                <Icon name="bookmark" size={12} /> {marked.has(current) ? 'Đã đánh dấu' : 'Đánh dấu'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
              <div style={{
                minWidth: 32, height: 32, padding: '0 8px', borderRadius: 8, background: '#111827', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0,
              }}>{q.id}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.55, paddingTop: 5 }}>
                {q.text}
              </div>
            </div>

            {q.kind === 'tfng' && (
              <div className="tfn-group">
                {['TRUE','FALSE','NOT GIVEN'].map((opt) => (
                  <button key={opt} className={'tfn-pill' + (answers[current] === opt ? ' selected' : '')}
                          onClick={() => setAnswer(opt)}>{opt}</button>
                ))}
              </div>
            )}

            {q.kind === 'mcq' && q.options.map((opt, i) => {
              const sel = answers[current] === opt;
              return (
                <div key={i} className={'option-row' + (sel ? ' selected' : '')} onClick={() => setAnswer(opt)}>
                  <div className="option-bullet">{String.fromCharCode(65 + i)}</div>
                  <div className="option-text">{opt}</div>
                </div>
              );
            })}

            {q.kind === 'match' && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {q.options.map((o) => (
                  <button key={o}
                    className={'tfn-pill' + (answers[current] === o ? ' selected' : '')}
                    style={{ flex: '0 0 56px' }}
                    onClick={() => setAnswer(o)}
                  >{o}</button>
                ))}
              </div>
            )}

            {q.kind === 'gap' && (
              <input
                type="text"
                value={answers[current] || ''}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Nhập câu trả lời..."
                style={{
                  width: '100%', padding: '12px 14px', fontSize: 14,
                  border: '1.5px solid var(--border)', borderRadius: 10,
                  background: 'var(--surface)', color: 'var(--text)', outline: 'none', fontFamily: 'inherit',
                }}
              />
            )}
          </>
        )}
      </div>

      <QuestionPalette
        total={READING_QUESTIONS.length}
        current={current}
        answered={answered}
        marked={marked}
        onJump={(i) => { setCurrent(i); setTab('questions'); }}
        onPrev={() => setCurrent((c) => Math.max(0, c - 1))}
        onNext={() => {
          if (current >= READING_QUESTIONS.length - 1) go('writing');
          else { setCurrent((c) => c + 1); setTab('questions'); }
        }}
      />
      <div className="home-indicator" />
    </div>
  );
}

// ============================================================
// WRITING
// ============================================================
function ScreenWriting({ go }) {
  const [task, setTask] = useState(1);
  const [text1, setText1] = useState('The chart illustrates the proportion of households that owned a smartphone in three Asian countries — Vietnam, Thailand, and Indonesia — between 2010 and 2024.\n\nOverall, smartphone ownership in all three countries rose significantly over the period, with Vietnam showing the steepest increase.\n\n');
  const [text2, setText2] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(60 * 60 - 1234);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const currentText = task === 1 ? text1 : text2;
  const setText = task === 1 ? setText1 : setText2;
  const wordCount = currentText.trim().split(/\s+/).filter(Boolean).length;
  const minWords = task === 1 ? 150 : 250;
  const wcClass = wordCount === 0 ? 'word-count' : wordCount >= minWords ? 'word-count good' : 'word-count under';

  return (
    <div className="screen">
      <StatusBar />
      <ExamTopBar
        candidate="Nguyễn V. An"
        timer={{ label: fmtTime(secondsLeft), section: 'Writing' }}
        examTitle={`IELTS ACADEMIC · WRITING · TASK ${task}`}
        tools={[]}
        onHelp={() => go('overview')}
      />

      <div className="seg">
        <button className={task === 1 ? 'active' : ''} onClick={() => setTask(1)}>Task 1 · 150 từ</button>
        <button className={task === 2 ? 'active' : ''} onClick={() => setTask(2)}>Task 2 · 250 từ</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 16px 12px', minHeight: 0, background: 'var(--surface)' }}>
        {/* Prompt */}
        <div style={{
          padding: 12, borderRadius: 12, background: 'var(--surface-2)',
          border: '1px solid var(--border)', marginBottom: 10,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', marginBottom: 6, letterSpacing: 0.5 }}>
            {task === 1 ? 'TASK 1 · 20 PHÚT · 150 TỪ' : 'TASK 2 · 40 PHÚT · 250 TỪ'}
          </div>
          {task === 1 ? (
            <>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55, marginBottom: 8 }}>
                The chart below shows the percentage of households owning a smartphone in three Asian countries from 2010 to 2024.
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
              </div>
              {/* Mock chart placeholder */}
              <div style={{
                marginTop: 10, height: 110, borderRadius: 10,
                background: 'repeating-linear-gradient(135deg, #F1F5F9, #F1F5F9 8px, #E2E8F0 8px, #E2E8F0 9px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-3)', fontFamily: 'monospace', fontSize: 11,
              }}>
                {'<chart: smartphone ownership 2010–2024>'}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55 }}>
              Some people believe that universities should focus on providing academic skills, while others think they should prepare students for future employment.
              <br/><br/>
              <b>Discuss both views and give your own opinion.</b>
            </div>
          )}
        </div>

        {/* Word count chip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div className={wcClass}>{wordCount} / {minWords} từ</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="tool-btn" title="Đếm ký tự">
              <Icon name="list" size={16} />
            </button>
            <button className="tool-btn" title="Phóng to chữ">
              <Icon name="sparkles" size={16} />
            </button>
          </div>
        </div>

        <textarea
          className="writing-area"
          value={currentText}
          onChange={(e) => setText(e.target.value)}
          placeholder="Bắt đầu viết câu trả lời của bạn..."
        />
      </div>

      <div className="palette-bar">
        <button className="btn ghost sm" onClick={() => go('reading')}>
          <Icon name="arrow-left" size={14} /> Quay lại
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'var(--text-2)' }}>
          Task {task} / 2
        </div>
        {task === 1 ? (
          <button className="btn primary sm" onClick={() => setTask(2)}>
            Sang Task 2 <Icon name="arrow-right" size={14} />
          </button>
        ) : (
          <button className="btn primary sm" onClick={() => go('speaking')}>
            Tiếp tục <Icon name="arrow-right" size={14} />
          </button>
        )}
      </div>
      <div className="home-indicator" />
    </div>
  );
}

// ============================================================
// SPEAKING
// ============================================================
const SPEAKING_QUESTIONS = [
  { part: 1, prompt: 'Let\'s talk about your hometown. Where is your hometown located?' },
  { part: 1, prompt: 'What do you like most about your hometown?' },
  { part: 1, prompt: 'Has your hometown changed much since you were a child?' },
  { part: 2, prompt: 'Describe a book that you have recently enjoyed reading. You should say: what the book was about, why you chose it, what you learned from it, and explain why you enjoyed it.', cue: true, prepTime: 60 },
  { part: 3, prompt: 'How do reading habits differ between younger and older generations in your country?' },
];

function ScreenSpeaking({ go }) {
  const [current, setCurrent] = useState(0);
  const [recording, setRecording] = useState(false);
  const [recordedSeconds, setRecordedSeconds] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(14 * 60 - 422);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
      if (recording) setRecordedSeconds((r) => r + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [recording]);

  const q = SPEAKING_QUESTIONS[current];

  return (
    <div className="screen">
      <StatusBar />
      <ExamTopBar
        candidate="Nguyễn V. An"
        timer={{ label: fmtTime(secondsLeft), section: 'Speaking' }}
        examTitle={`IELTS ACADEMIC · SPEAKING · PART ${q.part}`}
        tools={[]}
        onHelp={() => go('overview')}
      />

      <div className="exam-section-title">
        <div className="label">Part {q.part} · Câu {current + 1} / {SPEAKING_QUESTIONS.length}</div>
        <div className="meta">{recording ? 'Đang ghi âm' : 'Sẵn sàng'}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 20px', background: 'var(--surface)', minHeight: 0 }}>
        {/* Examiner card */}
        <div style={{
          padding: 16, borderRadius: 16,
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          border: '1px solid #BFDBFE', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 999, background: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <Icon name="volume" size={18} color="var(--accent)" />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-dark)', letterSpacing: 0.5 }}>
                EXAMINER
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-2)' }}>Đang nói...</div>
            </div>
          </div>
          <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.55, fontWeight: 500 }}>
            {q.prompt}
          </div>
          {q.cue && (
            <div style={{
              marginTop: 10, padding: 10, borderRadius: 10,
              background: 'white', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5,
            }}>
              <b style={{ color: 'var(--text)' }}>Bạn có {q.prepTime} giây chuẩn bị,</b> sau đó nói trong 1–2 phút.
            </div>
          )}
        </div>

        {/* Recording UI */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
          <button
            className={'mic-btn' + (recording ? ' recording' : '')}
            onClick={() => {
              if (recording) {
                setRecording(false);
              } else {
                setRecording(true);
                setRecordedSeconds(0);
              }
            }}
          >
            <Icon name={recording ? 'stop' : 'mic'} size={36} color="white" />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 26, fontWeight: 800, color: 'var(--text)',
              fontVariantNumeric: 'tabular-nums', letterSpacing: 1,
            }}>
              {fmtTime(recordedSeconds)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>
              {recording ? 'Nhấn để dừng ghi âm' : 'Nhấn để bắt đầu trả lời'}
            </div>
          </div>

          {/* Waveform */}
          {recording && (
            <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 24 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{
                  width: 3, borderRadius: 2, background: 'var(--accent)',
                  height: 8 + Math.abs(Math.sin((Date.now() / 200) + i)) * 16,
                  animation: `pulse-ring 1s ${i * 50}ms infinite`,
                }} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="palette-bar">
        <button className="btn ghost sm" disabled={current === 0} onClick={() => { setCurrent((c) => c - 1); setRecordedSeconds(0); setRecording(false); }}>
          <Icon name="arrow-left" size={14} /> Câu trước
        </button>
        <div style={{ flex: 1 }} />
        <button className="btn primary sm" onClick={() => {
          if (current >= SPEAKING_QUESTIONS.length - 1) go('submitting');
          else { setCurrent((c) => c + 1); setRecordedSeconds(0); setRecording(false); }
        }}>
          {current >= SPEAKING_QUESTIONS.length - 1 ? 'Nộp bài' : 'Câu tiếp'} <Icon name="arrow-right" size={14} />
        </button>
      </div>
      <div className="home-indicator" />
    </div>
  );
}

Object.assign(window, { ScreenListening, ScreenReading, ScreenWriting, ScreenSpeaking });
