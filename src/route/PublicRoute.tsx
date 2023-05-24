import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

type IPublicRoute = PropsWithChildren;

const PublicRoute = ({ children }: IPublicRoute) => {
  const { auth } = useAppSelector((store) => store.authentication);

  if (auth === "loggedIn") return <Navigate to="/" />;

  return <>{children}</>;
};

export default PublicRoute;
