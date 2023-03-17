import { Typography } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";

import { IPortal } from ".";
import { Dimensions } from "./Dimensions";

export default function DisplayPortals(props: {portals: IPortal[] | null}) {

  return props.portals &&
    <div style={{backgroundColor: "#1D1D1D", display: "flex", marginRight: 50, marginTop: 10,}}>
      {props.portals.map(portal => {
        return <Box key={portal.dimension} sx={{
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
          margin: 1,
        }}>
          <img 
            width={50} 
            style={{cursor: "pointer"}} 
            src={`${portal.dimension}.png`} 
            alt={capitalizeFirstLetter(portal.dimension)} 
            onClick={() => navigator.clipboard.writeText("salut")}
          />
          {portal?.position?.x ? <Typography sx={{ fontSize: 18 }}>
            [{portal?.position?.x}, {portal?.position?.y}]
          </Typography> : "Indisponible"}
          <Typography sx={{ fontSize: 14 }} color="#A0A2A4" gutterBottom>
            {portal.remainingUses} utilisations restantes
          </Typography>
        </Box>;
      })}
    </div>;
}

function capitalizeFirstLetter(dimension: Dimensions) {
  const string = dimension.toString();
  return string.charAt(0).toUpperCase() + string.slice(1);
}
