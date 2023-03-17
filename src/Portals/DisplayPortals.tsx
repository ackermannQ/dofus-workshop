import { Typography } from "@mui/material";
import React from "react";

import { IPortal } from ".";
import { Dimensions } from "./Dimensions";

export default function DisplayPortals(props: {portals: IPortal[] | null}) {
  return props.portals &&
    <div>
      {props.portals.map(portal => {
        return <>
          <Typography sx={{ fontSize: 26, color: "white" }} gutterBottom>
            {capitalizeFirstLetter(portal.dimension)}
          </Typography>
          {portal?.position?.x ? <Typography sx={{ fontSize: 18 }}>[{portal?.position?.x}, {portal?.position?.y}]</Typography> : "Indisponible"}
          <Typography sx={{ fontSize: 14 }} color="#A0A2A4" gutterBottom>
            {portal.remainingUses} utilisations restantes
          </Typography>
        </>;
      })}
    </div>;
}

function capitalizeFirstLetter(dimension: Dimensions) {
  const string = dimension.toString();
  return string.charAt(0).toUpperCase() + string.slice(1);
}