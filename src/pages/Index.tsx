import { useEffect, useState } from "react";

// ── palette
const C = {
  red: "#b91c1c",
  redBright: "#dc2626",
  cream: "#fdf8f0",
  creamDark: "#f5ede0",
  text: "#1a1a1a",
  muted: "#7a3030",
  script: "'Caveat', cursive",
  body: "'Nunito', sans-serif",
};

// ── wedding date: 26 Jun 2026 at 10:30
const WEDDING = new Date("2026-06-26T10:30:00");

// ── Countdown hook
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

// ── Squiggly red underline
function SvgSquiggle() {
  return (
    <svg height="10" viewBox="0 0 120 10" fill="none" style={{ display: "block", margin: "4px auto 0" }}>
      <path d="M0 7 Q15 1 30 7 Q45 13 60 7 Q75 1 90 7 Q105 13 120 7" stroke={C.red} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ── Card wrapper (cream)
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

// ── Section title
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

// ── Countdown block
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
              fontFamily: C.script, fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: C.red, lineHeight: 1,
              border: `2px solid ${C.red}`,
              borderRadius: "0.75rem",
              minWidth: "3.2rem",
              padding: "0.25rem 0.6rem",
              backgroundColor: "rgba(185,28,28,0.07)",
            }}>
              {String(val).padStart(2, "0")}
            </div>
            <div style={{ fontFamily: C.body, fontSize: "0.7rem", color: C.muted, marginTop: "0.3rem", letterSpacing: "0.05em" }}>
              {label}
            </div>
          </div>
          {i < 3 && (
            <div style={{ fontFamily: C.script, fontSize: "2rem", color: C.red, marginBottom: "1.4rem", opacity: 0.5 }}>:</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Calendar (June 2026, starts Monday)
function CalendarBlock() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const WEDDING_DAY = 26;

  return (
    <div style={{ maxWidth: 300, margin: "0 auto" }}>
      <div style={{
        backgroundColor: C.red,
        borderRadius: "0.75rem 0.75rem 0 0",
        padding: "0.5rem 1rem",
        textAlign: "center",
        fontFamily: C.script,
        fontSize: "1.3rem",
        color: "white",
        letterSpacing: "0.05em",
      }}>
        Июнь 2026
      </div>
      <div style={{
        border: `2px solid ${C.red}`,
        borderTop: "none",
        borderRadius: "0 0 0.75rem 0.75rem",
        padding: "0.75rem",
        backgroundColor: "white",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
          {weekDays.map(d => (
            <div key={d} style={{ textAlign: "center", fontFamily: C.body, fontSize: "0.65rem", fontWeight: 600, color: C.muted, padding: "2px 0" }}>
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
          {days.map((d) => {
            const isWedding = d === WEDDING_DAY;
            return (
              <div key={d} style={{
                textAlign: "center",
                fontFamily: C.body,
                fontSize: "0.8rem",
                padding: "5px 2px",
                borderRadius: "50%",
                backgroundColor: isWedding ? C.red : "transparent",
                color: isWedding ? "white" : C.text,
                fontWeight: isWedding ? 700 : 400,
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
function TimelineItem({ time, title, note, isLast = false }: {
  time: string; title: string; note: string; isLast?: boolean;
}) {
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
        <div style={{ fontFamily: C.body, fontWeight: 600, fontSize: "0.95rem", color: C.text, marginBottom: "0.2rem" }}>
          {title}
        </div>
        <div style={{ fontFamily: C.body, fontSize: "0.8rem", color: C.muted, lineHeight: 1.5, fontStyle: "italic" }}>
          {note}
        </div>
      </div>
    </div>
  );
}

// ── RSVP form
function RSVPForm() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"yes" | "no" | "">("");
  const [sent, setSent] = useState(false);

  const inputSt: React.CSSProperties = {
    fontFamily: C.body, fontSize: "0.92rem", color: C.text,
    backgroundColor: "white",
    border: `1.5px solid rgba(185,28,28,0.3)`,
    borderRadius: "0.6rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    boxSizing: "border-box",
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
        <div style={{ fontSize: "3rem", display: "inline-block", animation: "heartbeat 1.4s ease-in-out infinite" }}>♥</div>
        <div style={{ fontFamily: C.script, fontSize: "2rem", color: C.red, marginTop: "0.5rem" }}>
          {attend === "yes" ? "Ждём вас!" : "Очень жаль..."}
        </div>
        <p style={{ fontFamily: C.body, fontSize: "0.9rem", color: C.muted, margin: "0.5rem 0 0" }}>
          Спасибо, {name}!
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
      <div>
        <label style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: "0.35rem" }}>
          Ваше имя
        </label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Имя и фамилия" style={inputSt} />
      </div>
      <div>
        <label style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: "0.5rem" }}>
          Придёте?
        </label>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {(["yes", "no"] as const).map(opt => (
            <button key={opt} onClick={() => setAttend(opt)} style={{
              flex: 1, fontFamily: C.body, fontSize: "0.9rem", fontWeight: 600,
              padding: "0.7rem 0.5rem",
              borderRadius: "0.6rem",
              border: `1.5px solid ${attend === opt ? C.red : "rgba(185,28,28,0.25)"}`,
              backgroundColor: attend === opt ? C.red : "white",
              color: attend === opt ? "white" : C.muted,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}>
              {opt === "yes" ? "Да, буду! ♥" : "Не смогу :("}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => { if (name.trim() && attend) setSent(true); }}
        style={{
          fontFamily: C.body, fontSize: "0.85rem", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "0.85rem", borderRadius: "2rem",
          border: `1.5px solid ${C.red}`,
          backgroundColor: name.trim() && attend ? C.red : "transparent",
          color: name.trim() && attend ? "white" : C.red,
          cursor: "pointer",
          transition: "all 0.25s ease",
          opacity: name.trim() && attend ? 1 : 0.4,
        }}
      >
        Отправить ♥
      </button>
    </div>
  );
}

// ── MAIN
export default function Index() {
  const timeline = [
    { time: "10:30", title: "Регистрация брака", note: "Торжественная церемония в Суздале. Возьмите платочки — будут слёзы радости!" },
    { time: "11:00", title: "Фотосессия молодожёнов", note: "Фотосессия в исторических улочках Суздаля" },
    { time: "12:00", title: "Групповые фото", note: "Снимаемся вместе с любимыми гостями" },
    { time: "16:00", title: "Велком-фуршет", note: "Шампанское, закуски и хорошее настроение — расслабьтесь после дороги" },
    { time: "17:00", title: "Банкет", note: "Ресторан «Вновь», Владимир — начинается праздник!" },
  ];

  const photos = [
    "https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/87922603-98f5-4ea0-9ca3-acd8d0d667f7.jpg",
    "https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/d23a2f9b-03c1-4f02-9b95-e312695cfb28.jpg",
    "https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/b7f3fd5e-d012-4e68-a158-fe7551051719.jpg",
    "https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/87922603-98f5-4ea0-9ca3-acd8d0d667f7.jpg",
  ];

  return (
    <div style={{ backgroundColor: C.red, minHeight: "100vh", padding: "1.5rem 1rem 4rem" }}>

      {/* ── HERO CARD ── */}
      <Card style={{ textAlign: "center", padding: "0 0 1.5rem", overflow: "hidden" }}>
        {/* Детское фото на всю ширину карточки */}
        <div style={{ width: "100%", borderRadius: "1.5rem 1.5rem 0 0", overflow: "hidden", marginBottom: "1.25rem" }}>
          <img
            src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/60e7db4d-3345-429a-a667-464921ab2534.PNG"
            alt="Лизка + Данька"
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
        </div>

        <div style={{ padding: "0 1.5rem" }}>
          <div style={{ fontSize: "1.2rem", color: C.red, letterSpacing: "0.5em", opacity: 0.4, marginBottom: "0.5rem" }}>♥ ♥ ♥</div>
          <p style={{ fontFamily: C.body, fontSize: "0.88rem", color: C.muted, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
            Время пронеслось незаметно, и эти двое скоро поженятся!<br />
            Да-да, мы сами в шоке!
          </p>
        </div>
      </Card>

      {/* ── УЗНАЛИ? ── */}
      <Card style={{ textAlign: "center", padding: "0 0 1.5rem", overflow: "hidden" }}>
        <SectionTitle>
          <span style={{ display: "block", paddingTop: "1.5rem" }}>Узнали?</span>
        </SectionTitle>
        <p style={{ fontFamily: C.body, fontSize: "0.92rem", color: C.muted, lineHeight: 1.75, margin: "0 0 1.25rem", fontStyle: "italic", padding: "0 1.5rem" }}>
          Эти двое влюблены с самого детства!<br />
          А теперь — скоро свадьба. Да-да, мы сами в шоке!
        </p>
        {/* Фото пары — на всю ширину */}
        <div style={{ width: "100%", overflow: "hidden" }}>
          <img
            src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/bucket/1a3e40fc-6c4d-45ec-95fd-93a133b83688.png"
            alt="Elizaveta & Daniil"
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
        </div>
      </Card>

      {/* ── МЫ ВАС ЛЮБИМ ── */}
      <Card style={{ textAlign: "center" }}>
        <SectionTitle>Мы так вас любим!</SectionTitle>
        <p style={{ fontFamily: C.body, fontSize: "0.92rem", color: C.muted, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
          Поэтому приглашаем стать свидетелями дня рождения нашей семьи, которое состоится{" "}
          <strong style={{ color: C.red }}>26 июня 2026 года!</strong>
        </p>
        <div style={{ fontSize: "2.5rem", marginTop: "1rem", display: "inline-block", animation: "heartbeat 1.4s ease-in-out infinite" }}>
          ♥
        </div>
      </Card>

      {/* ── CALENDAR + WHERE ── */}
      <Card>
        <SectionTitle>Когда?</SectionTitle>
        <CalendarBlock />

        <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
          <div style={{ fontFamily: C.script, fontSize: "1.9rem", color: C.red, marginBottom: "0.25rem" }}>
            📍 Где?
          </div>
          <SvgSquiggle />
          <p style={{ fontFamily: C.body, fontSize: "0.88rem", color: C.muted, margin: "0.75rem 0 1rem", lineHeight: 1.7 }}>
            Церемония: <strong style={{ color: C.text }}>Суздаль</strong><br />
            Банкет: <strong style={{ color: C.text }}>ресторан «Вновь», Владимир</strong><br />
            <span style={{ fontSize: "0.78rem" }}>ул. Летне-Перевозинская, 1А</span>
          </p>
          <a
            href="https://yandex.ru/maps/?text=Владимир+ул.+Летне-Перевозинская+1А"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: C.body, fontSize: "0.8rem", letterSpacing: "0.12em",
              textTransform: "uppercase", padding: "0.6rem 1.5rem",
              border: `1.5px solid ${C.red}`, color: C.red,
              textDecoration: "none", borderRadius: "2rem",
              display: "inline-block",
            }}
          >
            Открыть карту
          </a>
        </div>
      </Card>

      {/* ── TIMELINE ── */}
      <Card>
        <SectionTitle>Во сколько?</SectionTitle>
        {timeline.map((item, i) => (
          <TimelineItem key={i} time={item.time} title={item.title} note={item.note} isLast={i === timeline.length - 1} />
        ))}
      </Card>

      {/* ── COUNTDOWN ── */}
      <Card style={{ textAlign: "center" }}>
        <SectionTitle>До нашей встречи осталось</SectionTitle>
        <Countdown />

        <p style={{ fontFamily: C.script, fontSize: "1.5rem", color: C.muted, marginTop: "1.5rem", marginBottom: "0.25rem", lineHeight: 1.4 }}>
          С нетерпением ждём вас<br />на нашем празднике любви!
        </p>
        <p style={{ fontFamily: C.body, fontSize: "0.85rem", color: C.muted, fontStyle: "italic", margin: "0 0 1.5rem" }}>
          Ваши Daniil и Elizaveta
        </p>

        <div style={{ display: "flex", gap: "6px" }}>
          {[photos[0], photos[2]].map((src, i) => (
            <div key={i} style={{ flex: 1, aspectRatio: "1", overflow: "hidden", borderRadius: "0.75rem", border: `2px solid ${C.red}` }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>

        <div style={{ fontSize: "1.5rem", marginTop: "1rem", letterSpacing: "0.5em", color: C.red, opacity: 0.5 }}>
          ♥ ♥ ♥
        </div>
      </Card>

      {/* ── ДРЕСС-КОД ── */}
      <Card style={{ textAlign: "center" }}>
        <SectionTitle>Дресс-код</SectionTitle>
        <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginBottom: "1rem" }}>
          {[
            { color: "#111", label: "Чёрный", shadow: "0 4px 12px rgba(0,0,0,0.3)" },
            { color: "#f9f5ec", label: "Белый", border: true, shadow: "0 4px 12px rgba(0,0,0,0.1)" },
          ].map(({ color, label, border, shadow }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                backgroundColor: color,
                border: border ? `2px solid ${C.red}` : "none",
                boxShadow: shadow,
              }} />
              <span style={{ fontFamily: C.body, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted }}>{label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: C.body, fontSize: "0.82rem", color: C.muted, fontStyle: "italic", margin: 0 }}>
          Только чёрный и белый — строго и элегантно
        </p>
      </Card>

      {/* ── ПОДАРКИ И ТРАНСПОРТ ── */}
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

      {/* ── RSVP ── */}
      <Card>
        <SectionTitle>Придёте?</SectionTitle>
        <p style={{ fontFamily: C.body, fontSize: "0.8rem", color: C.muted, textAlign: "center", fontStyle: "italic", margin: "-0.5rem 0 1.25rem" }}>
          Просим ответить до 1 июня 2026
        </p>
        <RSVPForm />
      </Card>

      {/* ── FOOTER ── */}
      <div style={{ textAlign: "center", paddingTop: "0.75rem" }}>
        <div style={{ fontFamily: C.script, fontSize: "clamp(2.5rem, 8vw, 4rem)", color: C.cream, lineHeight: 1 }}>
          E &amp; D
        </div>
        <div style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.5em", marginTop: "0.4rem" }}>♥ ♥ ♥</div>
        <p style={{ fontFamily: C.body, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>
          26 · VI · 2026
        </p>
      </div>
    </div>
  );
}