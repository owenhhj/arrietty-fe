import "./Bulletin.css";
import {useEffect, useRef, useState} from "react";
import {dataFetch, getModalStyles} from "../common/common";
import Modal from "react-modal";

const fakeBull = [
  {
    id: 1, title: 'Hey! Welcome to Arrietty! Hey! Welcome to Arrietty! Hey! Welcome to Arrietty!',
    content: 'This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements!'
  },
];

export default function Bulletin() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const BULLETIN = process.env.REACT_APP_API_BULLETIN;
  const [bullData, setBullData] = useState([]);
  const [showBullDetail, setShowBullDetail] = useState(-1);

  useEffect(() => {
    setBullData(fakeBull)
    refreshData();
  }, []);

  const refreshData = () => {
    dataFetch(
      `${ROOT}${BULLETIN}`,
      {method: 'GET'},
      (res) => {
        setBullData(res);
      },
      null
    );
  };

  const handleShowBullDetail = (id) => {
    setShowBullDetail(id);
  };

  const handleClose = () => {
    setShowBullDetail(-1);
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
            <div className={'bulletin-entry clickable-btn'} key={bull.id} itemID={bull.id} onClick={() => {
              handleShowBullDetail(bull.id)
            }}>
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

      <Modal isOpen={showBullDetail !== -1} style={getModalStyles()}>
        <BulletinDetailCard bull={bullData.filter(bull => bull.id === showBullDetail)[0]} callback={handleClose}/>
      </Modal>
    </div>
  );
}

function BulletinDetailCard({
                              bull = {},
                              callback = null
                            }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  return (
    <div className={'BulletinDetailCard card non-text'} ref={ref}>

      <div className={'BulletinDetailCard-title'}>
        <p>{bull.title}</p>
      </div>

      <div className={'BulletinDetailCard-content'}>
        <p>{bull.content}</p>
      </div>

      <img className={'icon-close clickable-icon'} src="./close_black_48dp.svg" alt="" onClick={callback}/>

    </div>
  );
}



