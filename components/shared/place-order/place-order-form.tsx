"use client";
import { useRouter } from "next/navigation";
import PlaceOrderButton from "./place-order-button";
import { createOrder } from "@/lib/actions/order.action";

const PlaceOrderForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await createOrder();

    console.log(response)

    if (response.redirectTo) {
      router.push(response.redirectTo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;
