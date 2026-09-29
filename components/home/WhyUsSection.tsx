"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  { icon: "⚙️", tag: "✔ Premium", title: "Professional Machines", desc: "Industrial-grade washing machines ensure thorough, gentle cleaning for all fabric types." },
  { icon: "🧴", tag: "✔ Quality", title: "Premium Detergents", desc: "We use high-quality, fabric-safe detergents that clean deeply without damaging fibres." },
  { icon: "👷", tag: "✔ Expert", title: "Experienced Staff", desc: "Our trained team handles every garment with care, from casual wear to delicate fabrics." },
  { icon: "⏱️", tag: "✔ Reliable", title: "On-Time Delivery", desc: "We commit to 48–72 hour delivery. Your schedule is respected, always." },
  { icon: "💰", tag: "✔ Fair", title: "Affordable Pricing", desc: "Premium service at honest, transparent prices. No hidden fees or surprises." },
  { icon: "✅", tag: "✔ Trust", title: "Pay After Service", desc: "You pay only after your clothes are returned and you're completely happy. Zero risk." },
];

export default function WhyUsSection() {
  return (
    <section id="why" className="bg-muted py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Why WASH DAY"
          title="Why Choose Us"
          description="We've built our service around trust, quality, and your convenience."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-ink/5"
            >
              <span className="text-3xl">{r.icon}</span>
              <p className="text-[11px] font-bold tracking-widest text-accent mt-3">{r.tag}</p>
              <h3 className="font-display text-xl mt-1">{r.title}</h3>
              <p className="text-sm text-ink/50 mt-2 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
