import './NewAdDragDrop.css'
import {useState} from "react";


function NewAdDragDropPic({
  pic,  // object --> {name, url, index}
  toParent  // parent function to delete this
                          }) {
  const [ifHover, setIfHover] = useState(false);

  const handleHoverTrue = () => {
    setIfHover(true);
  }

  const handleHoverFalse = () => {
    setIfHover(false);
  }

  return (
    <div className="NewAdDragDropPic"
         onMouseEnter={()=>{setIfHover(true)}}
         onMouseLeave={()=>{setIfHover(false)}}
    >
      <img src={pic.url} alt=""/>
      {ifHover && <button className="PicDeleteBtn" name={pic.index} onClick={toParent}>x</button>}
    </div>
  );
}

export default NewAdDragDropPic;




