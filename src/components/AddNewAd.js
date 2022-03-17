import "./AddNewAd.css"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {useState} from 'react'
import {dataFetch} from "./common/common";


// TODO component logic:
// select single/multiple files --> 'Add' to put into draganddrop and sort --> 'Submit' to post
function AddNewAd(props) {
  const ROOT = 'http://localhost:8000/'
  // const bookCovers = ["bookcover1.jpg", "bookcover2.jpg", "bookcover3.jpg", "bookcover4.jpg"]  // samples
  const grid = 6
  const [picURLs, setPicURLs] = useState([])
  const [formData, setFormData] = useState(new FormData())  // form has to be a state, pic not state still works
  let pic = []  // current pic being added

  const picInputChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      for (let i=0; i<e.target.files.length; i++) {
        // TODO upload files with the same name?
        // TODO upload files .jpg/png check
        // TODO release RAM from createObjectURL after submission
        pic.push(
          {"name": e.target.files[i].name, "url": URL.createObjectURL(e.target.files[i])}
        )
        formData.append("files", e.target.files[i])
      }
      setFormData(formData)
    }
  }

  const handlePicAdd = (e) => {
    e.preventDefault()
    let legal = pic.length > 0
    picURLs.forEach((uploaded) => {
      pic.forEach((newPic) => {
        if (newPic.name === uploaded.name) {
          legal = false
        }
      })
    })
    if (legal) {
      setPicURLs([...picURLs, ...pic])
      pic = []
    } else {
      pic = []
      alert('Upload another picture!')
    }
  }

  // TODO redo sorting for better performance
  // TODO pass to parent for API send
  const handleAdSubmit = (e) => {
    e.preventDefault()
    let newForm = new FormData()
    picURLs.forEach((target) => {
      formData.getAll('files').forEach((f) => {
        if (f.name === target.name) {
          newForm.append('files', f)
        }
      })
    })
    let body = {
      "id": null, "isTextbook": true, "tagId": 12, "images": newForm, "price": 200, "comment": "no comment"
    }
    dataFetch(
      ROOT+'advertisement?action=update',
      {method: 'POST', body: body},
      (res) => {
        console.log("clear all states & createObjectURLs on this page", res)
      },
      (err) => {
        console.log("keep this page and resubmit", err)
      }
    )
  }
  
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
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
    )
    setPicURLs(items)
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

              {picURLs.map((item, index) => (
                <Draggable key={item.name} draggableId={item.name} index={index}>
                  {(provided, snapshot) => {return (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style)}
                    >
                      <img key={item.name} src={item.url} alt=""/>
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

export default AddNewAd
