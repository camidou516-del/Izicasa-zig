import Link from "next/link";
import Image from "next/image";
import { Globe, MessageCircle, Music2, Send } from "lucide-react";

const socialLinks = [
  { href: "https://www.facebook.com/izicasasenegal/", label: "Facebook", icon: Globe },
  { href: "https://www.instagram.com/izicasa_senegal/", label: "Instagram", icon: MessageCircle },
  { href: "https://www.tiktok.com/@izicasa_senegal", label: "TikTok", icon: Music2 },
  { href: "https://x.com/izicasa221", label: "X", icon: Send },
];

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/formations", label: "Formations" },
  { href: "/partenariats", label: "Partenariats" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#06452F] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Image src="/logo/izicasa-fond-transparent.png" alt="Logo Izicasa" width={180} height={54} className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/80">
            Izicasa Sénégal accompagne les organisations avec des formations, des partenariats et des solutions digitales modernes.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F6D94A]">Liens rapides</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-[#F6D94A]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F6D94A]">Coordonnées</h3>
          <address className="mt-4 space-y-2 text-sm not-italic leading-6 text-white/80">
            <p>Château d&apos;Eau</p>
            <p>Ziguinchor 27000</p>
            <p>Sénégal</p>
            <p>Tél : +221 77 367 99 85</p>
          </address>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F6D94A]">Réseaux sociaux</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#F6D94A] hover:text-[#F6D94A]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-sm text-white/70 sm:px-6 lg:px-8">
        © 2026 Izicasa Sénégal — Tous droits réservés.
      </div>
    </footer>
  );
}
