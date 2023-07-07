import { Path } from "./Routes";
import { RoutesMap } from "./Routes";
import { HomePage, LoginPage, TestPage } from "../../views";
import UserRoles from "./UserConfig";

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RoutesConfig: Path[] = [
  {
    id: "_home",
    path: RoutesMap.Home,
    breadcrumb: "Home",
    description: "Home page for the app.",
    component: <HomePage />,
    role: UserRoles.Viewer,
    isProtected: true,
  },
  {
    id: "_register",
    path: RoutesMap.SignUp,
    breadcrumb: "Login",
    description: "Login/SignUp page for the app.",
    component: <LoginPage />,
    role: UserRoles.Viewer,
    isProtected: false,
  },
  {
    id: "_test",
    path: RoutesMap.Test,
    breadcrumb: "Test",
    description: "Test page to test out new compoents.",
    component: <TestPage />,
    role: UserRoles.Viewer,
    isProtected: false,
  },
  {
    id: "_any",
    path: RoutesMap.Any,
    breadcrumb: null,
    description: "Error pages mostly 404s.",
    component: <h1>Seems like we donot have what you requested! 404 !! </h1>,
    role: UserRoles.Viewer,
    isProtected: false,
  },
];

const ProtectedRoute = ({ children }: any) => {
  const authenticated = useSelector((state: any) => state.auth.authenticated);
  let location = useLocation();
  if (!authenticated) {
    console.log("User details absent. Sending to login page");
    return (
      <Navigate to={RoutesMap.SignUp} state={{ from: location }} replace />
    );
  } else {
    console.log("User details found.");
  }
  return children;
};

export { RoutesConfig, ProtectedRoute };
