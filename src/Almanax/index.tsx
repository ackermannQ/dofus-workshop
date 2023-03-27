import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

import { API_ALMANAX } from "../config/apiConfig";

interface IAlmanax {
   item_name: string;
   item_quantity: number;
   item_url: string;
}

export default function Almanax() {
  const [almanax, setAlmanax] = React.useState<IAlmanax | null>(null);
    
  React.useEffect(() => {
    fetchAlmanax().then(almanaxData => {
      setAlmanax(almanaxData);
    });
  }, []);

  return <Box sx={{marginTop: 5}}>
    <img width="50" alt={almanax?.item_name} src={almanax?.item_url} />
    <Typography variant="h6" color="inherit" component="div">
      {almanax?.item_quantity} {almanax?.item_name}
    </Typography>
  </Box>;

  async function fetchAlmanax(): Promise<IAlmanax | null> {
    try {
      const date = formatDate();
      const response = await axios.get(`${API_ALMANAX}/${date}`);

      return  {
        item_name: response.data.data.item_name,
        item_quantity: response.data.data.item_quantity,
        item_url: response.data.data.item.image_url,
      };
            
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  function formatDate() {
    return new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })
      .split(" ")[0].split("/").reverse().join("-");
  }
}
