import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="bg-[hsl(25,25%,18%)] text-[hsl(40,30%,90%)]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-cormorant text-3xl font-semibold text-[hsl(35,55%,72%)] mb-2">
              Анна Соколова
            </div>
            <p className="font-golos text-sm text-[hsl(40,30%,70%)] leading-relaxed mb-6">
              Комплексный подход к развитию личности — тело, психика и язык в гармонии.
            </p>
            <div className="flex gap-3">
              <a
                href="https://t.me/"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <Icon name="Send" size={16} />
              </a>
              <a
                href="https://vk.com/"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="ВКонтакте"
              >
                <Icon name="Globe" size={16} />
              </a>
              <a
                href="https://instagram.com/"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Icon name="Camera" size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="font-cormorant text-lg font-semibold mb-5 text-[hsl(35,55%,72%)]">
              Направления
            </div>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/yoga-psychology-club", label: "Клуб йоги и психологии" },
                { href: "/psychology", label: "Психолог онлайн" },
                { href: "/english-tutor", label: "Репетитор английского" },
                { href: "/about", label: "Обо мне" },
                { href: "/blog", label: "Блог" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-golos text-sm text-[hsl(40,30%,70%)] hover:text-[hsl(35,55%,72%)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="font-cormorant text-lg font-semibold mb-5 text-[hsl(35,55%,72%)]">
              Контакты
            </div>
            <div className="flex flex-col gap-4">
              <a href="tel:+79001234567" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={14} />
                </div>
                <span className="font-golos text-sm text-[hsl(40,30%,70%)] group-hover:text-[hsl(35,55%,72%)] transition-colors">
                  +7 (900) 123-45-67
                </span>
              </a>
              <a href="mailto:anna@example.com" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={14} />
                </div>
                <span className="font-golos text-sm text-[hsl(40,30%,70%)] group-hover:text-[hsl(35,55%,72%)] transition-colors">
                  anna@example.com
                </span>
              </a>
              <Link
                to="/contacts"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[hsl(15,45%,40%)] text-[hsl(40,30%,97%)] font-golos text-sm px-6 py-3 rounded-full hover:opacity-90 transition-all"
              >
                Записаться
                <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-golos text-xs text-[hsl(40,30%,55%)]">
            © 2024 Анна Соколова. Все права защищены.
          </p>
          <p className="font-golos text-xs text-[hsl(40,30%,45%)] italic font-cormorant text-sm">
            Развитие — это путь, а не пункт назначения
          </p>
        </div>
      </div>
    </footer>
  );
}
