import "./AddNewAd.css"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useState} from 'react'
import {dataFetch} from "./common/common";


function AddNewAd({
  toParent
                  }) {
  const ROOT = 'http://localhost:8000/';
  // const bookCovers = ["bookcover1.jpg", "bookcover2.jpg", "bookcover3.jpg", "bookcover4.jpg"];  // samples
  const grid = 6;
  // TODO current implementation: send to parent before setState()
  const [picURLs, setPicURLs] = useState([]);
  // const [formData, setFormData] = useState(new FormData());  // form has to be a state, pic not state still works
  const [picHover, setPicHover] = useState(false);
  let pic = [];  // current pic being added

  const picInputChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      for (let i=0; i<e.target.files.length; i++) {
        // TODO upload files with the same name?
        // TODO upload files .jpg/png check
        // TODO release RAM from createObjectURL after submission
        pic.push({
          "name": e.target.files[i].name,
          "url": URL.createObjectURL(e.target.files[i]),
          "file": e.target.files[i]
        });
        // formData.append("files", e.target.files[i])
      }
      // setFormData(formData)
    }
  }

  const handlePicAdd = (e) => {
    e.preventDefault();
    let legal = pic.length > 0;
    picURLs.forEach((uploaded) => {
      pic.forEach((newPic) => {
        if (newPic.name === uploaded.name) {
          legal = false;
        }
      })
    })
    if (legal) {
      toParent([...picURLs, ...pic].map((item) => (item.file)));
      setPicURLs([...picURLs, ...pic]);
      pic = [];
    } else {
      pic = [];
      alert('Upload another picture!');
    }
  }

  // TODO two func below used to toggle state of individual picHover instead of global picHover
  // const handlePicMouseEnter = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  // }
  //
  // const handlePicMouseLeave = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  // }

  // TODO bug: re-upload deleted file can cause illegal
  const handlePicDelete = (e) => {
    e.preventDefault();
    picURLs.splice(Number(e.target.name), 1);
    toParent(picURLs.map((item) => (item.file)));
    setPicURLs(picURLs);
  }

  // TODO redo sorting for better performance
  const handleAdSubmit = (e) => {
    e.preventDefault();
    toParent(picURLs.map((item) => (item.file)))

    // let newForm = new FormData();
    // let toParent = [];
    // picURLs.forEach((target) => {
    //   formData.getAll('files').forEach((f) => {
    //     if (f.name === target.name) {
    //       newForm.append('files', f);
    //       toParent.push(f)
    //     }
    //   })
    // })
    // callback(toParent)
    // let body = {
    //   "id": null, "isTextbook": true, "tagId": 12, "images": newForm, "price": 200, "comment": "no comment"
    // }
    // dataFetch(
    //   ROOT+'advertisement?action=update',
    //   {method: 'POST', body: body},
    //   (res) => {
    //     console.log("clear all states & createObjectURLs on this page", res)
    //   },
    //   (err) => {
    //     console.log("keep this page and resubmit", err)
    //   }
    // )
  }
  
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    // padding: grid * 2,
    padding: grid,
    margin: `0 ${grid}px 0 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
  })

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  })

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  // this function setState --> picURL and send to parent
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {return}
    const items = reorder(
      picURLs,
      result.source.index,
      result.destination.index
    );
    toParent(items.map((item) => (item.file)));
    setPicURLs(items);
  }

  return (
    <div className="AddNewAd">
      <h1>AddNewAd Component Header</h1>

      {/*{bookCovers.map((bc) => {return (<img key={bc} src={`${ROOT}static/${bc}`} alt=""/>)})}*/}

      <input type="file" onChange={picInputChange} multiple/>
      <button onClick={handlePicAdd}>Add</button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>

              {/*TODO map the delete icon here, use onHover where?*/}
              {/*TODO one single icon that floats with pics or one each?*/}
              {picURLs.map((item, index) => (
                <Draggable key={item.name} draggableId={item.name} index={index}>
                  {(provided, snapshot) => {return (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style)}
                    >
                      {/*TODO new div to hold img and delete btn*/}
                      <div
                        className="DragContainer" name={index.toString()}
                        onMouseEnter={()=>{setPicHover(true)}}
                        onMouseLeave={()=>{setPicHover(false)}}
                      >
                        <img key={index.toString()} src={item.url} alt=""/>
                        {picHover && <button className="PicDeleteBtn" name={index.toString()} onClick={handlePicDelete}>x</button>}
                      </div>


                    </div>
                  )}}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={handleAdSubmit}>Submit</button>

    </div>
  )
}

export default AddNewAd;
