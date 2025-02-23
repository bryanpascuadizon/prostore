export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prostore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Modern E-commerce store built with Next.js";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const PRODUCT_LIMIT = Number(process.env.PRODUCT_LIMIT) || 4;
export const DEFAULT_PRODUCT_FIELDS = {
  id: true,
  name: true,
  images: true,
  brand: true,
  slug: true,
  price: true,
  stock: true,
  rating: true,
};
