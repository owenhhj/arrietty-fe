import Button from "../common/Button";


export default function AdminBulletinListing(
  {
    id,
    title,
    content,
    createTime,
    callback
  }
){

  const handleEdit = ()=>{
    callback({action:"edit", data:{id:id, title:title, content:content}});
  }

  const handleDelete = ()=>{
    callback({action:"delete", data:{id:id, title:title, content:content}});
  }

  const getDate = ()=>{
    let m = new Date(Date.parse(createTime));
    return m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate();
  }

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
          <Button buttonStyle={"btn--primary"} buttonSize={"btn--small"} text={"Edit"} onClick={handleEdit}/>
          <Button buttonStyle={"btn--warning"} buttonSize={"btn--small"} text={"Delete"} onClick={handleDelete}/>
        </div>
      </div>

    </div>
  );
}