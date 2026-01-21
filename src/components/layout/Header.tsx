"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Globe } from "lucide-react";
import { Logo } from "../icons/Logo";
import { CartSheet } from "../cart/CartSheet";
import { UserNav } from "../auth/UserNav";
import { useLocalization } from "@/contexts/localization-context";

const navLinks = [
  { href: "/#games", label: "games" },
  { href: "/#consoles", label: "consoles" },
  { href: "/#merchandise", label: "merchandise" },
];

export function Header() {
  const { t, setLanguage, language } = useLocalization();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="sr-only">Geek Haven</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setLanguage("en")} disabled={language === 'en'}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLanguage("eu")} disabled={language === 'eu'}>
                Euskara
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <CartSheet />
          <div className="hidden md:block">
            <UserNav />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo />
                  <span className="sr-only">Geek Haven</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t(link.label)}
                  </Link>
                ))}
              </nav>
              <div className="mt-8">
                 <UserNav />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
