import { Metadata } from "next";
import React from "react";
import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";

export const metadata: Metadata = {
  title: "Home",
};

const Home = async () => {
  return (
    <>
      <ProductList data={sampleData.products} title={"New Arrivals"}/>
    </>
  )
};

export default Home;
