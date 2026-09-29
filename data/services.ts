import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "seat-sofa-cover",
    icon: "🛋️",
    name: "Seat & Sofa Cover Wash",
    description:
      "Deep clean your sofa and seat covers. Removes stains, allergens, and odors effectively.",
    price: 80,
    unit: "piece",
  },
  {
    id: "bag-wash",
    icon: "👜",
    name: "Bag Wash",
    description:
      "Thorough cleaning for handbags, backpacks, school bags and travel luggage.",
    price: 80,
    unit: "piece",
  },
  {
    id: "curtain-wash",
    icon: "🪟",
    name: "Curtain Wash",
    description:
      "Gentle machine wash for curtains of all sizes. Dust, mold, and stain removal.",
    price: 80,
    unit: "piece",
  },
  {
    id: "wash-ironing",
    icon: "👔",
    name: "Wash & Ironing",
    description:
      "Complete service — your clothes washed and pressed to perfection. Ready to wear.",
    price: 130,
    unit: "kg",
  },
  {
    id: "wash-fold",
    icon: "👕",
    name: "Wash & Fold",
    description: "Washed, dried, and neatly folded. Perfect for everyday clothing.",
    price: 100,
    unit: "kg",
  },
  {
    id: "starching",
    icon: "✨",
    name: "Starching",
    description:
      "Professional starching for formal shirts and uniforms. Crisp and sharp finish.",
    price: 45,
    unit: "piece",
  },
  {
    id: "dry-cleaning",
    icon: "🧥",
    name: "Dry Cleaning",
    description:
      "Solvent-based cleaning for delicate fabrics, woolens, suits, and formal wear.",
    price: 80,
    unit: "piece",
  },
  {
    id: "shoe-care",
    icon: "👟",
    name: "Shoe Care",
    description:
      "Deep cleaning, deodorizing, and conditioning for sneakers, leather shoes, and more.",
    price: 250,
    unit: "pair",
  },
  {
    id: "ironing-only",
    icon: "🔥",
    name: "Ironing Only",
    description:
      "Precise steam ironing for wrinkle-free, crisp results on all fabric types.",
    price: 20,
    unit: "piece",
  },
];

export const getServiceById = (id: string) =>
  services.find((service) => service.id === id);
