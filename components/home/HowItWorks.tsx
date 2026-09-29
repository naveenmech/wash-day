"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { icon: "📦", title: "Place Order", desc: "Book a laundry pickup directly from our website or WhatsApp." },
  { icon: "🚚", title: "Pickup From Door", desc: "Our staff arrives at your location to collect your clothes." },
  { icon: "🧼", title: "Professional Cleaning", desc: "Washed in premium machines using quality detergents." },
  { icon: "📦", title: "Neatly Packed", desc: "Folded, ironed, and packed securely in clean packaging." },
  { icon: "🏠", title: "Delivered Back", desc: "Returned to your door within 48–72 hours, fresh and ready." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="The Process"
          title="How It Works"
          description="From booking to delivery, we make laundry effortless. Five simple steps is all it takes."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="relative mx-auto w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-2xl">
                {step.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-lg mt-4">{step.title}</h3>
              <p className="text-sm text-ink/50 mt-2 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
