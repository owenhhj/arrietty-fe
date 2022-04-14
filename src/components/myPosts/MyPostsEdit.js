import '../adUploadForm/AdUploadForm.css';
import AdUploadFormTextbook from "../adUploadForm/AdUploadFormTextbook";
import Input from "../common/Input";
import AdTypeSwitch from "../adUploadForm/AdTypeSwitch";
import AdUploadFormDragDrop from "../adUploadForm/AdUploadFormDragDrop";
import AlertablePrompt from "../adUploadForm/AlertablePrompt";
import TextbookSearch from "../adUploadForm/TextbookSearch";
import Button from "../common/Button";

function MyPostsEdit({
  adDataOriginal={},
  toClose=null,
  toSubmit=null
                     }) {
  let formData = new FormData();
  console.log('MyPostsEdit adDataOriginal:', adDataOriginal)

  const handleInputChange = (identifier, value) => {
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

  const handleFormSubmit = () => {

  };


  return (
    // todo copy from AdUploadFormTextbook, change the tag/textbookInfo row to only display
    <div id={'adUploadComp'} className={"advertisement-upload-form card"}>
      <div className={"advertisement-upload-form-container"}>
        <div className={"form-row"}>
          <p className={"form-title"}>Edit Advertisement</p>
        </div>
        <div className={'form-row'}>
          <p className={'form-prompt'}>Ad Title</p>
          <Input type={'text'} identifier={'adTitle'} placeholder={adDataOriginal.adTitle} onChange={handleInputChange}/>
        </div>
        <div className={"form-row"}>
          <p className={"form-prompt"}>Ad type</p>
          {/*todo show only this tag*/}
          {/*<AdTypeSwitch adType={adType} callback={toSwitchAdType}/>*/}
        </div>
        <div className={"form-row"}>
          <p className={"form-prompt"}>Upload photos</p>
          <AdUploadFormDragDrop identifier={"images"} onChange={handleInputChange}/>
        </div>


        <div className={"form-row textbook-search"}>
          {/*todo show only tag/textbookInfo*/}
          {/*<AlertablePrompt promptText={"Select a textbook"} required={true} alertText={"Please select a textbook"} alerted={textbookInputAlerted}/>*/}
          {/*<TextbookSearch textbookData={getTextbookData()} onChange={handleInputChange} />*/}
        </div>


        <div className={"form-row"}>
          {/*<AlertablePrompt promptText={"Pricing"} required={true} alertText={"Please enter a valid price"} alerted={pricingInputAlerted} />*/}
          <div className={"pricing-row"}>
            <Input type={"price"} identifier={"price"} inputSize={"large"} placeholder={adDataOriginal.price} onChange={handleInputChange}/>
            <p>RMB</p>
          </div>
        </div>
        <div className={"form-row comment"}>
          {/*<AlertablePrompt alertText={"Comment must be between 1 and 150 characters"} alerted={commentInputAlerted}/>*/}
          <p className={"form-prompt"}>Additional comment</p>
          <Input type={"text"} identifier={"comment"} inputSize={"extra-large"} placeholder={adDataOriginal.comment} onChange={handleInputChange}/>

        </div>
        {/*<AlertablePrompt alertText={"Please sign the pledge"} alerted={pledgeInputAlerted}/>*/}
        {/*<div className={"pledge"}>*/}
        {/*  /!*<input type={"checkbox"} onChange={handlePledgeClicked}/>*!/*/}
        {/*  <p>I confirm that the ad information is accurate</p>*/}
        {/*</div>*/}
        <div className={"button-row"}>
          <Button text={"Submit"} buttonStyle={"btn--primary"} buttonSize={"btn--large"} onClick={handleFormSubmit}/>
        </div>


      </div>

      <svg className={"cancel-btn"} onClick={()=>{toClose(0)}} width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
        <path d="m374.5 280 180.25-180.25c7-7 7-17.5 0-24.5s-17.5-7-24.5 0l-180.25 180.25-180.25-180.25c-7-7-17.5-7-24.5 0s-7 17.5 0 24.5l180.25 180.25-180.25 180.25c-7 7-7 17.5 0 24.5 3.5 3.5 7 5.25 12.25 5.25s8.75-1.75 12.25-5.25l180.25-180.25 180.25 180.25c3.5 3.5 8.75 5.25 12.25 5.25s8.75-1.75 12.25-5.25c7-7 7-17.5 0-24.5z"/>
      </svg>
    </div>
  );
}

export default MyPostsEdit;




