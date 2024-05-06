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
  // TODO: fill in with file

  const directory = "./src/stores/";

  var files = fs.readdirSync("./src/stores/");

  console.log("files", files);

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
          console.log("orderData", orderData);
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
          console.log("o", o);
          store.orders.push(o);
        }
      });

    stores.push(store);

    // fs.readFile(`${directory}${fileName}`, (err, file) => {
    //   if (err) throw err;

    //   const store: Store = {
    //     name,
    //     orders: [],
    //   };

    //   file
    //     .toString()
    //     .split("\n")
    //     .forEach((line) => {
    //       const splitedLine = line.split(",");

    //       const orderData = line.split(",");
    //       const arrivalTime = orderData[0];
    //       const order = parseInt(orderData[1]);
    //       const wait = parseInt(orderData[2]);
    //       const payment = parseInt(orderData[3]);
    //       var total = parseInt(orderData[4]);

    //       const o: Order = {
    //         arrivalTime,
    //         order,
    //         wait,
    //         payment,
    //         total,
    //       };
    //       console.log("o", o);
    //       store.orders.push(o);
    //     });

    //   console.log("store", store);

    //   stores.push(store);
    // });
  });

  return stores;
};
