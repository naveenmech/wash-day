"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { notifySuccess } from "@/lib/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeServiceModal, openCart } from "@/store/slices/uiSlice";
import { addService } from "@/store/slices/cartSlice";
import { getServiceById } from "@/data/services";
import QuantityStepper from "@/components/cart/QuantityStepper";
import Button from "@/components/ui/Button";

export default function ServiceModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isServiceModalOpen);
  const serviceId = useAppSelector((state) => state.ui.selectedServiceId);
  const [qty, setQty] = useState(1);
  const [wasOpen, setWasOpen] = useState(false);

  const service = serviceId ? getServiceById(serviceId) : undefined;

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setQty(1);
  }

  if (!service) return null;

  const close = () => dispatch(closeServiceModal());

  const handleAddToCart = () => {
    dispatch(addService({ serviceId: service.id, quantity: qty }));
    close();
    notifySuccess(`${service.name} added to cart`, { icon: "🧺" });
    dispatch(openCart());
  };

  const handleBookNow = () => {
    dispatch(addService({ serviceId: service.id, quantity: qty }));
    close();
    requestAnimationFrame(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[80] flex items-end md:items-center justify-center p-0 md:p-4"
            onClick={close}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "tween", duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full md:max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl md:rounded-3xl"
            >
              <div className="relative bg-muted px-6 pt-8 pb-6 text-center">
                <button
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-ink hover:text-white transition-colors"
                >
                  <FiX size={18} />
                </button>
                <span className="text-6xl leading-none">{service.icon}</span>
                <h3 className="font-display text-3xl mt-4">{service.name}</h3>
                <p className="text-accent font-bold text-xl mt-1">
                  ₹{service.price} <span className="text-sm font-medium text-ink/50">/ {service.unit}</span>
                </p>
              </div>

              <div className="px-6 py-6 space-y-6">
                <p className="text-ink/60 text-sm leading-relaxed">{service.description}</p>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Quantity</span>
                  <QuantityStepper
                    quantity={qty}
                    onIncrement={() => setQty((q) => q + 1)}
                    onDecrement={() => setQty((q) => Math.max(1, q - 1))}
                  />
                </div>

                <div className="flex items-center justify-between border-t border-ink/10 pt-4">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-display text-2xl">₹{service.price * qty}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <Button variant="outline" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button variant="primary" onClick={handleBookNow}>
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
