import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const services = [
  { value: "yoga-club", label: "Клуб йоги и психологии" },
  { value: "psychology", label: "Психолог онлайн" },
  { value: "english", label: "Репетитор английского" },
  { value: "consultation", label: "Бесплатная консультация" },
  { value: "other", label: "Другое" },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: "", contact: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-[hsl(40,30%,97%)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[350px] h-[350px] organic-blob bg-[hsl(35,55%,72%)]/15 pointer-events-none -translate-x-1/3 -translate-y-1/3" />
          <div className="container mx-auto px-6 text-center relative z-10">
            <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(15,45%,40%)] mb-4">Контакты</p>
            <h1 className="font-cormorant text-5xl lg:text-6xl font-light text-[hsl(25,25%,18%)] mb-4">
              Напишите мне —<br />
              <em className="italic text-[hsl(15,45%,40%)]">начнём вместе</em>
            </h1>
            <p className="font-golos text-base text-muted-foreground max-w-md mx-auto">
              Первая встреча бесплатная. Просто напишите — и мы договоримся о времени.
            </p>
          </div>
        </section>

        {/* Contact + Form */}
        <section className="pb-24 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
              {/* Left: contacts */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Quick contacts */}
                <div className="bg-[hsl(25,25%,18%)] rounded-3xl p-8">
                  <div className="font-cormorant text-2xl font-semibold text-[hsl(35,55%,72%)] mb-6">Связаться сейчас</div>
                  <div className="flex flex-col gap-5">
                    <a href="https://t.me/" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                        <Icon name="Send" size={16} className="text-[hsl(35,55%,72%)]" />
                      </div>
                      <div>
                        <div className="font-golos text-xs text-[hsl(40,30%,50%)] uppercase tracking-wider">Telegram</div>
                        <div className="font-golos text-sm text-[hsl(40,30%,85%)]">@anna_sokolova</div>
                      </div>
                    </a>
                    <a href="https://wa.me/" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                        <Icon name="MessageCircle" size={16} className="text-[hsl(35,55%,72%)]" />
                      </div>
                      <div>
                        <div className="font-golos text-xs text-[hsl(40,30%,50%)] uppercase tracking-wider">WhatsApp</div>
                        <div className="font-golos text-sm text-[hsl(40,30%,85%)]">+7 (900) 123-45-67</div>
                      </div>
                    </a>
                    <a href="mailto:anna@example.com" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                        <Icon name="Mail" size={16} className="text-[hsl(35,55%,72%)]" />
                      </div>
                      <div>
                        <div className="font-golos text-xs text-[hsl(40,30%,50%)] uppercase tracking-wider">Email</div>
                        <div className="font-golos text-sm text-[hsl(40,30%,85%)]">anna@example.com</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Response time */}
                <div className="bg-[hsl(38,25%,95%)] rounded-3xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[hsl(140,18%,52%)]/15 flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={16} className="text-[hsl(140,22%,38%)]" />
                  </div>
                  <div>
                    <div className="font-cormorant text-lg font-semibold text-[hsl(25,25%,18%)] mb-1">Отвечаю в течение дня</div>
                    <p className="font-golos text-xs text-muted-foreground leading-relaxed">
                      Обычно — в тот же день. В выходные — до вечера. Не пропадаю.
                    </p>
                  </div>
                </div>

                {/* Free consult */}
                <div className="bg-[hsl(15,45%,40%)]/10 border border-[hsl(15,45%,40%)]/20 rounded-3xl p-6">
                  <div className="font-cormorant text-xl font-semibold text-[hsl(15,45%,40%)] mb-2">
                    🎁 Первая встреча — бесплатно
                  </div>
                  <p className="font-golos text-sm text-[hsl(25,25%,30%)] leading-relaxed">
                    20 минут знакомства. Без обязательств. Просто поговорим.
                  </p>
                </div>
              </div>

              {/* Right: form */}
              <div className="lg:col-span-3">
                {sent ? (
                  <div className="h-full flex items-center justify-center bg-[hsl(140,12%,96%)] rounded-3xl p-10 text-center">
                    <div>
                      <div className="text-6xl mb-6">🌿</div>
                      <h2 className="font-cormorant text-3xl font-light text-[hsl(25,25%,18%)] mb-3">
                        Сообщение отправлено!
                      </h2>
                      <p className="font-golos text-sm text-muted-foreground">
                        Я отвечу вам в ближайшее время. Спасибо за обращение.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-[hsl(38,25%,95%)] rounded-3xl p-8">
                    <div className="font-cormorant text-2xl font-semibold text-[hsl(25,25%,18%)] mb-6">
                      Форма обратной связи
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Ваше имя *</label>
                          <input
                            required
                            type="text"
                            placeholder="Екатерина"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(15,45%,40%)]/30"
                          />
                        </div>
                        <div>
                          <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Telegram / телефон *</label>
                          <input
                            required
                            type="text"
                            placeholder="@username"
                            value={form.contact}
                            onChange={(e) => setForm({ ...form, contact: e.target.value })}
                            className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(15,45%,40%)]/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Интересует направление</label>
                        <select
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(15,45%,40%)]/30"
                        >
                          <option value="">Выберите направление</option>
                          {services.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-golos text-sm text-foreground/80 mb-1.5 block">Ваш вопрос или запрос</label>
                        <textarea
                          placeholder="Расскажите немного о себе или своём запросе..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          rows={4}
                          className="w-full font-golos text-sm px-4 py-3 rounded-2xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(15,45%,40%)]/30 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[hsl(15,45%,40%)] text-[hsl(40,30%,97%)] font-golos py-4 rounded-2xl hover:opacity-90 transition-all hover-lift text-sm font-medium flex items-center justify-center gap-2"
                      >
                        Отправить сообщение
                        <Icon name="ArrowRight" size={16} />
                      </button>
                      <p className="font-golos text-xs text-muted-foreground text-center">
                        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
