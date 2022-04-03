// import "./FilterButton.css"
// import {useRef, useState} from "react";
//
//
// function FilterButton(
//     {
//         buttonText,
//         dropDownMenu,
//     }
// ){
//     const containerDOM = useRef(null);
//
//     const handleClickOutside = (event)=>{
//         if(!containerDOM.current.contains(event.target)){
//             setShowDropDownMenu(false);
//         }
//     }
//
//     document.addEventListener("mousedown", handleClickOutside)
//
//     const [showDropDownMenu, setShowDropDownMenu] = useState(false);
//
//     const handleButtonClick = ()=>{
//
//         setShowDropDownMenu(!showDropDownMenu);
//
//     }
//
//
//
//
//     return (
//         <div ref={containerDOM} className={"filter-button-container"} >
//             <div className={"filter-button"} onClick={handleButtonClick}>
//                 <p>{buttonText}</p>
//                 <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M6.6433 7.51624L10.6595 11.5237L14.6758 7.51624L15.9095 8.74999L10.6595 14L5.40955 8.74999L6.6433 7.51624Z" fill="black"/>
//                 </svg>
//             </div>
//             {showDropDownMenu && <div>{dropDownMenu}</div>}
//         </div>
//     );
// }
//
// export default FilterButton;