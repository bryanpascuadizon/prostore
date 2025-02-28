import React from "react";
import ModeToggle from "./mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, UserIcon } from "lucide-react";
import UserButton from "./user-button";

const MenuItems = () => {
  return (
    <>
      <ModeToggle />
      <Button asChild variant="ghost">
        <Link href="/cart">
          <ShoppingCart /> Cart
        </Link>
      </Button>
      <UserButton />
    </>
  );
};

export default MenuItems;
