import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grommet, grommet } from 'grommet';
import React, { useState } from "react";

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
  const [dark, setDark] = useState(false);

  return (
    <Grommet theme={theme} full themeMode={dark ? 'dark' : 'light'}>
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
