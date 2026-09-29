"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiShoppingBag } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartTotal, clearCart } from "@/store/slices/cartSlice";
import { closeCart } from "@/store/slices/uiSlice";
import CartLineItem from "./CartLineItem";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCartOpen);
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const handleProceed = () => {
    dispatch(closeCart());
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
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => dispatch(closeCart())}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <h3 className="font-display text-2xl">Your Cart</h3>
              <button
                onClick={() => dispatch(closeCart())}
                aria-label="Close cart"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-ink/40 py-16">
                  <FiShoppingBag size={40} className="mb-3" />
                  <p>Your cart is empty.</p>
                  <p className="text-sm">Add a service to get started.</p>
                </div>
              ) : (
                items.map((item) => <CartLineItem key={item.serviceId} item={item} />)
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-ink/10 space-y-3">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Estimated Total</span>
                  <span>₹{total}</span>
                </div>
                <p className="text-xs text-ink/50">
                  Final amount may vary by weight/condition. Pay only after service.
                </p>
                <Button className="w-full" onClick={handleProceed}>
                  Proceed to Book Pickup
                </Button>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full text-center text-xs text-ink/40 hover:text-accent transition-colors py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
