import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export function ServerSelection(props: {
   servers: string[],
   setCurrentServerCallback: any // (value: string | null) => void
}) {
  const [currentServer, setCurrentServer] = React.useState<string | undefined>(props.servers?.[0]);

  return (
    <Autocomplete
      value={currentServer}
      onChange={(event: any, newValue: string | undefined) => {
        setCurrentServer(newValue);
        props.setCurrentServerCallback(newValue);
      }}
      id="controllable-states-demo"
      options={props.servers}
      sx={{ width: 200,
        backgroundImage:`url(/${currentServer}.jpg)`,
        backgroundRepeat:"no-repeat",
        backgroundPositionY: "30%",
        cursor: "pointer"
      }}
      renderInput={(params) => 
        <TextField sx={{backgroundColor: "rgba(0, 0, 0, 0.3)", input: {
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: 20,
          textAlign: "center"
        }
        }} {...params} />}
      disableClearable
    />
  );
}