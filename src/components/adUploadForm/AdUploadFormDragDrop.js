import "./AdUploadFormDragDrop.css"
import AdUploadFormDragDropPic from "./AdUploadFormDragDropPic";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {useEffect, useState} from 'react'

// TODO release RAM from createObjectURL after submission
function AdUploadFormDragDrop({
  identifier = "images",
  imageIdsOriginal='',
  onChange  // to pass files to parent onChange
                  }) {
  const ROOT = 'https://localhost:8000/';
  const [picURLs, setPicURLs] = useState([]);
  // let pic = [];  // current pic being added

  useEffect(() => {
    if (imageIdsOriginal) {  // only when not empty
      let ids = imageIdsOriginal.split(',');
      handleFetchImgOriginal(ids).then(r => {
        handlePicAdd(r);
      });
    }
  }, []);

  const handleFetchImgOriginal = async (ids) => {
    let tempPics = [];
    for (let i = 0; i<ids.length; i++) {
      let id = ids[i];
      let res = await fetch(`${ROOT}image?id=${id}`);
      let imgFile = new File([await res.blob()], `adImgOri${id}`);
      let tempPic = {
        'name': `adImgOri${id}`,
        'url': URL.createObjectURL(imgFile),
        'file': imgFile
      };
      tempPics.push(tempPic);
    }
    // handlePicAdd(tempPics);
    return tempPics;
  };

  const toParent = (v) => {
    onChange(identifier, v);
  };

  const picInputChange = (e) => {
    e.preventDefault();
    let currPics = [];
    if (e.target.files && e.target.files[0]) {
      for (let i=0; i<e.target.files.length; i++) {
        // TODO upload files .jpg/png check
        currPics.push({
          "name": e.target.files[i].name,
          "url": URL.createObjectURL(e.target.files[i]),
          "file": e.target.files[i]
        });
      }
    }
    handlePicAdd(currPics);
  };

  const handlePicAdd = (currPics) => {
      let temp = [...picURLs, ...currPics];
      toParent(temp.map((item) => (item.file)));
      setPicURLs(temp);
  };

  const handlePicDelete = (e) => {
    let tmpPicURLs = picURLs;
    tmpPicURLs.splice(Number(e.target.name), 1);
    toParent(tmpPicURLs.map((item) => (item.file)));
    setPicURLs([...tmpPicURLs]);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    position: "static",
    left: "auto !important",
    top: "auto !important",
    userSelect: 'none',
    margin: `0 5px 0 0`,
  });

  const getListStyle = isDraggingOver => ({
    display: 'flex',
    overflow: 'auto',
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  };

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
  };

  return (
    <div className="NewAdDragDrop">

      <div className={"DragDropRowContainer"}>

        <div className={"BtnAddPic clickable-btn"}>
          <input id={"file-input"} type="file" onChange={picInputChange} multiple/>
          <label htmlFor="file-input">
            <img src="./add_black_48dp.svg" alt=""/>
          </label>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div className={"DivDroppable"} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                {
                  picURLs.map((item, index) => (
                    <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                               style={getItemStyle(
                                 snapshot.isDragging,
                                 provided.draggableProps.style)}
                          >
                            <AdUploadFormDragDropPic
                              pic={{'name': item.name, 'url': item.url, 'index': index.toString()}}
                              toParent={handlePicDelete}
                            />

                          </div>
                        )
                      }}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </div>

    </div>
  )
}

export default AdUploadFormDragDrop;
