import { useEffect, useRef, useState } from "react";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/35245d12-61b8-4585-9a43-4bb7fac64802/files/87922603-98f5-4ea0-9ca3-acd8d0d667f7.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const ThinLine = ({ className = "" }: { className?: string }) => (
  <div className={`w-full h-px ${className}`} style={{ backgroundColor: "var(--thin-line)" }} />
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "var(--sage)", letterSpacing: "0.35em", fontSize: "0.7rem", textTransform: "uppercase", fontStyle: "italic" }}>
    {children}
  </span>
);

interface TimelineItemProps {
  time: string;
  title: string;
  sub?: string;
  delay?: number;
  inView: boolean;
}

const TimelineItem = ({ time, title, sub, delay = 0, inView }: TimelineItemProps) => (
  <div
    className="grid gap-6 py-7 transition-all duration-700"
    style={{
      gridTemplateColumns: "80px 1fr",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transitionDelay: `${delay}ms`,
    }}
  >
    <div style={{ textAlign: "right", paddingTop: "4px" }}>
      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.85rem", letterSpacing: "0.15em", color: "var(--sage-light)" }}>
        {time}
      </span>
    </div>
    <div>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 300, lineHeight: 1.4, color: "var(--cream)" }}>
        {title}
      </p>
      {sub && (
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9rem", marginTop: "4px", fontStyle: "italic", color: "var(--sage)" }}>
          {sub}
        </p>
      )}
    </div>
  </div>
);

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const timeline = useInView(0.1);
  const travel = useInView(0.1);
  const dresscode = useInView(0.1);
  const venue = useInView(0.1);
  const footer = useInView(0.1);

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

  const serif = "'Cormorant Garamond', Georgia, serif";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--forest-deep)", fontFamily: serif }}>

      {/* Floating date badge */}
      <div
        style={{
          position: "fixed", top: "2rem", right: "2rem", zIndex: 50,
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.5s ease",
        }}
      >
        <span style={{ fontFamily: serif, letterSpacing: "0.2em", fontSize: "0.7rem", textTransform: "uppercase", color: "var(--sage)" }}>
          26 · VI · 2026
        </span>
      </div>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Background image */}
        <div className="animate-fade-in-slow" style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }} />
        {/* Forest overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(17,31,17,0.72) 0%, rgba(17,31,17,0.55) 50%, rgba(17,31,17,0.88) 100%)",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 2rem" }}>
          <div className="animate-fade-up" style={{ marginBottom: "2rem" }}>
            <SectionLabel>Суздаль — Владимир</SectionLabel>
          </div>

          <h1
            className="animate-fade-up-d1"
            style={{
              fontFamily: serif, lineHeight: 1, letterSpacing: "0.05em",
              color: "var(--cream)",
              fontSize: "clamp(4rem, 14vw, 11rem)",
              fontWeight: 300, margin: 0,
            }}
          >
            Elizaveta
          </h1>

          <div className="animate-fade-up-d2" style={{ display: "flex", alignItems: "center", gap: "1.5rem", margin: "1rem 0" }}>
            <div style={{ width: "6rem", height: "1px", backgroundColor: "var(--sage-light)", opacity: 0.5 }} />
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: "2rem", color: "var(--sage-light)", fontWeight: 300 }}>
              &amp;
            </span>
            <div style={{ width: "6rem", height: "1px", backgroundColor: "var(--sage-light)", opacity: 0.5 }} />
          </div>

          <h1
            className="animate-fade-up-d3"
            style={{
              fontFamily: serif, lineHeight: 1, letterSpacing: "0.05em",
              color: "var(--cream)",
              fontSize: "clamp(4rem, 14vw, 11rem)",
              fontWeight: 300, margin: 0,
            }}
          >
            Daniil
          </h1>

          <div className="animate-fade-up-d4" style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontFamily: serif, letterSpacing: "0.4em", fontSize: "0.85rem", textTransform: "uppercase", color: "var(--sage-light)" }}>
              26 июня 2026
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="animate-fade-up-d4" style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, transparent, var(--sage-light))" }} />
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="program" style={{ maxWidth: "42rem", margin: "0 auto", padding: "7rem 2rem" }} ref={timeline.ref}>
        <div
          style={{
            marginBottom: "4rem",
            opacity: timeline.inView ? 1 : 0,
            transform: timeline.inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <SectionLabel>Программа дня</SectionLabel>
          <h2
            style={{ fontFamily: serif, marginTop: "1rem", lineHeight: 1.1, color: "var(--cream)", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300 }}
          >
            26 июня
          </h2>
        </div>

        <div>
          {timelineItems.map((item, i) => (
            <div key={i}>
              <ThinLine />
              <TimelineItem
                time={item.time}
                title={item.title}
                sub={item.sub}
                delay={i * 100}
                inView={timeline.inView}
              />
            </div>
          ))}
          <ThinLine />
        </div>
      </section>

      {/* ── TRAVEL NOTE ── */}
      <section style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 2rem 4rem" }} ref={travel.ref}>
        <ThinLine />
        <div style={{ padding: "4rem 0", display: "grid", gap: "3rem", gridTemplateColumns: "1fr" }}>
          <div
            style={{
              opacity: travel.inView ? 1 : 0,
              transform: travel.inView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease",
            }}
          >
            <SectionLabel>Travel Note</SectionLabel>
            <h2
              style={{ fontFamily: serif, marginTop: "1rem", lineHeight: 1.2, color: "var(--cream)", fontSize: "2.2rem", fontWeight: 300 }}
            >
              Трансфер
            </h2>
          </div>

          <div
            style={{
              opacity: travel.inView ? 1 : 0,
              transform: travel.inView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s 0.2s ease",
            }}
          >
            <div
              style={{
                padding: "2.5rem",
                position: "relative",
                border: "1px solid var(--thin-line)",
                backgroundColor: "rgba(26,46,26,0.4)",
              }}
            >
              <div style={{ position: "absolute", top: "-0.75rem", left: "2rem", padding: "0 0.75rem", backgroundColor: "var(--forest-deep)" }}>
                <SectionLabel>Суздаль → Владимир</SectionLabel>
              </div>
              <p
                style={{ fontFamily: serif, fontSize: "1.15rem", lineHeight: 1.7, color: "var(--cream-warm)", marginTop: "0.5rem" }}
              >
                После групповой фотосессии мы организуем комфортный трансфер для всех гостей из Суздаля во Владимир. Автобус отправится{" "}
                <span style={{ color: "var(--sage-light)" }}>около 14:00</span> от места фотосессии.
              </p>
              <p
                style={{ fontFamily: serif, fontSize: "1rem", marginTop: "1rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--sage)" }}
              >
                Дорога займёт около 30–40 минут. У вас будет время освежиться и подготовиться к вечернему торжеству.
              </p>
            </div>
          </div>
        </div>
        <ThinLine />
      </section>

      {/* ── VENUE ── */}
      <section style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 2rem 4rem" }} ref={venue.ref}>
        <div
          style={{
            padding: "3rem 0",
            opacity: venue.inView ? 1 : 0,
            transform: venue.inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <SectionLabel>Место проведения</SectionLabel>
          <h2
            style={{ fontFamily: serif, marginTop: "1rem", marginBottom: "2.5rem", lineHeight: 1.1, color: "var(--cream)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300 }}
          >
            Ресторан «Вновь»
          </h2>

          <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <div
              style={{
                transitionDelay: "150ms",
                opacity: venue.inView ? 1 : 0,
                transform: venue.inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s 0.15s ease",
              }}
            >
              <ThinLine className="mb-6" />
              <p style={{ fontFamily: serif, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.5rem", color: "var(--sage)" }}>
                Адрес
              </p>
              <p style={{ fontFamily: serif, fontSize: "1.2rem", lineHeight: 1.5, color: "var(--cream)" }}>
                Владимир<br />
                ул. Летне-Перевозинская, 1А
              </p>
            </div>

            <div
              style={{
                opacity: venue.inView ? 1 : 0,
                transform: venue.inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s 0.3s ease",
              }}
            >
              <ThinLine className="mb-6" />
              <p style={{ fontFamily: serif, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.5rem", color: "var(--sage)" }}>
                Начало
              </p>
              <p style={{ fontFamily: serif, fontSize: "1.2rem", lineHeight: 1.5, color: "var(--cream)" }}>
                Велком-буфет в 16:00<br />
                Банкет в 17:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DRESS CODE ── */}
      <section style={{ padding: "0 2rem 5rem" }} ref={dresscode.ref}>
        <ThinLine style={{ maxWidth: "42rem", margin: "0 auto" }} />
        <div
          style={{
            maxWidth: "42rem",
            margin: "0 auto",
            padding: "5rem 0",
            opacity: dresscode.inView ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <SectionLabel>Дресс-код</SectionLabel>

            <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
              {/* Black */}
              <div
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
                  padding: "3rem 4rem",
                  borderRight: "1px solid var(--thin-line)",
                  opacity: dresscode.inView ? 1 : 0,
                  transform: dresscode.inView ? "translateX(0)" : "translateX(-20px)",
                  transition: "all 0.7s 0.1s ease",
                }}
              >
                <div
                  style={{
                    width: "4rem", height: "4rem", borderRadius: "50%",
                    backgroundColor: "#0a0a0a",
                    border: "1px solid rgba(144,170,144,0.2)",
                    boxShadow: "0 0 30px rgba(0,0,0,0.5)",
                  }}
                />
                <span style={{ fontFamily: serif, fontSize: "1.1rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--cream)" }}>
                  Чёрный
                </span>
              </div>

              {/* White */}
              <div
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
                  padding: "3rem 4rem",
                  opacity: dresscode.inView ? 1 : 0,
                  transform: dresscode.inView ? "translateX(0)" : "translateX(20px)",
                  transition: "all 0.7s 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "4rem", height: "4rem", borderRadius: "50%",
                    backgroundColor: "#f0ebe0",
                    border: "1px solid rgba(144,170,144,0.2)",
                    boxShadow: "0 0 30px rgba(240,235,224,0.15)",
                  }}
                />
                <span style={{ fontFamily: serif, fontSize: "1.1rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--cream)" }}>
                  Белый
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: "2rem",
                opacity: dresscode.inView ? 1 : 0,
                transition: "opacity 0.7s 0.4s ease",
              }}
            >
              <div style={{ width: "12rem", height: "1px", backgroundColor: "var(--thin-line)", margin: "0 auto 1.5rem" }} />
              <p style={{ fontFamily: serif, fontSize: "1.1rem", fontStyle: "italic", color: "var(--sage-light)" }}>
                Только чёрный и белый
              </p>
            </div>
          </div>
        </div>
        <ThinLine style={{ maxWidth: "42rem", margin: "0 auto" }} />
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ maxWidth: "42rem", margin: "0 auto", padding: "6rem 2rem", textAlign: "center" }} ref={footer.ref}>
        <div
          style={{
            opacity: footer.inView ? 1 : 0,
            transform: footer.inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <h2
            style={{
              fontFamily: serif,
              lineHeight: 1,
              color: "var(--cream)",
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "0.08em",
              margin: 0,
            }}
          >
            E &amp; D
          </h2>
          <p style={{ fontFamily: serif, fontStyle: "italic", marginTop: "1rem", fontSize: "1.3rem", color: "var(--sage)" }}>
            Connected
          </p>
          <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <div style={{ width: "4rem", height: "1px", backgroundColor: "var(--thin-line)" }} />
            <span style={{ fontFamily: serif, letterSpacing: "0.3em", fontSize: "0.7rem", color: "var(--sage-light)" }}>
              26 · VI · 2026
            </span>
            <div style={{ width: "4rem", height: "1px", backgroundColor: "var(--thin-line)" }} />
          </div>
        </div>
      </footer>

    </div>
  );
}
