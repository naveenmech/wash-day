import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-muted py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our Services"
          description="Professional laundry care for every fabric. Transparent pricing. No hidden charges. Tap a card to add it to your pickup."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
