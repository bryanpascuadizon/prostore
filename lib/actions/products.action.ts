"use server";

import { convertToPlainObject } from "../utils";
import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// Get Latest products
export const getLatestProducts = async () => {
  const data = await prisma.product.findMany({
    take: PRODUCT_LIMIT,
    orderBy: { createdAt: "desc" },
    //add select: {} object here to get necessary fields
  });

  return convertToPlainObject(data);
};

// Get product using product slug
export const getProductSlug = async (slug: string) => {
  return await prisma.product.findFirst({
    where: { slug: slug },
    //add select: {} object here to get necessary fields
  });
};
