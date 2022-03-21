// import logo from './logo.svg';
import './App.css';
import MyProfile from "./components/MyProfile";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminTagInputWidget from "./components/admin/AdminTagInputWidget";
import SelectSearch, {fuzzySearch} from "react-select-search";
import "./components/common/select-search.css"
import FilterButton from "./components/searchBar/FilterButton";
import PriceFilter from "./components/searchBar/PriceFilter";
import SearchBar from "./components/searchBar/SearchBar";
import AdListing from "./components/adDisplay/AdListing";

function App() {

  return (
    <div className="App">

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route  path="/" exact/>
            </Routes>
        </BrowserRouter>

        <SearchBar/>
        <AdListing />

    </div>
  );
}

export default App;
