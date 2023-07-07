import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RoutesConfig, ProtectedRoute } from "./core/routes/RoutesConfig";

const routesList = RoutesConfig;

function App() {
  return (
    <Router>
      <Routes>
        {routesList.map((route, _index) => {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={
                route.isProtected ? (
                  <ProtectedRoute>{route.component}</ProtectedRoute>
                ) : (
                  route.component
                )
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
