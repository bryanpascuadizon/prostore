import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

const main = async () => {
  const prisma = new PrismaClient();

  //delete all data in the produts table
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  //create product
  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully")

  //npx tsx ./db/seed
};

main();
