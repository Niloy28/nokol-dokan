import { getFormattedPrice } from "@/lib/formatter";

type Props = {
  price: number;
};

const PriceBadge = ({ price }: Props) => {
  return (
    <div className="badge badge-secondary badge-lg">
      {getFormattedPrice(price)}
    </div>
  );
};

export default PriceBadge;
