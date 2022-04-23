import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./components/common/select-search.css"
import RouteHome from "./components/RouteHome";
import RouteAdmin from "./components/RouteAdmin";
import RouteFavorite from "./components/RouteFavorite";
import RouteMyPosts from "./components/RouteMyPosts";
import RouteNotification from "./components/RouteNotification";
import Modal from "react-modal";

function App() {
  Modal.setAppElement('#root');

  return (
    <div className="App" id={"app-root"}>

      <BrowserRouter>
        {/*<Navbar isAdmin={true}/>*/}
        <Routes>
          {/*<Route path="/" element={<RouteHome/>} exact/>*/}
          <Route path="/home" element={<RouteHome/>} exact/>
          <Route path="/myPosts" element={<RouteMyPosts/>} exact/>
          <Route path="/admin" element={<RouteAdmin/>} exact/>
          <Route path="/notification" element={<RouteNotification/>} exact/>
          <Route path="/favorite" element={<RouteFavorite/>} exact/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
