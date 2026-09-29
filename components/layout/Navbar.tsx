"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import CartButton from "@/components/cart/CartButton";
import Button from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openMobileMenu } from "@/store/slices/uiSlice";
import { FiMenu } from "react-icons/fi";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-white/95 backdrop-blur"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl">🧺</span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl md:text-2xl">WASH DAY</span>
              <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-ink/50 font-semibold">
                PREMIUM LAUNDRY
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-ink/70 hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-3">
            <CartButton dark />
            <div className="hidden sm:block">
              <Button as="a" href="#booking" size="sm">
                Book Pickup
              </Button>
            </div>
            <button
              onClick={() => dispatch(openMobileMenu())}
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && <MobileMenu links={NAV_LINKS} />}
    </>
  );
}
