import { Typography } from "@mui/material";
import React from "react";

import { IPortal } from ".";

export default function DisplayPortals(props: {portals: IPortal[] | null}) {
  return props.portals &&
    <div>
      {props.portals.map(portal => {
        return <>
          <Typography sx={{ fontSize: 26 }} color="red" gutterBottom>
            {portal.dimension}
          </Typography>
          <p key={portal.server + portal.dimension}>{portal.position.x}, {portal.position.y}</p>
          <Typography sx={{ fontSize: 14 }} color="#A0A2A4" gutterBottom>
            {portal.remainingUses}
          </Typography>
        </>;
      })}
    </div>;
}