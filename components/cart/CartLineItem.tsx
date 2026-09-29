"use client";

import { FiTrash2 } from "react-icons/fi";
import type { CartItem } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { incrementQty, decrementQty, removeService } from "@/store/slices/cartSlice";
import QuantityStepper from "./QuantityStepper";

export default function CartLineItem({ item, size = "md" }: { item: CartItem; size?: "sm" | "md" }) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-ink/10 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-sm md:text-base truncate">{item.name}</p>
        <p className="text-xs md:text-sm text-ink/50">
          ₹{item.price} / {item.unit}
        </p>
      </div>
      <QuantityStepper
        size={size}
        quantity={item.quantity}
        onIncrement={() => dispatch(incrementQty(item.serviceId))}
        onDecrement={() => dispatch(decrementQty(item.serviceId))}
      />
      <p className="w-16 text-right font-bold text-sm md:text-base">
        ₹{item.price * item.quantity}
      </p>
      <button
        type="button"
        onClick={() => dispatch(removeService(item.serviceId))}
        aria-label={`Remove ${item.name}`}
        className="text-ink/30 hover:text-accent transition-colors"
      >
        <FiTrash2 size={16} />
      </button>
    </div>
  );
}
