import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grommet, grommet } from 'grommet';
import React from "react";

import { deepMerge } from 'grommet/utils';

import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
});

function App() {

  return (
    <Grommet theme={theme} full>
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Grommet>
  );
}

export default App;
