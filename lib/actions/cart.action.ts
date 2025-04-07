"use server";

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { calculatePrice, convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { checkSessionAndUserId } from "../session_utils";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";

export const addItemToCart = async (data: CartItem) => {
  try {
    const { sessionCartId, userId } = await checkSessionAndUserId();

    const cart = await getMyCart();

    const item = cartItemSchema.parse(data);

    //Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (!cart) {
      //Create new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calculatePrice([item]),
      });

      console.log(newCart)

      //Add to database
      await prisma.cart.create({
        data: newCart,
      });
    }

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    console.log(error);
  }
};

export const getMyCart = async () => {
  try {
    const { sessionCartId, userId } = await checkSessionAndUserId();

    //Get user cart from database
    const cart = await prisma.cart.findFirst({
      where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
    });

    if (!cart) {
      return undefined;
    }

    return convertToPlainObject({
      ...cart,
      items: cart.items as CartItem[],
      itemsPrice: cart.itemsPrice.toString(),
      totalPrice: cart.totalPrice.toString(),
      shippingPrice: cart.shippingPrice.toString(),
      taxPrice: cart.taxPrice.toString(),
    });
  } catch (error) {}
};
