import { Metadata } from "next";
import React from "react";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/products.action";

export const metadata: Metadata = {
  title: "Home",
};

const Home = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProducts} title={"New Arrivals"} />
    </>
  );
};

export default Home;
