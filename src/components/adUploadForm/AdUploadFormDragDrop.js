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
    let ids = imageIdsOriginal.split(',');
    console.log('imageIdsOriginal:', ids);
    // ids.forEach((id) => {
    //   fetch(`${ROOT}image?id=${id}`)
    //     .then(async res => {
    //       let imgBlob = res.blob();
    //       let imgFile = new File([await imgBlob], `adImgOri${id}`);
    //       let tempFile = {
    //         'name': `adImgOri${id}`,
    //         'url': URL.createObjectURL(imgFile),
    //         'file': imgFile
    //       };
    //       handlePicAdd([tempFile]);
    //     });
    //
    // });

    // console.log('handleFetchImgOriginal returned:', handleFetchImgOriginal(ids));
    handleFetchImgOriginal(ids);

  }, []);

  useEffect(() => {console.log('useEffect picURLs changed to:',picURLs)}, [picURLs]);

  const handleFetchImgOriginal = (ids) => {
    let tempPics = [];
    let temp = ids.map(async id => {
      // return await fetch(`${ROOT}image?id=${id}`)
      //   .then(async res => {
      //     let imgBlob = await res.blob();
      //     let imgFile = new File([imgBlob], `adImgOri${id}`);
      //     return {
      //       'name': `adImgOri${id}`,
      //       'url': URL.createObjectURL(imgFile),
      //       'file': imgFile
      //     };
      //   });

      // tempPics.push(await fetch(`${ROOT}image?id=${id}`)
      //   .then(async res => {
      //     let imgBlob =  res.blob();
      //     let imgFile = new File([await imgBlob], `adImgOri${id}`);
      //     return {
      //       'name': `adImgOri${id}`,
      //       'url': URL.createObjectURL(imgFile),
      //       'file': imgFile
      //     }
      //   }));

      let res = await fetch(`${ROOT}image?id=${id}`);
      let imgFile = new File([await res.blob()], `adImgOri${id}`);
      let tempPic = {
        'name': `adImgOri${id}`,
        'url': URL.createObjectURL(imgFile),
        'file': imgFile
      };
      tempPics.push(tempPic);
      console.log(tempPic)
    });
    tempPics.forEach(tp => console.log('tp.file', tp.file));
    console.log('handleFetchImgOriginal Promise mapped tempPics:', tempPics);
    handlePicAdd(tempPics);
    // return temp;
    // console.log('handleFetchImgOriginal Promise mapped temp:', temp);
    // handlePicAdd(temp);
  }

  const toParent = (v) => {
    onChange(identifier, v);
  }

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
  }

  // fixme why not just pass in pic[]
  const handlePicAdd = (currPics) => {
    console.log('handlePicAdd picURLs[]:', picURLs);
    console.log('handlePicAdd currPics[]:', currPics);

    // let legal = true;
    // picURLs.forEach((uploaded) => {
    //   currPics.forEach((newPic) => {
    //     if (newPic.name === uploaded.name) {
    //       legal = false;
    //     }
    //   })
    // });
    console.log('before legal:', currPics);
    // todo thread interleaving??? use a outside variable? probably not --> ensure all fetches are done
    if (true) {
      console.log('handlePicAdd legal currPics before temp:', currPics);
      console.log('handlePicAdd legal picURLs before temp:', picURLs);
      // let temp = [...picURLs, ...currPics];
      let temp = picURLs.concat(currPics);
      console.log('handlePicAdd legal temp before setState:', temp)
      console.log('handlePicAdd legal picURLs before setState:', picURLs);
      toParent(temp.map((item) => (item.file)));
      // setPicURLs(temp);
      setPicURLs(currPics);
    } else {
      alert('Upload another picture!');
    }
  }

  const handlePicDelete = (e) => {
    let tmpPicURLs = picURLs;
    tmpPicURLs.splice(Number(e.target.name), 1);
    toParent(tmpPicURLs.map((item) => (item.file)));
    setPicURLs([...tmpPicURLs]);
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    position: "static",
    left: "auto !important",
    top: "auto !important",
    userSelect: 'none',
    margin: `0 5px 0 0`,
  })

  const getListStyle = isDraggingOver => ({

    display: 'flex',
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
    <div className="NewAdDragDrop">

      <div className={"DragDropRowContainer"}>

        <div className={"BtnAddPic"}>
          <input id={"file-input"} type="file" onChange={picInputChange} multiple/>
          <label htmlFor="file-input">
            <img src="./add_black_48dp.svg" alt=""/>
          </label>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div className={"DivDroppable"} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                {picURLs.map((item, index) => (
                  <Draggable key={index.toString()} draggableId={index.toString()} index={index} >
                    {(provided, snapshot) => {return (
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
                    )}}
                  </Draggable>
                ))}
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
