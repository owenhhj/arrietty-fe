import './AdvertisementUploadForm.css'
import {useEffect, useState} from "react";
import AdTypeSwitch from "./AdTypeSwitch";
import TextbookSearch from "./TextbookSearch";
import Input from "../common/Input";
import Button from "../common/Button";
import GeneralNoti from "../common/GeneralNoti";
import AlertablePrompt from "./AlertablePrompt";
import NewAdDragDrop from "./NewAdDragDrop";
import {dataFetch} from "../common/common";


function AdvertisementUploadForm(){

    const [adType, setAdType] = useState("textbook");
    const [textbookData, setTextbookData] = useState([]);
    const [otherTagData, setOtherTagData] = useState([]);
    const [textbookInputAlerted, setTextbookInputAlerted] = useState(false);
    const [pricingInputAlerted, setPricingInputAlerted] = useState(false);
    const [commentInputAlerted, setCommentInputAlerted] = useState(false);
    const [pledgeInputAlerted, setPledgeInputAlerted] = useState(false);
    let formData = new FormData();
    let pledgeTicked = false;

    useEffect(() => {
        dataFetch(
            "https://localhost:8000/textbook?id=",
            {method:"GET"},
            setTextbookData,
            null
        );
        dataFetch(
            "https://localhost:8000/otherTag?id=",
            {method:"GET"},
            setOtherTagData,
            null
        );
    }, [])


    const getOtherTagOptions = (data)=>{
        let ret = [];
        for (let i=0; i<data.length; i++){
            ret.push(
                {
                    name: data.name,
                    value: data.id
                }
            );
        }
        return ret;
    }


    const handleAdTypeChange = (state)=>{
        setAdType(state);
        formData = new FormData();
    }

    const handleInputChange = (identifier, value)=>{
        if(identifier==="tagId"){
            setTextbookInputAlerted(false);
        } else if (identifier==="price"){
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
    }

    const handlePledgeClicked = (event)=>{
        setPledgeInputAlerted(false);
        pledgeTicked = event.target.checked;
    }

    const isValidComment = (comment) => {
        return 0 < comment.length && comment.length <= 150;
    }

    const isValidPrice = (price)=>{
        //TODO: check the validity of price --> need to be smaller than original?
        let ans = /^[0-9]+$/.test(price);
        ans = ans && Number(price) > 0;
        return ans;
    }


    const handleFormSubmit = ()=>{
        let okToSubmit = true;
        if(adType==="textbook" && (!formData.has("tagId") || formData.get("tagId")==null)){
            setTextbookInputAlerted(true);
            okToSubmit = false;
        }

        if(!formData.has("price") || !isValidPrice(formData.get("price"))){
            setPricingInputAlerted(true);
            okToSubmit = false;
        }

        if(!formData.has("comment") || !isValidComment(formData.get("comment"))){
            setCommentInputAlerted(true);
            okToSubmit = false;
        }

        if(!pledgeTicked){
            setPledgeInputAlerted(true);
            okToSubmit = false;
        }

        // TODO buggy okToSubmit: some input alerted --> change it --> now all input alerted --> cannot submit
        if (true){
            // TODO success handler
            console.log('formData to submit is', formData.getAll('images'));
            formData.set("isTextbook",adType==="textbook"?"true":"false");
            dataFetch(
              "https://localhost:8000/advertisement?action=update",
              {
                  method: 'POST',
                  body: formData
              },
              null,
              null
            )
        }

    }

    const [showNoti, setShowNoti] = useState([true, 'msg to display eawijrgorsdl kangoisjro eawijrgorsdl kangoisjro']);
    const toggleNoti = (e) => {
        e.preventDefault();
        setShowNoti([false, '']);
    }

    return (
        <div className={"advertisement-upload-form card"}>

            {/*TODO test GeneralNoti here*/}
            {/*{showNoti[0] && <GeneralNoti onClick={toggleNoti}/>}*/}

            <div className={"advertisement-upload-form-container"}>
                <div className={"form-row"}>
                    <p className={"form-title"}>Create a New Advertisement</p>
                </div>
                <div className={"form-row"}>
                    <p className={"form-prompt"}>Ad type</p>
                    <AdTypeSwitch callback={handleAdTypeChange}/>
                </div>
                <div className={"form-row"}>
                    <p className={"form-prompt"}>Upload photos</p>
                    <NewAdDragDrop identifier={"images"} onChange={handleInputChange}/>
                </div>
                {adType==="textbook" &&
                    <div className={"form-row textbook-search"}>
                        <AlertablePrompt promptText={"Select a textbook"} required={true} alertText={"Please select a textbook"} alerted={textbookInputAlerted}/>
                        <TextbookSearch textbookData={textbookData} onChange={handleInputChange} />
                    </div>
                }
                {adType==="other" &&
                    <div className={"form-row"}>
                        <p className={"form-prompt"}>Select a tag if applicable</p>
                        <Input type={"select-search"} identifier={"tagId"} options={getOtherTagOptions(otherTagData)} placeholder={"select a tag"} onChange={handleInputChange} />
                    </div>
                }
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

            <svg className={"cancel-btn"} width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                <path d="m374.5 280 180.25-180.25c7-7 7-17.5 0-24.5s-17.5-7-24.5 0l-180.25 180.25-180.25-180.25c-7-7-17.5-7-24.5 0s-7 17.5 0 24.5l180.25 180.25-180.25 180.25c-7 7-7 17.5 0 24.5 3.5 3.5 7 5.25 12.25 5.25s8.75-1.75 12.25-5.25l180.25-180.25 180.25 180.25c3.5 3.5 8.75 5.25 12.25 5.25s8.75-1.75 12.25-5.25c7-7 7-17.5 0-24.5z"/>
            </svg>
        </div>
    );
}

export default AdvertisementUploadForm;