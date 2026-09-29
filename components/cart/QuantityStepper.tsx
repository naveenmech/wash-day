"use client";

import { motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import clsx from "clsx";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: "sm" | "md";
}

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  size = "md",
}: QuantityStepperProps) {
  const isSm = size === "sm";
  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full border-2 border-ink overflow-hidden bg-white",
        isSm ? "h-8" : "h-10"
      )}
    >
      <button
        type="button"
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className={clsx(
          "flex items-center justify-center h-full hover:bg-ink hover:text-white transition-colors",
          isSm ? "w-8" : "w-10"
        )}
      >
        <FiMinus size={isSm ? 12 : 14} />
      </button>
      <motion.span
        key={quantity}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15 }}
        className={clsx(
          "flex items-center justify-center font-bold tabular-nums select-none",
          isSm ? "w-7 text-sm" : "w-9 text-base"
        )}
      >
        {quantity}
      </motion.span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className={clsx(
          "flex items-center justify-center h-full bg-ink text-white hover:bg-accent transition-colors",
          isSm ? "w-8" : "w-10"
        )}
      >
        <FiPlus size={isSm ? 12 : 14} />
      </button>
    </div>
  );
}
