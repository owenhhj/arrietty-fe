import {MUIButton} from "../common/MUIComponents";
import {convertTimeBackToFront} from "../common/common";

export default function AdminBulletinListing({
                                               id,
                                               title,
                                               content,
                                               createTime,
                                               callback
                                             }) {
  const handleEdit = () => {
    callback({action: "edit", data: {id: id, title: title, content: content}});
  };

  const handleDelete = () => {
    callback({action: "delete", data: {id: id, title: title, content: content}});
  };

  const getDate = () => {
    let d = convertTimeBackToFront(createTime);
    return d.toLocaleString('en-US');
  };

  return (
    <div className={"admin-bulletin-listing card"}>
      <div className={"admin-bulletin-listing-container"}>

        <div className={"admin-bulletin-listing-row1"}>
          <div className={"admin-bulletin-listing-title"}>{title}</div>
          <div className={"admin-bulletin-listing-create-time"}>{getDate()}</div>
        </div>
        <p className={"admin-bulletin-listing-content"}>
          {content}
        </p>
        <div className={"admin-bulletin-listing-btn-row"}>
          <MUIButton size={'small'} variant={1} label={'Edit'} onClick={handleEdit}/>
          <MUIButton size={'small'} variant={3} label={'Delete'} onClick={handleDelete}/>
        </div>

      </div>
    </div>
  );
}

