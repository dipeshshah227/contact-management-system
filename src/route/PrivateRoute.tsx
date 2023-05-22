import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
type IPrivateRoute = PropsWithChildren;

const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { auth } = useAppSelector((store) => store.authentication);

  console.log(auth);
  if (auth === "uncertain") {
    return <Navigate to="/login" />;
  } else return <>{children}</>;
};

export default PrivateRoute;
