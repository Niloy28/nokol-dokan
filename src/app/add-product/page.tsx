import { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import SubmitButton from "@/components/SubmitButton";

export const metadata: Metadata = {
  title: "Add Product",
};

export const addProduct = async (formData: FormData) => {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = parseInt(formData.get("price")?.toString() || "0");
  const imageUrl = formData.get("image")?.toString();

  if (!name || !description || !price) {
    throw new Error("Invalid form data");
  }

  await prisma?.product.create({
    data: {
      name,
      description,
      price,
      imageUrl: imageUrl ?? "",
    },
  });

  redirect("/"); // Redirect to the home page
};

const AddProduct = () => {
  return (
    <div className="w-full md:w-2/3 mx-auto mt-12">
      <h1 className="font-bold text-2xl">Add a New Product</h1>
      <form action={addProduct}>
        <input
          className="input input-bordered p-1 mb-2 w-full"
          type="text"
          name="name"
          id="name"
          required
          placeholder="Product name"
        />
        <textarea
          className="textarea textarea-bordered p-1 mb-2 w-full"
          name="description"
          id="description"
          cols={30}
          rows={10}
          required
          placeholder="Product description"
        ></textarea>
        <input
          className="input input-bordered p-1 mb-2 w-full"
          type="url"
          name="image"
          id="image"
          placeholder="Product image"
        />
        <input
          className="input input-bordered p-1 mb-2 w-full"
          type="number"
          name="price"
          id="price"
          required
          placeholder="Product price"
        />

        <SubmitButton className="mt-6">Add Product</SubmitButton>
      </form>
    </div>
  );
};

export default AddProduct;
