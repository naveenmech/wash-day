import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { STORE_WHATSAPP_NUMBER, buildWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🧺</span>
            <span className="font-display text-2xl">WASH DAY</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Premium Laundry · Clean Clothes. Zero Hassle. Pay After Service | 48–72 Hour
            Delivery.
          </p>
        </div>
        <div className="text-sm text-white/60 space-y-2">
          <p className="text-white font-semibold mb-1">Tirunelveli, Tamil Nadu, India</p>
          <p>Mon – Sun: 9:00 AM – 8:00 PM</p>
          <p>Doorstep pickup available daily</p>
        </div>
        <div className="flex md:justify-end items-start gap-3">
          <a
            href="tel:+919585558007"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent transition-colors"
            aria-label="Call Now"
          >
            <FiPhoneCall size={18} />
          </a>
          <a
            href={buildWhatsAppLink("Hi WASH DAY! I have a question.", STORE_WHATSAPP_NUMBER)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#25D366] transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={18} />
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} WASH DAY Premium Laundry. All rights reserved.
      </div>
    </footer>
  );
}
