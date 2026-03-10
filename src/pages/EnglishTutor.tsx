import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const levels = [
  { code: "A1–A2", name: "Beginner", desc: "Стартуем с нуля. Медленно, без стресса, с радостью открытия.", price: "1 500 ₽" },
  { code: "B1–B2", name: "Intermediate", desc: "Преодолеваем плато. Ломаем страх говорить. Выходим на уверенный разговор.", price: "1 800 ₽" },
  { code: "C1", name: "Advanced", desc: "Тонкости: идиомы, академическое письмо, деловой английский, IELTS.", price: "2 200 ₽" },
];

const methodology = [
  { icon: "Heart", title: "Без стресса", desc: "Ошибки — часть процесса, не повод для критики. Я создаю пространство, где безопасно пробовать." },
  { icon: "Layers", title: "Глубокое понимание", desc: "Не зубрёжка правил, а понимание логики языка. Вы начинаете чувствовать английский." },
  { icon: "Target", title: "Реальный контекст", desc: "Разговоры, фильмы, книги, подкасты. Язык как живая система, а не набор упражнений." },
  { icon: "Zap", title: "Ваш темп", desc: "Занятия адаптируются к вашей нагрузке и скорости. Прогресс — устойчивый, а не срочный." },
];

export default function EnglishTutor() {
  const [form, setForm] = useState({ name: "", contact: "", level: "", goal: "" });

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-[hsl(40,30%,97%)] overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-[380px] h-[380px] organic-blob bg-[hsl(35,55%,72%)]/20 pointer-events-none" />
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[hsl(35,55%,55%)]/15 text-[hsl(35,45%,38%)] rounded-full px-4 py-1.5 font-golos text-xs tracking-widest uppercase mb-8">
                <span>🇬🇧</span>
                Английский онлайн
              </div>
              <h1 className="font-cormorant text-5xl lg:text-6xl font-light text-[hsl(25,25%,18%)] leading-tight mb-6">
                Репетитор английского —<br />
                <em className="italic text-[hsl(35,45%,38%)]">язык без страха</em>
              </h1>
              <p className="font-golos text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Преподаю английский как психолог: понимаю языковую тревогу изнутри. Моя методика —
                глубокое понимание вместо зубрёжки, уверенность вместо страха ошибиться.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#trial-form"
                  className="inline-flex items-center gap-2 bg-[hsl(35,45%,38%)] text-[hsl(40,30%,97%)] font-golos px-7 py-3.5 rounded-full hover:opacity-90 transition-all hover-lift text-sm"
                >
                  Записаться на пробный урок <Icon name="ArrowRight" size={16} />
                </a>
              </div>

              {/* IELTS badge */}
              <div className="mt-10 flex flex-wrap gap-4">
                {["Cambridge CELTA", "IELTS 8.0", "6+ лет преподавания"].map((b) => (
                  <div key={b} className="flex items-center gap-2 font-golos text-xs text-muted-foreground bg-muted/60 px-4 py-2 rounded-full">
                    <Icon name="CheckCircle" size={12} className="text-[hsl(35,45%,38%)]" />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-20 bg-[hsl(38,20%,93%)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(35,45%,38%)] mb-4">Методика</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Почему это работает</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {methodology.map((m) => (
                <div key={m.title} className="bg-white rounded-3xl p-7 hover-lift">
                  <div className="w-10 h-10 rounded-2xl bg-[hsl(35,55%,72%)]/25 flex items-center justify-center mb-5">
                    <Icon name={m.icon as "Heart" | "Layers" | "Target" | "Zap"} size={18} className="text-[hsl(35,45%,38%)]" />
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-[hsl(25,25%,18%)] mb-2">{m.title}</h3>
                  <p className="font-golos text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Levels & Prices */}
        <section className="py-20 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(15,45%,40%)] mb-4">Уровни и цены</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Для любого уровня</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {levels.map((l, i) => (
                <div
                  key={l.code}
                  className={`rounded-3xl p-8 hover-lift ${i === 1 ? "bg-[hsl(25,25%,18%)] text-white" : "bg-[hsl(38,25%,95%)]"}`}
                >
                  <div className={`font-golos text-xs tracking-[0.2em] uppercase mb-2 ${i === 1 ? "text-[hsl(35,55%,72%)]" : "text-muted-foreground"}`}>
                    {l.code}
                  </div>
                  <h3 className={`font-cormorant text-3xl font-semibold mb-3 ${i === 1 ? "text-white" : "text-[hsl(25,25%,18%)]"}`}>
                    {l.name}
                  </h3>
                  <p className={`font-golos text-sm leading-relaxed mb-6 ${i === 1 ? "text-[hsl(40,30%,70%)]" : "text-muted-foreground"}`}>
                    {l.desc}
                  </p>
                  <div className={`font-cormorant text-4xl font-light mb-1 ${i === 1 ? "text-[hsl(35,55%,72%)]" : "text-[hsl(15,45%,40%)]"}`}>
                    {l.price}
                  </div>
                  <div className={`font-golos text-xs ${i === 1 ? "text-[hsl(40,30%,55%)]" : "text-muted-foreground"}`}>
                    за 60 минут
                  </div>
                  <a
                    href="#trial-form"
                    className={`mt-6 w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-golos text-sm transition-all hover-lift ${
                      i === 1
                        ? "bg-[hsl(15,45%,40%)] text-white hover:opacity-90"
                        : "border border-border text-foreground hover:bg-muted/50"
                    }`}
                  >
                    Пробный урок <Icon name="ArrowRight" size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why no stress quote */}
        <section className="py-20 bg-[hsl(35,55%,72%)]/20">
          <div className="container mx-auto px-6 text-center max-w-2xl">
            <blockquote className="font-cormorant text-3xl lg:text-4xl font-light text-[hsl(25,25%,18%)] leading-tight">
              «Страх ошибиться — главный враг языка.{" "}
              <em className="italic text-[hsl(15,45%,40%)]">Убираем его первым.</em>»
            </blockquote>
          </div>
        </section>

        {/* Trial form */}
        <section id="trial-form" className="py-20 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6 max-w-xl">
            <div className="text-center mb-10">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(35,45%,38%)] mb-4">Первый шаг</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Запись на пробный урок</h2>
              <p className="font-golos text-sm text-muted-foreground mt-3">Бесплатно · 30 минут · Без обязательств</p>
            </div>
            <div className="bg-[hsl(38,25%,95%)] rounded-3xl p-8">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Дмитрий"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(35,45%,38%)]/30"
                  />
                </div>
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Telegram / телефон</label>
                  <input
                    type="text"
                    placeholder="@username"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(35,45%,38%)]/30"
                  />
                </div>
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Ваш уровень</label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(35,45%,38%)]/30"
                  >
                    <option value="">Выберите уровень</option>
                    <option value="a1">A1 — Beginner</option>
                    <option value="a2">A2 — Elementary</option>
                    <option value="b1">B1 — Intermediate</option>
                    <option value="b2">B2 — Upper-Intermediate</option>
                    <option value="c1">C1 — Advanced</option>
                    <option value="unknown">Не знаю свой уровень</option>
                  </select>
                </div>
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Ваша цель</label>
                  <textarea
                    placeholder="Разговорный английский, подготовка к IELTS, деловой..."
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    rows={2}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(35,45%,38%)]/30 resize-none"
                  />
                </div>
                <button className="w-full bg-[hsl(35,45%,38%)] text-[hsl(40,30%,97%)] font-golos py-3.5 rounded-2xl hover:opacity-90 transition-all hover-lift text-sm font-medium mt-2">
                  Записаться на бесплатный пробный урок
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
