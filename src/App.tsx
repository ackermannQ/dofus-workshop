import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React from "react";

import Almanax from "./Almanax";
import Menu from "./Menu";
import Portals from "./Portals";
import SearchRecipes from "./SearchRecipes";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Menu />
      <Grid container spacing={2}>
        <Grid item xs={4} style={{marginLeft: "2vw"}}>
          <Almanax />
          <Portals />
        </Grid>
        <Grid item xs={6}>
          <SearchRecipes />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
