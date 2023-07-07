const RoutesMap = {
  Home: "/",
  SignUp: "/register",
  Test: "/test",
  Any: "/*",
};

type Path = {
  id: string;
  path: string;
  breadcrumb: string | null;
  description: String | null;
  component: JSX.Element;
  role: string;
  isProtected: boolean;
};

export type { Path };
export { RoutesMap };
