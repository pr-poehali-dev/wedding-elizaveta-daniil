import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const posts = [
  {
    id: 1,
    tag: "Психология",
    tagColor: "text-[hsl(15,45%,40%)] bg-[hsl(15,45%,40%)]/10",
    title: "Почему тревога — это не враг, а сигнал",
    excerpt: "Мы привыкли бороться с тревогой. Но что если она пытается нам что-то сказать? Рассматриваем тревогу как навигационный инструмент.",
    date: "5 марта 2024",
    readTime: "5 мин",
    emoji: "🧠",
  },
  {
    id: 2,
    tag: "Йога",
    tagColor: "text-[hsl(140,22%,38%)] bg-[hsl(140,18%,52%)]/10",
    title: "Три позы для снятия напряжения в конце дня",
    excerpt: "Простая 15-минутная практика, которую можно делать даже в маленькой комнате. Без инвентаря, без особой подготовки.",
    date: "28 февраля 2024",
    readTime: "4 мин",
    emoji: "🧘",
  },
  {
    id: 3,
    tag: "Английский",
    tagColor: "text-[hsl(35,45%,38%)] bg-[hsl(35,55%,72%)]/20",
    title: "Как перестать бояться говорить на английском",
    excerpt: "Языковая тревога — реальный феномен. Разбираем её психологические корни и конкретные шаги, чтобы начать говорить свободно.",
    date: "20 февраля 2024",
    readTime: "7 мин",
    emoji: "🗣️",
  },
  {
    id: 4,
    tag: "Психология",
    tagColor: "text-[hsl(15,45%,40%)] bg-[hsl(15,45%,40%)]/10",
    title: "Внутренний критик: откуда он берётся и что с ним делать",
    excerpt: "Этот голос в голове, который говорит «недостаточно хорошо» — не вы. Это усвоенные послания. Учимся с ними работать.",
    date: "12 февраля 2024",
    readTime: "6 мин",
    emoji: "💭",
  },
  {
    id: 5,
    tag: "Йога",
    tagColor: "text-[hsl(140,22%,38%)] bg-[hsl(140,18%,52%)]/10",
    title: "Йога и психология: почему они неразделимы",
    excerpt: "Что общего у асаны и психотерапии? Больше, чем кажется. Объясняю связь телесных практик и эмоционального здоровья.",
    date: "5 февраля 2024",
    readTime: "8 мин",
    emoji: "🌿",
  },
  {
    id: 6,
    tag: "Английский",
    tagColor: "text-[hsl(35,45%,38%)] bg-[hsl(35,55%,72%)]/20",
    title: "Plateau effect: почему вы застряли на B2 и как двигаться дальше",
    excerpt: "Многие учащиеся застревают на среднем уровне годами. Разбираем причины и конкретные стратегии преодоления плато.",
    date: "28 января 2024",
    readTime: "6 мин",
    emoji: "📈",
  },
];

export default function Blog() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6 text-center">
            <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(140,22%,38%)] mb-4">Блог</p>
            <h1 className="font-cormorant text-5xl lg:text-6xl font-light text-[hsl(25,25%,18%)] mb-4">
              Мысли о теле,<br />
              <em className="italic text-[hsl(15,45%,40%)]">разуме и языке</em>
            </h1>
            <p className="font-golos text-base text-muted-foreground max-w-lg mx-auto">
              Практические статьи и заметки о психологии, йоге и изучении английского
            </p>
          </div>
        </section>

        {/* Featured post */}
        <section className="pb-10 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6">
            <article className="bg-[hsl(25,25%,18%)] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 hover-lift cursor-pointer">
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <div className={`inline-flex self-start mb-4 text-xs font-golos px-3 py-1.5 rounded-full ${posts[0].tagColor}`}>
                  {posts[0].tag}
                </div>
                <h2 className="font-cormorant text-3xl lg:text-4xl font-light text-[hsl(40,30%,90%)] mb-4 leading-tight">
                  {posts[0].title}
                </h2>
                <p className="font-golos text-sm text-[hsl(40,30%,65%)] leading-relaxed mb-8">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 font-golos text-xs text-[hsl(40,30%,50%)]">
                  <span>{posts[0].date}</span>
                  <span>·</span>
                  <span>{posts[0].readTime} чтения</span>
                </div>
              </div>
              <div className="flex items-center justify-center text-9xl p-12 bg-[hsl(25,25%,22%)]">
                {posts[0].emoji}
              </div>
            </article>
          </div>
        </section>

        {/* All posts */}
        <section className="py-10 pb-24 bg-[hsl(40,30%,97%)]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.slice(1).map((post) => (
                <article key={post.id} className="bg-[hsl(38,25%,95%)] rounded-3xl p-7 hover-lift cursor-pointer group">
                  <div className="text-5xl mb-5">{post.emoji}</div>
                  <div className={`inline-flex text-xs font-golos px-3 py-1 rounded-full mb-4 ${post.tagColor}`}>
                    {post.tag}
                  </div>
                  <h2 className="font-cormorant text-2xl font-semibold text-[hsl(25,25%,18%)] mb-3 leading-tight group-hover:text-[hsl(15,45%,40%)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-golos text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between font-golos text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1 text-[hsl(15,45%,40%)] group-hover:gap-2 transition-all">
                      Читать <Icon name="ArrowRight" size={12} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-[hsl(38,20%,93%)]">
          <div className="container mx-auto px-6 max-w-xl text-center">
            <p className="font-golos text-xs tracking-[0.3em] uppercase text-[hsl(140,22%,38%)] mb-4">Подписка</p>
            <h2 className="font-cormorant text-4xl font-light text-[hsl(25,25%,18%)] mb-3">
              Новые статьи в Telegram
            </h2>
            <p className="font-golos text-sm text-muted-foreground mb-8">
              Подпишитесь на канал — публикую статьи, практики и размышления каждую неделю.
            </p>
            <a
              href="https://t.me/"
              className="inline-flex items-center gap-3 bg-[hsl(15,45%,40%)] text-[hsl(40,30%,97%)] font-golos px-8 py-3.5 rounded-full hover:opacity-90 transition-all hover-lift"
            >
              <Icon name="Send" size={16} />
              Подписаться в Telegram
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
