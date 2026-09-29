"use client";

import { motion } from "framer-motion";

const points = [
  { icon: "💳", label: "Pay After Service" },
  { icon: "🚫", label: "No Advance Required" },
  { icon: "✅", label: "100% Satisfaction" },
];

export default function PromiseBanner() {
  return (
    <section className="bg-ink text-white py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
        <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-accent mb-4">
          Our Promise
        </span>
        <div className="flex justify-center gap-1 text-gold text-xl mb-6">
          {"★★★★★".split("").map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl leading-tight"
        >
          &ldquo;We don&apos;t charge before the work. Your clothes are cleaned first. You pay
          only after you&apos;re satisfied.&rdquo;
        </motion.p>
        <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-12">
          {points.map((p) => (
            <div key={p.label} className="flex items-center gap-2 text-white/80 font-semibold">
              <span className="text-xl">{p.icon}</span>
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
