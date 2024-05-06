import {
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Store } from "./App";

type ChartProps = {
  store: Store | undefined;
  barLabels: React.ReactNode;
};

function Chart({ store, barLabels }: ChartProps) {
  return (
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
      {barLabels}
    </BarChart>
  );
}
export default Chart;
