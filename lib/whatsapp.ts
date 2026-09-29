import type { CartItem } from "@/types";

export const STORE_WHATSAPP_NUMBER = "918606171401";

export function buildWhatsAppMessage(params: {
  name?: string;
  phone?: string;
  address?: string;
  pickupDate?: string;
  pickupTime?: string;
  items?: CartItem[];
}) {
  const { name, phone, address, pickupDate, pickupTime, items } = params;
  const lines: string[] = ["Hi WASH DAY! I'd like to book a laundry pickup."];

  if (name) lines.push(`Name: ${name}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (address) lines.push(`Address: ${address}`);

  if (items && items.length > 0) {
    lines.push("", "Services:");
    items.forEach((item) => {
      lines.push(`- ${item.name} x${item.quantity} (₹${item.price}/${item.unit})`);
    });
  }

  if (pickupDate) lines.push("", `Pickup date: ${pickupDate}`);
  if (pickupTime) lines.push(`Pickup time: ${pickupTime}`);

  return lines.join("\n");
}

export function buildWhatsAppLink(message: string, number: string = STORE_WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
