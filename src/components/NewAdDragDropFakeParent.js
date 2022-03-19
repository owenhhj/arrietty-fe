import NewAdDragDrop from "./NewAdDragDrop";
import {dataFetch} from "./common/common";


// TODO pass a fake 'onChange' function between parent & child
function NewAdDragDropFakeParent(props) {
  let images = null;
  const onChangeHelper = (e) => {
    console.log('parent onChange called');
    images = e;
    console.log(images);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(images);
  }

  return (
    <div>
      <NewAdDragDrop toParent={onChangeHelper}/>
      <button onClick={handleSubmit}>SubmitParent</button>
    </div>
  );
}


export default NewAdDragDropFakeParent;
