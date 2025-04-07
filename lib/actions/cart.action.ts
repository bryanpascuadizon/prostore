"use server";

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { checkSessionAndUserId } from "../session_utils";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../validators";

export const addItemToCart = async (data: CartItem) => {
  try {
    const { session, sessionCartId, userId } = await checkSessionAndUserId();

    const cart = await getMyCart();

    const item = cartItemSchema.parse(data);

    //Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    console.log({
      "Session Cart Id": sessionCartId,
      "User Id": userId,
      "Item Requested": item,
      "Produt Found": product,
    });

    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {}
};

export const getMyCart = async () => {
  try {
    const { session, sessionCartId, userId } = await checkSessionAndUserId();

    //Get user cart from database
    const cart = await prisma.cart.findFirst({
      where: userId ? { userId: userId } : { sessionCardId: sessionCartId },
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
