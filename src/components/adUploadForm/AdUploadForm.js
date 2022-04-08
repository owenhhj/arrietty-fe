import './AdUploadForm.css'
import {useState} from "react";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from '../common/GeneralNotiProvider';
import AdUploadFormTextbook from "./AdUploadFormTextbook";
import AdUploadFormOther from "./AdUploadFormOther";

function AdUploadForm({
  adTypes=['', 'textbook', 'other'],
  callback
                                 }) {
  const [adType, setAdType] = useState(1);

  const dispatch = showGeneralNoti();
  const handleNoti = (msg, good) => {
    dispatch({action: "add", body: {msg: msg, good: good}});
  };

  const handleSwitchAdType = (idx) => {
    switch (idx) {
      case 0:
        callback(false);
        break;
      default:
        // directly switches between tb/other
        setAdType(Math.abs(adType-3));
    }
  };

  const handleSubmit = (f) => {
    // console.log('adUploadForm to submit with:')
    // for (let pair of f.entries()) {
    //   console.log('   ', pair[0], pair[1]);
    // }
    dataFetch(
      "https://localhost:8000/advertisement?action=update",
      {
        method: 'POST',
        body: f
      },
      (res)=>{
        console.log('parent form res:', res);
        handleNoti('Ad Upload Success', true);
        handleSwitchAdType(0);
      },
      (err)=>{
        console.log('parent form res:', err);
        handleNoti('Ad Upload Failure', false);
      }
    );
  }

  return (
    <>
      {adType===1 && <AdUploadFormTextbook adType={adTypes[adType]} toSwitchAdType={handleSwitchAdType} toSubmit={handleSubmit}/>}
      {adType===2 && <AdUploadFormOther adType={adTypes[adType]} toSwitchAdType={handleSwitchAdType} toSubmit={handleSubmit}/>}
    </>
  );
}

export default AdUploadForm;















