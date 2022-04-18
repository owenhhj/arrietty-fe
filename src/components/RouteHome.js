import MyProfile from "./myProfile/MyProfile";
import AdDisplayColumn from "./adDisplay/AdDisplayColumn";
import "./common/common.css";
import "./RouteHome.css";
import Bulletin from "./Bulletin";
import {useEffect, useState} from "react";
import AdUploadForm from "./adUploadForm/AdUploadForm";
import Modal from "react-modal";

function RouteHome(){
  const [showNewAdForm, setShowNewAdForm] = useState(false);

  useEffect(() => {

    if(showNewAdForm){
      document.getElementById("app-root").style.filter = 'blur(2px)';
    }
    else{
      document.getElementById("app-root").style.filter = 'blur(0px) grayscale(0%)';
    }
  }, [showNewAdForm]);

  const customStyles = {
    content: {
      position: "absolute",
      left:0,
      top:"1rem",
      width:"100vw",
      height:"calc(100vh-2rem)",
      "overflow-y": "scroll",
      background: "transparent",
      display: "flex",
      "justify-content":"center",
      border:"none",
    },
  };

  return (
    <div className={"home-page page"}>
      <MyProfile callback={setShowNewAdForm}/>
      {/*<AdDisplayColumn/>*/}
      <Bulletin/>
      <Modal isOpen={showNewAdForm} style={customStyles}>
        <AdUploadForm callback={setShowNewAdForm}/>
      </Modal>
    </div>
  );
}

export default RouteHome;




