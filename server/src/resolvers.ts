import { Store, stores } from "./database";

const getStores = (): Store[] => {
  return stores();
};

export const root = {
  getStores,
};
