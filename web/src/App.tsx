import { gql, useQuery } from "@apollo/client";
import React from "react";
import "./App.css";
import Chart from "./Chart";

import {
  Box,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

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
  const store = stores.find((s) => s.name === name);

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
                <CardHeader title={"Slow Wait times"} />
              </Card>
              <Card>
                <CardHeader title={"Order Data"} />
                <Chart store={store} />
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
