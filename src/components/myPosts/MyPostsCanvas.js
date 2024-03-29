import './MyPostsCanvas.css';
import MyPostsCard from "./MyPostsCard";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import MyPostsEditFormMUI from "./MyPostsEditFormMUI";
import RoutePageTitleCard from "../common/RoutePageTitleCard";

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

const fakeMyAds = [
  {id: 666, adType: 'textbook', adTitle:'tiitle', isTextbook: true, tagId: 12, imageIds:'', price:444, comment: 'comment', numberOfTaps: 3, createTime: 'May 7, 2022, 10:20:45 PM', textbookTitle: 'lol title'},
  {id: 777, adType: 'textbook', adTitle:'title', isTextbook: true, tagId: 12, imageIds:'', price:444, comment: 'comment', numberOfTaps: 3, createTime:'May 7, 2022, 10:20:45 AM'},
  // {id: 111, adType: 'other', adTitle:'title', isTextbook: false, tagId: 12, imageIds:'', price:444, comment: 'comment', numberOfTaps: 3, createTime:'Apr 6'},
  // {id: 222, adType: 'other', adTitle:'title', isTextbook: false, tagId: 12, imageIds:'', price:444, comment: 'comment', numberOfTaps: 3, createTime:'Apr 6'},
];

function MyPostsCanvas() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const AD = process.env.REACT_APP_API_AD;
  const MY_AD = process.env.REACT_APP_API_MY_AD;
  const [myAds, setMyAds] = useState([]);
  const [showEditAdForm, setShowEditAdForm] = useState(false);
  const [idToEdit, setIdToEdit] = useState(-1);

  useEffect(() => {
    refreshData();
    // setMyAds(fakeMyAds);
  }, []);

  useEffect(() => {
    if(showEditAdForm){
      document.getElementById("app-root").style.filter = 'blur(2px)';
    } else{
      document.getElementById("app-root").style.filter = 'blur(0px) grayscale(0%)';
    }
  }, [showEditAdForm]);

  const refreshData = () => {
    dataFetch(
      `${ROOT}${MY_AD}`,
      {method: 'GET'},
      (res) => {
        setMyAds(res);
      },
      (err) => {
        console.warn(err);
      }
    );
  };

  const dispatch = showGeneralNoti();
  const handleShowNoti = (msg, good) => {
    dispatch({action: "add", body: {msg: msg, good: good}});
  };

  const handleCallbackEdit = (id) => {
    setIdToEdit(id);
    setShowEditAdForm(true);
  };

  const handleCallbackDelete = (id) => {
    let temp = new FormData();
    temp.set('id', id);
    // for (let pair of temp.entries()) {
    //   console.log('inside temp form:', pair[0], pair[1])
    // }
    dataFetch(
      `${ROOT}${AD}?action=delete`,
      {
        method: 'POST',
        body: temp
      },
      (res) => {
        handleShowNoti('Ad deletion success', 1);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (err) => {
        console.warn(err);
        handleShowNoti('Ad deletion failure', -1);
      }
    );
  };

  const handleEditSubmit = (f) => {
    f.set('id', idToEdit);
    ['price', 'comment'].forEach(identifier => {
      let temp = null;
      if (!f.get(identifier) || f.get(identifier).length===0) {
        temp = myAds.filter(ad=>ad.id===idToEdit)[0][identifier];
        f.set(identifier, temp);
      }
    });
    dataFetch(
      `${ROOT}${AD}?action=update`,
      {
        method: 'POST',
        body: f
      },
      (res)=>{
        handleShowNoti('Ad Edit Success', 1);
        setShowEditAdForm(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (err)=>{
        handleShowNoti('Ad Edit Failure', -1);
        console.warn(err);
      }
    );
  };

  return (
    <>
      <RoutePageTitleCard pageTitle={'My Advertisements'}/>
      <div className={'MyPostsCanvas card'}>
        <div className={'MyPostsCanvas-children'}>

          <div className={'row-MyPostsListing'}>
            <div className={'MyPostsListingContainer'}>
              {myAds.map(ad => {
                return (
                  <MyPostsCard
                    key={ad.id} adData={ad}
                    callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}
                  />
                );
              })}
            </div>
          </div>

          <Modal isOpen={showEditAdForm} style={customStyles}>
            <MyPostsEditFormMUI
              adDataOriginal={myAds.filter(ad=>ad.id===idToEdit)[0]}
              toClose={()=>setShowEditAdForm(false)} toSubmit={handleEditSubmit}
            />
          </Modal>
        </div>

      </div>
    </>

  );
}

export default MyPostsCanvas;






