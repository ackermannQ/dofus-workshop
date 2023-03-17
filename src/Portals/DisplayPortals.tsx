import { Autocomplete, TextField, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";

import { IPortal } from ".";
import { Dimensions } from "./Dimensions";
import { getServersList } from "./Servers";

export default function DisplayPortals(props: {portals: IPortal[] | null}) {
  const [serversList, setServersList] = React.useState<string[]>([]);

  React.useEffect(() => {
    setServersList(getServersList());
  }, []);

  return props.portals &&
  <>
    <Box sx={{
      backgroundColor: "primary.dark",
      "&:hover": {
        backgroundColor: "primary.main",
        opacity: [0.9, 0.8, 0.7],
      },
      margin: 1,
    }}>
      <ServerSelection servers={serversList} />
      {props.portals[0].server}
    </Box>
    <div style={{backgroundColor: "#1D1D1D", display: "flex", marginRight: 50}}>
      {props.portals.map(portal => {
        return <Box key={portal.dimension} sx={{
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          margin: 1,
        }}>
          <img width={50} style={{cursor: "pointer"}} src={`${portal.dimension}.png`} alt={capitalizeFirstLetter(portal.dimension)} onClick={() => navigator.clipboard.writeText("salut")}/>
          {portal?.position?.x ? <Typography sx={{ fontSize: 18 }}>[{portal?.position?.x}, {portal?.position?.y}]</Typography> : "Indisponible"}
          <Typography sx={{ fontSize: 14 }} color="#A0A2A4" gutterBottom>
            {portal.remainingUses} utilisations restantes
          </Typography>
        </Box>;
      })}
    </div>
  </>;
}

function capitalizeFirstLetter(dimension: Dimensions) {
  const string = dimension.toString();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ServerSelection(props: {servers: string[]}) {
  const [currentServer, setCurrentServer] = React.useState<string | null>(props.servers?.[0]);

  return (
    <Autocomplete
      value={currentServer}
      onChange={(event: any, newValue: string | null) => {
        setCurrentServer(newValue);
      }}
      id="controllable-states-demo"
      options={props.servers}
      sx={{ width: 200, backgroundImage:`url(/${currentServer}.jpg)`, backgroundRepeat:"no-repeat", backgroundPositionY: "30%"}}
      renderInput={(params) => <TextField sx={{backgroundColor: "rgba(0, 0, 0, 0.5)"}} {...params} />}
    />
  );
}