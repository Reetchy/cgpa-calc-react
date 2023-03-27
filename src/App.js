import React from "react";
import logo from './logo.png';

import Calculator from "./Calculator";

function App() {
  return (
    <div className="App">
      <div  className="logoImg"><img src={logo} alt="logo"/></div>
      <Calculator />
    </div>
  );
}

export default App;
