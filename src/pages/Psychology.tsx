import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const methods = [
  { icon: "Brain", name: "КПТ", desc: "Когнитивно-поведенческая терапия. Работа с мыслями, убеждениями и поведенческими паттернами." },
  { icon: "MessageCircle", name: "Нарративная практика", desc: "Переосмысление историй, которые мы рассказываем о себе. Авторство своей жизни." },
  { icon: "Flower2", name: "Соматический подход", desc: "Тело как источник информации о психическом состоянии. Работа с зажимами и реакциями." },
  { icon: "Sun", name: "Mindfulness", desc: "Осознанность и присутствие. Снижение тревоги через медитативные практики." },
];

const problems = [
  "Тревога и панические атаки",
  "Сниженное настроение, апатия",
  "Проблемы в отношениях",
  "Низкая самооценка",
  "Выгорание на работе",
  "Страхи и фобии",
  "Кризисы и перемены",
  "Трудности с общением",
];

const faqs = [
  {
    q: "Как проходит первая сессия?",
    a: "Первая встреча — это знакомство. Я слушаю ваш запрос, мы обсуждаем ожидания и формат работы. Никаких заданий, никакого давления — только разговор.",
  },
  {
    q: "Сколько сессий нужно?",
    a: "Зависит от запроса. Краткосрочная работа (5–10 сессий) при конкретной теме. Долгосрочная (от 3 месяцев) при глубинной проработке. Мы обсуждаем это вместе.",
  },
  {
    q: "Это конфиденциально?",
    a: "Абсолютно. Всё, что происходит на сессии — остаётся между нами. Это профессиональный стандарт и мой личный принцип.",
  },
  {
    q: "Как проходят онлайн-сессии?",
    a: "Через Zoom или Telegram. Нужны наушники, тихое место и стабильный интернет. По ощущениям — ничем не отличается от живой встречи.",
  },
  {
    q: "Что если я не знаю, с чего начать?",
    a: "Это нормально. Многие приходят с ощущением «что-то не так, но не могу объяснить». Именно для этого и нужна первая встреча.",
  },
];

export default function Psychology() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", contact: "", request: "" });

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-[hsl(40,30%,97%)] overflow-hidden relative">
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] organic-blob-2 bg-[hsl(15,45%,40%)]/10 pointer-events-none" />
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[hsl(15,45%,40%)]/10 text-[hsl(15,45%,40%)] rounded-full px-4 py-1.5 font-golos text-xs tracking-widest uppercase mb-8">
              <Icon name="User" size={12} />
              Индивидуально · Онлайн
            </div>
            <h1 className="font-cormorant text-5xl lg:text-6xl font-light text-[hsl(25,25%,18%)] leading-tight mb-6">
              Психолог онлайн —<br />
              <em className="italic text-[hsl(15,45%,40%)]">индивидуальные сессии</em>
            </h1>
            <p className="font-golos text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Работаю с тревогой, отношениями, самооценкой и жизненными кризисами. Создаю безопасное
              пространство, где можно быть честным с собой. Без осуждения, без давления.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#session-form"
                className="inline-flex items-center gap-2 bg-[hsl(15,45%,40%)] text-[hsl(40,30%,97%)] font-golos px-7 py-3.5 rounded-full hover:opacity-90 transition-all hover-lift text-sm"
              >
                Записаться на сессию <Icon name="ArrowRight" size={16} />
              </a>
              <div className="flex items-center gap-3 font-golos text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {["🟤", "🟠", "🟡"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-white flex items-center justify-center text-xs">
                      {c}
                    </div>
                  ))}
                </div>
                <span>500+ часов сессий</span>
              </div>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="py-20 bg-[hsl(25,25%,18%)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(35,55%,72%)] mb-4">С чем я работаю</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(40,30%,90%)]">Темы для работы</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {problems.map((p) => (
                <span
                  key={p}
                  className="font-golos text-sm bg-white/10 text-[hsl(40,30%,85%)] px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/15 transition-colors"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Methods */}
        <section className="py-20 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(15,45%,40%)] mb-4">Методы</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Как я работаю</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {methods.map((m) => (
                <div key={m.name} className="bg-[hsl(38,25%,95%)] rounded-3xl p-7 flex gap-5 hover-lift">
                  <div className="w-11 h-11 rounded-2xl bg-[hsl(15,45%,40%)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={m.icon as "Brain" | "MessageCircle" | "Flower2" | "Sun"} size={20} className="text-[hsl(15,45%,40%)]" />
                  </div>
                  <div>
                    <h3 className="font-cormorant text-xl font-semibold text-[hsl(25,25%,18%)] mb-1">{m.name}</h3>
                    <p className="font-golos text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[hsl(38,20%,93%)]">
          <div className="container mx-auto px-6 max-w-2xl">
            <div className="text-center mb-12">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(140,22%,38%)] mb-4">FAQ</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Частые вопросы</h2>
            </div>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden hover-lift"
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-golos text-sm font-medium text-[hsl(25,25%,18%)]">{faq.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="font-golos text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking form */}
        <section id="session-form" className="py-20 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6 max-w-xl">
            <div className="text-center mb-10">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(15,45%,40%)] mb-4">Начнём</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Запись на сессию</h2>
              <p className="font-golos text-sm text-muted-foreground mt-3">Первая встреча — бесплатно, 20 минут</p>
            </div>
            <div className="bg-[hsl(38,25%,95%)] rounded-3xl p-8">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Алексей"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(15,45%,40%)]/30"
                  />
                </div>
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Telegram / телефон</label>
                  <input
                    type="text"
                    placeholder="@username или +7..."
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(15,45%,40%)]/30"
                  />
                </div>
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Кратко о запросе</label>
                  <textarea
                    placeholder="Что вас беспокоит или что хотите изменить?"
                    value={form.request}
                    onChange={(e) => setForm({ ...form, request: e.target.value })}
                    rows={3}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(15,45%,40%)]/30 resize-none"
                  />
                </div>
                <button className="w-full bg-[hsl(15,45%,40%)] text-[hsl(40,30%,97%)] font-golos py-3.5 rounded-2xl hover:opacity-90 transition-all hover-lift text-sm font-medium mt-2">
                  Записаться на бесплатную встречу
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
