import logo from './logo.svg';
import './App.css';
import MyProfile from "./components/MyProfile";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminTagInputWidget from "./components/admin/AdminTagInputWidget";
import SelectSearch, {fuzzySearch} from "react-select-search";
import "./components/common/select-search.css"
import FilterButton from "./components/searchBar/FilterButton";
import PriceFilter from "./components/searchBar/PriceFilter";
import AdDisplayColumn from "./components/AdDisplayColumn";
import AdvertisementUploadForm from "./components/advertisementUploadForm/AdvertisementUploadForm";
import Home from "./Home";
import Admin from "./Admin";

function App() {

  return (
    <div className="App">

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
