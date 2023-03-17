import React from "react";

import SearchRecipes from "./SearchRecipes";

import "./App.css";
import Menu from "./Menu"; 
import Almanax from "./Almanax";
import Portals from "./Portals";

function App() {
  return (
    <div className="App">
      <Menu />
      <Almanax />
      <Portals />
      <SearchRecipes />
    </div>
  );
}

export default App;
