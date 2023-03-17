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

  return <div>
    <h1 style={{color:"#EBEEF1"}}>Almanax</h1>
    <img width="50" alt={almanax?.item_name} src={almanax?.item_url} />
    <p>{almanax?.item_name}</p>
    <p>{almanax?.item_quantity}</p>
  </div>;

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
    return new Date().toISOString().split("T")[0];
  }
}
