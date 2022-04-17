import Modal from "react-modal";
import "./AdminBulletinForm.css";
import Input from "../common/Input";
import Button from "../common/Button";
import {useEffect, useRef} from "react";

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
      height: "80vh",
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
  }

  const handleCancel = () => {
    callback(
      {action: "cancel"}
    );
  }

  const handlePublish = () => {
    callback(
      {
        action: "publish",
        data: data
      }
    );
  }

  return (
    <Modal isOpen={isOpen} style={modalStyles}>
      <div className={"admin-bulletin-form card"} ref={ref}>
        <div className={"admin-bulletin-form-container"}>
          <Input identifier={"title"} type={"text"} prompt={"Title"} defaultValue={title} inputSize={"large"}
                 onChange={handleFormInputChange}/>
          <Input identifier={"content"} type={"text"} prompt={"Content"} defaultValue={content}
                 inputSize={"extra-large"} onChange={handleFormInputChange}/>
        </div>
        <Button buttonStyle={"btn--primary"} buttonSize={"btn--medium"} text={"Publish"} onClick={handlePublish}/>
        <div className={'cancel-btn'} onClick={handleCancel}>
          <img src="./close_black_48dp.svg" alt=""/>
        </div>
      </div>
    </Modal>
  );
};

