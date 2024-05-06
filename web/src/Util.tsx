export const quantile = (orders: number[], q: number): number => {
  const max = Math.max(...orders);

  const min = Math.min(...orders);

  const quantile = (max - min) * q;

  return quantile;
};
