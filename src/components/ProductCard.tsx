import { getFormattedPrice } from "@/lib/formatter";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import PriceBadge from "./PriceBadge";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  console.log(product.description);

  return (
    <Link
      href={`/products/${product.name}`}
      className="card w-full bg-base-300 hover:shadow-xl transition-shadow m-4"
    >
      {product.imageUrl && (
        <figure>
          <Image
            width={800}
            height={400}
            src={product.imageUrl!}
            alt={product.name}
            className="h-48 object-cover"
          />
        </figure>
      )}

      <div className="card-body m-4 p-2">
        <Markdown className="prose">{product.description as string}</Markdown>
        <div className="flex flex-row justify-between items-center">
          <PriceBadge price={product.price} />
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
