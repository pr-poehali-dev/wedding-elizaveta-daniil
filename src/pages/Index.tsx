import { useEffect, useRef, useState } from "react";

// Botanical decoration images
const PLANT_LEFT = "https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/d23a2f9b-03c1-4f02-9b95-e312695cfb28.jpg";
const PLANT_RIGHT = "https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/b7f3fd5e-d012-4e68-a158-fe7551051719.jpg";

// Fonts
const script = "'Caveat', cursive";
const body = "'Montserrat', sans-serif";

// Colors
const GREEN = "#2d4a2d";
const GREEN_MID = "#4a6741";
const BEIGE = "#e8e2d5";
const TEXT = "#3a3a3a";
const MUTED = "#7a7a7a";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Anim({ children, delay = 0, inView, style = {} }: {
  children: React.ReactNode; delay?: number; inView: boolean; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(26px)",
      transition: `opacity 0.8s ${delay}ms ease, transform 0.8s ${delay}ms ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// Botanical decorations on sides
function BotanicDecor({ side }: { side: "left" | "right" }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      [side]: 0,
      width: "clamp(80px, 11vw, 180px)",
      height: "100vh",
      pointerEvents: "none",
      zIndex: 3,
      overflow: "hidden",
    }}>
      <img
        src={side === "left" ? PLANT_LEFT : PLANT_RIGHT}
        alt=""
        style={{
          position: "absolute",
          top: "5vh",
          [side]: "-15%",
          width: "130%",
          height: "50vh",
          objectFit: "cover",
          objectPosition: side === "left" ? "right top" : "left top",
          opacity: 0.75,
          mixBlendMode: "multiply",
        }}
      />
      <img
        src={side === "left" ? PLANT_RIGHT : PLANT_LEFT}
        alt=""
        style={{
          position: "absolute",
          bottom: "8vh",
          [side]: "-20%",
          width: "140%",
          height: "40vh",
          objectFit: "cover",
          objectPosition: side === "left" ? "right bottom" : "left bottom",
          opacity: 0.55,
          mixBlendMode: "multiply",
          transform: "scaleY(-1)",
        }}
      />
    </div>
  );
}

// Dots divider (pink)
function DotDivider() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "6px", margin: "0.5rem 0" }}>
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#c4a8a0", opacity: 0.7 }} />
      ))}
    </div>
  );
}

// Calendar for August 2026 with date 26 highlighted with heart
function Calendar() {
  const days = [
    null, null, null, null, null, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31
  ];
  const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const WEDDING_DAY = 26;

  return (
    <div style={{ textAlign: "center", maxWidth: 360, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span style={{ fontFamily: body, fontWeight: 600, letterSpacing: "0.2em", fontSize: "0.85rem", color: GREEN }}> ИЮНЬ</span>
        <span style={{ fontFamily: body, fontWeight: 600, letterSpacing: "0.2em", fontSize: "0.85rem", color: GREEN }}>2026</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {weekDays.map(d => (
          <div key={d} style={{ fontFamily: body, fontSize: "0.72rem", fontWeight: 500, color: MUTED, padding: "4px 0", textAlign: "center" }}>
            {d}
          </div>
        ))}
        {/* June 2026: starts on Monday (day 1 = Mon) */}
        {[
          1,2,3,4,5,6,7,
          8,9,10,11,12,13,14,
          15,16,17,18,19,20,21,
          22,23,24,25,26,27,28,
          29,30
        ].map((d, i) => {
          const isWedding = d === WEDDING_DAY;
          return (
            <div key={i} style={{
              fontFamily: body,
              fontSize: "0.85rem",
              fontWeight: isWedding ? 600 : 400,
              color: isWedding ? GREEN : TEXT,
              padding: "6px 0",
              textAlign: "center",
              position: "relative",
            }}>
              {isWedding ? (
                <span style={{ position: "relative" }}>
                  <svg width="34" height="34" viewBox="0 0 34 34" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", animation: "heartbeat 2s ease-in-out infinite" }}>
                    <path d="M17 26 C17 26 5 18 5 11 C5 7.5 8 5 11.5 5 C13.5 5 15.5 6 17 8 C18.5 6 20.5 5 22.5 5 C26 5 29 7.5 29 11 C29 18 17 26 17 26Z" fill="none" stroke={GREEN} strokeWidth="1.5"/>
                  </svg>
                  {d}
                </span>
              ) : d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Timeline card
function TimeCard({ time, title, note, delay, inView }: {
  time: string; title: string; note: string; delay: number; inView: boolean;
}) {
  return (
    <Anim inView={inView} delay={delay}>
      <div style={{
        border: `1px solid ${GREEN_MID}`,
        borderRadius: "1rem",
        padding: "2rem 2.5rem",
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(6px)",
        margin: "0 auto",
        maxWidth: 380,
      }}>
        <div style={{ fontFamily: script, fontSize: "2.8rem", color: GREEN, lineHeight: 1.1, marginBottom: "0.75rem" }}>
          {time}
        </div>
        <div style={{ fontFamily: body, fontWeight: 500, fontSize: "0.95rem", color: GREEN, marginBottom: "0.4rem" }}>
          {title}
        </div>
        <div style={{ fontFamily: body, fontSize: "0.8rem", color: MUTED, lineHeight: 1.5 }}>
          {note}
        </div>
      </div>
    </Anim>
  );
}

export default function Index() {
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpAttend, setRsvpAttend] = useState<"yes" | "no" | "">("");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpSent, setRsvpSent] = useState(false);

  const introRef = useInView(0.08);
  const calRef = useInView(0.08);
  const planRef = useInView(0.06);
  const venueRef = useInView(0.08);
  const infoRef = useInView(0.08);
  const dresscodeRef = useInView(0.08);
  const rsvpRef = useInView(0.08);

  const inputStyle: React.CSSProperties = {
    fontFamily: body,
    fontSize: "0.92rem",
    color: TEXT,
    backgroundColor: "rgba(255,255,255,0.7)",
    border: `1px solid rgba(74,103,65,0.3)`,
    borderRadius: "0.5rem",
    padding: "0.8rem 1.1rem",
    width: "100%",
    outline: "none",
    boxSizing: "border-box",
  };

  const timelineItems = [
    { time: "10:30", title: "Церемония бракосочетания", note: "Приготовьте платочки для трогательного момента" },
    { time: "11:00", title: "Фотосессия молодожёнов", note: "Суздаль" },
    { time: "12:00", title: "Групповая фотосессия", note: "Вместе с гостями" },
    { time: "16:00", title: "Велком-буфет", note: "Возьмите с собой улыбки и хорошее настроение" },
    { time: "17:00", title: "Банкет", note: "Ресторан «Вновь», Владимир" },
  ];

  return (
    <div style={{ backgroundColor: "#f5f4f0", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      <BotanicDecor side="left" />
      <BotanicDecor side="right" />

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", maxWidth: 700, width: "100%" }}>

          {/* Polaroid photo */}
          <div className="animate-fade-up" style={{ position: "relative", display: "inline-block" }}>
            <div style={{
              background: "white",
              padding: "10px 10px 40px",
              boxShadow: "3px 6px 24px rgba(0,0,0,0.14)",
              transform: "rotate(-1.5deg)",
              position: "relative",
              border: `2px solid ${GREEN_MID}`,
            }}>
              {/* tape */}
              <div style={{
                position: "absolute", top: -14, left: "50%",
                transform: "translateX(-50%) rotate(-1.5deg)",
                width: 70, height: 24,
                background: "rgba(180,190,170,0.55)",
                backdropFilter: "blur(2px)",
                zIndex: 10,
              }} />
              <img
                src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/87922603-98f5-4ea0-9ca3-acd8d0d667f7.jpg"
                alt="Elizaveta & Daniil"
                style={{ width: "clamp(220px, 38vw, 340px)", height: "clamp(220px, 38vw, 340px)", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>

          {/* Names + date block */}
          <div className="animate-fade-up-d1" style={{ textAlign: "right", position: "relative" }}>
            {/* beige bg strip */}
            <div style={{
              background: BEIGE,
              padding: "1.5rem 2.5rem 1.5rem 2rem",
              display: "inline-block",
              position: "relative",
            }}>
              <DotDivider />
              <div style={{ fontFamily: script, fontSize: "clamp(2.8rem, 8vw, 5rem)", color: GREEN, lineHeight: 1.05, marginTop: "0.5rem" }}>
                Elizaveta
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ flex: 1, height: 1, backgroundColor: `rgba(74,103,65,0.25)` }} />
                <span style={{ fontFamily: script, fontSize: "1.5rem", color: GREEN_MID }}>&amp;</span>
                <div style={{ flex: 1, height: 1, backgroundColor: `rgba(74,103,65,0.25)` }} />
              </div>
              <div style={{ fontFamily: script, fontSize: "clamp(2.8rem, 8vw, 5rem)", color: GREEN, lineHeight: 1.05 }}>
                Daniil
              </div>
            </div>
            <div style={{ marginTop: "1.25rem" }}>
              <span style={{ fontFamily: body, fontSize: "1.1rem", letterSpacing: "0.25em", color: MUTED, fontWeight: 300 }}>
                26 | 06 | 26
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO TEXT ── */}
      <section style={{ padding: "3rem 2rem 4rem", maxWidth: 580, margin: "0 auto", textAlign: "center" }} ref={introRef.ref}>
        <Anim inView={introRef.inView} delay={0}>
          <p style={{ fontFamily: body, fontSize: "0.95rem", lineHeight: 1.85, color: GREEN_MID, fontWeight: 400 }}>
            Мы верим, что этот день станет красивым началом нашей счастливой совместной жизни.
            Мы рады пригласить вас на торжество по случаю нашей свадьбы и разделить этот счастливый момент вместе с нами.
          </p>
        </Anim>
      </section>

      {/* ── CALENDAR ── */}
      <section style={{ padding: "0 2rem 5rem", maxWidth: 500, margin: "0 auto" }} ref={calRef.ref}>
        <Anim inView={calRef.inView} delay={0}>
          <Calendar />
        </Anim>
      </section>

      {/* ── ПЛАН ДНЯ ── */}
      <section style={{ padding: "2rem 2rem 5rem" }} ref={planRef.ref}>
        <Anim inView={planRef.inView} delay={0} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: script, fontSize: "clamp(2.5rem, 7vw, 4rem)", color: GREEN, margin: 0 }}>
            План дня
          </h2>
        </Anim>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 440, margin: "0 auto" }}>
          {timelineItems.map((item, i) => (
            <TimeCard key={i} time={item.time} title={item.title} note={item.note} delay={i * 120} inView={planRef.inView} />
          ))}
        </div>
      </section>

      {/* ── VENUE ── */}
      <section style={{ padding: "2rem 2rem 5rem", maxWidth: 600, margin: "0 auto" }} ref={venueRef.ref}>
        <Anim inView={venueRef.inView} delay={0} style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: script, fontSize: "clamp(2.5rem, 7vw, 4rem)", color: GREEN, margin: 0 }}>
            Локация
          </h2>
        </Anim>

        {/* Polaroid venue photo */}
        <Anim inView={venueRef.inView} delay={150} style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", position: "relative" }}>
            <div style={{
              background: "white",
              padding: "10px 10px 40px",
              boxShadow: "3px 6px 24px rgba(0,0,0,0.12)",
              transform: "rotate(1.2deg)",
              border: `2px solid ${GREEN_MID}`,
              display: "inline-block",
            }}>
              <div style={{
                position: "absolute", top: -13, left: "50%",
                transform: "translateX(-50%) rotate(1deg)",
                width: 70, height: 24,
                background: "rgba(180,190,170,0.55)",
              }} />
              <img
                src="https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/87922603-98f5-4ea0-9ca3-acd8d0d667f7.jpg"
                alt="Ресторан Вновь"
                style={{ width: "clamp(200px, 40vw, 320px)", height: "clamp(180px, 36vw, 290px)", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ fontFamily: body, fontSize: "1rem", color: MUTED, fontStyle: "italic", margin: "0 0 0.5rem" }}>
              «Вновь»
            </p>
            <p style={{ fontFamily: body, fontSize: "0.95rem", color: TEXT, margin: "0 0 1.5rem", letterSpacing: "0.03em" }}>
              Владимир, ул. Летне-Перевозинская, 1А
            </p>
            <a
              href="https://yandex.ru/maps/?text=Владимир+ул.+Летне-Перевозинская+1А"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: body, fontSize: "0.8rem", letterSpacing: "0.15em",
                textTransform: "uppercase", padding: "0.7rem 2rem",
                border: `1px solid ${GREEN}`, color: GREEN,
                textDecoration: "none", display: "inline-block",
                borderRadius: "2rem", transition: "all 0.3s ease",
              }}
            >
              Открыть карту
            </a>
          </div>
        </Anim>
      </section>

      {/* ── ВАЖНАЯ ИНФОРМАЦИЯ (одна карточка) ── */}
      <section style={{ padding: "2rem 2rem 5rem" }} ref={infoRef.ref}>
        <Anim inView={infoRef.inView} delay={0}>
          <div style={{
            maxWidth: 520,
            margin: "0 auto",
            border: `1px solid rgba(74,103,65,0.25)`,
            borderRadius: "1.25rem",
            padding: "2.5rem 2.5rem",
            backgroundColor: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(8px)",
          }}>
            {/* Подарки */}
            <Anim inView={infoRef.inView} delay={100} style={{ marginBottom: "2rem", textAlign: "center" }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: "0.5rem", opacity: 0.4 }}>
                <rect x="8" y="20" width="32" height="22" rx="2" stroke={GREEN} strokeWidth="1.5"/>
                <rect x="5" y="14" width="38" height="8" rx="2" stroke={GREEN} strokeWidth="1.5"/>
                <line x1="24" y1="14" x2="24" y2="42" stroke={GREEN} strokeWidth="1.5"/>
                <path d="M24 14 C24 14 18 8 15 10 C12 12 15 14 24 14" stroke={GREEN} strokeWidth="1.5" fill="none"/>
                <path d="M24 14 C24 14 30 8 33 10 C36 12 33 14 24 14" stroke={GREEN} strokeWidth="1.5" fill="none"/>
              </svg>
              <div style={{ fontFamily: script, fontSize: "2rem", color: GREEN, marginBottom: "0.5rem" }}>Подарки</div>
              <p style={{ fontFamily: body, fontSize: "0.88rem", color: TEXT, lineHeight: 1.7, margin: 0 }}>
                Дорогие гости, приносите с собой веселье и радость в душе, а подарки — в конверте.
              </p>
            </Anim>

            <div style={{ height: 1, backgroundColor: `rgba(74,103,65,0.15)`, margin: "0 0 2rem" }} />

            {/* Транспорт */}
            <Anim inView={infoRef.inView} delay={200} style={{ textAlign: "center" }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: "0.5rem", opacity: 0.4 }}>
                <rect x="8" y="18" width="32" height="18" rx="3" stroke={GREEN} strokeWidth="1.5"/>
                <path d="M8 24 L40 24" stroke={GREEN} strokeWidth="1.5"/>
                <circle cx="15" cy="38" r="4" stroke={GREEN} strokeWidth="1.5"/>
                <circle cx="33" cy="38" r="4" stroke={GREEN} strokeWidth="1.5"/>
                <path d="M14 18 L10 12 H38 L34 18" stroke={GREEN} strokeWidth="1.5" fill="none"/>
              </svg>
              <div style={{ fontFamily: script, fontSize: "2rem", color: GREEN, marginBottom: "0.5rem" }}>Транспорт</div>
              <p style={{ fontFamily: body, fontSize: "0.88rem", color: TEXT, lineHeight: 1.7, margin: 0 }}>
                Если вам нужна помощь с дорогой до Суздаля или обратно — напишите нам заранее, и мы поможем.
              </p>
            </Anim>
          </div>
        </Anim>
      </section>

      {/* ── ДРЕСС-КОД ── */}
      <section style={{ padding: "0 2rem 5rem", maxWidth: 520, margin: "0 auto" }} ref={dresscodeRef.ref}>
        <Anim inView={dresscodeRef.inView} delay={0} style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: script, fontSize: "clamp(2.2rem, 6vw, 3.5rem)", color: GREEN, margin: "0 0 2rem" }}>
            Дресс-код
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "3rem", alignItems: "center" }}>
            <Anim inView={dresscodeRef.inView} delay={150} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                backgroundColor: "#111",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                border: `1px solid rgba(74,103,65,0.3)`,
              }} />
              <span style={{ fontFamily: body, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GREEN }}>Чёрный</span>
            </Anim>
            <Anim inView={dresscodeRef.inView} delay={250} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                backgroundColor: "#f5f0e8",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                border: `1px solid rgba(74,103,65,0.3)`,
              }} />
              <span style={{ fontFamily: body, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GREEN }}>Белый</span>
            </Anim>
          </div>
          <Anim inView={dresscodeRef.inView} delay={380} style={{ marginTop: "1.5rem" }}>
            <p style={{ fontFamily: body, fontSize: "0.82rem", color: MUTED, fontStyle: "italic" }}>
              Только чёрный и белый
            </p>
          </Anim>
        </Anim>
      </section>

      {/* ── RSVP ── */}
      <section style={{ padding: "0 2rem 7rem", maxWidth: 480, margin: "0 auto" }} ref={rsvpRef.ref}>
        <Anim inView={rsvpRef.inView} delay={0} style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: script, fontSize: "clamp(2.2rem, 6vw, 3.5rem)", color: GREEN, margin: "0 0 0.5rem" }}>
            Вы придёте?
          </h2>
          <p style={{ fontFamily: body, fontSize: "0.82rem", color: MUTED, fontStyle: "italic", margin: 0 }}>
            Просим ответить до 1 июня 2026
          </p>
        </Anim>

        {rsvpSent ? (
          <Anim inView={true} delay={0} style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ fontFamily: script, fontSize: "2rem", color: GREEN, marginBottom: "0.5rem" }}>
              {rsvpAttend === "yes" ? "Ждём вас!" : "Жаль, что не сможете"}
            </div>
            <p style={{ fontFamily: body, fontSize: "0.9rem", color: MUTED }}>Спасибо, {rsvpName}!</p>
          </Anim>
        ) : (
          <Anim inView={rsvpRef.inView} delay={150}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontFamily: body, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN_MID, display: "block", marginBottom: "0.4rem" }}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={rsvpName}
                  onChange={e => setRsvpName(e.target.value)}
                  placeholder="Имя и фамилия"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontFamily: body, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN_MID, display: "block", marginBottom: "0.6rem" }}>
                  Вы придёте?
                </label>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {(["yes", "no"] as const).map(opt => (
                    <button key={opt} onClick={() => setRsvpAttend(opt)} style={{
                      flex: 1, fontFamily: body, fontSize: "0.88rem", fontWeight: 500,
                      padding: "0.8rem", borderRadius: "0.5rem",
                      border: `1px solid`,
                      borderColor: rsvpAttend === opt ? GREEN : "rgba(74,103,65,0.25)",
                      backgroundColor: rsvpAttend === opt ? `rgba(45,74,45,0.1)` : "rgba(255,255,255,0.7)",
                      color: rsvpAttend === opt ? GREEN : MUTED,
                      cursor: "pointer", transition: "all 0.25s ease",
                    }}>
                      {opt === "yes" ? "Да, буду!" : "К сожалению, нет"}
                    </button>
                  ))}
                </div>
              </div>

              {rsvpAttend === "yes" && (
                <Anim inView={true} delay={0}>
                  <label style={{ fontFamily: body, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN_MID, display: "block", marginBottom: "0.4rem" }}>
                    Количество гостей
                  </label>
                  <select value={rsvpGuests} onChange={e => setRsvpGuests(e.target.value)}
                    style={{ ...inputStyle, appearance: "none" as const }}>
                    {["1", "2", "3", "4"].map(n => (
                      <option key={n} value={n}>{n} {n === "1" ? "гость" : "гостя"}</option>
                    ))}
                  </select>
                </Anim>
              )}

              <button
                onClick={() => { if (rsvpName.trim() && rsvpAttend) setRsvpSent(true); }}
                style={{
                  fontFamily: body, fontSize: "0.8rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", fontWeight: 500,
                  padding: "0.9rem 2rem", borderRadius: "2rem",
                  border: `1px solid ${GREEN}`,
                  backgroundColor: rsvpName.trim() && rsvpAttend ? GREEN : "transparent",
                  color: rsvpName.trim() && rsvpAttend ? "white" : GREEN,
                  cursor: "pointer", marginTop: "0.5rem",
                  transition: "all 0.3s ease",
                  opacity: rsvpName.trim() && rsvpAttend ? 1 : 0.5,
                }}
              >
                Отправить
              </button>
            </div>
          </Anim>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: "center", padding: "0 2rem 5rem" }}>
        <div style={{ height: 1, backgroundColor: "rgba(74,103,65,0.2)", maxWidth: 300, margin: "0 auto 2.5rem" }} />
        <div style={{ fontFamily: script, fontSize: "clamp(2.5rem, 8vw, 5rem)", color: GREEN, lineHeight: 1 }}>
          E &amp; D
        </div>
        <p style={{ fontFamily: body, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: MUTED, marginTop: "0.75rem" }}>
          26 · VI · 2026
        </p>
      </footer>

    </div>
  );
}
