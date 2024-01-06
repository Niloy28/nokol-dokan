import { Product } from "@prisma/client";
import Image from "next/image";
import Markdown from "react-markdown";
import PriceBadge from "./PriceBadge";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "@/app/products/[id]/actions";

type Props = {
  product: Product;
};

const ProductDetail = ({ product }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 xl:flex-row">
      {product.imageUrl && (
        <div>
          <Image
            src={product.imageUrl}
            width={500}
            height={500}
            alt={product.name}
            className="h-auto w-auto rounded-lg object-contain"
            priority
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-bold">{product.name}</h2>
        <PriceBadge price={product.price} />
        <Markdown className="prose py-5">{product.description}</Markdown>
        <AddToCartButton
          productID={product.id}
          onClick={incrementProductQuantity}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
