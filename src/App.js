// import logo from './logo.svg';
import './App.css';
import MyProfile from "./components/MyProfile";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route  path="/" exact/>
            </Routes>
        </BrowserRouter>

      <MyProfile/>
    </div>
  );
}

export default App;
