import { useEffect, useRef, useState } from "react";

const C = {
  red: "#b91c1c",
  cream: "#fdf8f0",
  text: "#1a1a1a",
  muted: "#7a3030",
  script: "'Caveat', cursive",
  body: "'Nunito', sans-serif",
};

const WEDDING = new Date("2026-06-26T10:30:00");

// ── Countdown
function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ── Fade-in on scroll
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, vis } = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ${delay}ms ease, transform 0.7s ${delay}ms ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Hand-drawn hearts SVG scattered
function ScatteredHearts({ color = C.red, opacity = 0.22 }: { color?: string; opacity?: number }) {
  const hearts = [
    { x: 18, y: 22, s: 1, r: -18 }, { x: 60, y: 10, s: 0.7, r: 10 },
    { x: 105, y: 28, s: 1.1, r: -8 }, { x: 155, y: 8, s: 0.65, r: 20 },
    { x: 200, y: 30, s: 0.9, r: -15 }, { x: 250, y: 12, s: 0.75, r: 12 },
    { x: 295, y: 24, s: 1.05, r: -5 }, { x: 340, y: 6, s: 0.6, r: 18 },
    { x: 385, y: 28, s: 0.85, r: -22 }, { x: 430, y: 14, s: 1.1, r: 8 },
  ];
  return (
    <svg width="100%" height="44" viewBox="0 0 460 44" preserveAspectRatio="xMidYMid meet" style={{ display: "block", pointerEvents: "none" }}>
      {hearts.map(({ x, y, s, r }, i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${r}) scale(${s})`}>
          <path
            d="M0 4 C0 4 -6 -2 -9 0 C-12 2 -10 7 0 13 C10 7 12 2 9 0 C6 -2 0 4 0 4Z"
            fill="none" stroke={color} strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round"
            opacity={opacity + (i % 3) * 0.07}
          />
        </g>
      ))}
    </svg>
  );
}

// ── Filled hearts (for collage overlay)
function FloatingHearts({ color = "white" }: { color?: string }) {
  const hearts = [
    { x: "8%", y: "12%", s: 1.2, r: -15, anim: "0.8s" },
    { x: "80%", y: "8%", s: 0.9, r: 20, anim: "1.1s" },
    { x: "5%", y: "60%", s: 0.75, r: -8, anim: "0.6s" },
    { x: "88%", y: "55%", s: 1.1, r: 12, anim: "1.3s" },
    { x: "15%", y: "85%", s: 0.85, r: 5, anim: "0.9s" },
    { x: "75%", y: "80%", s: 1.0, r: -20, anim: "1.0s" },
    { x: "45%", y: "5%", s: 0.7, r: 8, anim: "1.2s" },
    { x: "50%", y: "90%", s: 0.95, r: -10, anim: "0.7s" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {hearts.map(({ x, y, s, r, anim }, i) => (
        <div key={i} style={{
          position: "absolute", left: x, top: y,
          transform: `rotate(${r}deg) scale(${s})`,
          animation: `heartbeat ${anim} ease-in-out infinite`,
          animationDelay: `${i * 0.15}s`,
          fontSize: "1.4rem",
          color,
          opacity: 0.85,
          lineHeight: 1,
        }}>♥</div>
      ))}
    </div>
  );
}

// ── Squiggly underline
function SvgSquiggle() {
  return (
    <svg height="10" viewBox="0 0 120 10" fill="none" style={{ display: "block", margin: "4px auto 0" }}>
      <path d="M0 7 Q15 1 30 7 Q45 13 60 7 Q75 1 90 7 Q105 13 120 7" stroke={C.red} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ── Card
function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      backgroundColor: C.cream,
      borderRadius: "1.5rem",
      padding: "2rem 1.5rem",
      margin: "0 auto 1.25rem",
      maxWidth: 440,
      width: "100%",
      boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
      boxSizing: "border-box",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
      <div style={{ fontFamily: C.script, fontSize: "clamp(2rem, 6vw, 2.8rem)", color: C.red, lineHeight: 1.1 }}>
        {children}
      </div>
      <SvgSquiggle />
    </div>
  );
}

// ── Countdown
function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING);
  const items = [
    { val: days, label: "дней" },
    { val: hours, label: "часов" },
    { val: minutes, label: "минут" },
    { val: seconds, label: "секунд" },
  ];
  return (
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap" }}>
      {items.map(({ val, label }, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: i < 3 ? "0.5rem" : "0" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: C.script, fontSize: "clamp(2.2rem, 7vw, 3.2rem)", color: C.red, lineHeight: 1,
              border: `2px solid ${C.red}`, borderRadius: "0.75rem", minWidth: "3.2rem",
              padding: "0.25rem 0.6rem", backgroundColor: "rgba(185,28,28,0.07)",
            }}>
              {String(val).padStart(2, "0")}
            </div>
            <div style={{ fontFamily: C.body, fontSize: "0.7rem", color: C.muted, marginTop: "0.3rem" }}>
              {label}
            </div>
          </div>
          {i < 3 && <div style={{ fontFamily: C.script, fontSize: "2rem", color: C.red, marginBottom: "1.4rem", opacity: 0.5 }}>:</div>}
        </div>
      ))}
    </div>
  );
}

// ── Calendar
function CalendarBlock() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  return (
    <div style={{ maxWidth: 300, margin: "0 auto" }}>
      <div style={{ backgroundColor: C.red, borderRadius: "0.75rem 0.75rem 0 0", padding: "0.5rem 1rem", textAlign: "center", fontFamily: C.script, fontSize: "1.3rem", color: "white" }}>
        Июнь 2026
      </div>
      <div style={{ border: `2px solid ${C.red}`, borderTop: "none", borderRadius: "0 0 0.75rem 0.75rem", padding: "0.75rem", backgroundColor: "white" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
          {weekDays.map(d => (
            <div key={d} style={{ textAlign: "center", fontFamily: C.body, fontSize: "0.65rem", fontWeight: 600, color: C.muted, padding: "2px 0" }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
          {days.map(d => {
            const isW = d === 26;
            return (
              <div key={d} style={{
                textAlign: "center", fontFamily: C.body, fontSize: "0.8rem", padding: "5px 2px",
                borderRadius: "50%", backgroundColor: isW ? C.red : "transparent",
                color: isW ? "white" : C.text, fontWeight: isW ? 700 : 400,
              }}>
                {d}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Timeline item
function TimelineItem({ time, title, note, isLast = false }: { time: string; title: string; note: string; isLast?: boolean }) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "3.5rem" }}>
        <div style={{ fontFamily: C.script, fontSize: "1.6rem", color: C.red, lineHeight: 1, whiteSpace: "nowrap" }}>{time}</div>
        {!isLast && (
          <svg width="16" height="48" viewBox="0 0 16 48" style={{ marginTop: "4px" }}>
            <path d="M8 0 Q12 12 8 24 Q4 36 8 48" stroke={C.red} strokeWidth="1.5" fill="none" strokeDasharray="4 3" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <div style={{ paddingTop: "4px", paddingBottom: isLast ? 0 : "1.5rem" }}>
        <div style={{ fontFamily: C.body, fontWeight: 600, fontSize: "0.95rem", color: C.text, marginBottom: "0.2rem" }}>{title}</div>
        <div style={{ fontFamily: C.body, fontSize: "0.8rem", color: C.muted, lineHeight: 1.5, fontStyle: "italic" }}>{note}</div>
      </div>
    </div>
  );
}

// ── RSVP
function RSVPForm() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"yes" | "no" | "">("");
  const [sent, setSent] = useState(false);

  const inputSt: React.CSSProperties = {
    fontFamily: C.body, fontSize: "0.92rem", color: C.text, backgroundColor: "white",
    border: `1.5px solid rgba(185,28,28,0.3)`, borderRadius: "0.6rem",
    padding: "0.75rem 1rem", width: "100%", outline: "none", boxSizing: "border-box",
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
        <div style={{ fontSize: "3rem", display: "inline-block", animation: "heartbeat 1.4s ease-in-out infinite" }}>♥</div>
        <div style={{ fontFamily: C.script, fontSize: "2rem", color: C.red, marginTop: "0.5rem" }}>
          {attend === "yes" ? "Ждём вас!" : "Очень жаль..."}
        </div>
        <p style={{ fontFamily: C.body, fontSize: "0.9rem", color: C.muted, margin: "0.5rem 0 0" }}>Спасибо, {name}!</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
      <div>
        <label style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: "0.35rem" }}>Ваше имя</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Имя и фамилия" style={inputSt} />
      </div>
      <div>
        <label style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: "0.5rem" }}>Придёте?</label>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {(["yes", "no"] as const).map(opt => (
            <button key={opt} onClick={() => setAttend(opt)} style={{
              flex: 1, fontFamily: C.body, fontSize: "0.9rem", fontWeight: 600, padding: "0.7rem 0.5rem",
              borderRadius: "0.6rem", border: `1.5px solid ${attend === opt ? C.red : "rgba(185,28,28,0.25)"}`,
              backgroundColor: attend === opt ? C.red : "white", color: attend === opt ? "white" : C.muted,
              cursor: "pointer", transition: "all 0.2s ease",
            }}>
              {opt === "yes" ? "Да, буду! ♥" : "Не смогу :("}
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => { if (name.trim() && attend) setSent(true); }} style={{
        fontFamily: C.body, fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", padding: "0.85rem", borderRadius: "2rem",
        border: `1.5px solid ${C.red}`,
        backgroundColor: name.trim() && attend ? C.red : "transparent",
        color: name.trim() && attend ? "white" : C.red,
        cursor: "pointer", transition: "all 0.25s ease",
        opacity: name.trim() && attend ? 1 : 0.4,
      }}>
        Отправить ♥
      </button>
    </div>
  );
}

// ── MAIN
export default function Index() {
  const timeline = [
    { time: "10:30", title: "Регистрация брака", note: "Торжественная церемония в Суздале. Возьмите платочки — будут слёзы радости!" },
    { time: "11:00", title: "Фотосессия молодожёнов", note: "Прогулка по историческим улочкам Суздаля" },
    { time: "12:00", title: "Групповые фото", note: "Снимаемся вместе с любимыми гостями" },
    { time: "16:00", title: "Велком-фуршет", note: "Шампанское, закуски — расслабьтесь после дороги" },
    { time: "17:00", title: "Банкет", note: "Ресторан «Вновь», Владимир — начинается праздник!" },
  ];

  return (
    <div style={{ backgroundColor: C.red, minHeight: "100vh", padding: "1.5rem 1rem 4rem" }}>

      {/* ── HERO: детское фото ── */}
      <FadeIn>
        <Card style={{ padding: "0 0 1.5rem", overflow: "hidden" }}>
          <div style={{ borderRadius: "1.5rem 1.5rem 0 0", overflow: "hidden" }}>
            <img
              src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/60e7db4d-3345-429a-a667-464921ab2534.PNG"
              alt="Лизка + Данька"
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <div style={{ padding: "1rem 1.5rem 0", textAlign: "center" }}>
            <ScatteredHearts />
            <p style={{ fontFamily: C.body, fontSize: "0.88rem", color: C.muted, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
              Время пронеслось незаметно, и эти двое скоро поженятся!<br />
              Да-да, мы сами в шоке!
            </p>
          </div>
        </Card>
      </FadeIn>

      {/* ── УЗНАЛИ? ── */}
      <FadeIn delay={100}>
        <Card style={{ padding: "1.5rem 0 0", overflow: "hidden", textAlign: "center" }}>
          <div style={{ padding: "0 1.5rem" }}>
            <SectionTitle>Узнали?</SectionTitle>
            <p style={{ fontFamily: C.body, fontSize: "0.92rem", color: C.muted, lineHeight: 1.75, margin: "0 0 1.25rem", fontStyle: "italic" }}>
              Они учились в одной школе, но так и не познакомились.<br />
              А теперь — скоро свадьба. Да-да, мы сами в шоке!
            </p>
          </div>

          {/* Чёрно-белый коллаж с сердечками и красной рамкой */}
          <div style={{ position: "relative", margin: "0", border: `3px solid ${C.red}` }}>
            <img
              src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/1a3e40fc-6c4d-45ec-95fd-93a133b83688.png"
              alt="Elizaveta & Daniil"
              style={{ width: "100%", display: "block", filter: "grayscale(0.3)" }}
            />
            {/* Белые рисованные сердечки поверх */}
            <FloatingHearts color="white" />
            {/* Красная рамка-уголки */}
            <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 0 4px ${C.red}`, pointerEvents: "none" }} />
          </div>
        </Card>
      </FadeIn>

      {/* ── МЫ ВАС ЛЮБИМ ── */}
      <FadeIn delay={100}>
        <Card style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
          <ScatteredHearts opacity={0.1} />
          <SectionTitle>Мы так вас любим!</SectionTitle>
          <p style={{ fontFamily: C.body, fontSize: "0.92rem", color: C.muted, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
            Поэтому приглашаем стать свидетелями дня рождения нашей семьи, которое состоится{" "}
            <strong style={{ color: C.red }}>26 июня 2026 года!</strong>
          </p>
          <div style={{ fontSize: "2.5rem", marginTop: "1rem", display: "inline-block", animation: "heartbeat 1.4s ease-in-out infinite" }}>♥</div>
        </Card>
      </FadeIn>

      {/* ── CALENDAR + WHERE ── */}
      <FadeIn delay={100}>
        <Card>
          <SectionTitle>Когда?</SectionTitle>
          <CalendarBlock />
          <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
            <div style={{ fontFamily: C.script, fontSize: "1.9rem", color: C.red, marginBottom: "0.25rem" }}>📍 Где?</div>
            <SvgSquiggle />
            <p style={{ fontFamily: C.body, fontSize: "0.88rem", color: C.muted, margin: "0.75rem 0 1rem", lineHeight: 1.7 }}>
              Церемония: <strong style={{ color: C.text }}>Суздаль</strong><br />
              Банкет: <strong style={{ color: C.text }}>ресторан «Вновь», Владимир</strong><br />
              <span style={{ fontSize: "0.78rem" }}>ул. Летне-Перевозинская, 1А</span>
            </p>
            <a href="https://yandex.ru/maps/?text=Владимир+ул.+Летне-Перевозинская+1А" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: C.body, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "0.6rem 1.5rem", border: `1.5px solid ${C.red}`, color: C.red,
              textDecoration: "none", borderRadius: "2rem", display: "inline-block",
            }}>Открыть карту</a>
          </div>
        </Card>
      </FadeIn>

      {/* ── TIMELINE ── */}
      <FadeIn delay={100}>
        <Card>
          <SectionTitle>Во сколько?</SectionTitle>
          {timeline.map((item, i) => (
            <TimelineItem key={i} time={item.time} title={item.title} note={item.note} isLast={i === timeline.length - 1} />
          ))}
        </Card>
      </FadeIn>

      {/* ── COUNTDOWN + фото инстакс ── */}
      <FadeIn delay={100}>
        <Card style={{ textAlign: "center" }}>
          <SectionTitle>До нашей встречи осталось</SectionTitle>
          <Countdown />

          <ScatteredHearts opacity={0.13} />

          <p style={{ fontFamily: C.script, fontSize: "1.5rem", color: C.muted, marginTop: "0.5rem", marginBottom: "0.25rem", lineHeight: 1.4 }}>
            С нетерпением ждём вас<br />на нашем празднике любви!
          </p>
          <p style={{ fontFamily: C.body, fontSize: "0.85rem", color: C.muted, fontStyle: "italic", margin: "0 0 1.5rem" }}>
            Ваши Daniil и Elizaveta
          </p>

          {/* Фото инстакс — поляроиды */}
          <div style={{ position: "relative", padding: "0.5rem 0 1rem" }}>
            {/* Первый поляроид — наклонён влево */}
            <div style={{
              background: "white", padding: "8px 8px 28px",
              boxShadow: "2px 4px 14px rgba(0,0,0,0.22)",
              transform: "rotate(-4deg) translateX(-10px)",
              display: "inline-block", position: "relative", zIndex: 1,
              border: `1px solid rgba(0,0,0,0.08)`,
              marginRight: "-40px",
            }}>
              <img
                src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/a800a7d2-871e-459d-b33c-38676908e94a.jpg"
                alt=""
                style={{ width: "clamp(130px, 36vw, 170px)", height: "clamp(100px, 28vw, 130px)", objectFit: "cover", objectPosition: "top", display: "block" }}
              />
            </div>
            {/* Второй поляроид — наклонён вправо */}
            <div style={{
              background: "white", padding: "8px 8px 28px",
              boxShadow: "2px 4px 14px rgba(0,0,0,0.22)",
              transform: "rotate(3deg) translateX(10px)",
              display: "inline-block", position: "relative", zIndex: 2,
              border: `1px solid rgba(0,0,0,0.08)`,
            }}>
              <img
                src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/a800a7d2-871e-459d-b33c-38676908e94a.jpg"
                alt=""
                style={{ width: "clamp(130px, 36vw, 170px)", height: "clamp(100px, 28vw, 130px)", objectFit: "cover", objectPosition: "center bottom", display: "block" }}
              />
            </div>
          </div>

          <div style={{ fontSize: "1.5rem", marginTop: "0.5rem", letterSpacing: "0.5em", color: C.red, opacity: 0.5 }}>♥ ♥ ♥</div>
        </Card>
      </FadeIn>

      {/* ── ДРЕСС-КОД ── */}
      <FadeIn delay={100}>
        <Card style={{ textAlign: "center" }}>
          <SectionTitle>Дресс-код</SectionTitle>
          <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginBottom: "1rem" }}>
            {[
              { color: "#111", label: "Чёрный", shadow: "0 4px 12px rgba(0,0,0,0.3)", border: false },
              { color: "#f9f5ec", label: "Белый", shadow: "0 4px 12px rgba(0,0,0,0.1)", border: true },
            ].map(({ color, label, shadow, border }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: color, border: border ? `2px solid ${C.red}` : "none", boxShadow: shadow }} />
                <span style={{ fontFamily: C.body, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted }}>{label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: C.body, fontSize: "0.82rem", color: C.muted, fontStyle: "italic", margin: 0 }}>
            Только чёрный и белый — строго и элегантно
          </p>
        </Card>
      </FadeIn>

      {/* ── ВАЖНОЕ ── */}
      <FadeIn delay={100}>
        <Card>
          <SectionTitle>Важное</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { icon: "🎁", title: "Подарки", text: "Дорогие гости, приносите радость в душе, а подарки — в конверте" },
              { icon: "🚗", title: "Транспорт", text: "Нужна помощь с дорогой до Суздаля? Напишите нам заранее — поможем!" },
            ].map(({ icon, title, text }, i) => (
              <div key={i}>
                {i > 0 && <div style={{ height: 1, backgroundColor: "rgba(185,28,28,0.12)", marginBottom: "1.25rem" }} />}
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.35rem" }}>{icon}</div>
                  <div style={{ fontFamily: C.script, fontSize: "1.5rem", color: C.red, marginBottom: "0.4rem" }}>{title}</div>
                  <p style={{ fontFamily: C.body, fontSize: "0.85rem", color: C.muted, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>

      {/* ── RSVP ── */}
      <FadeIn delay={100}>
        <Card>
          <SectionTitle>Придёте?</SectionTitle>
          <p style={{ fontFamily: C.body, fontSize: "0.8rem", color: C.muted, textAlign: "center", fontStyle: "italic", margin: "-0.5rem 0 1.25rem" }}>
            Просим ответить до 1 июня 2026
          </p>
          <RSVPForm />
        </Card>
      </FadeIn>

      {/* ── FOOTER ── */}
      <FadeIn delay={100}>
        <div style={{ textAlign: "center", paddingTop: "0.75rem" }}>
          <ScatteredHearts color="rgba(255,255,255,0.4)" opacity={0.5} />
          <div style={{ fontFamily: C.script, fontSize: "clamp(2.5rem, 8vw, 4rem)", color: C.cream, lineHeight: 1 }}>E &amp; D</div>
          <div style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.5em", marginTop: "0.4rem" }}>♥ ♥ ♥</div>
          <p style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>
            26 · VI · 2026
          </p>
        </div>
      </FadeIn>

    </div>
  );
}
