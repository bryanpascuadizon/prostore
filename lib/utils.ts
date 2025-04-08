import { auth } from "@/auth";
import { CartItem } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertToPlainObject = <Product>(value: Product): Product => {
  return JSON.parse(JSON.stringify(value));
};

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
};

// esline-disable-next-line @typescript-eslint/no-explicit-any
//@ts-ignore
export const formatError = (error: any) => {
  if (error.name === "ZodError") {
    //Handle Zod error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join("\n");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    //Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exist`;
  } else {
    //Handle other errors
  }
};

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

//Format currency using CURRENCY_FORMATTER
export const formatCurrency = (amount: number | string | null) => {
  if (typeof amount === "number") {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === "string") {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return "NaN";
  }
};

//Round number to 2 decimal places
export const roundDecimal = (value: number | string) => {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value is not a number or string");
  }
};

//Calculate cart prices
export const calculatePrice = (items: CartItem[]) => {
  const itemsPrice = roundDecimal(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = roundDecimal(itemsPrice > 100 ? 0 : 10),
    taxPrice = roundDecimal(0.15 * itemsPrice),
    totalPrice = roundDecimal(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
