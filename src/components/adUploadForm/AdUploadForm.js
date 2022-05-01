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
    // for (let pair of f.entries()) {
    //   console.log('>>>>>>>', pair[0], pair[1]);
    // }
    dataFetch(
      `${ROOT}${AD}?action=add`,
      {
        method: 'POST',
        body: f
      },
      (res) => {
        handleNoti('Ad Upload Success', true);
        handleSwitchAdType(0);
      },
      (err) => {
        console.warn(err);
        handleNoti('Ad Upload Failure', false);
      }
    );
  }

  return (
    <>
      {adType===1 && <AdUploadFormMUITextbook toSwitchAdType={handleSwitchAdType} toSubmit={handleSubmit}/>}
      {adType===2 && <AdUploadFormMUIOther toSwitchAdType={handleSwitchAdType} toSubmit={handleSubmit}/>}
    </>
  );
}

export default AdUploadForm;















