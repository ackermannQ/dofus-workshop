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

  return <div>
    <h1 style={{color:"#EBEEF1"}}>Portails</h1>
    <ServerSelection servers={serversList} setCurrentServerCallback={setCurrentServer}/>
    <DisplayPortals portals={portals} />
  </div>;

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