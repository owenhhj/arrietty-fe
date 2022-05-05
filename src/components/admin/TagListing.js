import React, {useState} from "react";
import Button from "../common/Button";
import "./AdminTagInputWidget.css"
import Input from "../common/Input";
import {dataFetch} from "../common/common";

export default function TagListing(
    {
        tagData,
        tagType,
        callback,
        createNewTag,
        allCourseTags
    }
){
    let formData = {...tagData};

    const ROOT = process.env.REACT_APP_URL_ROOT;

    const [tagInfo, setTagInfo] = useState({...tagData});
    const [showForm, setShowForm] = useState(createNewTag);
    const [showTagInfoButtons, setShowTagInfoButtons] = useState(false);

    const getTagInfo = ()=>{
        if(tagType==="course"){
            return (
                <div className={"tag-info-texts"}>
                    <div className="col">
                        <div className="tag-info-text tag-info-text--big">{tagInfo.courseCode}</div>
                        <div className="tag-info-text tag-info-text--medium">{tagInfo.subject}</div>
                    </div>
                    <div className="col">
                        <div className="tag-info-text tag-info-text--small">{tagInfo.courseName}</div>
                    </div>
                </div>
            );
        }
        else if (tagType==="textbook"){
            let relatedCourse = getCourseById(tagInfo.courseId);
            return (
                <div className={"tag-info-texts"}>
                    <div className="col">
                        <div className="tag-info-text tag-info-text--big">{relatedCourse.courseCode}</div>
                        <div className="tag-info-text tag-info-text--medium">{relatedCourse.courseName}</div>
                    </div>
                    <div className="col">
                        <div className="tag-info-text tag-info-text--small">{tagInfo.title}</div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={"tag-info-texts"}>
                    <div className="col">
                        <div className="tag-info-text tag-info-text--big">{tagInfo.name}</div>
                    </div>
                </div>
            );
        }
    };

    const getTagForm = ()=>{
        if(tagType==="course"){
            return (
                <div className="tag-form-inputs">
                    <div className="col">
                        <Input  identifier={"courseCode"} onChange={handleFormDataChange} inputSize={"medium"} prompt={"Course code"} placeholder={tagInfo==null?"":tagInfo["courseCode"]} type={"text"}/>
                        <Input identifier={"courseName"} onChange={handleFormDataChange} inputSize={"medium"} prompt={"Course name"} placeholder={tagInfo==null?"":tagInfo["courseName"]} type={"text"}/>
                    </div>
                    <div className="col">
                        <Input identifier={"subject"} onChange={handleFormDataChange} inputSize={"small"} prompt={"Subject"} placeholder={tagInfo==null?"":tagInfo["subject"]} type={"text"}/>
                    </div>
                </div>
            );
        }
        else if (tagType==="textbook"){
            return (
                <div className="tag-form-inputs">
                    <div className="col">
                        <Input  identifier={"title"} onChange={handleFormDataChange} inputSize={"medium"} prompt={"Textbook title"}  type={"text"} placeholder={tagInfo.title}/>
                        <Input identifier={"isbn"} onChange={handleFormDataChange} inputSize={"medium"} prompt={"ISBN"}  type={"text"} placeholder={tagInfo.isbn}/>
                    </div>
                    <div className="col">
                        <Input  identifier={"courseId"} onChange={handleFormDataChange} inputSize={"small"} prompt={"Course code"}  type={"select-search"} options={getCourseOptions()} />
                        <Input identifier={"author"} onChange={handleFormDataChange} inputSize={"small"} prompt={"author"}  type={"text"} placeholder={tagInfo.author}/>
                    </div>
                    <div className="col">
                        <Input identifier={"originalPrice"} onChange={handleFormDataChange} inputSize={"small"} prompt={"Original Price"}  type={"price"} placeholder={tagInfo.originalPrice}/>
                        <Input identifier={"edition"} onChange={handleFormDataChange} inputSize={"small"} prompt={"Edition"}  type={"text"} placeholder={tagInfo.edition}/>
                    </div>
                    <div className="col">
                        <Input identifier={"publisher"} onChange={handleFormDataChange} inputSize={"small"} prompt={"Publisher"}  type={"text"} placeholder={tagInfo.publisher}/>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="tag-form-inputs">
                    <div className="col">
                        <Input  identifier={"name"} onChange={handleFormDataChange} inputSize={"medium"} prompt={"Tag name"}  type={"text"} placeholder={tagInfo.name}/>
                    </div>
                </div>
            );
        }
    }

    const getCourseById = (courseId)=>{
        for(let i=0; i<allCourseTags.length; i++){
            if(allCourseTags[i].id===courseId){
                return allCourseTags[i];
            }
        }
        return {courseCode:"", subject:"", courseName:""};
    }

    const getCourseOptions = ()=>{
        let ret = [];
        allCourseTags.forEach(
            (tag)=>{
                ret.push({name:tag["courseCode"], value:tag["id"]});
            }
        );
        return ret;
    }

    const handleInfoEdit = () => {
        setShowForm(true);
    };

    const handleInfoDelete = () => {
        let url = `${ROOT}${tagType}?action=delete`;
        let metaData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        dataFetch(
            url,
            metaData,
            (data)=>{callback("delete", formData)},
            null
        );

    };

    const handleFormSave = () => {
        let url = `${ROOT}${tagType}?action=update`;

        let metaData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        // create a new tag
        if(createNewTag){
            dataFetch(
                url,
                metaData,
                (data)=>{callback("insert", data)},
                null
            );
        }
        // update an existing tag
        else{
            dataFetch(
                url,
                metaData,
                (data)=>{setTagInfo({...formData})},
                null
            );
        }

        setShowForm(false);
    };

    const handleFormCancel = () => {
        if(createNewTag){
            callback("cancel", null);
        }
        else{
            setShowForm(false);
        }
    };

    const handleFormDataChange = (key, value)=>{
        formData[key] = value;
    }

    return (
        <div className="tag-listing">
            {!createNewTag &&
                <div className="tag-info" onMouseOver={()=>{setShowTagInfoButtons(true)}} onMouseLeave={()=>{setShowTagInfoButtons(false)}}>
                    {getTagInfo()}
                    {showTagInfoButtons && !showForm &&
                        <div className="tag-info-btns" >
                            <Button buttonSize="btn--small" buttonStyle="btn--normal" text="Edit" onClick={handleInfoEdit}/>
                            <Button buttonSize="btn--small" buttonStyle="btn--warning" text="Delete" onClick={handleInfoDelete}/>
                        </div>
                    }
                </div>
            }
            {showForm &&
                <div className="tag-form">
                    {getTagForm()}
                    <div className="tag-form-btns">
                        <Button buttonSize="btn--small" buttonStyle="btn--primary" text="Save" onClick={handleFormSave}/>
                        <Button buttonSize="btn--small" buttonStyle="btn--normal" text="Cancel" onClick={handleFormCancel}/>
                    </div>
                </div>
            }
        </div>
    );
}