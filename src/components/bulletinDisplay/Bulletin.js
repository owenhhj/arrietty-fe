import "./Bulletin.css";
import {useEffect, useRef, useState} from "react";
import {dataFetch, getModalStyles} from "../common/common";
import Modal from "react-modal";

const fakeBull = [
  {
    id: 1,
    // title: 'Hey! Welcome to Arrietty! Hey! Welcome to Arrietty! Hey! Welcome to Arrietty!',
    title: 'To Arrietty Users',
    // content: 'This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements! This is a place to post advertisements!',
    content:
      'What is Arrietty?\n' +
      'Arrietty is an advertisement platform for the NYUSH community. The platform does not handle any form of payment and we encourage users to contact each other through NYU email.\n' +
      '\n' +
      'How does it work?\n' +
      'Currently, every user has five ad slots and there are two types of ads. The “textbook” type is for NYUSH course required textbooks and we have prepared a list (copied from the NYUSH textbook website) to choose from. The “other” type is for everything else. \n' +
      '\n' +
      'Code of Conduct\n' +
      'Please only post items that you believe to be in good condition and beneficial to other members of the community.\n' +
      'No pirated items allowed.\n' +
      'Make sure that your price is reasonable and that you are not selling for profit. \n' +
      'Remember to remove your ad in time when the item is sold.\n' +
      'We believe in the integrity of our community members. Nevertheless, posting irrelevant and inappropriate content will result in a permanent ban.\n' +
      '\n' +
      'Security and Privacy\n' +
      'Arrietty authenticates user identity through NYU Shibboleth SSO so we only have access to your NetIDs. Ads are visible to the whole community, so we advise you not to post any sensitive personal information. Arrietty only guarantees the authenticity of users’ NYU email addresses and  will not be responsible for any financial loss happening during transactions.\n',
  },
];

export default function Bulletin() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const BULLETIN = process.env.REACT_APP_API_BULLETIN;
  const [bullData, setBullData] = useState([]);
  const [showBullDetail, setShowBullDetail] = useState(-1);

  useEffect(() => {
    // setBullData(fakeBull);
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



