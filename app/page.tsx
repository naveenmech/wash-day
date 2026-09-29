import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorks from "@/components/home/HowItWorks";
import PromiseBanner from "@/components/home/PromiseBanner";
import WhyUsSection from "@/components/home/WhyUsSection";
import DeliverySection from "@/components/home/DeliverySection";
import BookingSection from "@/components/home/BookingSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <HowItWorks />
        <PromiseBanner />
        <WhyUsSection />
        <DeliverySection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
