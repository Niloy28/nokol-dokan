import { Product } from "@prisma/client";
import Image from "next/image";
import Markdown from "react-markdown";

type Props = {
  product: Product;
};

const HeroProduct = ({ product }: Props) => {
  return (
    <div className="hero rounded-xl bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        {product.imageUrl && (
          <Image
            width={600}
            height={500}
            alt={product.name}
            src={product.imageUrl}
            className="rounded-lg"
          />
        )}

        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <Markdown className="prose">{product.description}</Markdown>
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
};

export default HeroProduct;
