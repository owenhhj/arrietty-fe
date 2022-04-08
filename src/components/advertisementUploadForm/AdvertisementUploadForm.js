import './AdvertisementUploadForm.css'
import {useState} from "react";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from '../common/GeneralNotiProvider';

import AdvertisementUploadFormTextbook from "./AdvertisementUploadFormTextbook";
import AdvertisementUploadFormOther from "./AdvertisementUploadFormOther";
function AdvertisementUploadForm({
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
        console.log('switching adType', idx);
        // todo directly switches between tb/other
        setAdType(Math.abs(adType-3));
    }
  };

  const handleSubmit = (f) => {
    console.log('parent form receiving:')
    for (let pair of f.entries()) {
      console.log('>>>', pair[0], pair[1]);
    }
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
      {adType===1 && <AdvertisementUploadFormTextbook adType={adTypes[adType]} toSwitchAdType={handleSwitchAdType} toSubmit={handleSubmit}/>}
      {adType===2 && <AdvertisementUploadFormOther    adType={adTypes[adType]} toSwitchAdType={handleSwitchAdType} toSubmit={handleSubmit}/>}
    </>
  );
}

export default AdvertisementUploadForm;









// import AdTypeSwitch from "./AdTypeSwitch";
// import TextbookSearch from "./TextbookSearch";
// import Input from "../common/Input";
// import Button from "../common/Button";
// import AlertablePrompt from "./AlertablePrompt";
// import NewAdDragDrop from "./NewAdDragDrop";

