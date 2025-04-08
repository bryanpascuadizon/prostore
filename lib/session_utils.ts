import { auth } from "@/auth";
import { cookies } from "next/headers";

export const checkSessionAndUserId = async () => {
  //Check for cart cookie

  const sessionCartId: any = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  //Get session and user id
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  return { sessionCartId, userId };
};
