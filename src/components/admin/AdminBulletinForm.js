import Modal from "react-modal";
import "./AdminBulletinForm.css";
import {useEffect, useRef} from "react";
import {MUIButton, MUITextField} from "../common/MUIComponents";

export default function AdminBulletinForm(
  {
    id,
    title,
    content,
    isOpen,
    callback
  }
) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handleCancel();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  const modalStyles = {
    content: {
      position: "absolute",
      left: "30vw",
      top: "10vh",
      width: "40vw",
      height: "min-content",
      border: "none",
      background: "transparent"
    },
  };

  let data = {
    id: id,
    title: title,
    content: content
  };

  const handleFormInputChange = (k, v) => {
    data[k] = v;
  };

  const handleCancel = () => {
    callback(
      {action: "cancel"}
    );
  };

  const handlePublish = () => {
    callback(
      {
        action: "publish",
        data: data
      }
    );
  };

  return (
    <Modal isOpen={isOpen} style={modalStyles}>
      <div className={"admin-bulletin-form card"} ref={ref}>
        <div className={"admin-bulletin-form-container"}>
          <div className={'AdminBlacklist-subtitle'}>
            <p>Title</p>
          </div>
          <MUITextField identifier={'title'} styleBox={{width: '100%'}} onChange={handleFormInputChange}/>
          <div className={'AdminBlacklist-subtitle'}>
            <p>Content</p>
          </div>
          <MUITextField identifier={'content'} size={'multiline'} minRows={15} maxRows={20} styleBox={{width: '100%'}}
                        onChange={handleFormInputChange}/>
        </div>
        <MUIButton variant={1} label={'Publish'} onClick={handlePublish}/>
        <div className={'cancel-btn'} onClick={handleCancel}>
          <img src="./close_black_48dp.svg" alt=""/>
        </div>
      </div>
    </Modal>
  );
};

