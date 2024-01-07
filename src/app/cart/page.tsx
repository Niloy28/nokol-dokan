import CartEntry from "@/components/CartEntry";
import { getCart } from "@/lib/db/cart";
import { Metadata } from "next";
import { setProductQuantity } from "./actions";
import { getFormattedPrice } from "@/lib/formatter";

export const metadata: Metadata = {
  title: "Your Cart - Nokol Dokan",
  description: "View your cart and make purchases",
};

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Your Shopping Cart</h1>
      {cart?.items && (
        <div className="flex flex-col gap-3">
          {cart.items.map((cartItem) => (
            <CartEntry
              key={cartItem.id}
              cartItem={cartItem}
              onQuantityChange={setProductQuantity}
            />
          ))}
        </div>
      )}
      {(!cart || cart.items.length === 0) && <p>Your cart is empty.</p>}
      <div className="divider"></div>
      <div className="flex flex-col items-end justify-between sm:flex-row sm:items-center">
        <p className="text-2xl font-bold">
          Total: {getFormattedPrice(cart?.subtotal || 0)}
        </p>
        <button
          className="btn btn-primary"
          disabled={!cart || cart.items.length == 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
