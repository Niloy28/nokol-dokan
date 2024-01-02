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
            className="w-full rounded-lg object-cover shadow-2xl"
          />
        )}

        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <p className="prose py-6">
            <Markdown>{product.description}</Markdown>
          </p>
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
};

export default HeroProduct;
