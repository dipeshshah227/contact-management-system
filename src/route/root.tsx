import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import App from "../App";
import VerifyToken from "../views/VerifyToken";
import CompleteRegistration from "../views/CompleteRegistration";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/verifytoken",
    element: (
      <PublicRoute>
        <VerifyToken />
      </PublicRoute>
    ),
  },
  {
    path: "/completeregistration",
    element: (
      <PublicRoute>
        <CompleteRegistration />
      </PublicRoute>
    ),
  },
]);

export default router;
