import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import logo from "@/../public/assets/nokol-dokan-high-resolution-logo-white-transparent.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import AccountButton from "./AccountButton";
import { authOptions } from "@/lib/auth-options";

const searchProducts = async (formData: FormData) => {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    // Perform search using searchQuery
    redirect(`/search?q=${searchQuery}`);
  }
};

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <header className="bg-base-300">
      <nav className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/">
            <Image src={logo} height={80} width={80} alt="Nokol Dokan logo" />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-24"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <AccountButton session={session} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
