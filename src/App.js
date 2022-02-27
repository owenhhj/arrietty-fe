// import logo from './logo.svg';
import './App.css';
import MyProfileCard from "./components/MyProfileCard";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminTagInputWidget from "./components/admin/AdminTagInputWidget";
import SelectSearch, {fuzzySearch} from "react-select-search";
import "./components/common/select-search.css"

function App() {
    const options = [
        {
            name: "Annie Cruz",
            value: "annie.cruz",
            photo: "https://randomuser.me/api/portraits/women/60.jpg"
        },
        {
            name: "Eli Shelton",
            disabled: true,
            value: "eli.shelton",
            photo: "https://randomuser.me/api/portraits/men/7.jpg"
        },
        {
            name: "Loretta Rogers",
            value: "loretta.rogers",
            photo: "https://randomuser.me/api/portraits/women/51.jpg"
        },
        {
            name: "Lloyd Fisher",
            value: "lloyd.fisher",
            photo: "https://randomuser.me/api/portraits/men/34.jpg"
        },
        {
            name: "Tiffany Gonzales",
            value: "tiffany.gonzales",
            photo: "https://randomuser.me/api/portraits/women/71.jpg"
        }
    ];
  return (
    <div className="App">

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route  path="/" exact/>
            </Routes>
        </BrowserRouter>

        <MyProfileCard/>
        <AdminTagInputWidget/>
    </div>
  );
}

export default App;
