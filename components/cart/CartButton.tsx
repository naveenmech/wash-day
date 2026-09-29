"use client";

import { FiShoppingBag } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/slices/cartSlice";
import { toggleCart } from "@/store/slices/uiSlice";
import clsx from "clsx";

export default function CartButton({ dark = false }: { dark?: boolean }) {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCartCount);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleCart())}
      aria-label="Open cart"
      className={clsx(
        "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors",
        dark ? "text-ink hover:bg-muted" : "text-white hover:bg-white/10"
      )}
    >
      <FiShoppingBag size={20} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
