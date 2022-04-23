import './AdUploadFormMUI.css';
import {MUITextField, MUINumber, MUICheckbox, MUITagSelect, MUIButtonGroup} from "../common/MUIComponents";
import {useState} from "react";



export default function AdUploadFormMUI() {
  const ROOT = 'https://localhost:8000/';
  const [textbookData, setTextbookData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [adType, setAdType] = useState(0);
  const [adTitle, setAdTitle] = useState('');
  const adTypes = ['textbook', 'other'];

  const handleChangeAdType = (i) => {
    console.log('handleChangeAdType', adTypes[i]);
    setAdType(i);
  };

  const handleInputChange = (identifier, value) => {

  };

  return (
    <div className={'AdUploadFormMUI card'}>

      <div>
        <MUITextField identifier={'adTitle'} />
      </div>
      <div>
        <MUIButtonGroup labels={adTypes} selected={adType}
                        buttonStyle={{width: '7em', height:'2.8em'}} callback={handleChangeAdType}/>
      </div>





    </div>
  );
}














