import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useStorage";

const PrivateRouter = ({ test, children }: any) => {
  const [user, setUser] = useLocalStorage("token", {});

  if (Object.keys(user).length > 0) {
    return <>{children}</>;
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRouter;
