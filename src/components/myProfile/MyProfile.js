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
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const IMAGE = process.env.REACT_APP_API_IMAGE;
  const PROFILE = process.env.REACT_APP_API_PROFILE;
  const [myProfileData, setMyProfileData] = useState(getSiteInfo());
  const [avatarSrc, setAvatarSrc] = useState('./default_avatar.jpg');
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
      `${ROOT}${PROFILE}?userId=`,
      {method: "GET"},
      (res) => {
        setMyProfileData(res);
        if (res.avatarImageId) {
          setAvatarSrc(`${ROOT}${IMAGE}?id=${res.avatarImageId}`);
        } else {
          setAvatarSrc('./default_avatar.jpg');
        }
      },
      null
    );
    // setAvatarSrc('/avatar');  // dedicated API, to be deprecated
  };

  // handle data from children: disp & edit
  const callbackHandler = (data) => {
    if (data.action === "update") {
      refreshData();
      setPageShow(0);
      handleShowNoti('Profile edit success', 1);
    } else if (data.action === "switch") {
      setPageShow(1-pageShow)
    } else if (data.action === "addNewAd") {
      setShowNewAdForm(true);
    }
  };

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
