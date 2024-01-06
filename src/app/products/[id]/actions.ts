"use server";

import prisma from "@/lib/db/prisma";
import { ShoppingCart, createCart, getCart } from "@/lib/db/cart";
import { revalidatePath } from "next/cache";

export const incrementProductQuantity = async (productID: string) => {
  const cart = (await getCart()) ?? ((await createCart()) as ShoppingCart);
  const articleInCart = cart.items.find((item) => item.productID === productID);

  if (articleInCart) {
    await prisma.cartItem.update({
      where: {
        id: articleInCart.id,
      },
      data: {
        quantity: { increment: 1 },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartID: cart.id,
        productID,
        quantity: 1,
      },
    });
  }

  revalidatePath("/products/[id]", "page");
};
