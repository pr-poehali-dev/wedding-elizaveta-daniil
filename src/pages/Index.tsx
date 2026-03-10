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

// ── Intersection observer hook
function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

type AnimType = "up" | "down" | "left" | "right" | "zoom" | "rotate" | "pop" | "card";

const ANIM_MAP: Record<AnimType, { hidden: React.CSSProperties; visible: React.CSSProperties; transition: string }> = {
  up:     { hidden: { opacity: 0, transform: "translateY(36px)" },         visible: { opacity: 1, transform: "translateY(0)" },        transition: "opacity 0.75s ease, transform 0.75s cubic-bezier(.22,.68,0,1.2)" },
  down:   { hidden: { opacity: 0, transform: "translateY(-28px)" },        visible: { opacity: 1, transform: "translateY(0)" },        transition: "opacity 0.7s ease, transform 0.7s ease" },
  left:   { hidden: { opacity: 0, transform: "translateX(-36px)" },        visible: { opacity: 1, transform: "translateX(0)" },        transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.22,.68,0,1.1)" },
  right:  { hidden: { opacity: 0, transform: "translateX(36px)" },         visible: { opacity: 1, transform: "translateX(0)" },        transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.22,.68,0,1.1)" },
  zoom:   { hidden: { opacity: 0, transform: "scale(0.88)" },              visible: { opacity: 1, transform: "scale(1)" },            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(.34,1.56,.64,1)" },
  rotate: { hidden: { opacity: 0, transform: "rotate(-5deg) scale(0.93)" },visible: { opacity: 1, transform: "rotate(0) scale(1)" },  transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.34,1.56,.64,1)" },
  pop:    { hidden: { opacity: 0, transform: "scale(0.65) rotate(-6deg)" },visible: { opacity: 1, transform: "scale(1) rotate(0)" },  transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(.34,1.8,.64,1)" },
  card:   { hidden: { opacity: 0, transform: "translateY(44px) scale(0.96)" }, visible: { opacity: 1, transform: "translateY(0) scale(1)" }, transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(.22,.68,0,1.15)" },
};

function Anim({ children, delay = 0, type = "up", style = {}, as = "div" }: {
  children: React.ReactNode; delay?: number; type?: AnimType;
  style?: React.CSSProperties; as?: "div" | "span";
}) {
  const { ref, vis } = useInView();
  const map = ANIM_MAP[type];
  const Tag = as as "div";
  return (
    <Tag ref={ref} style={{
      ...(vis ? map.visible : map.hidden),
      transition: `${map.transition.replace("0.7s", `0.7s`).replace("opacity", `opacity ${delay}ms`)} , transform ${map.transition.split(",")[1]?.trim() || "0.7s ease"} ${delay}ms`,
      transitionDelay: `${delay}ms`,
      ...style,
    }}>
      {children}
    </Tag>
  );
}

// Keep FadeIn for backward compat
function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return <Anim type="card" delay={delay} style={style}>{children}</Anim>;
}

// Floating hearts particles
function HeartParticles() {
  const hearts = [
    { left: "10%", delay: 0, dur: 3.2, size: 14 },
    { left: "25%", delay: 0.8, dur: 2.8, size: 10 },
    { left: "45%", delay: 1.6, dur: 3.6, size: 16 },
    { left: "65%", delay: 0.4, dur: 3.0, size: 11 },
    { left: "80%", delay: 1.2, dur: 2.6, size: 13 },
    { left: "90%", delay: 2.0, dur: 3.4, size: 9 },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {hearts.map((h, i) => (
        <div key={i} style={{
          position: "absolute", bottom: 0, left: h.left,
          fontSize: h.size, color: "rgba(255,255,255,0.6)",
          animation: `floatHeart ${h.dur}s ${h.delay}s ease-in infinite`,
        }}>♥</div>
      ))}
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

// ── Hand-drawn SVG icons for timeline
function IconRings() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="13" cy="18" r="8" stroke={C.red} strokeWidth="2" fill="none"/>
      <circle cx="23" cy="18" r="8" stroke={C.red} strokeWidth="2" fill="none"/>
      <path d="M13 10 Q13 6 17 6" stroke={C.red} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M23 10 Q23 6 27 6" stroke={C.red} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
function IconCamera() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="12" width="28" height="18" rx="3" stroke={C.red} strokeWidth="1.8" fill="none"/>
      <circle cx="18" cy="21" r="5" stroke={C.red} strokeWidth="1.8" fill="none"/>
      <path d="M13 12 L15 8 L21 8 L23 12" stroke={C.red} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      <circle cx="27" cy="16" r="1.5" fill={C.red}/>
    </svg>
  );
}
function IconChampagne() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M12 4 L14 18 Q14 24 18 24 Q22 24 22 18 L24 4Z" stroke={C.red} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      <line x1="18" y1="24" x2="18" y2="32" stroke={C.red} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="13" y1="32" x2="23" y2="32" stroke={C.red} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 10 L24 10" stroke={C.red} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M27 6 Q29 4 30 6" stroke={C.red} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M28 9 Q31 8 31 11" stroke={C.red} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
function IconBalloon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <ellipse cx="14" cy="14" rx="8" ry="10" stroke={C.red} strokeWidth="1.8" fill="none"/>
      <ellipse cx="23" cy="16" rx="7" ry="9" stroke={C.red} strokeWidth="1.8" fill="none"/>
      <path d="M14 24 Q14 28 18 32" stroke={C.red} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M23 25 Q23 29 18 32" stroke={C.red} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 26 C16 26 4 18 4 10 C4 6.5 7 4 10.5 4 C12.5 4 14.5 5 16 7 C17.5 5 19.5 4 21.5 4 C25 4 28 6.5 28 10 C28 18 16 26 16 26Z" stroke={C.red} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

const TIMELINE_ICONS = [IconRings, IconCamera, IconChampagne, IconBalloon, IconHeart];

// ── Timeline item
function TimelineItem({ time, title, note, icon: Icon, isLast = false, optional = false }: {
  time: string; title: string; note: string; icon: React.FC; isLast?: boolean; optional?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "2.5rem" }}>
        <div style={{ marginBottom: "2px" }}><Icon /></div>
        {!isLast && (
          <svg width="16" height="44" viewBox="0 0 16 44" style={{ marginTop: "2px" }}>
            <path d="M8 0 Q12 11 8 22 Q4 33 8 44" stroke={C.red} strokeWidth="1.5" fill="none" strokeDasharray="4 3" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <div style={{ paddingTop: "4px", paddingBottom: isLast ? 0 : "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2px" }}>
          <div style={{ fontFamily: C.script, fontSize: "1.7rem", color: C.red, lineHeight: 1 }}>{time}</div>
          {optional && (
            <span style={{
              fontFamily: C.body, fontSize: "0.6rem", letterSpacing: "0.08em",
              color: "white", backgroundColor: C.red, borderRadius: "1rem",
              padding: "2px 8px", fontWeight: 600, opacity: 0.85,
            }}>необязательно</span>
          )}
        </div>
        <div style={{ fontFamily: C.body, fontWeight: 600, fontSize: "0.9rem", color: C.text, marginBottom: "4px" }}>{title}</div>
        <div style={{ fontFamily: C.body, fontSize: "0.78rem", color: C.muted, lineHeight: 1.6, fontStyle: "italic" }}>{note}</div>
      </div>
    </div>
  );
}

// ── RSVP
function RSVPForm() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"ceremony" | "banquet" | "no" | "">("");
  const [guests, setGuests] = useState("1");
  const [sent, setSent] = useState(false);

  const inputSt: React.CSSProperties = {
    fontFamily: C.body, fontSize: "0.92rem", color: C.text, backgroundColor: "white",
    border: `1.5px solid rgba(185,28,28,0.3)`, borderRadius: "0.6rem",
    padding: "0.75rem 1rem", width: "100%", outline: "none", boxSizing: "border-box",
  };

  const sendToTelegram = async () => {
    if (!name.trim() || !attend) return;
    const statusMap = {
      ceremony: `✅ Приду на роспись и банкет! Гостей: ${guests}`,
      banquet: `🥂 Приду только на банкет. Гостей: ${guests}`,
      no: "❌ К сожалению, не смогу прийти",
    };
    try {
      await fetch("https://functions.poehali.dev/8e61f7db-cf5d-45ec-a6c6-e3d9c2d97cd3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attend, guests, status: statusMap[attend] }),
      });
    } catch (e) { console.error(e); }
    setSent(true);
  };

  if (sent) {
    const messages = {
      ceremony: { title: "Увидимся в Суздале! ♥", sub: "Мы так рады, что вы будете с нами с самого начала!" },
      banquet: { title: "Ждём вас на банкете! ♥", sub: "Готовьтесь — будет весело и очень тепло!" },
      no: { title: "Жаль, что не получится...", sub: "Будем думать о вас и обязательно отпразднуем отдельно!" },
    };
    const msg = messages[attend as keyof typeof messages];
    return (
      <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
        <div style={{ fontSize: "3rem", display: "inline-block", animation: "heartbeat 1.4s ease-in-out infinite" }}>♥</div>
        <div style={{ fontFamily: C.script, fontSize: "2rem", color: C.red, marginTop: "0.5rem", lineHeight: 1.2 }}>
          {msg.title}
        </div>
        <p style={{ fontFamily: C.body, fontSize: "0.88rem", color: C.muted, margin: "0.75rem 0 0", lineHeight: 1.6, fontStyle: "italic" }}>
          {msg.sub}<br />Спасибо, {name}!
        </p>
      </div>
    );
  }

  const options = [
    { val: "ceremony" as const, label: "Роспись + банкет", sub: "Буду с вами весь день ♥", icon: "💍" },
    { val: "banquet" as const, label: "Только банкет", sub: "Приеду к вечеру", icon: "🥂" },
    { val: "no" as const, label: "Не смогу прийти", sub: "К сожалению...", icon: "😢" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: "0.35rem" }}>Ваше имя</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Имя и фамилия" style={inputSt} />
      </div>

      <div>
        <label style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: "0.6rem" }}>Ваши планы</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {options.map(opt => (
            <button key={opt.val} onClick={() => setAttend(opt.val)} style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.85rem 1rem", borderRadius: "0.75rem",
              border: `1.5px solid ${attend === opt.val ? C.red : "rgba(185,28,28,0.2)"}`,
              backgroundColor: attend === opt.val ? "rgba(185,28,28,0.06)" : "white",
              cursor: "pointer", transition: "all 0.2s ease", textAlign: "left",
            }}>
              <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{opt.icon}</span>
              <div>
                <div style={{ fontFamily: C.body, fontWeight: 700, fontSize: "0.88rem", color: attend === opt.val ? C.red : C.text }}>{opt.label}</div>
                <div style={{ fontFamily: C.body, fontSize: "0.72rem", color: C.muted, fontStyle: "italic" }}>{opt.sub}</div>
              </div>
              <div style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", border: `2px solid ${attend === opt.val ? C.red : "rgba(185,28,28,0.25)"}`, backgroundColor: attend === opt.val ? C.red : "transparent", flexShrink: 0 }} />
            </button>
          ))}
        </div>
      </div>

      {(attend === "ceremony" || attend === "banquet") && (
        <div>
          <label style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: "0.35rem" }}>Количество гостей</label>
          <select value={guests} onChange={e => setGuests(e.target.value)} style={{ ...inputSt, appearance: "none" as const }}>
            {["1", "2", "3", "4"].map(n => (
              <option key={n} value={n}>{n} {n === "1" ? "гость" : "гостя"}</option>
            ))}
          </select>
        </div>
      )}

      <button onClick={sendToTelegram} style={{
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
    {
      time: "10:30",
      title: "Регистрация брака",
      note: "Торжественная церемония в Суздале. Мы будем безмерно счастливы видеть вас рядом в этот момент — но понимаем, что дорога неблизкая. Если не получится приехать к росписи, не переживайте: ждём вас на банкете с распростёртыми объятиями! ♥",
      optional: true,
    },
    { time: "11:00", title: "Фотосессия молодожёнов", note: "Прогулка по историческим улочкам Суздаля" },
    { time: "12:00", title: "Групповые фото", note: "Снимаемся вместе с любимыми гостями" },
    { time: "16:00", title: "Велком-фуршет", note: "Шампанское, закуски — расслабьтесь после дороги" },
    { time: "17:00", title: "Банкет", note: "Ресторан «Вновь», Владимир — вот где начнётся настоящий праздник!" },
  ];

  return (
    <div style={{ backgroundColor: C.red, minHeight: "100vh", padding: "1.5rem 1rem 4rem", position: "relative" }}>

      {/* ── HERO: детское фото ── */}
      <Anim type="zoom">
        <Card style={{ padding: "0 0 1.5rem", overflow: "hidden" }}>
          <Anim type="down">
            <div style={{ borderRadius: "1.5rem 1.5rem 0 0", overflow: "hidden" }}>
              <img
                src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/60e7db4d-3345-429a-a667-464921ab2534.PNG"
                alt="Лизка + Данька"
                style={{ width: "100%", display: "block", transition: "transform 0.6s ease", }}
              />
            </div>
          </Anim>
          <div style={{ padding: "1rem 1.5rem 0", textAlign: "center" }}>
            <ScatteredHearts />
            <Anim type="up" delay={200}>
              <p style={{ fontFamily: C.body, fontSize: "0.88rem", color: C.muted, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                Время пронеслось незаметно, и эти двое скоро поженятся!
              </p>
            </Anim>
          </div>
        </Card>
      </Anim>

      {/* ── УЗНАЛИ? ── */}
      <Anim type="card" delay={50}>
        <Card style={{ padding: "1.5rem 0 0", overflow: "hidden", textAlign: "center" }}>
          <div style={{ padding: "0 1.5rem" }}>
            <Anim type="up"><SectionTitle>Узнали?</SectionTitle></Anim>
            <Anim type="up" delay={120}>
              <p style={{ fontFamily: C.body, fontSize: "0.92rem", color: C.muted, lineHeight: 1.75, margin: "0 0 1.25rem", fontStyle: "italic" }}>
                Они учились в одной школе, но так и не познакомились.<br />
                А теперь — скоро свадьба. Да-да, мы сами в шоке!
              </p>
            </Anim>
          </div>
          <Anim type="zoom" delay={200}>
            <div style={{ position: "relative", margin: "0", border: `3px solid ${C.red}` }}>
              <img
                src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/1a3e40fc-6c4d-45ec-95fd-93a133b83688.png"
                alt="Elizaveta & Daniil"
                style={{ width: "100%", display: "block", filter: "grayscale(0.3)" }}
              />
              <FloatingHearts color="white" />
              <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 0 4px ${C.red}`, pointerEvents: "none" }} />
            </div>
          </Anim>
        </Card>
      </Anim>

      {/* ── МЫ ВАС ЛЮБИМ ── */}
      <Anim type="card" delay={50}>
        <Card style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
          <HeartParticles />
          <ScatteredHearts opacity={0.1} />
          <Anim type="rotate"><SectionTitle>Мы так вас любим!</SectionTitle></Anim>
          <Anim type="up" delay={150}>
            <p style={{ fontFamily: C.body, fontSize: "0.92rem", color: C.muted, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
              Поэтому приглашаем стать свидетелями дня рождения нашей семьи, которое состоится{" "}
              <strong style={{ color: C.red }}>26 июня 2026 года!</strong>
            </p>
          </Anim>
          <Anim type="pop" delay={300}>
            <div style={{ fontSize: "2.5rem", marginTop: "1rem", display: "inline-block", animation: "heartbeat 1.4s ease-in-out infinite" }}>♥</div>
          </Anim>
        </Card>
      </Anim>

      {/* ── CALENDAR + WHERE ── */}
      <Anim type="card" delay={50}>
        <Card>
          <Anim type="up"><SectionTitle>Когда?</SectionTitle></Anim>
          <Anim type="zoom" delay={100}><CalendarBlock /></Anim>
          <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
            <Anim type="left" delay={200}>
              <div style={{ fontFamily: C.script, fontSize: "1.9rem", color: C.red, marginBottom: "0.25rem" }}>📍 Где?</div>
              <SvgSquiggle />
              <p style={{ fontFamily: C.body, fontSize: "0.88rem", color: C.muted, margin: "0.75rem 0 1rem", lineHeight: 1.7 }}>
                Церемония: <strong style={{ color: C.text }}>Суздаль</strong><br />
                Банкет: <strong style={{ color: C.text }}>ресторан «Вновь», Владимир</strong><br />
                <span style={{ fontSize: "0.78rem" }}>ул. Летне-Перевозинская, 1А</span>
              </p>
            </Anim>
            <Anim type="zoom" delay={300}>
              <div style={{ borderRadius: "1rem", overflow: "hidden", border: `2px solid ${C.red}`, marginBottom: "1.25rem" }}>
                <img
                  src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/2c8be2d5-8fd3-40a4-8b57-c6362d933e78.jpg"
                  alt="Ресторан Вновь"
                  style={{ width: "100%", display: "block", maxHeight: "200px", objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </Anim>
            <Anim type="up" delay={400}>
              <a href="https://yandex.ru/maps/?text=Владимир+ул.+Летне-Перевозинская+1А" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: C.body, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.6rem 1.5rem", border: `1.5px solid ${C.red}`, color: C.red,
                textDecoration: "none", borderRadius: "2rem", display: "inline-block",
              }}>Открыть карту</a>
            </Anim>
          </div>
        </Card>
      </Anim>

      {/* ── TIMELINE ── */}
      <Anim type="card" delay={50}>
        <Card>
          <Anim type="up"><SectionTitle>Во сколько?</SectionTitle></Anim>
          {timeline.map((item, i) => (
            <Anim key={i} type="left" delay={i * 100}>
              <TimelineItem
                time={item.time}
                title={item.title}
                note={item.note}
                icon={TIMELINE_ICONS[i]}
                isLast={i === timeline.length - 1}
                optional={"optional" in item ? item.optional : false}
              />
            </Anim>
          ))}
        </Card>
      </Anim>

      {/* ── ДРЕСС-КОД ── */}
      <Anim type="card" delay={50}>
        <Card style={{ textAlign: "center" }}>
          <Anim type="up"><SectionTitle>Дресс-код</SectionTitle></Anim>
          <Anim type="up" delay={100}>
            <p style={{ fontFamily: C.body, fontSize: "0.88rem", color: C.muted, lineHeight: 1.75, margin: "0 0 1.5rem", fontStyle: "italic" }}>
              Для нас главное — ваше присутствие и хорошее настроение!<br />
              Но будем очень признательны, если вы поддержите<br />
              <strong style={{ color: C.text, fontStyle: "normal" }}>спокойную природную цветовую гамму</strong><br />
              и выберете <strong style={{ color: C.text, fontStyle: "normal" }}>однотонные наряды без мелкого принта</strong>.
            </p>
          </Anim>
          <Anim type="zoom" delay={200}>
            <div style={{ borderRadius: "1rem", overflow: "hidden", border: `2px solid rgba(185,28,28,0.2)`, marginBottom: "1.5rem" }}>
              <img
                src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/789374e5-7e42-4b87-af5f-41f068bef456.png"
                alt="Дресс-код"
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </Anim>
        </Card>
      </Anim>

      {/* ── ВАЖНОЕ ── */}
      <Anim type="card" delay={50}>
        <Card>
          <Anim type="up"><SectionTitle>Важное</SectionTitle></Anim>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { icon: "🎁", title: "Подарки", text: "Дорогие гости, приносите радость в душе, а подарки — в конверте" },
              { icon: "🚗", title: "Транспорт", text: "Нужна помощь с дорогой до Суздаля? Напишите нам заранее — поможем!" },
            ].map(({ icon, title, text }, i) => (
              <Anim key={i} type={i === 0 ? "left" : "right"} delay={i * 150}>
                <div>
                  {i > 0 && <div style={{ height: 1, backgroundColor: "rgba(185,28,28,0.12)", marginBottom: "1.25rem" }} />}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.35rem" }}>{icon}</div>
                    <div style={{ fontFamily: C.script, fontSize: "1.5rem", color: C.red, marginBottom: "0.4rem" }}>{title}</div>
                    <p style={{ fontFamily: C.body, fontSize: "0.85rem", color: C.muted, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{text}</p>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </Card>
      </Anim>

      {/* ── COUNTDOWN + фото инстакс ── */}
      <Anim type="card" delay={50}>
        <Card style={{ textAlign: "center" }}>
          <Anim type="up"><SectionTitle>До нашей встречи осталось</SectionTitle></Anim>
          <Anim type="zoom" delay={100}><Countdown /></Anim>
          <ScatteredHearts opacity={0.13} />
          <Anim type="up" delay={200}>
            <p style={{ fontFamily: C.script, fontSize: "1.5rem", color: C.muted, marginTop: "0.5rem", marginBottom: "0.25rem", lineHeight: 1.4 }}>
              С нетерпением ждём вас<br />на нашем празднике любви!
            </p>
            <p style={{ fontFamily: C.body, fontSize: "0.85rem", color: C.muted, fontStyle: "italic", margin: "0 0 1.5rem" }}>
              Ваши Daniil и Elizaveta
            </p>
          </Anim>
          {/* Поляроиды */}
          <div style={{ position: "relative", padding: "0.5rem 0 1rem" }}>
            <Anim type="rotate" delay={100} style={{ display: "inline-block" }}>
              <div style={{ background: "white", padding: "8px 8px 28px", boxShadow: "2px 4px 14px rgba(0,0,0,0.22)", transform: "rotate(-4deg) translateX(-10px)", display: "inline-block", position: "relative", zIndex: 1, border: `1px solid rgba(0,0,0,0.08)`, marginRight: "-40px" }}>
                <img src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/a800a7d2-871e-459d-b33c-38676908e94a.jpg" alt="" style={{ width: "clamp(130px, 36vw, 170px)", height: "clamp(100px, 28vw, 130px)", objectFit: "cover", objectPosition: "top", display: "block" }} />
              </div>
            </Anim>
            <Anim type="rotate" delay={200} style={{ display: "inline-block" }}>
              <div style={{ background: "white", padding: "8px 8px 28px", boxShadow: "2px 4px 14px rgba(0,0,0,0.22)", transform: "rotate(3deg) translateX(10px)", display: "inline-block", position: "relative", zIndex: 2, border: `1px solid rgba(0,0,0,0.08)` }}>
                <img src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/a800a7d2-871e-459d-b33c-38676908e94a.jpg" alt="" style={{ width: "clamp(130px, 36vw, 170px)", height: "clamp(100px, 28vw, 130px)", objectFit: "cover", objectPosition: "center bottom", display: "block" }} />
              </div>
            </Anim>
          </div>
          <Anim type="pop" delay={300}>
            <div style={{ fontSize: "1.5rem", marginTop: "0.5rem", letterSpacing: "0.5em", color: C.red, opacity: 0.5 }}>♥ ♥ ♥</div>
          </Anim>
        </Card>
      </Anim>

      {/* ── КОНТАКТЫ ── */}
      <Anim type="card" delay={50}>
        <Card style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Рисованная люстра */}
          <Anim type="down"><div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
            <svg width="120" height="110" viewBox="0 0 120 110" fill="none">
              {/* Ceiling mount */}
              <rect x="48" y="2" width="24" height="6" rx="2" stroke={C.red} strokeWidth="1.8" fill="none"/>
              {/* Central chain */}
              <line x1="60" y1="8" x2="60" y2="22" stroke={C.red} strokeWidth="1.8" strokeLinecap="round"/>
              {/* Top canopy */}
              <path d="M40 22 Q60 18 80 22 L76 32 Q60 28 44 32 Z" stroke={C.red} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
              {/* Main skirt */}
              <path d="M44 32 Q30 44 28 58 L92 58 Q90 44 76 32 Q60 28 44 32Z" stroke={C.red} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
              {/* Bottom ring */}
              <ellipse cx="60" cy="58" rx="32" ry="5" stroke={C.red} strokeWidth="1.8" fill="none"/>
              {/* Arms left */}
              <path d="M36 46 Q22 46 18 52" stroke={C.red} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M18 52 Q16 56 18 60" stroke={C.red} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              {/* Candle left */}
              <rect x="14" y="54" width="8" height="12" rx="1" stroke={C.red} strokeWidth="1.5" fill="none"/>
              <path d="M18 54 Q20 50 18 48 Q16 50 18 54" stroke={C.red} strokeWidth="1.3" fill="none"/>
              {/* Arms right */}
              <path d="M84 46 Q98 46 102 52" stroke={C.red} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M102 52 Q104 56 102 60" stroke={C.red} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              {/* Candle right */}
              <rect x="98" y="54" width="8" height="12" rx="1" stroke={C.red} strokeWidth="1.5" fill="none"/>
              <path d="M102 54 Q104 50 102 48 Q100 50 102 54" stroke={C.red} strokeWidth="1.3" fill="none"/>
              {/* Center candle */}
              <rect x="55" y="54" width="10" height="14" rx="1" stroke={C.red} strokeWidth="1.5" fill="none"/>
              <path d="M60 54 Q63 49 60 46 Q57 49 60 54" stroke={C.red} strokeWidth="1.3" fill="none"/>
              {/* Beads/drops */}
              {[28,36,44,52,60,68,76,84,92].map((x, i) => (
                <g key={i}>
                  <line x1={x} y1="63" x2={x + (i % 3 - 1) * 2} y2="72" stroke={C.red} strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx={x + (i % 3 - 1) * 2} cy="75" r="2.5" stroke={C.red} strokeWidth="1.3" fill="none"/>
                  {i % 2 === 0 && <circle cx={x + (i % 3 - 1) * 2} cy="81" r="1.5" stroke={C.red} strokeWidth="1.2" fill="none"/>}
                </g>
              ))}
            </svg>
          </div></Anim>

          <Anim type="up" delay={100}><SectionTitle>Есть вопросы?</SectionTitle></Anim>
          <Anim type="up" delay={150}>
            <p style={{ fontFamily: C.body, fontSize: "0.85rem", color: C.muted, fontStyle: "italic", margin: "0 0 1.5rem", lineHeight: 1.7 }}>
              Пишите или звоните — мы всегда на связи!
            </p>
          </Anim>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { role: "Жених", name: "Даниил", phone: "8-910-172-38-72", raw: "89101723872" },
              { role: "Невеста", name: "Елизавета", phone: "8-904-596-75-36", raw: "89045967536" },
            ].map(({ role, name, phone, raw }, i) => (
              <Anim key={role} type={i === 0 ? "left" : "right"} delay={200 + i * 100}>
                <a href={`tel:${raw}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    border: `1.5px solid rgba(185,28,28,0.25)`,
                    borderRadius: "1rem", padding: "0.9rem 1.2rem",
                    backgroundColor: "white", transition: "all 0.2s ease",
                  }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", backgroundColor: "rgba(185,28,28,0.08)", border: `1.5px solid ${C.red}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 2 C4 2 3 2 2.5 3 C2 4 2 6 4 8 C6 10 8 12 10 13.5 C12 15 14.5 16.5 16 16.5 C17.5 16.5 18 16 18 15 L18 14 C18 13.5 17.5 13 17 13 L15 13 C14.5 13 14 13.5 14 14 C13 13.5 11 12 9 10 C7 8 5.5 6 5 5 C5.5 5 6 4.5 6 4 L6 2 C6 1.5 5.5 1 5 1 L4.5 1 C4 1 4 1.5 4 2Z" stroke={C.red} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontFamily: C.script, fontSize: "1.2rem", color: C.red, lineHeight: 1 }}>{role} — {name}</div>
                      <div style={{ fontFamily: C.body, fontSize: "0.88rem", color: C.text, marginTop: "2px", fontWeight: 600 }}>{phone}</div>
                    </div>
                    <div style={{ marginLeft: "auto", color: C.red, opacity: 0.5, fontSize: "1rem" }}>♥</div>
                  </div>
                </a>
              </Anim>
            ))}
          </div>
        </Card>
      </Anim>

      {/* ── RSVP ── */}
      <Anim type="card" delay={50}>
        <Card>
          <Anim type="up"><SectionTitle>Придёте?</SectionTitle></Anim>
          <Anim type="up" delay={100}>
            <p style={{ fontFamily: C.body, fontSize: "0.8rem", color: C.muted, textAlign: "center", fontStyle: "italic", margin: "-0.5rem 0 1.25rem" }}>
              Просим ответить до 1 июня 2026
            </p>
          </Anim>
          <RSVPForm />
        </Card>
      </Anim>

      {/* ── FOOTER ── */}
      <Anim type="up" delay={100}>
        <div style={{ textAlign: "center", paddingTop: "0.75rem" }}>
          <ScatteredHearts color="rgba(255,255,255,0.4)" opacity={0.5} />
          <div style={{ fontFamily: C.script, fontSize: "clamp(2.5rem, 8vw, 4rem)", color: C.cream, lineHeight: 1 }}>E &amp; D</div>
          <div style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.5em", marginTop: "0.4rem" }}>♥ ♥ ♥</div>
          <p style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>
            26 · VI · 2026
          </p>
        </div>
      </Anim>

    </div>
  );
}