// import "./TagFilter.css";
// import Button from "../common/Button";
// import {useState} from "react";
//
//
// function TagFilter({tagData,callback}){
//
//
//     //TODO: replace with real data coming from parent "tagData"
//     let fakeTagData = [
//         {
//             name:"furniture",
//             isActive: false //isActive: tag 是否已被点击
//         },
//         {
//             name:"notes",
//             isActive: true
//         },
//         {
//             name:"food",
//             isActive: false
//         }
//     ];
//
//     let tagStatus = new Map();  // map 用来记录每个tag是否被激活
//     let tags = [];
//
//     const handleTagCallback = (tagName, bool)=>{
//         tagStatus.set(tagName,bool);
//     }
//
//     const handleDone = ()=>{
//         callback(tagStatus);
//     }
//
//
//
//     for(let i=0; i<fakeTagData.length; i++){
//         let tag = fakeTagData[i];
//         tagStatus.set(tag.name, tag.isActive);
//         tags.push(
//             <Tag key={i.toString()} text={tag.name} isClicked={tag.isActive} callback={handleTagCallback}/>
//         );
//     }
//
//
//
//
//
//
//     return (
//         <div className={"filter-menu tag-filter-container card"}>
//             <div className={"tag-container"}>
//                 {tags}
//             </div>
//             <div className={"tag-filter-btn-container"}>
//                 <Button text={"Done"} buttonStyle={"btn--primary"} buttonSize={"btn--small"} onClick={handleDone}/>
//             </div>
//         </div>
//     );
// }
//
// function Tag(
//     {
//         key,
//         text,
//         isClicked,
//         callback,
//
//     }
// ){
//     const [isActive, setIsActive] = useState(isClicked);
//
//     const handleClick = ()=>{
//         setIsActive(!isActive);
//         callback(text,isActive);
//     }
//
//     const getClassName = ()=>{
//         return "filter-tag".concat(isActive?'-active':'');
//     }
//
//     return (
//         <p key={key} className={getClassName()} onClick={handleClick}>{text}</p>
//     );
//
// }
//
// export default TagFilter;