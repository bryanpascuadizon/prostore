import { cartItemSchema, insertCartSchema, insertProductSchema } from "@/lib/validators";
import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";

// export type Product = z.infer<typeof insertProductSchema> & {
//   id: string;
//   rating: number;
//   createdAt: Date;
//   numReviews: number;
// };

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  brand: string;
  description: string;
  stock: number;
  numReviews: number;
  isFeatured: boolean;
  banner: string | null;
  createdAt: Date;
  price: Decimal;
  rating: Decimal;
};

export type Cart = z.infer<typeof insertCartSchema>
export type CartItem = z.infer<typeof cartItemSchema>