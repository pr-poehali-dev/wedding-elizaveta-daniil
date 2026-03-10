import { useEffect, useRef, useState } from "react";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/87922603-98f5-4ea0-9ca3-acd8d0d667f7.jpg";
const HYDRANGEA_IMG = "https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/a8ab5c2a-0b67-45f2-9c32-cdecb56c75d3.jpg";

const serif = "'Cormorant Garamond', Georgia, serif";

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

const ThinLine = () => (
  <div style={{ width: "100%", height: "1px", backgroundColor: "var(--thin-line)" }} />
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: serif,
    color: "var(--sage)",
    letterSpacing: "0.35em",
    fontSize: "0.68rem",
    textTransform: "uppercase" as const,
    fontStyle: "italic",
  }}>
    {children}
  </span>
);

function Anim({
  children,
  delay = 0,
  inView,
  tag = "div",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
  tag?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}) {
  const Tag = tag as React.ElementType;
  return (
    <Tag style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.85s ${delay}ms cubic-bezier(.25,.8,.25,1), transform 0.85s ${delay}ms cubic-bezier(.25,.8,.25,1)`,
      ...style,
    }}>
      {children}
    </Tag>
  );
}

const TimelineItem = ({ time, title, sub, delay = 0, inView }: {
  time: string; title: string; sub?: string; delay?: number; inView: boolean;
}) => (
  <div>
    <ThinLine />
    <div style={{
      display: "grid", gridTemplateColumns: "80px 1fr", gap: "1.5rem", padding: "1.75rem 0",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(22px)",
      transition: `all 0.8s ${delay}ms cubic-bezier(.25,.8,.25,1)`,
    }}>
      <div style={{ textAlign: "right", paddingTop: "3px" }}>
        <span style={{ fontFamily: serif, fontSize: "0.82rem", letterSpacing: "0.12em", color: "var(--sage-light)" }}>
          {time}
        </span>
      </div>
      <div>
        <p style={{ fontFamily: serif, fontSize: "1.2rem", fontWeight: 300, lineHeight: 1.4, color: "var(--cream)", margin: 0 }}>
          {title}
        </p>
        {sub && (
          <p style={{ fontFamily: serif, fontSize: "0.88rem", marginTop: "4px", fontStyle: "italic", color: "var(--sage)", margin: "4px 0 0" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  </div>
);

const Hydrangea = ({ side }: { side: "left" | "right" }) => (
  <div style={{
    position: "fixed",
    top: "50%",
    [side]: "-2vw",
    transform: `translateY(-50%)${side === "right" ? " scaleX(-1)" : ""}`,
    width: "clamp(70px, 10vw, 160px)",
    height: "clamp(220px, 45vh, 580px)",
    pointerEvents: "none",
    zIndex: 4,
  }}>
    <img
      src={HYDRANGEA_IMG}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: side === "left" ? "right center" : "left center",
        opacity: 0.18,
        mixBlendMode: "screen",
        filter: "brightness(2) saturate(0.3) contrast(0.7)",
      }}
    />
  </div>
);

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpAttend, setRsvpAttend] = useState<"yes" | "no" | "">("");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpSent, setRsvpSent] = useState(false);

  const timeline = useInView(0.08);
  const travel = useInView(0.08);
  const giftsRef = useInView(0.08);
  const dresscode = useInView(0.08);
  const rsvp = useInView(0.08);
  const footerRef = useInView(0.08);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const timelineItems = [
    { time: "10:30", title: "Церемония бракосочетания", sub: "Суздаль" },
    { time: "11:00", title: "Фотосессия молодожёнов", sub: "Суздаль" },
    { time: "12:00", title: "Групповая фотосессия с гостями", sub: "Суздаль" },
    { time: "16:00", title: "Велком-буфет", sub: "Ресторан «Вновь», Владимир" },
    { time: "17:00", title: "Начало банкета", sub: "" },
  ];

  const inputStyle: React.CSSProperties = {
    fontFamily: serif, fontSize: "1.05rem", color: "var(--cream)",
    backgroundColor: "rgba(26,46,26,0.5)", border: "1px solid var(--thin-line)",
    padding: "0.85rem 1.25rem", width: "100%", outline: "none",
    letterSpacing: "0.02em", transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  const blockStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    padding: "2rem 2.5rem", position: "relative",
    border: "1px solid var(--thin-line)", backgroundColor: "rgba(26,46,26,0.35)",
    ...extra,
  });

  const labelStyle: React.CSSProperties = {
    position: "absolute", top: "-0.75rem", left: "1.5rem",
    padding: "0 0.75rem", backgroundColor: "var(--forest-deep)",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--forest-deep)", fontFamily: serif, overflowX: "hidden" }}>

      <Hydrangea side="left" />
      <Hydrangea side="right" />

      {/* Floating date */}
      <div style={{
        position: "fixed", top: "2rem", right: "2rem", zIndex: 50,
        opacity: scrolled ? 1 : 0, transform: scrolled ? "translateY(0)" : "translateY(-10px)",
        transition: "all 0.5s ease",
      }}>
        <span style={{ fontFamily: serif, letterSpacing: "0.22em", fontSize: "0.68rem", textTransform: "uppercase", color: "var(--sage)" }}>
          26 · VI · 2026
        </span>
      </div>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div className="animate-fade-in-slow" style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover", backgroundPosition: "center 30%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(17,31,17,0.72) 0%, rgba(17,31,17,0.52) 50%, rgba(17,31,17,0.92) 100%)",
        }} />

        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 2rem" }}>
          <div className="animate-fade-up" style={{ marginBottom: "2rem" }}>
            <SectionLabel>Суздаль — Владимир</SectionLabel>
          </div>
          <h1 className="animate-fade-up-d1" style={{
            fontFamily: serif, lineHeight: 1, letterSpacing: "0.05em", color: "var(--cream)",
            fontSize: "clamp(3.5rem, 13vw, 10rem)", fontWeight: 300, margin: 0,
          }}>
            Elizaveta
          </h1>
          <div className="animate-fade-up-d2" style={{ display: "flex", alignItems: "center", gap: "1.5rem", margin: "1rem 0" }}>
            <div style={{ width: "5rem", height: "1px", backgroundColor: "var(--sage-light)", opacity: 0.4 }} />
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: "2rem", color: "var(--sage-light)", fontWeight: 300 }}>&amp;</span>
            <div style={{ width: "5rem", height: "1px", backgroundColor: "var(--sage-light)", opacity: 0.4 }} />
          </div>
          <h1 className="animate-fade-up-d3" style={{
            fontFamily: serif, lineHeight: 1, letterSpacing: "0.05em", color: "var(--cream)",
            fontSize: "clamp(3.5rem, 13vw, 10rem)", fontWeight: 300, margin: 0,
          }}>
            Daniil
          </h1>
          <div className="animate-fade-up-d4" style={{ marginTop: "2.5rem" }}>
            <span style={{ fontFamily: serif, letterSpacing: "0.4em", fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sage-light)" }}>
              26 июня 2026
            </span>
          </div>
        </div>

        <div className="animate-fade-up-d4" style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, transparent, var(--sage-light))" }} />
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="program" style={{ maxWidth: "42rem", margin: "0 auto", padding: "7rem 2rem 5rem" }} ref={timeline.ref}>
        <Anim inView={timeline.inView} delay={0} style={{ marginBottom: "3.5rem" }}>
          <SectionLabel>Программа дня</SectionLabel>
          <h2 style={{ fontFamily: serif, marginTop: "1rem", lineHeight: 1.1, color: "var(--cream)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300, margin: "1rem 0 0" }}>
            26 июня
          </h2>
        </Anim>
        <div>
          {timelineItems.map((item, i) => (
            <TimelineItem key={i} time={item.time} title={item.title} sub={item.sub} delay={i * 110} inView={timeline.inView} />
          ))}
          <ThinLine />
        </div>
      </section>

      {/* ── TRANSPORT ── */}
      <section style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 2rem 5rem" }} ref={travel.ref}>
        <ThinLine />
        <div style={{ padding: "4rem 0" }}>
          <Anim inView={travel.inView} delay={0} style={{ marginBottom: "2.5rem" }}>
            <SectionLabel>Транспорт</SectionLabel>
            <h2 style={{ fontFamily: serif, marginTop: "1rem", lineHeight: 1.2, color: "var(--cream)", fontSize: "2.2rem", fontWeight: 300, margin: "1rem 0 0" }}>
              Как добраться
            </h2>
          </Anim>

          <Anim inView={travel.inView} delay={160} style={{ marginBottom: "1.25rem" }}>
            <div style={blockStyle()}>
              <div style={labelStyle}><SectionLabel>Трансфер · Суздаль → Владимир</SectionLabel></div>
              <p style={{ fontFamily: serif, fontSize: "1.1rem", lineHeight: 1.75, color: "var(--cream-warm)", marginTop: "0.5rem", margin: "0.5rem 0 0" }}>
                После групповой фотосессии мы организуем комфортный автобус для всех гостей.
                Отправление <span style={{ color: "var(--sage-light)" }}>около 14:00</span> от места фотосессии в Суздале.
              </p>
              <p style={{ fontFamily: serif, fontSize: "0.95rem", marginTop: "0.75rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--sage)", margin: "0.75rem 0 0" }}>
                Дорога займёт около 30–40 минут — у вас будет время освежиться перед банкетом.
              </p>
            </div>
          </Anim>

          <Anim inView={travel.inView} delay={300}>
            <div style={blockStyle({ backgroundColor: "rgba(26,46,26,0.22)" })}>
              <div style={labelStyle}><SectionLabel>Нужна помощь с дорогой?</SectionLabel></div>
              <p style={{ fontFamily: serif, fontSize: "1.1rem", lineHeight: 1.75, color: "var(--cream-warm)", marginTop: "0.5rem", margin: "0.5rem 0 0" }}>
                Если вам нужна помощь с транспортом до Суздаля или обратно — напишите нам заранее, и мы постараемся помочь.
              </p>
            </div>
          </Anim>
        </div>
        <ThinLine />
      </section>

      {/* ── VENUE ── */}
      <section style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <Anim inView={travel.inView} delay={400}>
          <SectionLabel>Место проведения</SectionLabel>
          <h2 style={{ fontFamily: serif, marginTop: "1rem", marginBottom: "2.5rem", lineHeight: 1.1, color: "var(--cream)", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 300, margin: "1rem 0 2.5rem" }}>
            Ресторан «Вновь»
          </h2>
          <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <Anim inView={travel.inView} delay={500}>
              <ThinLine />
              <p style={{ fontFamily: serif, fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", margin: "1.25rem 0 0.5rem", color: "var(--sage)" }}>Адрес</p>
              <p style={{ fontFamily: serif, fontSize: "1.15rem", lineHeight: 1.55, color: "var(--cream)", margin: 0 }}>
                Владимир<br />ул. Летне-Перевозинская, 1А
              </p>
            </Anim>
            <Anim inView={travel.inView} delay={620}>
              <ThinLine />
              <p style={{ fontFamily: serif, fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", margin: "1.25rem 0 0.5rem", color: "var(--sage)" }}>Начало</p>
              <p style={{ fontFamily: serif, fontSize: "1.15rem", lineHeight: 1.55, color: "var(--cream)", margin: 0 }}>
                Велком-буфет в 16:00<br />Банкет в 17:00
              </p>
            </Anim>
          </div>
        </Anim>
      </section>

      {/* ── GIFTS ── */}
      <section style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 2rem 5rem" }} ref={giftsRef.ref}>
        <ThinLine />
        <div style={{ padding: "4rem 0", textAlign: "center" }}>
          <Anim inView={giftsRef.inView} delay={0}>
            <SectionLabel>Подарки</SectionLabel>
            <h2 style={{ fontFamily: serif, marginTop: "1rem", lineHeight: 1.1, color: "var(--cream)", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 300, margin: "1rem 0 2rem" }}>
              Что поместится в конверт
            </h2>
          </Anim>
          <Anim inView={giftsRef.inView} delay={180} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
            {/* Simple envelope shape */}
            <svg width="52" height="38" viewBox="0 0 52 38" fill="none" style={{ opacity: 0.55 }}>
              <rect x="1" y="1" width="50" height="36" rx="1" stroke="var(--sage-light)" strokeWidth="1"/>
              <path d="M1 2 L26 22 L51 2" stroke="var(--sage-light)" strokeWidth="1" fill="none"/>
            </svg>
            <p style={{ fontFamily: serif, fontSize: "1.15rem", lineHeight: 1.8, color: "var(--cream-warm)", maxWidth: "30rem", margin: 0 }}>
              Если вы хотите порадовать нас подарком — мы будем рады тому, что поместится в конверт.
            </p>
            <p style={{ fontFamily: serif, fontSize: "1rem", fontStyle: "italic", color: "var(--sage)", margin: 0 }}>
              Ваше присутствие — уже лучший подарок.
            </p>
          </Anim>
        </div>
        <ThinLine />
      </section>

      {/* ── DRESS CODE ── */}
      <section style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 2rem 5rem" }} ref={dresscode.ref}>
        <div style={{ padding: "3rem 0", textAlign: "center" }}>
          <Anim inView={dresscode.inView} delay={0}>
            <SectionLabel>Дресс-код</SectionLabel>
          </Anim>
          <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Anim inView={dresscode.inView} delay={120} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
              padding: "2.5rem 3.5rem", borderRight: "1px solid var(--thin-line)",
            }}>
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", backgroundColor: "#0a0a0a", border: "1px solid rgba(144,170,144,0.25)", boxShadow: "0 0 24px rgba(0,0,0,0.6)" }} />
              <span style={{ fontFamily: serif, fontSize: "1rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--cream)" }}>Чёрный</span>
            </Anim>
            <Anim inView={dresscode.inView} delay={240} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
              padding: "2.5rem 3.5rem",
            }}>
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", backgroundColor: "#f0ebe0", border: "1px solid rgba(144,170,144,0.25)", boxShadow: "0 0 24px rgba(240,235,224,0.18)" }} />
              <span style={{ fontFamily: serif, fontSize: "1rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--cream)" }}>Белый</span>
            </Anim>
          </div>
          <Anim inView={dresscode.inView} delay={400} style={{ marginTop: "1.5rem" }}>
            <div style={{ width: "10rem", height: "1px", backgroundColor: "var(--thin-line)", margin: "0 auto 1.25rem" }} />
            <p style={{ fontFamily: serif, fontSize: "1rem", fontStyle: "italic", color: "var(--sage-light)", margin: 0 }}>
              Только чёрный и белый
            </p>
          </Anim>
        </div>
        <ThinLine />
      </section>

      {/* ── RSVP ── */}
      <section style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 2rem 7rem" }} ref={rsvp.ref}>
        <div style={{ padding: "4rem 0" }}>
          <Anim inView={rsvp.inView} delay={0} style={{ marginBottom: "2.5rem" }}>
            <SectionLabel>Подтверждение присутствия</SectionLabel>
            <h2 style={{ fontFamily: serif, marginTop: "1rem", lineHeight: 1.1, color: "var(--cream)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, margin: "1rem 0 0" }}>
              Вы придёте?
            </h2>
            <p style={{ fontFamily: serif, fontSize: "1rem", color: "var(--sage)", marginTop: "0.75rem", fontStyle: "italic", lineHeight: 1.6, margin: "0.75rem 0 0" }}>
              Просим ответить до 1 июня 2026
            </p>
          </Anim>

          {rsvpSent ? (
            <Anim inView={true} delay={0} style={{ textAlign: "center", padding: "3rem 0" }}>
              <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--sage-light)", margin: "0 auto 2rem" }} />
              <p style={{ fontFamily: serif, fontSize: "1.5rem", color: "var(--cream)", fontWeight: 300, margin: 0 }}>
                {rsvpAttend === "yes" ? "Ждём вас с нетерпением!" : "Жаль, что вы не сможете прийти."}
              </p>
              <p style={{ fontFamily: serif, fontSize: "1rem", color: "var(--sage)", fontStyle: "italic", margin: "0.75rem 0 0" }}>
                Спасибо, {rsvpName}!
              </p>
              <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--sage-light)", margin: "2rem auto 0" }} />
            </Anim>
          ) : (
            <Anim inView={rsvp.inView} delay={200}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--sage)", display: "block", marginBottom: "0.5rem" }}>
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
                  <label style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--sage)", display: "block", marginBottom: "0.75rem" }}>
                    Вы придёте?
                  </label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {(["yes", "no"] as const).map(opt => (
                      <button key={opt} onClick={() => setRsvpAttend(opt)} style={{
                        flex: 1, fontFamily: serif, fontSize: "1rem", letterSpacing: "0.08em",
                        padding: "0.85rem 1rem", border: "1px solid",
                        borderColor: rsvpAttend === opt ? "var(--sage-light)" : "var(--thin-line)",
                        backgroundColor: rsvpAttend === opt ? "rgba(180,200,180,0.12)" : "transparent",
                        color: rsvpAttend === opt ? "var(--cream)" : "var(--sage)",
                        cursor: "pointer", transition: "all 0.3s ease",
                      }}>
                        {opt === "yes" ? "Да, буду!" : "К сожалению, нет"}
                      </button>
                    ))}
                  </div>
                </div>

                {rsvpAttend === "yes" && (
                  <Anim inView={true} delay={0}>
                    <label style={{ fontFamily: serif, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--sage)", display: "block", marginBottom: "0.5rem" }}>
                      Количество гостей
                    </label>
                    <select value={rsvpGuests} onChange={e => setRsvpGuests(e.target.value)}
                      style={{ ...inputStyle, appearance: "none" as const }}>
                      {["1", "2", "3", "4"].map(n => (
                        <option key={n} value={n} style={{ backgroundColor: "var(--forest-deep)", color: "var(--cream)" }}>
                          {n} {n === "1" ? "гость" : "гостя"}
                        </option>
                      ))}
                    </select>
                  </Anim>
                )}

                <button
                  onClick={() => { if (rsvpName.trim() && rsvpAttend) setRsvpSent(true); }}
                  style={{
                    fontFamily: serif, fontSize: "0.82rem", letterSpacing: "0.3em",
                    textTransform: "uppercase", padding: "1.1rem 2rem",
                    border: "1px solid var(--sage-light)", backgroundColor: "transparent",
                    color: "var(--cream)", cursor: "pointer", marginTop: "0.5rem",
                    transition: "all 0.3s ease",
                    opacity: rsvpName.trim() && rsvpAttend ? 1 : 0.35,
                  }}
                >
                  Отправить ответ
                </button>
              </div>
            </Anim>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 2rem 6rem", textAlign: "center" }} ref={footerRef.ref}>
        <ThinLine />
        <div style={{ paddingTop: "5rem" }}>
          <Anim inView={footerRef.inView} delay={0} tag="h2" style={{
            fontFamily: serif, lineHeight: 1, color: "var(--cream)",
            fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 300, letterSpacing: "0.08em", margin: 0,
          }}>
            E &amp; D
          </Anim>
          <Anim inView={footerRef.inView} delay={150} tag="p" style={{
            fontFamily: serif, fontStyle: "italic", fontSize: "1.25rem", color: "var(--sage)", margin: "1rem 0 0",
          }}>
            Connected
          </Anim>
          <Anim inView={footerRef.inView} delay={300} style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <div style={{ width: "4rem", height: "1px", backgroundColor: "var(--thin-line)" }} />
            <span style={{ fontFamily: serif, letterSpacing: "0.3em", fontSize: "0.68rem", color: "var(--sage-light)" }}>
              26 · VI · 2026
            </span>
            <div style={{ width: "4rem", height: "1px", backgroundColor: "var(--thin-line)" }} />
          </Anim>
        </div>
      </footer>

    </div>
  );
}