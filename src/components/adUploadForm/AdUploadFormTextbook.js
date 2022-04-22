import './AdUploadForm.css'
import {useEffect, useState} from "react";
import AdTypeSwitch from "./AdTypeSwitch";
import TextbookSearch from "./TextbookSearch";
import Input from "../common/Input";
import Button from "../common/Button";
import AlertablePrompt from "./AlertablePrompt";
import AdUploadFormDragDrop from "./AdUploadFormDragDrop";
import {dataFetch} from "../common/common";
import {MUITextField, MUINumber, MUICheckbox, MUITagSelect} from "../common/MUITextField";

function AdUploadFormTextbook({
  adType='textbook',
  toSwitchAdType=null,  // 0: close, 1: textbook, 2: other
  toSubmit=null
                                         }) {
  console.assert(adType==='textbook');

  const ROOT = 'https://localhost:8000/';
  const [textbookData, setTextbookData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [textbookInputAlerted, setTextbookInputAlerted] = useState(false);
  const [pricingInputAlerted, setPricingInputAlerted] = useState(false);
  const [commentInputAlerted, setCommentInputAlerted] = useState(false);
  const [pledgeInputAlerted, setPledgeInputAlerted] = useState(false);
  let pledgeTicked = false;
  let formData = new FormData();

  useEffect(() => {
    dataFetch(
      `${ROOT}textbook?id=`,
      {method:"GET"},
      setTextbookData,
      null
    );
    dataFetch(
      `${ROOT}textbook?id=`,
      {method:"GET"},
      setCourseData,
      null
    );
  }, []);

  const getTextbookData = () => {
    let ret = textbookData;
    let courseMap = new Map();
    for(let i=0; i<courseData.length; i++){
      courseMap.set(courseData[i].id, courseData[i].courseCode);
    }
    for(let j=0; j<ret.length; j++){
      ret[j].relatedCourse = courseMap.get(ret[j].courseId);
    }
    return ret;
  };

  // todo use state to track each input and then submit
  const handleInputChange = (identifier, value) => {
    if(identifier==="tagId"){
      setTextbookInputAlerted(false);
    } else if (identifier==="price"){
      setPricingInputAlerted(false);
    } else if (identifier==="comment"){
      setCommentInputAlerted(false);
    }
    if (identifier==='images') {
      formData.delete('images');
      value.forEach((f) => {
        formData.append('images', f);
      });
      return;
    }
    formData.set(identifier,value);
  };

  const handlePledgeClicked = (event) => {
    setPledgeInputAlerted(false);
    pledgeTicked = event.target.checked;
  };

  // todo validate input and call parent to submit
  const handleFormSubmit = () => {
    formData.set('isTextbook', 'true');
    toSubmit(formData);
  };

  return (
    <div id={'adUploadComp'} className={"advertisement-upload-form card"}>
      <div className={"advertisement-upload-form-container"}>
        <div className={"form-row"}>
          <p className={"form-title"}>Create a New Advertisement</p>
        </div>
        <div className={'form-row'}>
          <p className={'form-prompt'}>Ad Title</p>
          {/*<Input type={'text'} identifier={'adTitle'} onChange={handleInputChange}/>*/}
          {/* todo */}
          <MUITextField identifier={'adTitle'} onChange={handleInputChange}/>

        </div>
        <div className={"form-row"}>
          <p className={"form-prompt"}>Ad type</p>
          <AdTypeSwitch adType={adType} callback={toSwitchAdType}/>
        </div>
        <div className={"form-row"}>
          <p className={"form-prompt"}>Upload photos</p>
          <AdUploadFormDragDrop identifier={"images"} onChange={handleInputChange}/>
        </div>


        <div className={"form-row textbook-search"}>
          {/*<AlertablePrompt promptText={"Select a textbook"} required={true} alertText={"Please select a textbook"} alerted={textbookInputAlerted}/>*/}
          {/*<TextbookSearch textbookData={getTextbookData()} onChange={handleInputChange} />*/}
          <MUITagSelect options={['book1', 'book2', 'book3']}/>
        </div>


        <div className={"form-row"}>
          <AlertablePrompt promptText={"Pricing"} required={true} alertText={"Please enter a valid price"} alerted={pricingInputAlerted} />
          <div className={"pricing-row"}>
            {/*<Input type={"price"} identifier={"price"} inputSize={"large"} onChange={handleInputChange}/>*/}
            <MUINumber/>
            {/* todo pass in value */}
            {/*<p>RMB</p>*/}
          </div>
        </div>
        <div className={"form-row comment"}>
          <AlertablePrompt alertText={"Comment must be between 1 and 150 characters"} alerted={commentInputAlerted}/>
          <p className={"form-prompt"}>Additional comment</p>
          {/*<Input type={"text"} identifier={"comment"} inputSize={"extra-large"} onChange={handleInputChange}/>*/}
          <MUITextField size={'multiline'} identifier={'comment'} onChange={handleInputChange}/>

        </div>
        <AlertablePrompt alertText={"Please sign the pledge"} alerted={pledgeInputAlerted}/>
        <div className={"pledge"}>
          {/*<input type={"checkbox"} onChange={handlePledgeClicked}/>*/}
          {/*<p>I confirm that the ad information is accurate</p>*/}
          <MUICheckbox label={'I confirm that the ad information is accurate'}/>
        </div>
        <div className={"button-row"}>
          <Button text={"Submit"} buttonStyle={"btn--primary"} buttonSize={"btn--large"} onClick={handleFormSubmit}/>
        </div>


      </div>

      <svg className={"cancel-btn"} onClick={()=>{toSwitchAdType(0)}} width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
        <path d="m374.5 280 180.25-180.25c7-7 7-17.5 0-24.5s-17.5-7-24.5 0l-180.25 180.25-180.25-180.25c-7-7-17.5-7-24.5 0s-7 17.5 0 24.5l180.25 180.25-180.25 180.25c-7 7-7 17.5 0 24.5 3.5 3.5 7 5.25 12.25 5.25s8.75-1.75 12.25-5.25l180.25-180.25 180.25 180.25c3.5 3.5 8.75 5.25 12.25 5.25s8.75-1.75 12.25-5.25c7-7 7-17.5 0-24.5z"/>
      </svg>
    </div>
  );
}

export default AdUploadFormTextbook;















