import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/provider";
import ToastProvider from "@/components/ui/ToastProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import ServiceModal from "@/components/home/ServiceModal";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WASH DAY – Premium Laundry | Clean Clothes. Zero Hassle.",
  description:
    "Doorstep laundry pickup & delivery. Cleaned with care, delivered fresh. Pay only after you're satisfied. 48–72 hour turnaround.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <StoreProvider>
          {children}
          <CartDrawer />
          <ServiceModal />
          <ToastProvider />
        </StoreProvider>
      </body>
    </html>
  );
}
