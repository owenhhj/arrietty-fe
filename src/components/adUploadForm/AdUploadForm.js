import './AdUploadForm.css'
import {useState} from "react";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from '../common/GeneralNotiProvider';
import AdUploadFormMUITextbook from "./AdUploadFormMUITextbook";
import AdUploadFormMUIOther from "./AdUploadFormMUIOther";

function AdUploadForm({
  adTypes=['', 'textbook', 'other'],
  callback
                                 }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const AD = process.env.REACT_APP_API_AD;
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
      `${ROOT}${AD}?action=add`,
      {
        method: 'POST',
        body: f
      },
      (res) => {
        handleNoti('Ad Upload Success', 1);
        handleSwitchAdType(0);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (err) => {
        if (Number(err.responseStatus.errorCode) === 4002) {
          handleNoti('You can upload no more than 5 ads', 0);
        } else {
          handleNoti('Ad Upload Failure', -1);
        }
      }
    );
  };

  return (
    <>
      {adType===1 && <AdUploadFormMUITextbook toSwitchAdType={handleSwitchAdType} toSubmit={handleSubmit}/>}
      {adType===2 && <AdUploadFormMUIOther toSwitchAdType={handleSwitchAdType} toSubmit={handleSubmit}/>}
    </>
  );
}

export default AdUploadForm;















