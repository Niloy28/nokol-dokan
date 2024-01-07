"use server";

import prisma from "@/lib/db/prisma";
import { ShoppingCart, createCart, getCart } from "@/lib/db/cart";
import { revalidatePath } from "next/cache";

export const setProductQuantity = async (
  productID: string,
  quantity: number,
) => {
  const cart = (await getCart()) ?? ((await createCart()) as ShoppingCart);
  const articleInCart = cart.items.find((item) => item.productID === productID);

  if (articleInCart) {
    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: {
          id: articleInCart.id,
        },
      });
    } else {
      await prisma.cartItem.update({
        where: {
          id: articleInCart.id,
        },
        data: {
          quantity,
        },
      });
    }
  } else {
    await prisma.cartItem.create({
      data: {
        cartID: cart.id,
        productID,
        quantity,
      },
    });
  }

  revalidatePath("/cart", "page");
};
