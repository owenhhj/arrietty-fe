import './AdUploadFormMUI.css';
import {MUITextField, MUINumber, MUICheckbox, MUITagSelect, MUIButtonGroup, MUIButton} from "../common/MUIComponents";
import {useEffect, useState} from "react";
import {dataFetch} from "../common/common";
import AdUploadFormDragDrop from "./AdUploadFormDragDrop";

// const defaultInputValid = {
//   adTitle: {error: false, helperText: 'invalid entry...'},
//   adTitle: {error: false, helperText: 'invalid entry...'},
//   adTitle: {error: false, helperText: 'invalid entry...'},
// };

export default function AdUploadFormMUI({
  toSwitchAdType,
  toSubmit
                                        }) {
  const ROOT = 'https://localhost:8000/';
  const [textbookData, setTextbookData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  // const [inputValid, setInputValid] = useState({});
  const [valiAdTitle, setValiAdTitle] = useState({error: false, helperText: 'invalid entry...'});
  const [valiTagId, setValiTagId] = useState({error: false, helperText: 'invalid entry...'});
  const [valiPrice, setValiPrice] = useState({error: false, helperText: 'invalid entry...'});
  const [valiComment, setValiComment] = useState({error: false, helperText: 'invalid entry...'});
  const adType = 0;  // adType managed by parent, not here
  const adTypes = ['textbook', 'other'];
  let formData = new FormData();

  useEffect(() => {
    dataFetch(
      `${ROOT}textbook?id=`,
      {method:"GET"},
      setTextbookData,
      null
    );
    dataFetch(
      `${ROOT}course?id=`,
      {method:"GET"},
      setCourseData,
      null
    );
  }, []);

  const getTextbookData = () => {
    let ret = textbookData;
    let courseMap = new Map();
    for(let i=0; i<courseData.length; i++){
      courseMap.set(courseData[i].id, courseData[i].courseCode);
    }
    for(let j=0; j<ret.length; j++){
      ret[j].relatedCourse = courseMap.get(ret[j].courseId);
    }
    return ret;
  };

  const handleChangeAdType = (i) => {
    // todo toParent
    console.log('handleChangeAdType');
    toSwitchAdType(adTypes[1-adType]);
  };

  const handleInputChange = (identifier, value) => {
    console.log('handleInputChange', identifier, value);
    if (identifier==='images') {
      formData.delete('images');
      value.forEach((f) => {
        formData.append('images', f);
      });
      return;
    }
    formData.set(identifier, value);
  };

  // todo 与后端确认有哪些限制
  const handleValidate = () => {
    let ans = true;
    if (!formData.get('adTitle') || formData.get('adTitle').length<1 || formData.get('adTitle').length>30) {
      setValiAdTitle({...valiAdTitle, error: true});
      ans = false;
    }
    console.log('dasjiooooooooo', formData.get('tagId'))
    if (!formData.get('tagId')) {
      console.log('afeodjoiawejiofjaweiofjioawjeiof')
      setValiTagId({...valiTagId, error: true})
    }

    return ans;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.set('isTextbook', (adType===0).toString());
    for (let pair of formData.entries()) {
      console.log('>>>', pair[0], pair[1]);
    }
    // todo validate

    console.log('handleValidate', handleValidate());

    // toSubmit(formData);
  };

  const fakeOptions = [
    {
      "id": 1,
      "title": "textbook1",
      "isbn": "123-456",
      "author": "Owen H",
      "publisher": "Owen's Publisher",
      "edition": "3",
      "originalPrice": 100,
      "courseId": 1,
      "relatedCourse": "coursecode1"
    },
    {
      "id": 2,
      "title": "textbook2",
      "isbn": "223-456",
      "author": "Owen H2",
      "publisher": "Owen's Publisher2",
      "edition": "3",
      "originalPrice": 100,
      "courseId": 2,
      "relatedCourse": "coursecode2"
    },
    {
      "id": 3,
      "title": "test",
      "isbn": "223-45623",
      "author": "test",
      "publisher": "test Publisher2",
      "edition": "3",
      "originalPrice": 200,
      "courseId": 2,
      "relatedCourse": "coursecode2"
    },
    {
      "id": 4,
      "title": "Computation Theory",
      "isbn": "123-433983489",
      "author": "Robert",
      "publisher": "Publisher",
      "edition": "666",
      "originalPrice": 9,
      "courseId": 4,
      "relatedCourse": "CSCISHU-101"
    },
    {
      "id": 5,
      "title": "Computer Networking",
      "isbn": "456-32934",
      "author": "P.S.",
      "publisher": "NYUSH",
      "edition": "4",
      "originalPrice": 999,
      "courseId": 5,
      "relatedCourse": "CSCISHU-301"
    },
    {
      "id": 6,
      "title": "Linear Algebra Book",
      "isbn": "324-658348",
      "author": "Mr. Linear",
      "publisher": "Algebra",
      "edition": "6",
      "originalPrice": 314,
      "courseId": 7,
      "relatedCourse": "MATHSHU-201"
    },
    {
      "id": 7,
      "title": "Intro to Computer Science Book",
      "isbn": "5443-2387932457",
      "author": "Robert",
      "publisher": "ICS Publisher Company",
      "edition": "6",
      "originalPrice": 200,
      "courseId": 5,
      "relatedCourse": "CSCISHU-301"
    }
  ];

  return (
    <div className={'AdUploadFormMUI card'}>

      <div className={'AdUploadFormMUI-row'}>
        <MUITextField
          identifier={'adTitle'} onChange={handleInputChange}
          error={valiAdTitle.error} helperText={valiAdTitle.error?valiAdTitle.helperText:''}
        />
      </div>
      <div>
        <MUIButtonGroup labels={adTypes} selected={adType}
                        buttonStyle={{width: '6.5em', height:'2.8em'}} onChange={handleChangeAdType}/>
      </div>

      <div>
        <AdUploadFormDragDrop identifier={"images"} onChange={handleInputChange}/>
      </div>

      <div>
        <MUITagSelect
          identifier={'tagId'} options={fakeOptions.map(op => {return {label: op.title, id: op.id};})}
          onChange={handleInputChange}
          error={valiTagId.error} helperText={valiTagId.error?valiTagId.helperText:''}
        />
      </div>

      <div>
        <MUINumber identifier={'price'} onChange={handleInputChange}/>
      </div>

      <div>
        <MUITextField identifier={'comment'} size={'multiline'} onChange={handleInputChange}/>
      </div>

      <div>
        <MUICheckbox label={'I confirm that the ad information is accurate'}/>
      </div>

      <div>
        <MUIButton label={'Submit'} variant={1} onClick={handleSubmit}/>
      </div>



    </div>
  );
}














