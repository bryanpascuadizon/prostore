"use server";

import { PrismaClient } from "@prisma/client";
import { convertToPlainObject } from "../utils";
import { DEFAULT_PRODUCT_FIELDS, PRODUCT_LIMIT } from "../constants";

export const getLatestProducts = async () => {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: PRODUCT_LIMIT,
    orderBy: { createdAt: "desc" },
    select: DEFAULT_PRODUCT_FIELDS,
  });

  return convertToPlainObject(data);
};
