"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { getFormattedPrice } from "@/lib/formatter";
import Link from "next/link";

type Props = {
  cart: ShoppingCart | null;
};

const ShoppingCartButton = ({ cart }: Props) => {
  const closeDropdown = () => {
    const activeElement = document.activeElement as HTMLElement;

    if (activeElement) {
      activeElement.blur();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        <div className="indicator">
          <div className="text-2xl">
            🛒
            <span className="badge indicator-item badge-sm">
              {cart?.size || 0}
            </span>
          </div>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-30 mt-3 w-52 bg-base-300 shadow-md"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} Items</span>
          <div className="divider"></div>
          <span className="text-info">
            Subtotal: {getFormattedPrice(cart?.subtotal || 0)}
          </span>
          <Link
            href="/cart"
            onClick={closeDropdown}
            className="btn btn-primary btn-block"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartButton;
