export const getFormattedPrice = (price: number): string => {
  const actualPrice = price / 100;

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
    .format(actualPrice)
    .toString();
};
