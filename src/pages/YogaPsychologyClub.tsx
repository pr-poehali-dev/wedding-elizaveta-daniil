import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const schedule = [
  { day: "Понедельник", time: "19:00 — 20:30", topic: "Йога + дыхательные практики", spots: 8 },
  { day: "Среда", time: "18:30 — 20:00", topic: "Групповая психология: тема недели", spots: 6 },
  { day: "Пятница", time: "19:00 — 20:30", topic: "Интегративная практика (тело + разум)", spots: 8 },
  { day: "Суббота", time: "11:00 — 13:00", topic: "Расширенная сессия + обмен опытом", spots: 10 },
];

const structure = [
  { num: "01", title: "Телесная разминка", desc: "10–15 минут лёгкой йоги для перехода из суеты дня в присутствие." },
  { num: "02", title: "Основная практика", desc: "Йога или психологическая тема недели. Работа в группе или парах." },
  { num: "03", title: "Шеринг", desc: "Открытый круг: что заметили, что откликнулось, что хочется взять с собой." },
  { num: "04", title: "Шавасана / интеграция", desc: "Завершение практики. Тихое время для усвоения опыта." },
];

export default function YogaPsychologyClub() {
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-[hsl(140,12%,96%)] overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-[450px] h-[450px] organic-blob bg-[hsl(140,18%,52%)]/15 pointer-events-none" />
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[hsl(140,18%,52%)]/20 text-[hsl(140,22%,38%)] rounded-full px-4 py-1.5 font-golos text-xs tracking-widest uppercase mb-8">
                  <Icon name="Users" size={12} />
                  Групповой формат
                </div>
                <h1 className="font-cormorant text-5xl lg:text-6xl font-light text-[hsl(25,25%,18%)] leading-tight mb-6">
                  Клуб йоги<br />
                  и <em className="italic text-[hsl(140,22%,38%)]">психологии</em>
                </h1>
                <p className="font-golos text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  Безопасное сообщество, где тело и психика развиваются вместе. Еженедельные встречи
                  онлайн: йога, групповая терапия и практики осознанности.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#signup"
                    className="inline-flex items-center gap-2 bg-[hsl(140,22%,38%)] text-white font-golos px-7 py-3.5 rounded-full hover:opacity-90 transition-all hover-lift text-sm"
                  >
                    Записаться в клуб <Icon name="ArrowRight" size={16} />
                  </a>
                  <a
                    href="#schedule"
                    className="inline-flex items-center gap-2 border border-[hsl(140,22%,38%)]/30 text-[hsl(25,25%,18%)] font-golos px-7 py-3.5 rounded-full hover:bg-muted/50 transition-all text-sm"
                  >
                    Расписание
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="organic-blob overflow-hidden aspect-square max-w-md mx-auto">
                  <img
                    src="https://cdn.poehali.dev/projects/341c6871-f466-496b-b3ba-6d76285e5ef1/files/1947862d-b10a-4ed0-93a8-bf87143839f4.jpg"
                    alt="Клуб йоги и психологии — групповые занятия онлайн"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "Shield", label: "Безопасно", desc: "Конфиденциальность и принятие" },
                { icon: "Users", label: "Сообщество", desc: "До 10 участников в группе" },
                { icon: "Repeat", label: "4 раза в неделю", desc: "Гибкое расписание" },
                { icon: "Wifi", label: "Онлайн", desc: "Любая точка мира" },
              ].map((b) => (
                <div key={b.label} className="bg-[hsl(140,12%,96%)] rounded-3xl p-6 text-center hover-lift">
                  <div className="w-10 h-10 rounded-2xl bg-[hsl(140,18%,52%)]/20 flex items-center justify-center mx-auto mb-4">
                    <Icon name={b.icon as "Shield" | "Users" | "Repeat" | "Wifi"} size={18} className="text-[hsl(140,22%,38%)]" />
                  </div>
                  <div className="font-cormorant text-xl font-semibold text-[hsl(25,25%,18%)] mb-1">{b.label}</div>
                  <div className="font-golos text-xs text-muted-foreground">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" className="py-20 bg-[hsl(38,20%,93%)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(140,22%,38%)] mb-4">Расписание</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Встречи клуба</h2>
            </div>
            <div className="max-w-2xl mx-auto flex flex-col gap-3">
              {schedule.map((s) => (
                <div key={s.day} className="bg-white rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4 hover-lift">
                  <div>
                    <div className="font-cormorant text-xl font-semibold text-[hsl(25,25%,18%)]">{s.day}</div>
                    <div className="font-golos text-sm text-muted-foreground mt-0.5">{s.topic}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-golos text-sm font-medium text-[hsl(25,25%,18%)]">{s.time}</div>
                      <div className="font-golos text-xs text-[hsl(140,22%,38%)]">мест: {s.spots}</div>
                    </div>
                    <a
                      href="#signup"
                      className="w-8 h-8 rounded-full bg-[hsl(140,22%,38%)] flex items-center justify-center hover:opacity-80 transition-all"
                    >
                      <Icon name="ArrowRight" size={14} className="text-white" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Structure */}
        <section className="py-20 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(15,45%,40%)] mb-4">Как проходит встреча</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Структура занятия</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {structure.map((s) => (
                <div key={s.num} className="relative bg-[hsl(38,25%,95%)] rounded-3xl p-7 hover-lift">
                  <div className="font-cormorant text-5xl font-light text-[hsl(140,18%,52%)]/30 mb-4 leading-none">{s.num}</div>
                  <h3 className="font-cormorant text-xl font-semibold text-[hsl(25,25%,18%)] mb-2">{s.title}</h3>
                  <p className="font-golos text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signup */}
        <section id="signup" className="py-20 bg-[hsl(140,12%,96%)]">
          <div className="container mx-auto px-6 max-w-xl">
            <div className="text-center mb-10">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(140,22%,38%)] mb-4">Вступить в клуб</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Запись в клуб йоги и психологии</h2>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Мария"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(140,22%,38%)]/30"
                  />
                </div>
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Телефон или Telegram</label>
                  <input
                    type="tel"
                    placeholder="+7 900 000-00-00"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(140,22%,38%)]/30"
                  />
                </div>
                <div>
                  <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Комментарий (необязательно)</label>
                  <textarea
                    placeholder="Почему хочете присоединиться к клубу?"
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    rows={3}
                    className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(140,22%,38%)]/30 resize-none"
                  />
                </div>
                <button className="w-full bg-[hsl(140,22%,38%)] text-white font-golos py-3.5 rounded-2xl hover:opacity-90 transition-all hover-lift text-sm font-medium mt-2">
                  Записаться в клуб
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
