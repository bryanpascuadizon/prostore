export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prostore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Modern E-commerce store built with Next.js";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const PRODUCT_LIMIT = Number(process.env.PRODUCT_LIMIT) || 4;
export const SIGN_IN_DEFAULT_VALUES = {
  email: "",
  password: "",
};
export const DEFAULT_PRODUCT_FIELDS = {
  id: true,
  name: true,
  images: true,
  brand: true,
  slug: true,
  price: true,
  stock: true,
  rating: true,
  createdAt: true,
  category: true,
  description: true,
  isFeatured: true,
  banner: true,
};

export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["Paypal", "Stripe", "CashOnDelivery"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "Paypal";
