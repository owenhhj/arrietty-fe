import React, {useState, useEffect} from "react";
import Button from "../common/Button";
import TagListing from "./TagListing";
import {dataFetch} from "../common/common";


export default function TabContent({tabType}) {



    // constants
    const courseTagFormTemplate = {
        id: null,
        courseCode: "",
        courseName: "",
        subject: ""
    };
    const textbookTagFormTemplate = {
        id:null,
        title: "",
        isbn:"",
        author: "",
        publisher: "",
        edition:"",
        originalPrice: 0,
        courseId: null
    };
    const otherTagFormTemplate = {
        id: null,
        name:""
    };

    // states
    const [addNew, setAddNew] = useState(true);
    const [allCourseTags, setAllCourseTags] = useState([]);
    const [allTextbookTags, setAllTextbookTags] = useState([]);
    const [allOtherTags, setAllOtherTags] = useState([]);


    // handlers
    const handleClickAddNew = ()=>{
        setAddNew(!addNew);
    };

    const getButtonName = ()=>{
        if(tabType==="course"){
            return "course"
        }

        if (tabType === "textbook"){
            return "textbook"
        }
        return "general tag";
    };

    const getTemplate = ()=>{
        if(tabType==="course"){
            return courseTagFormTemplate;
        }

        if (tabType === "textbook"){
            return textbookTagFormTemplate;
        }
        return  otherTagFormTemplate;
    };

    const addNewTagForm = ()=>{
        return (
            <TagListing tagInfo={getTemplate()} tagType={tabType}  callback={handleChildTagOperation} createNewTag={true} allCourseTags={allCourseTags}/>
        );
    };

    // get all listings
    const getTagListings = ()=>{
        let ret = [];
        if(tabType==="course"){
            allCourseTags.forEach(
                (tag)=>{
                    ret.push(
                        <TagListing key={`courseId:${tag["id"]}`} tagData={tag} tagType={"course"}  callback={handleChildTagOperation} createNewTag={false} />
                    );
                }
            );
        }
        else if (tabType === "textbook"){
            allTextbookTags.forEach(
                (tag)=>{
                    ret.push(
                        <TagListing key={`textbookId:${tag["id"]}`} tagData={tag} tagType={"textbook"}  callback={handleChildTagOperation} createNewTag={false} allCourseTags={allCourseTags}/>
                    );
                }
            );
        }
        else {
            allOtherTags.forEach(
                (tag)=>{
                    ret.push(
                        <TagListing key={`otherTagId:${tag["id"]}`} tagData={tag} tagType={"otherTag"}  callback={handleChildTagOperation} createNewTag={false}/>
                    );
                }
            );
        }

        return ret;
    }

    const handleChildTagOperation = (action,tagInfo)=>{
        if(action==="insert"){
            let newTags = [];
            if(tabType==="course"){
                newTags = [...allCourseTags, tagInfo];
                newTags.sort((o1, o2)=>o1["courseCode"].localeCompare(o2["courseCode"]));
                setAllCourseTags(newTags);
            }
            else if (tabType==="textbook"){
                newTags = [...allTextbookTags, tagInfo];
                newTags.sort((o1, o2)=>o1["title"].localeCompare(o2["title"]));
                setAllTextbookTags(newTags);
            }
            else{
                newTags = [...allOtherTags, tagInfo];
                newTags.sort((o1, o2)=>o1["name"].localeCompare(o2["name"]));
                setAllOtherTags(newTags);
            }
            setAddNew(true);
        }
        else if (action==="delete"){
            let newTags = [];
            if(tabType==="course"){
                allCourseTags.forEach(
                    (tag)=>{
                        if(tag["id"]!==tagInfo["id"]){
                            newTags.push(tag);
                        }
                    }
                );
                setAllCourseTags(newTags);
            }
            else if(tabType==="textbook"){
                allTextbookTags.forEach(
                    (tag)=>{
                        if(tag["id"]!==tagInfo["id"]){
                            newTags.push(tag);
                        }
                    }
                );
                setAllTextbookTags(newTags);
            }
            else if(tabType==="otherTag"){
                allOtherTags.forEach(
                    (tag)=>{
                        if(tag["id"]!==tagInfo["id"]){
                            newTags.push(tag);
                        }
                    }
                );
                setAllOtherTags(newTags);
            }
        }
        else if (action==="cancel"){
            setAddNew(true);
        }
    };

    useEffect(
         ()=>{
             // load all initial tag data when component mounts
             let url = "https://localhost:8000/course?id=";
             let metaData = {
                 method: 'GET'
             }
             dataFetch(url, metaData, setAllCourseTags, null);

             url = "https://localhost:8000/textbook?id=";
             dataFetch(url, metaData, setAllTextbookTags, null);

             url = "https://localhost:8000/otherTag?id=";
             dataFetch(url, metaData, setAllOtherTags, null);

        },[]
    );


    return (
        <div className="tab-content">
            {addNew && <Button buttonStyle="btn--primary" buttonSize="btn--small" text={`+ Add a new ${getButtonName()}`} onClick={handleClickAddNew}/>}
            {!addNew && addNewTagForm()}
            {getTagListings()}
        </div>
    );
}