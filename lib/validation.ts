import * as Yup from "yup";

export const bookingSchema = Yup.object({
  name: Yup.string().trim().min(2, "Enter your full name").required("Name is required"),
  phone: Yup.string()
    .trim()
    .matches(/^[+\d][\d\s-]{7,14}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  address: Yup.string().trim().min(6, "Enter your full pickup address").required("Address is required"),
  pickupDate: Yup.string().required("Pickup date is required"),
  pickupTime: Yup.string().required("Pickup time slot is required"),
  notes: Yup.string().trim().max(300, "Keep notes under 300 characters"),
});

export const contactSchema = Yup.object({
  name: Yup.string().trim().min(2, "Enter your name").required("Name is required"),
  phone: Yup.string()
    .trim()
    .matches(/^[+\d][\d\s-]{7,14}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  message: Yup.string().trim().min(5, "Tell us a bit more").required("Message is required"),
});
