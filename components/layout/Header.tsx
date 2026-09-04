"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/partenariats", label: "Partenariats" },
  { href: "/blog", label: "Blog" },
];

const contactLink = { href: "/contact", label: "Contact" };

const offerLinks = [
  { href: "/formations", label: "Formations" },
  { href: "/services", label: "Services" },
  { href: "/packs", label: "Nos packs" },
];

export function Header() {
  const pathname = usePathname();
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isMobileOffersOpen, setIsMobileOffersOpen] = useState(false);
  const offersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (offersRef.current && !offersRef.current.contains(event.target as Node)) {
        setIsOffersOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOffersOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B6E4F] text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/izicasa-fond-transparent.png"
            alt="Logo Izicasa"
            width={180}
            height={54}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.slice(0, 2).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition hover:text-[#F6D94A] ${
                  isActive ? "border-b-2 border-[#F6D94A] pb-1 text-[#F6D94A]" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div
            ref={offersRef}
            className="relative"
            onMouseEnter={() => setIsOffersOpen(true)}
            onMouseLeave={() => setIsOffersOpen(false)}
          >
            <button
              type="button"
              aria-expanded={isOffersOpen}
              aria-haspopup="true"
              onClick={() => setIsOffersOpen((isOpen) => !isOpen)}
              className="flex cursor-pointer items-center gap-1 text-sm font-medium text-white/90 transition hover:text-[#F6D94A]"
            >
              Nos offres
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-200 ${isOffersOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOffersOpen && (
              <div className="absolute left-1/2 top-full z-50 w-96 -translate-x-1/2 rounded-lg border border-gray-100 bg-white p-2 text-slate-900 shadow-lg">
                {offerLinks.map((offer) => (
                  <Link
                    key={offer.href}
                    href={offer.href}
                    onClick={() => setIsOffersOpen(false)}
                    className="block cursor-pointer rounded-md px-4 py-3 transition hover:bg-[#004d3d]/5 hover:text-[#004d3d]"
                  >
                    <span className="block text-sm font-semibold">{offer.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {links.slice(2).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition hover:text-[#F6D94A] ${
                  isActive ? "border-b-2 border-[#F6D94A] pb-1 text-[#F6D94A]" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={contactLink.href}
            className={`text-sm font-medium transition hover:text-[#F6D94A] ${
              pathname === contactLink.href
                ? "border-b-2 border-[#F6D94A] pb-1 text-[#F6D94A]"
                : "text-white/90"
            }`}
          >
            {contactLink.label}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-3 sm:flex">
            <Link href="/login" className="text-sm font-semibold text-white transition hover:text-[#F6D94A]">Connexion</Link>
            <Button asChild className="bg-[#f1c40f] text-[#004d3d] hover:bg-[#e5b90a]"><Link href="/register">S&apos;inscrire</Link></Button>
          </div>

          <Sheet>
            <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white md:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="border-l border-white/10 bg-[#06452F] text-white">
              <SheetHeader className="sr-only">
                <SheetTitle>Menu de navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-3">
                {links.slice(0, 2).map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <SheetClose key={link.href} render={<Link href={link.href} />}>
                      <span
                        className={`block rounded-md px-3 py-2 text-base font-medium ${
                          isActive ? "bg-white/10 text-[#F6D94A]" : "text-white/90"
                        }`}
                      >
                        {link.label}
                      </span>
                    </SheetClose>
                  );
                })}
                <div>
                  <button
                    type="button"
                    aria-expanded={isMobileOffersOpen}
                    onClick={() => setIsMobileOffersOpen((isOpen) => !isOpen)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-white/90"
                  >
                    Nos offres
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 transition-transform duration-200 ${isMobileOffersOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isMobileOffersOpen && (
                    <div className="ml-3 border-l border-white/20 pl-3">
                      {offerLinks.map((offer) => (
                        <SheetClose key={offer.href} render={<Link href={offer.href} />}>
                          <span className="block cursor-pointer rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-[#F6D94A]">
                            {offer.label}
                          </span>
                        </SheetClose>
                      ))}
                    </div>
                  )}
                </div>
                {links.slice(2).map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <SheetClose key={link.href} render={<Link href={link.href} />}>
                      <span
                        className={`block rounded-md px-3 py-2 text-base font-medium ${
                          isActive ? "bg-white/10 text-[#F6D94A]" : "text-white/90"
                        }`}
                      >
                        {link.label}
                      </span>
                    </SheetClose>
                  );
                })}
                <SheetClose render={<Link href={contactLink.href} />}>
                  <span
                    className={`block rounded-md px-3 py-2 text-base font-medium ${
                      pathname === contactLink.href ? "bg-white/10 text-[#F6D94A]" : "text-white/90"
                    }`}
                  >
                    {contactLink.label}
                  </span>
                </SheetClose>
                <Link href="/login" className="rounded-md px-3 py-2 font-semibold text-white">Connexion</Link>
                <Button asChild className="mt-2 justify-center bg-[#f1c40f] text-[#004d3d] hover:bg-[#e5b90a]"><Link href="/register">S&apos;inscrire</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
