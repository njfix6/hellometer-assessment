import { gql, useQuery } from "@apollo/client";
import "./App.css";
import Chart from "./Chart";

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

function App() {
  const GET_STORES = gql`
    query getStores {
      getStores {
        name
        orders {
          arrivalTime
          order
          wait
          payment
          total
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_STORES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("data", data);

  const stores: Store[] = data.getStores?.map((s: any) => {
    const store: Store = {
      name: s.name ?? "",
      orders: s.orders.map((o: any) => {
        const order: Order = {
          arrivalTime: o.arrivalTime ?? "",
          order: o.order ?? 0,
          wait: o.wait ?? 0,
          payment: o.payment ?? 0,
          total: o.total ?? 0,
        };

        return order;
      }),
    };

    return store;
  });

  // TODO: fill this in
  const store = stores.find((s) => s.name === "98");

  return (
    <div className="App">
      <Chart store={store} />
    </div>
  );
}

export default App;
