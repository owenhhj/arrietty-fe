import './App.css';
import './components/common/common.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import RouteHome from "./components/RouteHome";
import RouteAdmin from "./components/RouteAdmin";
import RouteFavorite from "./components/RouteFavorite";
import RouteMyPosts from "./components/RouteMyPosts";
import RouteNotification from "./components/RouteNotification";
import Modal from "react-modal";
import {useEffect, useState} from "react";
import {dataFetch} from "./components/common/common";

function App() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const PROFILE = process.env.REACT_APP_API_PROFILE;
  const [MY_NETID, setMY_NETID] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dataFetch(
      `${ROOT}${PROFILE}?userId=`,
      {method:"GET"},
      (res) => {
        setMY_NETID(res.netId);
        if (res.isAdmin) {
          setIsAdmin(true);
        }
      },
      null
    );
  }, []);

  Modal.setAppElement('#root');

  return (
    <div className="App" id={"app-root"}>

      <BrowserRouter>
        <Navbar isAdmin={isAdmin}/>
        <Routes>
          <Route path="/" element={<RouteHome MY_NETID={MY_NETID}/>} exact/>
          <Route path="/home" element={<RouteHome MY_NETID={MY_NETID}/>} exact/>
          <Route path="/myPosts" element={<RouteMyPosts/>} exact/>
          <Route path="/notification" element={<RouteNotification/>} exact/>
          <Route path="/favorite" element={<RouteFavorite/>} exact/>
          {isAdmin && (
            <Route path="/admin" element={<RouteAdmin/>} exact/>
          )}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
