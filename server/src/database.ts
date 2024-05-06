export type Store = {
  orders: Order[];
};

export type Order = {
  arrivalTime: string;
  order: number;
  wait: number;
  payment: number;
  total: number;
};

export const stores = (): Store[] => {
  // TODO: fill in with file

  return [];
};
