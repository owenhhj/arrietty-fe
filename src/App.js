// import logo from './logo.svg';
import './App.css';
import MyProfile from "./components/MyProfile";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminTagInputWidget from "./components/admin/AdminTagInputWidget";
import SelectSearch, {fuzzySearch} from "react-select-search";
import "./components/common/select-search.css"
import AdvertisementUploadForm from "./components/advertisementUploadForm/AdvertisementUploadForm";


import {showGeneralNoti} from "./components/common/GeneralNotiProvider";

function App() {
  const dispatch = showGeneralNoti();
  const handleShowNoti = (e) => {
    e.preventDefault();
    dispatch({action: "add", body: {msg: "App.js called", good: true}});
  }

  return (
    <div className="App">

        {/*<BrowserRouter>*/}
        {/*    <Navbar/>*/}
        {/*    <Routes>*/}
        {/*        <Route  path="/" exact/>*/}
        {/*    </Routes>*/}
        {/*</BrowserRouter>*/}

        {/*<MyProfile/>*/}
        {/*<AdminTagInputWidget/>*/}
        <AdvertisementUploadForm/>


        <button onClick={handleShowNoti}>NOTI</button>

    </div>
  );
}


export default App;
