// import logo from './logo.svg';
import './App.css';
import MyProfile from "./components/MyProfile";
import Navbar from "./components/Navbar";
import NewAdDragDrop from "./components/NewAdDragDrop";
import NewAdDragDropFakeParent from "./components/NewAdDragDropFakeParent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminTagInputWidget from "./components/admin/AdminTagInputWidget";
import SelectSearch, {fuzzySearch} from "react-select-search";
import "./components/common/select-search.css"
import AdvertisementUploadForm from "./components/advertisementUploadForm/AdvertisementUploadForm";

function App() {

  return (
    <div className="App">

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route  path="/" exact/>
            </Routes>
        </BrowserRouter>

        {/*<MyProfile/>*/}
        {/*<NewAdDragDrop/>*/}
        <NewAdDragDropFakeParent/>

        {/*<AdminTagInputWidget/>*/}
        {/*<AdminTagInputWidget/>*/}
        <AdvertisementUploadForm/>
    </div>
  );
}

export default App;
