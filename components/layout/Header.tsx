"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { SessionUser } from "@/lib/auth";

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
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isMobileOffersOpen, setIsMobileOffersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const offersRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store" });
        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json().catch(() => ({ user: null }));
        setUser(data.user ?? null);
      } catch {
        setUser(null);
      }
    }

    loadSession();
  }, [pathname]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (offersRef.current && !offersRef.current.contains(event.target as Node)) {
        setIsOffersOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOffersOpen(false);
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setIsProfileOpen(false);
      router.refresh();
      router.push("/");
    }
  }

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
          {user ? (
            <div ref={profileRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsProfileOpen((current) => !current)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-left transition hover:bg-white/10"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1c40f] text-[#004d3d]">
                  <User className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-white">{user.name.split(" ")[0]}</span>
                <ChevronDown className={`h-4 w-4 text-white/80 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-xl">
                  <div className="border-b border-slate-200 px-3 py-2">
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{user.role === "ADMIN" ? "Administrateur" : "Membre IZICASA"}</p>
                    <p className="mt-1 text-xs text-slate-500">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4 text-red-600" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/login" className="text-sm font-semibold text-white transition hover:text-[#F6D94A]">Connexion</Link>
              <Button asChild className="bg-[#f1c40f] text-[#004d3d] hover:bg-[#e5b90a]"><Link href="/register">S&apos;inscrire</Link></Button>
            </div>
          )}

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
                {user ? (
                  <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1c40f] text-[#004d3d]">
                        <User className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-white/70">{user.role === "ADMIN" ? "Administrateur" : "Membre IZICASA"}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700"
                    >
                      <LogOut className="h-4 w-4 text-red-600" />
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="rounded-md px-3 py-2 font-semibold text-white">Connexion</Link>
                    <Button asChild className="mt-2 justify-center bg-[#f1c40f] text-[#004d3d] hover:bg-[#e5b90a]"><Link href="/register">S&apos;inscrire</Link></Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
