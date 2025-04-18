import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paymentResultSchema,
  shippingAddressSchema,
} from "@/lib/validators";
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

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: Boolean;
  paidAt: Date | null;
  isDelivered: Boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string; email: string };
  paymentResult: PaymentResult;
};

export type PaymentResult = z.infer<typeof paymentResultSchema>;
