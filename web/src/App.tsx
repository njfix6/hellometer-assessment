import { gql, useQuery } from "@apollo/client";
import React from "react";
import "./App.css";
import Chart from "./Chart";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { quantile } from "./Util";

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
  const [name, setName] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };

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

  const { loading, error, data } = useQuery(GET_STORES, {
    onCompleted: (data) => {
      setName(data.getStores[0].name);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

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

  const store = stores.find((s) => s.name === name);

  const q75 = quantile(store?.orders?.map((order) => order.wait) ?? [], 0.75);
  const q90 = quantile(store?.orders?.map((order) => order.wait) ?? [], 0.9);

  const q75FilteredStores: Store = {
    name: store?.name ?? "",
    orders:
      store?.orders?.filter((o) => {
        return o.wait < q90 && o.wait > q75;
      }) ?? [],
  };

  const q90FilteredStores: Store = {
    name: store?.name ?? "",
    orders:
      store?.orders?.filter((o) => {
        return o.wait >= q90;
      }) ?? [],
  };

  console.log("debug: q90", q75);

  return (
    <div className="App">
      <Box margin={2} marginBottom={20}>
        <Grid container spacing={2}>
          <Grid item xs={1} lg={3}></Grid>
          <Grid item xs={10} lg={6}>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              margin={2}
            >
              <Typography fontSize={32}>Store Tracker</Typography>
              <div style={{ flexGrow: 1 }}></div>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Store</InputLabel>
                <Select value={name} label="Store" onChange={handleChange}>
                  {stores.map((store) => {
                    return <MenuItem value={store.name}>{store.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Stack>
            <Stack spacing={4}>
              <Card>
                <CardHeader title="Slow Wait Times" />
                <CardContent>
                  <Stack spacing={2}>
                    {q90FilteredStores.orders.map((order) => (
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                      >
                        <Chip
                          label="Alert"
                          style={{ background: "red", color: "white" }}
                        />

                        <Typography>{`${order.arrivalTime} - customer waited ${order.wait}`}</Typography>
                      </Stack>
                    ))}
                    {q75FilteredStores.orders.map((order) => (
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                      >
                        <Chip
                          label="Warning"
                          style={{ background: "orange", color: "white" }}
                        />

                        <Typography>{`${order.arrivalTime} - customer waited ${order.wait}`}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title={"Order Data"} />
                <CardContent>
                  <Chart store={store} />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={1} lg={3}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
