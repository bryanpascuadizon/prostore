import { auth } from "@/auth";
import { getOrderById } from "@/lib/actions/order.action";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}
export const OrderDetailsPage = async (props: OrderDetailsPageProps) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  //Redirect the user if they don't own the order
  if (order.userId !== session?.user?.id) {
    return redirect("/unauthorized");
  }

  let client_secret = null;

  //Chec if is not paid and using strip
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    //Init strip instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    //Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }
};

export default OrderDetailsPage;
