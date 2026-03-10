import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const qualifications = [
  {
    icon: "Flower2",
    color: "bg-[hsl(140,18%,52%)]",
    area: "Йога и телесные практики",
    certs: ["RYT-200 Yoga Alliance", "Сертификат Yoga Works", "Специализация по инь-йоге"],
    desc: "7 лет практики хатха и виньяса-йоги. Прошла обучение в Индии и России. Веду клубные занятия с 2019 года.",
  },
  {
    icon: "Brain",
    color: "bg-[hsl(15,45%,40%)]",
    area: "Психология и терапия",
    certs: ["Диплом клинического психолога МГУ", "КПТ — когнитивно-поведенческая терапия", "Нарративная практика"],
    desc: "Работаю с тревогой, депрессией, самооценкой, отношениями. Более 500 часов индивидуальных сессий.",
  },
  {
    icon: "BookOpen",
    color: "bg-[hsl(35,55%,55%)]",
    area: "Английский язык",
    certs: ["Cambridge CELTA", "IELTS 8.0", "Методология осознанного обучения языкам"],
    desc: "Преподаю английский онлайн с 2018 года. Специализируюсь на взрослых с языковой тревогой и застрявших на плато.",
  },
];

const timeline = [
  { year: "2015", event: "Первый выезд на ретрит в Гоа. Начало практики медитации." },
  { year: "2016", event: "Поступление на факультет психологии МГУ." },
  { year: "2018", event: "Начало преподавания английского онлайн. Первые 10 учеников." },
  { year: "2019", event: "Прохождение учительской подготовки по йоге. Первая группа." },
  { year: "2021", event: "Диплом психолога. Начало частной практики." },
  { year: "2023", event: "Запуск Клуба йоги и психологии — уникальный формат группы." },
];

export default function About() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-[hsl(40,30%,97%)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] organic-blob bg-[hsl(35,55%,72%)]/15 pointer-events-none" />
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(140,22%,38%)] mb-4 animate-fade-in">
                  Обо мне
                </p>
                <h1 className="font-cormorant text-5xl lg:text-6xl font-light text-[hsl(25,25%,18%)] leading-tight mb-6 animate-fade-in stagger-1">
                  Анна Соколова —<br />
                  <em className="italic text-[hsl(15,45%,40%)]">проводник к себе</em>
                </h1>
                <p className="font-golos text-base text-muted-foreground leading-relaxed mb-6 animate-fade-in stagger-2">
                  Меня зовут Анна. Я психолог, инструктор по йоге и преподаватель английского языка.
                  На первый взгляд — три разные профессии. На самом деле — единый путь к целостности человека.
                </p>
                <p className="font-golos text-base text-muted-foreground leading-relaxed mb-8 animate-fade-in stagger-3">
                  Я убеждена: тело, разум и язык неразрывно связаны. Освобождая тело — мы освобождаем голос.
                  Успокаивая разум — открываем способность учиться. Я работаю на стыке этих трёх миров.
                </p>
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 bg-[hsl(15,45%,40%)] text-[hsl(40,30%,97%)] font-golos px-7 py-3.5 rounded-full hover:opacity-90 transition-all hover-lift text-sm animate-fade-in stagger-4"
                >
                  Познакомиться лично <Icon name="ArrowRight" size={16} />
                </Link>
              </div>

              <div className="relative">
                <div className="organic-blob-2 overflow-hidden aspect-[4/5] max-w-sm mx-auto">
                  <img
                    src="https://cdn.poehali.dev/projects/341c6871-f466-496b-b3ba-6d76285e5ef1/files/d3654318-8152-4513-a968-498e4dcf12e9.jpg"
                    alt="Анна Соколова"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-8 -right-4 bg-white rounded-3xl shadow-xl p-5 max-w-[200px]">
                  <p className="font-cormorant text-sm italic text-[hsl(25,25%,18%)] leading-relaxed">
                    «Моя работа — создать безопасное пространство для вашего роста»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-20 bg-[hsl(25,25%,18%)]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 overflow-hidden rounded-3xl">
              {[
                { emoji: "🫀", title: "Тело", text: "Йога — это не только гибкость. Это способ жить в теле осознанно, слышать его сигналы и доверять ему." },
                { emoji: "🧠", title: "Психика", text: "Психология помогает распознать шаблоны, которые мешают. Не бороться с собой — а понять себя." },
                { emoji: "🗣️", title: "Язык", text: "Язык — это не инструмент, а голос. Английский без стресса — это возможность говорить свободно и уверенно." },
              ].map((item, i) => (
                <div key={item.title} className={`p-10 ${i === 1 ? "bg-[hsl(15,45%,40%)]" : "bg-[hsl(25,25%,22%)]"}`}>
                  <div className="text-4xl mb-5">{item.emoji}</div>
                  <h3 className="font-cormorant text-3xl font-semibold text-[hsl(40,30%,90%)] mb-4">{item.title}</h3>
                  <p className="font-golos text-sm text-[hsl(40,30%,70%)] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qualifications */}
        <section className="py-24 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(15,45%,40%)] mb-4">Квалификации</p>
              <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[hsl(25,25%,18%)]">Дипломы и сертификаты</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {qualifications.map((q) => (
                <div key={q.area} className="bg-[hsl(38,25%,95%)] rounded-3xl p-8 hover-lift">
                  <div className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center ${q.color} mb-6`}>
                    <Icon name={q.icon as "Flower2" | "Brain" | "BookOpen"} size={22} className="text-white" />
                  </div>
                  <h3 className="font-cormorant text-2xl font-semibold text-[hsl(25,25%,18%)] mb-4">{q.area}</h3>
                  <p className="font-golos text-sm text-muted-foreground leading-relaxed mb-6">{q.desc}</p>
                  <ul className="flex flex-col gap-2">
                    {q.certs.map((cert) => (
                      <li key={cert} className="flex items-center gap-2 font-golos text-xs text-[hsl(25,25%,30%)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(15,45%,40%)] flex-shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-[hsl(38,20%,93%)]">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(140,22%,38%)] mb-4">Путь</p>
              <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)]">Ключевые моменты</h2>
            </div>
            <div className="relative">
              <div className="absolute left-[60px] top-0 bottom-0 w-px bg-[hsl(15,45%,40%)]/20" />
              <div className="flex flex-col gap-8">
                {timeline.map((item) => (
                  <div key={item.year} className="flex items-start gap-6">
                    <div className="w-[60px] flex-shrink-0 text-right">
                      <span className="font-cormorant text-lg font-semibold text-[hsl(15,45%,40%)]">{item.year}</span>
                    </div>
                    <div className="relative flex-shrink-0 mt-1.5">
                      <div className="w-3 h-3 rounded-full bg-[hsl(15,45%,40%)] border-2 border-white shadow-sm" />
                    </div>
                    <p className="font-golos text-sm text-[hsl(25,25%,30%)] leading-relaxed pt-0.5">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
