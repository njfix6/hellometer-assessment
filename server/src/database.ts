import * as fs from "fs";

export type Store = {
  orders: Order[];
  name: string;
};

export type Order = {
  arrivalTime: string;
  order: number;
  wait: number;
  payment: number;
  total: number;
};

export const stores = (): Store[] => {
  const directory = "./src/stores/";

  var files = fs.readdirSync("./src/stores/");

  const stores: Store[] = [];

  files.forEach((fileName) => {
    const name = fileName.split(".")[0] ?? "";
    const store: Store = {
      name,
      orders: [],
    };

    fs.readFileSync(`${directory}${fileName}`)
      .toString()
      .split("\n")
      .forEach((line) => {
        const orderData = line.split(",");
        const arrivalTime = orderData[0];

        if (arrivalTime !== "Arrival Time" && arrivalTime.length > 0) {
          const order = parseFloat(orderData[1]) ?? 0;
          const wait = parseFloat(orderData[2]) ?? 0;
          const payment = parseFloat(orderData[3]) ?? 0;
          var total = parseFloat(orderData[4]) ?? 0;

          const o: Order = {
            arrivalTime,
            order,
            wait,
            payment,
            total,
          };
          store.orders.push(o);
        }
      });

    stores.push(store);
  });

  return stores;
};
