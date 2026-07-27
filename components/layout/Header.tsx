"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/formations", label: "Formations" },
  { href: "/partenariats", label: "Partenariats" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

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
          {links.map((link) => {
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
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden bg-[#F6D94A] text-[#06452F] hover:bg-[#E0C230] sm:inline-flex">
            <Link href="/contact">
              Nous contacter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white md:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="border-l border-white/10 bg-[#06452F] text-white">
              <SheetHeader className="sr-only">
                <SheetTitle>Menu de navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-3">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-md px-3 py-2 text-base font-medium ${
                        isActive ? "bg-white/10 text-[#F6D94A]" : "text-white/90"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Button asChild className="mt-4 justify-center bg-[#F6D94A] text-[#06452F] hover:bg-[#E0C230]">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
