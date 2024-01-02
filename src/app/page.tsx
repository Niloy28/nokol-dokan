import prisma from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import HeroProduct from "@/components/HeroProduct";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const heroProduct = products[0];
  const oldProucts = products.slice(1);

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <HeroProduct product={heroProduct} />
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {oldProucts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
