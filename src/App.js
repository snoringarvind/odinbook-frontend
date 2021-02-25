import "./App.css";
import Home from "../src/Components/Home/Home";
import { useContext } from "react";
import { OdinBookContext } from "./Components/Context";
import Login from "./Components/Login/Login";

function App() {
  // const { jwtData } = useContext(OdinBookContext);
  // console.log(jwtData);

  // const jwtData = JSON.parse(localStorage.getItem());
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
