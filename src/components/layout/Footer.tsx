"use client";

import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { useLocalization } from "@/contexts/localization-context";

export function Footer() {
    const { t } = useLocalization();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted text-muted-foreground">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm">
                        &copy; {currentYear} Geek Haven. {t('all_rights_reserved')}
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" aria-label="Facebook">
                            <Facebook className="h-5 w-5 transition-colors hover:text-foreground" />
                        </Link>
                        <Link href="#" aria-label="Twitter">
                            <Twitter className="h-5 w-5 transition-colors hover:text-foreground" />
                        </Link>
                        <Link href="#" aria-label="Instagram">
                            <Instagram className="h-5 w-5 transition-colors hover:text-foreground" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
