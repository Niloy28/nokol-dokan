import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { cookies } from "next/dist/client/components/headers";

const LOCAL_CART_ID = "localCartID";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export const getCart = async (): Promise<ShoppingCart | null> => {
  const localCartID = cookies().get(LOCAL_CART_ID);

  // if local cart ID is not found, return null
  if (!localCartID) {
    return null;
  }

  const cart = await prisma.cart.findUnique({
    where: { id: localCartID.value },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  // if cart is not found in the db, return null
  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
};

export const createCart = async (): Promise<ShoppingCart> => {
  const newCart = await prisma.cart.create({
    data: {},
  });

  // Add encryption + secure settings in production app
  cookies().set(LOCAL_CART_ID, newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
};
