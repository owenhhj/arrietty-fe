import React, {useState} from "react";
import './AdminTagInputWidget.css';
import TabContent from "./TabContent";



export default function AdminTagInputWidget(){

    const [tabType, setTabType] = useState("course");


    const handleTabClick = (event)=>{
        const tabVal = event.target.innerText;

        if(tabVal==="Course"){
            setTabType("course");
        }
        else if(tabVal==="Textbook"){
            setTabType("textbook");
        }
        else if(tabVal==="Other tag"){
            setTabType("otherTag");
        }
    }

    return (
        <div className="card admin-tag-input-widget">
            <div className="admin-tag-input-widget-container">
                <div className="tabs">
                    <div className={tabType==="course"?"tab-clicked":"tab"} onClick={handleTabClick}> Course </div>
                    <div className={tabType==="textbook"?"tab-clicked":"tab"} onClick={handleTabClick}> Textbook </div>
                    <div className={tabType==="otherTag"?"tab-clicked":"tab"} onClick={handleTabClick}> Other tag </div>
                </div>
                <TabContent tabType={tabType}/>
            </div>
        </div>

    );








}