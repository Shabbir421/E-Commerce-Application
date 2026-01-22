import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import App from "./App";
import { attachClerkToken } from "./lib/axios";

const AppWrapper = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    attachClerkToken(getToken);
  }, [getToken]);

  return <App />;
};

export default AppWrapper;
