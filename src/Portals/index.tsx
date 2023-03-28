import { Box, Chip, Divider, Grid } from "@mui/material";
import axios from "axios";
import React from "react";

import { API_PORTALS_BASE } from "../config/apiConfig";
import { Dimensions } from "./Dimensions";
import DisplayPortals from "./DisplayPortals";
import { getServersList, Servers } from "./Servers";
import { ServerSelection } from "./ServerSelection";

export interface IPortal {
    server: Servers;
    dimension: Dimensions,
    remainingUses: number,
    position: IPosition,
    location: IZaap,
}

interface IZaap {
    area: string,
    subArea: string,
    position: IPosition,
}

interface IPosition {
    x: number;
    y: number;
}

export default function Portals() {
  const [portals, setPortals] = React.useState<IPortal[] | null>(null);
  const serversList = getServersList();
  const [currentServer, setCurrentServer] = React.useState<string>(serversList[0]);
    
  React.useEffect(() => {
    fetchPortals(currentServer).then((portals) => {
      setPortals(portals);
    });
  }, [currentServer]);

  return <Grid>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{marginTop: "4vh"}}
    >
      <Grid item xs={3}>
        <ServerSelection servers={serversList} setCurrentServerCallback={setCurrentServer}/>
      </Grid>
    </Grid>
    <DisplayPortals portals={portals} />
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Divider sx={{
          borderTop: "1px solid",
          borderImageSource: `linear-gradient(to right, rgba(253, 185, 80, 0),
        rgba(253, 185, 80, 0) 14%, rgba(253, 185, 80, 0.28),
        rgba(253, 185, 80, 0.93) 48%, #fdb950 50%, rgba(253, 185, 80, 0.28),
        rgba(253, 185, 80, 0) 86%, rgba(253, 185, 80, 0))`,
          borderImageSlice: 1,
          margin: "10px",
          width: 250,
        }}>
          <Chip sx={{fontSize: 20, color: "white"}} label="Position des portails" />
        </Divider>
      </Grid>
    </Grid> 
  </Grid>;

  async function fetchPortals(serverName: string): Promise<IPortal[] | null> {
    try {
      const response = await axios.get(`${API_PORTALS_BASE}/${serverName}/portals`);

      if (!response.data) {
        return null;
      }
            
      return response.data.map((data: IPortal) =>  {
        return {
          server: data?.server,
          dimension: data?.dimension,
          remainingUses: data?.remainingUses,
          position: {
            x: data?.position?.x,
            y: data?.position?.y,
          },
          location: {
            // area: data.
            // subarea:
            position: {

            }
          },
        };
      });

    } catch(error) {
      console.log(error);
      return null;
    }
  }
}