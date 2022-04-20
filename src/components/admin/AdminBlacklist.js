import './AdminBlacklist.css';
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";

const fakeUsers = ['hh1234', 'yz5678', 'hh1234', 'yz5678', 'hh1234',
  'yz5678', 'hh1234', 'yz5678', 'hh1234', 'yz5678', 'hh1234', 'yz5678',
  'hh1234', 'yz5678', 'hh1234', 'yz5678', 'hh1234', 'yz5678', 'hh1234',
  'yz5678'];

export default function AdminBlacklist() {
  const ROOT = 'https://localhost:8000/';
  const [netIds, setNetIds] = useState(fakeUsers);
  const [netIdInput, setNetIdInput] = useState('');

  useEffect(() => {
    dataFetch(
      `${ROOT}blacklist`,
      {method: 'GET'},
      (res) => {
        setNetIds(res);
      },
      null
    );
  }, []);

  const dispatch = showGeneralNoti();
  const handleShowNoti = (msg, good) => {
    dispatch({action: "add", body: {msg: msg, good: good}});
  };

  const handleBlacklistInput = (e) => {
    e.preventDefault();
    setNetIdInput(e.target.value);
  };

  const handleBlacklistSubmit = (e) => {
    e.preventDefault();
    let temp = netIdInput;
    dataFetch(
      `${ROOT}updateBlacklist?action=add&netId=${temp}`,
      {method: 'POST'},
      (res) => {
        handleShowNoti(`Add ${temp} to blacklist success`, true);
      },
      (err) => {
        handleShowNoti(`Add ${temp} to blacklist failure`, false);
      }
    );
  };

  const handleBlacklistDelete = (e) => {
    dataFetch(
      `${ROOT}updateBlacklist?action=delete&netId=${e}`,
      {method: 'POST'},
      (res) => {
        handleShowNoti(`Remove ${e} from blacklist success`, true);
      },
      (err) => {
        handleShowNoti(`Remove ${e} from blacklist failure`, false);
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
            {/*todo use mui autocomplete with all users list*/}
            <input type="text" onChange={handleBlacklistInput}/>
            <button onClick={handleBlacklistSubmit}>Add</button>
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
      <img className={'clickable'} onClick={()=>{callback(netId)}} src="./close_black_48dp.svg" alt=""/>
    </div>
  );
}





