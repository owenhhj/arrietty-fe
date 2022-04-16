import './MyPostsCanvas.css';
import RoutePageTitleCard from "../common/RoutePageTitleCard";
import MyPostsCard from "./MyPostsCard";
import MyPostsEditForm from "./MyPostsEditForm";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useEffect, useState} from "react";
import Modal from "react-modal";

const fakeAd = {
  id: 111, adType: 'textbook', adTitle: 'Tttthis is a fake title for an ad but this is very long', price: '1233425',
  comment: 'This is a fake comment for and ad but this is very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long very long',
  createTime: "Apr 4, 2022, 12:00:00 AM", numberOfTaps: 99, imageIds: "./default_cover.jpg"
}

const fakeAd2 = {
  id: 222, adType: 'textbook', adTitle: 'this is a fake title', price: '123',
  comment: 'This is a fake comment for and ad bery long very long very long very long very long',
  createTime: "Apr 4, 2022, 12:00:00 AM", numberOfTaps: 64, imageIds: "./default_cover.jpg"
}

// todo refactor into common.js
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

function MyPostsCanvas() {
  const ROOT = 'https://localhost:8000/';
  const [myAds, setMyAds] = useState([]);
  const defaultEditState = {show: false, id: -1};
  const [showEditAdForm, setShowEditAdForm] = useState(false);
  const [idToEdit, setIdToEdit] = useState(-1);

  useEffect(() => {
    setMyAds([fakeAd, fakeAd2]);  // fixme remove this
    refreshData();
  }, []);

  useEffect(() => {
    if(showEditAdForm){
      document.getElementById("app-root").style.filter = 'blur(2px)';
    } else{
      document.getElementById("app-root").style.filter = 'blur(0px) grayscale(0%)';
    }
  }, [showEditAdForm]);

  const refreshData = () => {
    console.log('refreshData called')
    dataFetch(
      `${ROOT}myAdvertisement`,
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
  }

  const handleCallbackEdit = (id) => {
    setIdToEdit(id);
    setShowEditAdForm(true);
  }

  const handleCallbackDelete = (id) => {
    let temp = new FormData();
    temp.set('id', id);
    for (let pair of temp.entries()) {
      console.log('inside temp form:', pair[0], pair[1])
    }
    dataFetch(
      `${ROOT}advertisement?action=delete`,
      {
        method: 'POST',
        body: temp
      },
      (res) => {
        handleShowNoti('Ad deletion success', true);
        refreshData();
      },
      (err) => {
        console.warn(err)
        handleShowNoti('Ad deletion failure', false);
      }
    )
  }

  const handleEditSubmit = (f) => {
    f.set('id', idToEdit);
    ['price', 'comment'].forEach(identifier => {
      let temp = null;
      if (!f.get(identifier) || f.get(identifier).length===0) {
        temp = myAds.filter(ad=>ad.id===idToEdit)[0][identifier];
        f.set(identifier, temp);
      }
    });
    // console.log('MyPostsCanvas to submit edit form with:')
    // for (let pair of f.entries()) {
    //   console.log('   ', pair[0], pair[1]);
    // }

    dataFetch(
      `${ROOT}advertisement?action=update`,
      {
        method: 'POST',
        body: f
      },
      (res)=>{
        handleShowNoti('Ad Edit Success', true);
        setShowEditAdForm(false);
      },
      (err)=>{
        handleShowNoti('Ad Edit Failure', false);
        console.warn(err);
      }
    );
  };

  return (
    <div className={'MyPostsCanvas card'}>
      <div className={'MyPostsCanvas-children'}>
        <div className={'row-title-card non-text'}>
          {/*<RoutePageTitleCard pageTitle={'My Advertisements'}/>*/}
          <p>My Advertisements</p>
        </div>

        <div className={'row-MyPostsListing'}>
          <div className={'MyPostsListingContainer'}>
            {myAds.map(ad => {
              return (
                <MyPostsCard key={ad.id} adData={ad} callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>
              );
            })}

            {/*<MyPostsCard adData={fakeAd2} callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
            {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
            {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
            {/*<MyPostsCard callbackEdit={handleCallbackEdit} callbackDelete={handleCallbackDelete}/>*/}
          </div>
        </div>

        <Modal isOpen={showEditAdForm} style={customStyles}>
          <MyPostsEditForm adDataOriginal={myAds.filter(ad=>ad.id===idToEdit)[0]} toClose={()=>setShowEditAdForm(false)} toSubmit={handleEditSubmit}/>
        </Modal>
      </div>

    </div>
  );
}

export default MyPostsCanvas;