// function AdvertisementUploadForm({
//   callback
//                                  }){
//   const [adType, setAdType] = useState("textbook");
//   const [textbookData, setTextbookData] = useState([]);
//   const [otherTagData, setOtherTagData] = useState([]);
//   const [courseData, setCourseData] = useState([]);
//   const [textbookInputAlerted, setTextbookInputAlerted] = useState(false);
//   const [pricingInputAlerted, setPricingInputAlerted] = useState(false);
//   const [commentInputAlerted, setCommentInputAlerted] = useState(false);
//   const [pledgeInputAlerted, setPledgeInputAlerted] = useState(false);
//   console.log('line before `let new FormData()`')
//   let formData = new FormData();
//
//   let pledgeTicked = false;
//
//   useEffect(() => {
//     dataFetch(
//       "https://localhost:8000/textbook?id=",
//       {method:"GET"},
//       setTextbookData,
//       null
//     );
//     dataFetch(
//       "https://localhost:8000/otherTag?id=",
//       {method:"GET"},
//       setOtherTagData,
//       null
//     );
//     dataFetch(
//       "https://localhost:8000/course?id=",
//       {method:"GET"},
//       setCourseData,
//       null
//     );
//   }, [])
//
//   const dispatch = showGeneralNoti();
//   const handleNoti = (msg, good) => {
//     // e.preventDefault();
//     dispatch({action: "add", body: {msg: msg, good: good}});
//   }
//
//   const getOtherTagOptions = (data)=>{
//     let ret = [];
//     for (let i=0; i<data.length; i++){
//       ret.push(
//         {
//           name: data[i].name,
//           value: data[i].id
//         }
//       );
//     }
//     return ret;
//   }
//
//   // const clearInputRecur = (elem) => {
//   //   elem.getElementsByTagName('input').forEach(ip => {ip.value=null;})
//   //   elem.getChildren().forEach(ch => {clearInputRecur(ch);});
//   //
//   //   // formData.set('tagId', null);
//   //   // formData.set('isTextbook', switchTo==='textbook' ? 'true' : 'false');
//   // }
//
//   // fixme why not work? because this is callback?
//   const handleAdTypeChange = (state) => {
//     console.log('handleAdTypeChange called:')
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1])
//     }
//     setAdType(state);
//   }
//
//   const handleInputChange = (identifier, value)=>{
//     if(identifier==="tagId"){
//       setTextbookInputAlerted(false);
//     } else if (identifier==="price"){
//       setPricingInputAlerted(false);
//     } else if (identifier==="comment"){
//       setCommentInputAlerted(false);
//     }
//     if (identifier==='images') {
//       // if use set(), will turn images[] into a string
//       formData.set('images', null);
//       value.forEach((f) => {
//         formData.append('images', f);
//       });
//       return;
//     }
//     formData.set(identifier,value);
//   }
//
//   const handlePledgeClicked = (event)=>{
//     setPledgeInputAlerted(false);
//     pledgeTicked = event.target.checked;
//   }
//
//   const isValidComment = (comment) => {
//     return 0 < comment.length && comment.length <= 150;
//   }
//
//   const isValidPrice = (price)=>{
//     //TODO: check the validity of price --> need to be smaller than original?
//     let ans = /^[0-9]+$/.test(price);
//     ans = ans && Number(price) > 0;
//     return ans;
//   }
//
//   const handleFormSubmit = ()=>{
//     // let okToSubmit = true;
//     // if(adType==="textbook" && (!formData.has("tagId") || formData.get("tagId")==null)){
//     //   setTextbookInputAlerted(true);
//     //   okToSubmit = false;
//     // }
//     //
//     // if(!formData.has("price") || !isValidPrice(formData.get("price"))){
//     //   setPricingInputAlerted(true);
//     //   okToSubmit = false;
//     // }
//     //
//     // if(!formData.has("comment") || !isValidComment(formData.get("comment"))){
//     //   setCommentInputAlerted(true);
//     //   okToSubmit = false;
//     // }
//     //
//     // if(!pledgeTicked){
//     //   setPledgeInputAlerted(true);
//     //   okToSubmit = false;
//     // }
//
//     // fixme some input alerted --> change it --> now all input alerted --> cannot submit
//     if (true){
//       // console.log('AdUploadForm to submit:', formData);
//       formData.set("isTextbook",adType==="textbook"?"true":"false");
//       console.log('formData sending:')
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1])
//       }
//       dataFetch(
//         "https://localhost:8000/advertisement?action=update",
//         {
//           method: 'POST',
//           body: formData
//         },
//         (res)=>{
//           console.log('AdUploadForm res:', res);
//           handleNoti('Ad Upload Success', true);
//           callback(false);
//         },
//         (err)=>{
//           console.log('AdUploadForm res:', err);
//           handleNoti('Ad Upload Failure', false);
//         }
//       )
//     }
//   }
//
//   const getTextbookData = ()=>{
//     let ret = textbookData;
//     let courseMap = new Map();
//     for(let i=0; i<courseData.length; i++){
//       courseMap.set(courseData[i].id, courseData[i].courseCode);
//     }
//     for(let j=0; j<ret.length; j++){
//       ret[j].relatedCourse = courseMap.get(ret[j].courseId);
//     }
//
//     return ret;
//   }
//
//   return (
//     <div id={'adUploadComp'} className={"advertisement-upload-form card"}>
//       <div className={"advertisement-upload-form-container"}>
//         <div className={"form-row"}>
//           <p className={"form-title"}>Create a New Advertisement</p>
//         </div>
//         <div className={'form-row'}>
//           <p className={'form-prompt'}>Ad Title</p>
//           <Input type={'text'} identifier={'adTitle'} onChange={handleInputChange}/>
//         </div>
//         <div className={"form-row"}>
//           <p className={"form-prompt"}>Ad type</p>
//           <AdTypeSwitch callback={handleAdTypeChange}/>
//         </div>
//         <div className={"form-row"}>
//           <p className={"form-prompt"}>Upload photos</p>
//           <NewAdDragDrop identifier={"images"} onChange={handleInputChange}/>
//         </div>
//
//         {/*{adType==="textbook" &&*/}
//         {/*  <div className={"form-row textbook-search"}>*/}
//         {/*    <AlertablePrompt promptText={"Select a textbook"} required={true} alertText={"Please select a textbook"} alerted={textbookInputAlerted}/>*/}
//         {/*    <TextbookSearch textbookData={getTextbookData()} onChange={handleInputChange} />*/}
//         {/*  </div>*/}
//         {/*}*/}
//         {/*{adType==="other" &&*/}
//         {/*  <div className={"form-row"}>*/}
//         {/*    <p className={"form-prompt"}>Select a tag if applicable</p>*/}
//         {/*    <Input type={"select-search"} identifier={"tagId"} options={getOtherTagOptions(otherTagData)} placeholder={"select a tag"} onChange={handleInputChange} />*/}
//         {/*  </div>*/}
//         {/*}*/}
//
//         <div className={"form-row"}>
//           <AlertablePrompt promptText={"Pricing"} required={true} alertText={"Please enter a valid price"} alerted={pricingInputAlerted} />
//           <div className={"pricing-row"}>
//             <Input type={"price"} identifier={"price"} inputSize={"large"} onChange={handleInputChange}/>
//             <p>RMB</p>
//           </div>
//         </div>
//         <div className={"form-row comment"}>
//           <AlertablePrompt alertText={"Comment must be between 1 and 150 characters"} alerted={commentInputAlerted}/>
//           <p className={"form-prompt"}>Additional comment</p>
//           <Input type={"text"} identifier={"comment"} inputSize={"extra-large"} onChange={handleInputChange}/>
//
//         </div>
//         <AlertablePrompt alertText={"Please sign the pledge"} alerted={pledgeInputAlerted}/>
//         <div className={"pledge"}>
//           <input type={"checkbox"} onChange={handlePledgeClicked}/>
//           <p>I confirm that the ad information is accurate</p>
//         </div>
//         <div className={"button-row"}>
//           <Button text={"Submit"} buttonStyle={"btn--primary"} buttonSize={"btn--large"} onClick={handleFormSubmit}/>
//         </div>
//
//
//       </div>
//
//       <svg className={"cancel-btn"} onClick={()=>{callback(false)}} width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
//         <path d="m374.5 280 180.25-180.25c7-7 7-17.5 0-24.5s-17.5-7-24.5 0l-180.25 180.25-180.25-180.25c-7-7-17.5-7-24.5 0s-7 17.5 0 24.5l180.25 180.25-180.25 180.25c-7 7-7 17.5 0 24.5 3.5 3.5 7 5.25 12.25 5.25s8.75-1.75 12.25-5.25l180.25-180.25 180.25 180.25c3.5 3.5 8.75 5.25 12.25 5.25s8.75-1.75 12.25-5.25c7-7 7-17.5 0-24.5z"/>
//       </svg>
//     </div>
//   );
// }
//
// export default AdvertisementUploadForm;












