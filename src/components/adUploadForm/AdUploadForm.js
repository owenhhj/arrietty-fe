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
  const ROOT = 'https://localhost:8000/';
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
        setAdType(Math.abs(adType-3));  // directly switches between tb/other
    }
  };

  const handleSubmit = (f) => {
    dataFetch(
      `${ROOT}advertisement?action=update`,
      {
        method: 'POST',
        body: f
      },
      (res) => {
        handleNoti('Ad Upload Success', true);
        handleSwitchAdType(0);
      },
      (err) => {
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















