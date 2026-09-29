"use client";

import { motion } from "framer-motion";
import type { Service } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openServiceModal } from "@/store/slices/uiSlice";
import { selectQuantityFor } from "@/store/slices/cartSlice";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const dispatch = useAppDispatch();
  const qty = useAppSelector(selectQuantityFor(service.id));

  return (
    <motion.button
      type="button"
      onClick={() => dispatch(openServiceModal(service.id))}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative text-left bg-white border border-ink/10 rounded-2xl p-6 hover:border-accent/40 hover:shadow-xl transition-all duration-300"
    >
      {qty > 0 && (
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow">
          {qty}
        </span>
      )}
      <span className="text-4xl">{service.icon}</span>
      <h3 className="font-display text-xl mt-4">{service.name}</h3>
      <p className="text-sm text-ink/50 mt-2 leading-relaxed line-clamp-3">
        {service.description}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <p className="font-bold">
          ₹{service.price}{" "}
          <span className="text-xs font-medium text-ink/40">/ {service.unit}</span>
        </p>
        <span className="text-xs font-bold text-accent group-hover:underline">
          + Add to Booking
        </span>
      </div>
    </motion.button>
  );
}
