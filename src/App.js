import logo from './logo.svg';
import './App.css';
import MyProfile from "./components/MyProfile";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminTagInputWidget from "./components/admin/AdminTagInputWidget";
import SelectSearch, {fuzzySearch} from "react-select-search";
import "./components/common/select-search.css"
import AdDisplayColumn from "./components/AdDisplayColumn";
import AdvertisementUploadForm from "./components/advertisementUploadForm/AdvertisementUploadForm";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Modal from "react-modal";



function App() {
    Modal.setAppElement('#root');

  return (
    <div className="App" id={"app-root"}>

        <BrowserRouter>
            <Navbar isAdmin={true} />
            <Routes>
                <Route  path="/home" element={<Home/>} exact/>
                <Route  path="/admin" element={<Admin/>} exact/>
            </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
