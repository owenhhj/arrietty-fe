import './AdminBlacklist.css';
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {MUIButton, MUITextField} from "../common/MUIComponents";

export default function AdminBlacklist() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const BLACKLIST = process.env.REACT_APP_API_ADMIN_BLACKLIST;
  const BLACKLIST_EDIT = process.env.REACT_APP_API_ADMIN_BLACKLIST_EDIT;
  const [netIds, setNetIds] = useState([]);
  const [netIdInput, setNetIdInput] = useState('');

  useEffect(() => {
    dataFetch(
      `${ROOT}${BLACKLIST}`,
      {method: 'GET'},
      (res) => {
        setNetIds(res);
      },
      null
    );
    refreshData();
  }, []);

  const dispatch = showGeneralNoti();
  const handleShowNoti = (msg, good) => {
    dispatch({action: "add", body: {msg: msg, good: good}});
  };

  const refreshData = () => {
    dataFetch(
      `${ROOT}${BLACKLIST}`,
      {method: 'GET'},
      (res) => {
        setNetIds(res);
      },
      null
    );
  };

  const handleBlacklistInput = (identifier, v) => {
    setNetIdInput(v);
  };

  const handleBlacklistSubmit = (e) => {
    e.preventDefault();
    let temp = netIdInput;
    dataFetch(
      `${ROOT}${BLACKLIST_EDIT}?action=add&netId=${temp}`,
      {method: 'POST'},
      (res) => {
        handleShowNoti(`Add ${temp} to blacklist success`, 1);
        refreshData();
      },
      (err) => {
        handleShowNoti(`Add ${temp} to blacklist failure`, -1);
      }
    );
  };

  const handleBlacklistDelete = (e) => {
    dataFetch(
      `${ROOT}${BLACKLIST_EDIT}?action=delete&netId=${e}`,
      {method: 'POST'},
      (res) => {
        handleShowNoti(`Remove ${e} from blacklist success`, 1);
        refreshData();
      },
      (err) => {
        handleShowNoti(`Remove ${e} from blacklist failure`, -1);
      }
    );
  }

  return (
    <div className={'MyPostsCanvas card'}>
      <div className={'MyPostsCanvas-children'}>
        <div className={'row-title-card non-text'}>
          <p>Manage Blacklist</p>
        </div>
        <div className={'AdminBlacklist-subtitle'}>
          <p>Add user to blacklist</p>
        </div>

        <div className={'AdminBlacklist-card-input-row'}>
          <div className={'AdminBlacklist-card-input card'}>
            {/*todo use mui tag select (MUIComponents.js) with all users list*/}
            <MUITextField identifier={'inputNetId'} onChange={handleBlacklistInput}/>
            <MUIButton size={'small'} variant={1} label={'add'} onClick={handleBlacklistSubmit}/>
          </div>
        </div>

        <div className={'AdminBlacklist-subtitle'}>
          <p>Blacklisted users</p>
        </div>


        <div className={'AdminBlacklist-area-listing'}>
          {netIds.map((netId, index) => {
            return (
              <AdminBlacklistEach key={index} netId={netId} callback={handleBlacklistDelete}/>
            );
          })}
        </div>


      </div>
    </div>
  );
}

function AdminBlacklistEach({
  netId='sh2013',
  callback=null
                            }) {

  return (
    <div className={'AdminBlacklistEach card non-text'}>
      <p>{netId}</p>
      <img className={'clickable-btn'} onClick={()=>{callback(netId)}} src="./close_black_48dp.svg" alt=""/>
    </div>
  );
}





