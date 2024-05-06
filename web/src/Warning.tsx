import "./App.css";

import { Chip, Stack, Typography } from "@mui/material";
import { Duration } from "luxon";

export enum Level {
  Alert = "Alert",
  Warning = "Warning",
}

type WarningProps = {
  arrivalTime: string;
  orderWait: number;
  level: Level;
};

function Warning({ arrivalTime, orderWait, level }: WarningProps) {
  const duration1 = Duration.fromObject({ seconds: orderWait });

  console.log("debug: minutes", parseInt(duration1.toFormat("m")));

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Chip
        label={level}
        style={{
          background: level === Level.Warning ? "orange" : "red",
          color: "white",
        }}
      />

      <Typography>
        {`${arrivalTime} - customer waited`}
        <b>{` ${duration1.toFormat("m")} minutes and ${duration1
          .minus({ minutes: parseInt(duration1.toFormat("m")) })
          .toFormat("s")} seconds `}</b>
      </Typography>
    </Stack>
  );
}

export default Warning;
