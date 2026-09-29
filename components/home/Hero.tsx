"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const stats = [
  { icon: "🧼", title: "Premium Machines", desc: "Industrial-grade cleaning" },
  { icon: "🚚", title: "Doorstep Pickup", desc: "We come to you" },
  { icon: "✅", title: "Pay After Service", desc: "Zero advance. Zero risk." },
];

export default function Hero() {
  return (
    <section className="relative bg-ink text-white overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 dot-grid opacity-60" />
      <div className="absolute inset-0">
        <Image
          src="/images/hero-laundry.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/85 to-ink" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge>⭐ Premium Laundry Service</Badge>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.9] mt-6">
            PREMIUM
            <br />
            <span className="text-accent">LAUNDRY</span>
            <br />
            SERVICE
          </h1>
          <p className="mt-6 text-white/70 max-w-md text-base md:text-lg">
            Doorstep Pickup &amp; Delivery — Cleaned with Care. Delivered Fresh. Pay only
            after you&apos;re satisfied.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button as="a" href="#booking" size="lg">
              📦 Book Pickup
            </Button>
            <Button as="a" href="#services" variant="ghost" size="lg">
              View Services
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { value: "48H", label: "Turnaround" },
              { value: "₹80", label: "Starting At" },
              { value: "0%", label: "Advance" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display text-4xl text-accent">{item.value}</p>
                <p className="text-xs tracking-widest text-white/50 uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {stats.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
