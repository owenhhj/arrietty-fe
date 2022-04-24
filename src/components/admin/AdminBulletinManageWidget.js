import "./AdminBulletinManageWidget.css";
import Button from "../common/Button";
import AdminBulletinListing from "./AdminBulletinListing";
import {useEffect, useState} from "react";
import AdminBulletinForm from "./AdminBulletinForm";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useNavigate} from "react-router-dom";
import {MUIButton} from "../common/MUIComponents";

const fakeBulletin = [
  {
    id: 11, title: 'Welcome to Arrietty-1 what dads fi feawifo !', content: 'Make your sells at home!', createTime: 'Apr 5, 2022, 12:00:00 PM'
  },
  {
    id: 22, title: 'Welcome to Arrietty-2!', content: 'Make your sells at homeef Make your sells at homeef Make your sells at homeef Make your sells at homeef Make your sells at homeef ewa aewfawef awef e faaefw eweaf!', createTime: 'Apr 5, 2022, 12:00:00 PM'
  }
];

export default function AdminBulletinManageWidget() {
  const ROOT = 'https://localhost:8000/';
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({id: null, title: null, content: null});
  const [bulletinList, setBulletinList] = useState(fakeBulletin);
  const navigate = useNavigate();

  useEffect(() => {
      refreshData();
    }, []);

  const dispatch = showGeneralNoti();
  const handleShowNoti = (msg, good) => {
    dispatch({msg: msg, good: good});
  }

  const refreshData = () => {
    dataFetch(
      `${ROOT}bulletin`,
      {method: "GET"},
      (data) => {
        setBulletinList(data);
      },
      null
    );
  };

  const handleListingCallback = (call) => {
    if (call.action === "edit") {
      setFormData(call.data);
      setIsFormOpen(true);
    } else if (call.action === "delete") {
      dataFetch(
        `${ROOT}bulletin?action=delete`,
        {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(call.data)
        },
        () => {
          navigate(0);
        },
        null
      );
    }
  };

  const handleAddNew = () => {
    setFormData({id: null, title: null, content: null});
    setIsFormOpen(true);
  };

  const handleFormCallBack = (d) => {
    if (d.action === "cancel") {
      setIsFormOpen(false);
    } else if (d.action === "publish") {
      dataFetch(
        `${ROOT}bulletin?action=update`,
        {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(d.data)
        },
        (res) => {
          handleShowNoti('Add bulletin success', true);
          setTimeout(refreshData, 1000);
        },
        (err) => {
          handleShowNoti('Add bulletin failure', false);
        }
      );
      setIsFormOpen(false);
    }
  };

  return (
    <div className={"admin-bulletin-manage-widget card"}>
      <div className={"admin-bulletin-manage-widget-container"}>
        <div className={"bulletin-manage-title"}>Bulletin</div>
        <MUIButton size={'small'} variant={1} label={'New Message'} onClick={handleAddNew}/>
        <div className={"bulletin-listing-container"}>
          {bulletinList.map((data) => {
            return (
              <AdminBulletinListing
                key={data.id}
                id={data.id}
                title={data.title}
                content={data.content}
                createTime={data.createTime}
                callback={handleListingCallback}
              />
            );
          })
          }
        </div>
      </div>
      <AdminBulletinForm isOpen={isFormOpen} id={formData.id} title={formData.title} content={formData.content}
                         callback={handleFormCallBack}/>

    </div>
  );
}