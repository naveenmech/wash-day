"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { notifySuccess, notifyError } from "@/lib/toast";
import { motion } from "framer-motion";
import { FiMapPin, FiPhoneCall, FiClock, FiNavigation } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { contactSchema } from "@/lib/validation";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const STORE_ADDRESS =
  "Pulikiyil Building, Kurisupally Junction, Marangattupilly, Pala, Kottayam – 686635";
// Exact store coordinates: 9°44'27.9"N 76°36'50.0"E
const STORE_LAT = 9.741083;
const STORE_LNG = 76.613889;
const STORE_LATLNG = `${STORE_LAT},${STORE_LNG}`;

const GOOGLE_MAPS_VIEW = `https://www.google.com/maps?q=${STORE_LATLNG}`;
const GOOGLE_MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${STORE_LATLNG}`;
const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${STORE_LATLNG}&z=16&output=embed`;

const infoTiles = [
  { icon: <FiMapPin size={18} />, title: "Store Location", desc: "Visit us or book a doorstep pickup" },
  { icon: <FiPhoneCall size={18} />, title: "Phone & WhatsApp", desc: "Available 9 AM – 8 PM, 7 days a week" },
  { icon: <FiClock size={18} />, title: "Business Hours", desc: "Mon – Sun: 9:00 AM – 8:00 PM" },
];

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading eyebrow="Contact Us" title="Get In Touch" />

        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {infoTiles.map((tile) => (
            <div key={tile.title} className="bg-muted rounded-2xl p-6 text-center">
              <div className="w-11 h-11 mx-auto rounded-xl bg-ink text-white flex items-center justify-center">
                {tile.icon}
              </div>
              <h3 className="font-semibold mt-3">{tile.title}</h3>
              <p className="text-sm text-ink/50 mt-1">{tile.desc}</p>
            </div>
          ))}
        </div>

        <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-accent mb-3">
          Find Us
        </span>
        <h3 className="font-display text-3xl md:text-4xl mb-8">Visit Our Store</h3>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-ink text-white rounded-3xl p-8 flex flex-col"
          >
            <h4 className="font-display text-2xl mb-6">Office Details</h4>

            <div className="space-y-5 flex-1">
              <div className="flex gap-3">
                <FiMapPin size={20} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-sm text-white/60">
                    WASH DAY Premium Laundry, {STORE_ADDRESS}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiClock size={20} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Business Hours</p>
                  <p className="text-sm text-white/60">Mon – Sun: 9:00 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiPhoneCall size={20} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Call / WhatsApp</p>
                  <p className="text-sm text-white/60">Doorstep pickup available</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button as="a" href="tel:+918606171401" size="sm" variant="ghost">
                📞 Call Now
              </Button>
              <Button
                as="a"
                href={buildWhatsAppLink("Hi WASH DAY! I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="whatsapp"
              >
                <FaWhatsapp /> Chat
              </Button>
            </div>
            <Button
              as="a"
              href={GOOGLE_MAPS_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              className="mt-3 w-full"
            >
              <FiNavigation size={16} /> Get Directions
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl overflow-hidden border border-ink/10 min-h-[320px]"
          >
            <iframe
              title="WASH DAY store location"
              src={GOOGLE_MAPS_EMBED}
              className="w-full h-full min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-display text-3xl mb-2">Send a Message</h3>
            <p className="text-ink/50 mb-6">
              Have a question before booking? Drop us a line and we&apos;ll get back within
              working hours.
            </p>
            <Formik
              initialValues={{ name: "", phone: "", message: "" }}
              validationSchema={contactSchema}
              onSubmit={async (values, { resetForm }) => {
                setSubmitting(true);
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                  });
                  if (!res.ok) throw new Error("Request failed");
                  notifySuccess("Message sent! We'll reply soon.");
                  resetForm();
                } catch {
                  notifyError("Something went wrong. Please try WhatsApp instead.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <Form className="space-y-4">
                <div>
                  <Field
                    name="name"
                    placeholder="Full Name"
                    className="w-full border-2 border-ink/10 focus:border-accent rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                  <ErrorMessage name="name" component="p" className="text-xs text-accent mt-1" />
                </div>
                <div>
                  <Field
                    name="phone"
                    placeholder="Phone / WhatsApp"
                    className="w-full border-2 border-ink/10 focus:border-accent rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                  <ErrorMessage name="phone" component="p" className="text-xs text-accent mt-1" />
                </div>
                <div>
                  <Field
                    as="textarea"
                    name="message"
                    rows={4}
                    placeholder="Your message"
                    className="w-full border-2 border-ink/10 focus:border-accent rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                  />
                  <ErrorMessage name="message" component="p" className="text-xs text-accent mt-1" />
                </div>
                <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? "Sending…" : "Send Message"}
                </Button>
              </Form>
            </Formik>
          </div>

          <a
            href={GOOGLE_MAPS_VIEW}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-3xl overflow-hidden bg-ink text-white p-8 aspect-[4/3] flex flex-col justify-end"
          >
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="relative">
              <p className="text-4xl mb-2">📍</p>
              <p className="font-display text-2xl">WASH DAY</p>
              <p className="text-white/60 text-sm">Premium Laundry · {STORE_ADDRESS}</p>
              <p className="text-accent text-xs mt-1 font-semibold group-hover:underline">
                Find us on Google Maps →
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
