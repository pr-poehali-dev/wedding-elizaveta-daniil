import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "Обо мне" },
  { href: "/yoga-psychology-club", label: "Клуб йоги" },
  { href: "/psychology", label: "Психолог" },
  { href: "/english-tutor", label: "Английский" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[hsl(40,30%,97%)]/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-cormorant text-2xl font-semibold text-terracotta tracking-tight">
            Анна Соколова
          </span>
          <span className="font-golos text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            тело · психика · язык
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link font-golos text-sm tracking-wide text-foreground/80 hover:text-terracotta ${
                location.pathname === link.href ? "active text-terracotta" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          to="/contacts"
          className="hidden lg:inline-flex items-center gap-2 bg-terracotta text-[hsl(40,30%,97%)] font-golos text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-all hover-lift"
        >
          Записаться
        </Link>

        {/* Burger */}
        <button
          className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-foreground" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[hsl(40,30%,97%)]/98 backdrop-blur-md border-t border-border">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-golos text-base py-3 px-4 rounded-xl transition-colors ${
                  location.pathname === link.href
                    ? "bg-muted text-terracotta font-medium"
                    : "text-foreground/80 hover:bg-muted/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contacts"
              className="mt-4 text-center bg-terracotta text-[hsl(40,30%,97%)] font-golos py-3 px-6 rounded-full hover:opacity-90 transition-all"
            >
              Записаться на консультацию
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
