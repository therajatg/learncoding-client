import "./App.css";
import { Router } from "./frontend/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <Router />
      <ToastContainer autoClose={1250} />
    </div>
  );
}

export default App;
