import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import App from "../App";
import VerifyToken from "../views/VerifyToken";
import CompleteRegistration from "../views/CompleteRegistration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verifytoken",
    element: <VerifyToken />,
  },
  {
    path: "/verifytoken",
    element: <VerifyToken />,
  },
  {
    path: "/completeregistration",
    element: <CompleteRegistration />,
  },
]);

export default router;
