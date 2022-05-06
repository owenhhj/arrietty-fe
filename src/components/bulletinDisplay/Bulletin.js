import "./Bulletin.css";
import {useEffect, useRef, useState} from "react";
import {dataFetch} from "../common/common";
import Modal from "react-modal";

export default function Bulletin() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const BULLETIN = process.env.REACT_APP_API_BULLETIN;
  const [bullData, setBullData] = useState([]);
  const [showBullDetail, setShowBullDetail] = useState(-1);

  useEffect(() => {
    dataFetch(
      `${ROOT}${BULLETIN}`,
      {method: 'GET'},
      (res) => {
        setBullData(res);
      },
      null
    )
  }, []);

  const handleShowBullDetail = (id) => {
    setShowBullDetail(id);
  };

  const handleClose = () => {
    setShowBullDetail(-1);
  }

  const customStyles = {
    content: {
      position: "absolute",
      left:0,
      top:"5rem",
      width:"100vw",
      height:"calc(100vh-2rem)",
      "overflow-y": "scroll",
      background: "transparent",
      display: "flex",
      "justify-content":"center",
      border:"none",
    },
  };

  return (
    <div className={"bulletin card non-text"}>
      <div className={'bulletin-title'}>
        <img src="./feed_black_48dp.svg" alt=""/>
        <p>Bulletin</p>
      </div>

      <div className={'bulletin-entries'}>
        {bullData.map(bull => {
          return (
            <div className={'bulletin-entry clickable-btn'} key={bull.id} itemID={bull.id} onClick={()=>{handleShowBullDetail(bull.id)}}>
              <div className={'bulletin-entry-title'}>
                <p>· {bull.title}</p>
              </div>
              <div className={'bulletin-entry-content'}>
                <p>{bull.content}</p>
              </div>
            </div>
          );
        })}
      </div>


      <Modal isOpen={showBullDetail!==-1} style={customStyles}>
        <BulletinDetailCard bull={bullData.filter(bull=>bull.id===showBullDetail)[0]} callback={handleClose}/>
      </Modal>
    </div>
  );
}

function BulletinDetailCard({
  bull={},
  callback=null
                            }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {callback();}
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  return (
    <div className={'BulletinDetailCard card'} ref={ref}>
      <div className={'BulletinDetailCard-title'}>
        <p>{bull.title}</p>
      </div>
      <hr style={{width: '85%'}}/>
      <div className={'BulletinDetailCard-content'}>
        <p>{bull.content}</p>
      </div>
    </div>
  );
}



