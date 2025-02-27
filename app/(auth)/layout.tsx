import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Prostore",
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-center min-h-screen w-full">{children}</div>;
}
