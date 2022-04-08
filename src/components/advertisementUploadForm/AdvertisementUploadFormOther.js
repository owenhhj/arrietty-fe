import './AdvertisementUploadForm.css'
import {useEffect, useState} from "react";
import AdTypeSwitch from "./AdTypeSwitch";
import TextbookSearch from "./TextbookSearch";
import Input from "../common/Input";
import Button from "../common/Button";
import AlertablePrompt from "./AlertablePrompt";
import NewAdDragDrop from "./NewAdDragDrop";
import {dataFetch} from "../common/common";

function AdvertisementUploadFormOther({
  adType='other',
  toSwitchAdType,
  toSubmit
                                      }) {
  console.assert(adType==='other');

  const [otherTagData, setOtherTagData] = useState([]);
  const [pricingInputAlerted, setPricingInputAlerted] = useState(false);
  const [commentInputAlerted, setCommentInputAlerted] = useState(false);
  const [pledgeInputAlerted, setPledgeInputAlerted] = useState(false);
  let pledgeTicked = false;
  console.log('line before `let new FormData()`');
  let formData = new FormData();

  useEffect(() => {
    dataFetch(
      "https://localhost:8000/otherTag?id=",
      {method:"GET"},
      setOtherTagData,
      null
    );
  }, []);

  const getOtherTagOptions = (data)=>{
    let ret = [];
    for (let i=0; i<data.length; i++){
      ret.push(
        {
          name: data[i].name,
          value: data[i].id
        }
      );
    }
    return ret;
  };

  const handleInputChange = (identifier, value) => {
    if (identifier==="price"){
      setPricingInputAlerted(false);
    } else if (identifier==="comment"){
      setCommentInputAlerted(false);
    }
    if (identifier==='images') {
      // if use set(), will turn images[] into a string
      formData.set('images', null);
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
    formData.set('isTextbook', 'false');
    console.log('child form sending to parent comp:')
    for (let pair of formData.entries()) {
      console.log('>>>', pair[0], pair[1]);
    }
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
          <Input type={'text'} identifier={'adTitle'} onChange={handleInputChange}/>
        </div>
        <div className={"form-row"}>
          <p className={"form-prompt"}>Ad type</p>
          <AdTypeSwitch adType={adType} callback={toSwitchAdType}/>
        </div>
        <div className={"form-row"}>
          <p className={"form-prompt"}>Upload photos</p>
          <NewAdDragDrop identifier={"images"} onChange={handleInputChange}/>
        </div>


        <div className={"form-row"}>
          <p className={"form-prompt"}>Select a tag if applicable</p>
          <Input type={"select-search"} identifier={"tagId"} options={getOtherTagOptions(otherTagData)} placeholder={"select a tag"} onChange={handleInputChange} />
        </div>


        <div className={"form-row"}>
          <AlertablePrompt promptText={"Pricing"} required={true} alertText={"Please enter a valid price"} alerted={pricingInputAlerted} />
          <div className={"pricing-row"}>
            <Input type={"price"} identifier={"price"} inputSize={"large"} onChange={handleInputChange}/>
            <p>RMB</p>
          </div>
        </div>
        <div className={"form-row comment"}>
          <AlertablePrompt alertText={"Comment must be between 1 and 150 characters"} alerted={commentInputAlerted}/>
          <p className={"form-prompt"}>Additional comment</p>
          <Input type={"text"} identifier={"comment"} inputSize={"extra-large"} onChange={handleInputChange}/>

        </div>
        <AlertablePrompt alertText={"Please sign the pledge"} alerted={pledgeInputAlerted}/>
        <div className={"pledge"}>
          <input type={"checkbox"} onChange={handlePledgeClicked}/>
          <p>I confirm that the ad information is accurate</p>
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

export default AdvertisementUploadFormOther;





























