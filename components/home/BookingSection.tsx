"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import QuantityStepper from "@/components/cart/QuantityStepper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartTotal, addService, incrementQty, decrementQty, clearCart } from "@/store/slices/cartSlice";
import { services } from "@/data/services";
import { bookingSchema } from "@/lib/validation";
import { buildWhatsAppLink, buildWhatsAppMessage } from "@/lib/whatsapp";
import { TIME_SLOTS, type BookingFormValues } from "@/types";

const highlights = [
  { icon: "📍", label: "Free doorstep pickup from your location" },
  { icon: "💬", label: "Confirmation via WhatsApp in minutes" },
  { icon: "💳", label: "Pay only after service is complete" },
  { icon: "⚡", label: "48–72 hour turnaround guaranteed" },
];

const initialValues: BookingFormValues = {
  name: "",
  phone: "",
  address: "",
  pickupDate: "",
  pickupTime: "",
  notes: "",
};

export default function BookingSection() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const [submitting, setSubmitting] = useState(false);

  const availableServices = services.filter(
    (s) => !cartItems.some((item) => item.serviceId === s.id)
  );

  return (
    <section id="booking" className="bg-ink text-white py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div>
          <SectionHeading eyebrow="Book Now" title="Schedule Your Laundry Pickup" align="left" light />
          <p className="text-white/60 -mt-6 mb-8 max-w-md">
            Fill out the form and we&apos;ll confirm your pickup slot via WhatsApp or call. No
            advance payment required.
          </p>
          <div className="space-y-4">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-3 text-white/80">
                <span className="text-xl">{h.icon}</span>
                <span className="text-sm">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white text-ink rounded-3xl p-6 md:p-8"
        >
          <h3 className="font-display text-2xl mb-6">📅 Laundry Pickup Booking</h3>

          <Formik
            initialValues={initialValues}
            validationSchema={bookingSchema}
            onSubmit={async (values, { resetForm }) => {
              if (cartItems.length === 0) {
                toast.error("Select at least one service");
                return;
              }
              setSubmitting(true);
              try {
                const res = await fetch("/api/booking", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...values, items: cartItems }),
                });
                if (!res.ok) throw new Error("Request failed");
                toast.success("Pickup scheduled! We'll confirm via WhatsApp shortly.");
                resetForm();
                dispatch(clearCart());
              } catch {
                toast.error("Something went wrong. Please try WhatsApp instead.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values }) => (
              <Form className="space-y-5">
                <div>
                  <label className="text-xs font-bold tracking-wide uppercase text-ink/50">
                    Your Name
                  </label>
                  <Field
                    name="name"
                    placeholder="Full Name"
                    className="mt-1 w-full border-2 border-ink/10 focus:border-accent rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                  <ErrorMessage name="name" component="p" className="text-xs text-accent mt-1" />
                </div>

                <div>
                  <label className="text-xs font-bold tracking-wide uppercase text-ink/50">
                    Phone / WhatsApp
                  </label>
                  <Field
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-1 w-full border-2 border-ink/10 focus:border-accent rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                  <ErrorMessage name="phone" component="p" className="text-xs text-accent mt-1" />
                </div>

                <div>
                  <label className="text-xs font-bold tracking-wide uppercase text-ink/50">
                    Pickup Address
                  </label>
                  <Field
                    name="address"
                    placeholder="Your full address"
                    className="mt-1 w-full border-2 border-ink/10 focus:border-accent rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                  <ErrorMessage name="address" component="p" className="text-xs text-accent mt-1" />
                </div>

                <div>
                  <label className="text-xs font-bold tracking-wide uppercase text-ink/50">
                    Service Type — select, add multiple &amp; set quantity
                  </label>

                  <div className="mt-2 space-y-2">
                    {cartItems.length === 0 && (
                      <p className="text-sm text-ink/40 italic">No services selected yet.</p>
                    )}
                    {cartItems.map((item) => (
                      <div
                        key={item.serviceId}
                        className="flex items-center justify-between gap-3 bg-muted rounded-xl px-4 py-2.5"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-sm truncate">{item.name}</p>
                          <p className="text-xs text-ink/40">
                            ₹{item.price}/{item.unit}
                          </p>
                        </div>
                        <QuantityStepper
                          size="sm"
                          quantity={item.quantity}
                          onIncrement={() => dispatch(incrementQty(item.serviceId))}
                          onDecrement={() => dispatch(decrementQty(item.serviceId))}
                        />
                      </div>
                    ))}
                  </div>

                  {availableServices.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {availableServices.map((s) => (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => dispatch(addService({ serviceId: s.id }))}
                          className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-ink/10 hover:border-accent hover:text-accent transition-colors"
                        >
                          + {s.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {cartItems.length > 0 && (
                    <p className="mt-2 text-sm font-bold text-right">
                      Estimated total: ₹{cartTotal}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold tracking-wide uppercase text-ink/50">
                      Pickup Date
                    </label>
                    <Field
                      type="date"
                      name="pickupDate"
                      className="mt-1 w-full border-2 border-ink/10 focus:border-accent rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                    <ErrorMessage name="pickupDate" component="p" className="text-xs text-accent mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-bold tracking-wide uppercase text-ink/50">
                      Pickup Time
                    </label>
                    <Field
                      as="select"
                      name="pickupTime"
                      className="mt-1 w-full border-2 border-ink/10 focus:border-accent rounded-xl px-4 py-3 outline-none transition-colors bg-white"
                    >
                      <option value="">Select time…</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="pickupTime" component="p" className="text-xs text-accent mt-1" />
                  </div>
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Scheduling…" : "📦 Schedule Pickup"}
                </Button>

                <Button
                  as="a"
                  variant="whatsapp"
                  className="w-full"
                  href={buildWhatsAppLink(
                    buildWhatsAppMessage({
                      name: values.name,
                      phone: values.phone,
                      address: values.address,
                      pickupDate: values.pickupDate,
                      pickupTime: values.pickupTime,
                      items: cartItems,
                    })
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 Book via WhatsApp Instead
                </Button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </section>
  );
}
