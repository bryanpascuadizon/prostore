import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

const main = async () => {
  const prisma = new PrismaClient();

  //delete all data in the produts table
  await prisma.product.deleteMany();

  //create product
  await prisma.product.createMany({ data: sampleData.products });
};

main();
