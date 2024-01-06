"use client";

import { useState, useTransition } from "react";

type Props = {
  productID: string;
  onClick: (productID: string) => Promise<void>;
};

const AddToCartButton = ({ productID, onClick }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await onClick(productID);
            setSuccess(true);
          });
        }}
      >
        Add to Cart 🛒
      </button>
      {isPending && (
        <span className="loading loading-spinner">Adding to cart...</span>
      )}
      {!isPending && success && (
        <span className="text-success">Added to cart!</span>
      )}
    </div>
  );
};

export default AddToCartButton;
