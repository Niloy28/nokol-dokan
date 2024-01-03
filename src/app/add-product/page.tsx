import { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import SubmitButton from "@/components/SubmitButton";

export const metadata: Metadata = {
  title: "Add Product",
};

const addProduct = async (formData: FormData) => {
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
    <div className="mx-auto mt-12 w-full md:w-2/3">
      <h1 className="text-2xl font-bold">Add a New Product</h1>
      <form action={addProduct}>
        <input
          className="input input-bordered mb-2 w-full p-1"
          type="text"
          name="name"
          id="name"
          required
          placeholder="Product name"
        />
        <textarea
          className="textarea textarea-bordered mb-2 w-full p-1"
          name="description"
          id="description"
          cols={30}
          rows={10}
          required
          placeholder="Product description"
        ></textarea>
        <input
          className="input input-bordered mb-2 w-full p-1"
          type="url"
          name="image"
          id="image"
          placeholder="Product image"
        />
        <input
          className="input input-bordered mb-2 w-full p-1"
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
