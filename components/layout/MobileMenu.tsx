"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useAppDispatch } from "@/store/hooks";
import { closeMobileMenu } from "@/store/slices/uiSlice";
import Button from "@/components/ui/Button";

export default function MobileMenu({
  isOpen,
  links,
}: {
  isOpen: boolean;
  links: { href: string; label: string }[];
}) {
  const dispatch = useAppDispatch();
  const close = () => dispatch(closeMobileMenu());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[90]"
            onClick={close}
          />
          <motion.div
            key="mobile-menu-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 right-0 h-full w-72 bg-ink text-white z-[100] flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button
                onClick={close}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <FiX size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 mt-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="font-display text-2xl tracking-wide hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <Button as="a" href="#booking" onClick={close} className="w-full">
                Book Pickup
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
