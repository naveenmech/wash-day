export interface Service {
  id: string;
  icon: string;
  name: string;
  description: string;
  price: number;
  unit: string;
}

export interface CartItem {
  serviceId: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
}

export interface BookingFormValues {
  name: string;
  phone: string;
  address: string;
  pickupDate: string;
  pickupTime: string;
  notes: string;
}

export const TIME_SLOTS = [
  "9:00 AM – 11:00 AM",
  "11:00 AM – 1:00 PM",
  "1:00 PM – 3:00 PM",
  "3:00 PM – 5:00 PM",
  "5:00 PM – 7:00 PM",
] as const;
