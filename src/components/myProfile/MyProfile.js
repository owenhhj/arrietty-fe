import './MyProfile.css'
import MyProfileDisplay from "./MyProfileDisplay";
import MyProfileEdit from "./MyProfileEdit";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useState, useEffect} from "react";
import {dataFetch} from "../common/common";
import {getSiteInfo} from "../common/SiteInfoProvider";
import Modal from "react-modal";
import AdUploadForm from "../adUploadForm/AdUploadForm";

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

function MyProfile() {
  const ROOT = 'https://localhost:8000/';
  const [myProfileData, setMyProfileData] = useState(getSiteInfo());
  const [avatarSrc, setAvatarSrc] = useState(  // pass state hook between components
    myProfileData.avatarImageId ? `${ROOT}image?id=${myProfileData.avatarImageId}` : "./default_avatar.jpg"
  );
  const [pageShow, setPageShow] = useState(0);  // 0: disp, 1: edit
  const [showNewAdForm, setShowNewAdForm] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (showNewAdForm) {
      document.getElementById("app-root").style.filter = 'blur(2px)';
    } else {
      document.getElementById("app-root").style.filter = 'blur(0px) grayscale(0%)';
    }
  }, [showNewAdForm]);

  const dispatch = showGeneralNoti();
  const handleShowNoti = (msg, good) => {
    dispatch({action: "add", body: {msg: msg, good: good}});
  };

  const refreshData = () => {
    dataFetch(
      `${ROOT}profile?userId=`,
      {method: "GET"},
      (res) => {
        setMyProfileData(res);
        // setAvatarSrc(res.avatarImageId ? `${ROOT}image?id=${res.avatarImageId}` : "./default_avatar.jpg");
      },
      null
    );
    setAvatarSrc('/avatar');
  };

  // handle data from children: disp & edit
  function callbackHandler(data) {
    if (data.action === "update") {
      // setMyProfileData(data.body);
      refreshData();
      setPageShow(0);
      handleShowNoti('Profile edit success', true);
    } else if (data.action === "switch") {
      setPageShow(1-pageShow)
    } else if (data.action === "addNewAd") {
      setShowNewAdForm(true);
    }
  }

  return (
    <>
      <div className="MyProfile card non-text">
        {pageShow === 0 && (
          <MyProfileDisplay data={myProfileData} avatarSrc={avatarSrc} callback={callbackHandler}/>
        )}
        {pageShow === 1 && (
          <MyProfileEdit
            profilePrev={myProfileData} avatarSrc={avatarSrc} setAvatarSrc={setAvatarSrc}
            callback={callbackHandler}
          />
        )}
      </div>
      <Modal isOpen={showNewAdForm} style={customStyles}>
        <AdUploadForm callback={setShowNewAdForm}/>
      </Modal>
    </>
  );
}

export default MyProfile;
