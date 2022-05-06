import "./AdminBulletinManageWidget.css";
import AdminBulletinListing from "./AdminBulletinListing";
import {useEffect, useState} from "react";
import AdminBulletinForm from "./AdminBulletinForm";
import {dataFetch} from "../common/common";
import {showGeneralNoti} from "../common/GeneralNotiProvider";
import {useNavigate} from "react-router-dom";
import {MUIButton} from "../common/MUIComponents";

export default function AdminBulletinManageWidget() {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const BULLETIN = process.env.REACT_APP_API_BULLETIN;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({id: null, title: null, content: null});
  const [bulletinList, setBulletinList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      refreshData();
    }, []);

  const dispatch = showGeneralNoti();
  const handleShowNoti = (msg, good) => {
    dispatch({msg: msg, good: good});
  };

  const refreshData = () => {
    dataFetch(
      `${ROOT}${BULLETIN}`,
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
        `${ROOT}${BULLETIN}?action=delete`,
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
        `${ROOT}${BULLETIN}?action=update`,
        {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(d.data)
        },
        (res) => {
          handleShowNoti('Add bulletin success', 1);
          setTimeout(refreshData, 1000);
        },
        (err) => {
          handleShowNoti('Add bulletin failure', -1);
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