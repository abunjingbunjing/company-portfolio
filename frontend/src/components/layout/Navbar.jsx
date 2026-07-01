"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Services", href: "#services" },
        { name: "Case Studies", href: "#case-studies" },
        { name: "Process", href: "#working-process" },
        { name: "Team", href: "#team" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
    ];
  return (
    <header className="py-6">
      <Container>

        <nav className="flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="shrink-0 transition-transform duration-300 hover:scale-105">
        <Image
            src="/images/logo.svg"
            alt="Positivus"
            width={220}
            height={56}
            priority
            className="h-8 w-auto lg:h-10"
        />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            href={link.href}
                            className="hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
                {/* Desktop Button */}
            <div className="hidden lg:block">
                <Link href="/admin/login">
                    <Button className="hover:bg-primary hover:text-black transition-transform duration-300 hover:scale-105">
                        Loging
                    </Button>
                </Link>
            </div>
        </div>

        {/* Mobile Menu Button */}
        <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
        </nav>
        
        {isMenuOpen && (
        <div className="lg:hidden mt-6 rounded-2xl border border-gray-200 p-6">
            <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
                <li key={link.name}>
                <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                >
                    {link.name}
                </Link>
                </li>
            ))}
            </ul>

            <div className="mt-6">
                <Link href="/admin/login">
                <Button className="w-full hover:bg-primary hover:text-black shrink-0 transition-transform duration-300 hover:scale-105">
                    Login
                </Button>
                </Link>
            </div>
        </div>
        )}

      </Container>
    </header>
  );
}