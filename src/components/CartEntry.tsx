"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import noImage from "@/../public/assets/no-image.jpg";
import { CartItemWithproduct } from "@/lib/db/cart";
import { getFormattedPrice } from "@/lib/formatter";

type Props = {
  cartItem: CartItemWithproduct;
  onQuantityChange: (productID: string, quantity: number) => Promise<void>;
};

const quantityOptions = Array.from(Array(99).keys()).map((number) => {
  return (
    <option key={number + 1} value={number + 1}>
      {number + 1}
    </option>
  );
});

const CartEntry = ({
  cartItem: { product, quantity },
  onQuantityChange,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div>
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={200}
            className="rounded-lg"
          />
        )}
        {!product.imageUrl && (
          <Image
            src={noImage}
            alt={product.name}
            width={200}
            height={200}
            className="rounded-lg"
          />
        )}
      </div>
      <div>
        <Link href={`/products/${product.id}`} className="text-2xl font-bold">
          {product.name}
        </Link>
        <div className="my-1 flex items-center gap-2">
          Quantity:
          <select
            className="select select-bordered select-secondary select-sm w-full max-w-20"
            defaultValue={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.currentTarget.value);

              startTransition(async () => {
                await onQuantityChange(product.id, newQuantity);
              });
            }}
          >
            {/* Add separate option for removing */}
            <option key={0} value={0}>
              0 (Remove)
            </option>
            {quantityOptions}
          </select>
        </div>
        <div>Price: {getFormattedPrice(product.price)}</div>
        <div className="flex flex-row items-center gap-3">
          Total: {getFormattedPrice(product.price * quantity)}
          {isPending && <span className="loading loading-spinner" />}
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default CartEntry;
