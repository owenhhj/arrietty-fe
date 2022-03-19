import "./NewAdDragDrop.css"
import NewAdDragDropPic from "./NewAdDragDropPic";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useState} from 'react'
import {dataFetch} from "./common/common";


// TODO release RAM from createObjectURL after submission
function NewAdDragDrop({
  toParent  // to pass files to parent onChange
                  }) {
  const grid = 6;
  const [picURLs, setPicURLs] = useState([]);
  let pic = [];  // current pic being added

  const picInputChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      for (let i=0; i<e.target.files.length; i++) {
        // TODO upload files .jpg/png check
        pic.push({
          "name": e.target.files[i].name,
          "url": URL.createObjectURL(e.target.files[i]),
          "file": e.target.files[i]
        });
      }
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

  // TODO bug: re-upload deleted file can be illegal
  // TODO bug: state is modified but dragndrop doesn't actually remove that pic
  const handlePicDelete = (e) => {
    e.preventDefault();
    picURLs.splice(Number(e.target.name), 1);
    toParent(picURLs.map((item) => (item.file)));
    setPicURLs(picURLs);
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    // padding: grid,
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
      <h1>NewAdDragDrop Component Header</h1>

      <input type="file" onChange={picInputChange} multiple/>
      <button onClick={handlePicAdd}>Add</button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>

              {picURLs.map((item, index) => (
                <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                  {(provided, snapshot) => {return (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style)}
                    >
                      <NewAdDragDropPic
                        pic={{'name': item.name, 'url': item.url, 'index': index.toString()}}
                        toParent={handlePicDelete}
                      />

                    </div>
                  )}}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default NewAdDragDrop;
