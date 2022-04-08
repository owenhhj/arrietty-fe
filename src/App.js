import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SelectSearch, {fuzzySearch} from "react-select-search";
import "./components/common/select-search.css"
import Home from "./components/Home";
import Admin from "./components/Admin";

import MyPosts from "./components/MyPosts";
import Notification from "./components/Notification";
import Modal from "react-modal";



function App() {
    Modal.setAppElement('#root');

  return (
    <div className="App" id={"app-root"}>

        <BrowserRouter>
            <Navbar isAdmin={true} />
            <Routes>
                <Route  path="/home" element={<Home/>} exact/>
                <Route  path="/myPosts" element={<MyPosts/>} exact/>
                <Route  path="/admin" element={<Admin/>} exact/>
                <Route  path="/notification" element={<Notification/>} exact/>

            </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
