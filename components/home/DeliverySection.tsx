"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const points = [
  { icon: "🏠", title: "Pickup From Home", desc: "Schedule a convenient time and we'll come to your address to collect." },
  { icon: "⏱️", title: "48–72 Hour Turnaround", desc: "Fast processing so you're never without your clothes for long." },
  { icon: "🧼", title: "Professional Cleaning", desc: "Every item treated with expert care using the right technique." },
  { icon: "📦", title: "Safe Packaging", desc: "Your clean clothes are neatly folded and sealed in protective packaging." },
  { icon: "🚚", title: "Doorstep Delivery", desc: "Delivered back to you at your scheduled time, fresh and ready to wear." },
];

export default function DeliverySection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading
            eyebrow="Delivery"
            title="Fast Laundry Delivery"
            align="left"
            description="We handle everything — from collection at your doorstep to safe delivery back to you."
          />
          <div className="space-y-5">
            {points.map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="flex gap-4"
              >
                <span className="w-11 h-11 shrink-0 rounded-xl bg-muted flex items-center justify-center text-xl">
                  {p.icon}
                </span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-ink/50">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-ink"
        >
          <Image
            src="/images/process-drying-line.jpg"
            alt="Professional laundry processing"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="font-display text-5xl text-accent">48–72</p>
            <p className="text-sm tracking-widest uppercase text-white/70">Hour Delivery</p>
            <p className="mt-2 text-white/80 text-sm">
              Pickup today. Fresh clothes back in 2–3 days.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
