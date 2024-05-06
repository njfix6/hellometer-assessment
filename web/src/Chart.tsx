import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Store } from "./App";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

type ChartProps = {
  store: Store | undefined;
};

// export type Order = {
//   arrivalTime: string;
//   order: number;
//   wait: number;
//   payment: number;
//   total: number;
// };

function Chart({ store }: ChartProps) {
  return (
    // <ResponsiveContainer width="100%" height={"100%"}>
    <BarChart
      width={800}
      height={500}
      data={store?.orders ?? []}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="arrivalTime" fontSize={10} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="order" stackId="a" fill="#8884d8" />
      <Bar dataKey="wait" stackId="a" fill="#82ca9d" />
      <Bar dataKey="payment" stackId="a" fill="#ffc658" />
    </BarChart>
    // </ResponsiveContainer>
  );
}
export default Chart;
