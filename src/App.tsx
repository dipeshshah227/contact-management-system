import "./App.css";
import PrivateRoute from "./route/PrivateRoute";
import { useAppSelector } from "./store/hooks";
import Home from "./views/Home";
import Navbar from "./views/Navbar";

function App() {
  return (
    <PrivateRoute>
      <Navbar />
      <Home />
    </PrivateRoute>
  );
}

export default App;
