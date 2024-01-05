import ProductDetail from "@/components/ProductDetail";
import prisma from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: {
    id: string;
  };
};

const getProduct = cache(async (id: string): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
});

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata> => {
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: `Product information about ${product.name}`,
  };
};

const ProductPage = async ({ params: { id } }: Props) => {
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetail product={product} />
    </>
  );
};

export default ProductPage;
