import './AdvertisementUploadForm.css'
import {useEffect, useState} from "react";
import AdTypeSwitch from "./AdTypeSwitch";
import TextbookSearch from "./TextbookSearch";
import Input from "../common/Input";
import Button from "../common/Button";
import AlertablePrompt from "./AlertablePrompt";
import {dataFetch} from "../common/common";

function AdvertisementUploadForm(){

    const [adType, setAdType] = useState("textbook");
    const [textbookData, setTextbookData] = useState([]);
    const [textbookInputAlerted, setTextbookInputAlerted] = useState(false);
    const [pricingInputAlerted, setPricingInputAlerted] = useState(false);
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
    }, [])


    const handleAdTypeChange = (state)=>{
        setAdType(state);
        formData = new FormData();
    }

    const handleInputChange = (identifier, value)=>{
        if(identifier==="tagId"){
            setTextbookInputAlerted(false);
        }
        else if (identifier==="price"){
            setPricingInputAlerted(false);
        }

        formData.set(identifier,value);
    }

    const handlePledgeClicked = (event)=>{
        setPledgeInputAlerted(false);
        pledgeTicked = event.target.checked;
    }

    const isValidPrice = (price)=>{
        //TODO: check the validity of price
        return true;
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

        if(!pledgeTicked){
            setPledgeInputAlerted(true);
            okToSubmit = false;
        }

        if (okToSubmit){
            //TODO: form submission
        }

    }



    return (
        <div className={"advertisement-upload-form card"}>
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
                </div>
                {adType==="textbook" &&
                    <div className={"form-row textbook-search"}>
                        <AlertablePrompt promptText={"Select a textbook"} required={true} alertText={"Please select a textbook"} alerted={textbookInputAlerted}/>
                        <TextbookSearch textbookData={textbookData} onChange={handleInputChange} />
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