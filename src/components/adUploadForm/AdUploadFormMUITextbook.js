import './AdUploadFormMUI.css';
import {MUITextField, MUINumber, MUICheckbox, MUITagSelect, MUIButtonGroup, MUIButton} from "../common/MUIComponents";
import {useEffect, useRef, useState} from "react";
import {dataFetch} from "../common/common";
import AdUploadFormDragDrop from "./AdUploadFormDragDrop";
import TextbookSearchShowSelected from "./TextbookSearchShowSelected";

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

let formData = new FormData();
let pledgeConfirmed = false;

export default function AdUploadFormMUITextbook({
  toSwitchAdType,
  toSubmit
                                        }) {
  const ROOT = 'https://localhost:8000/';
  const ref = useRef(null);
  const [textbookData, setTextbookData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [selectedTextbook, setSelectedTextbook] = useState(null);
  const [valiAdTitle, setValiAdTitle] = useState({error: false, helperText: 'invalid entry...'});
  const [valiImage, setValiImage] = useState({error: false, helperText: 'one or more pictures needed...'})
  const [valiTagId, setValiTagId] = useState({error: false, helperText: 'invalid entry...'});
  const [valiPrice, setValiPrice] = useState({error: false, helperText: 'invalid entry...'});
  const [valiComment, setValiComment] = useState({error: false, helperText: 'invalid entry...'});
  const [valiPledge, setValiPledge] = useState({error: false, helperText: 'pledge not confirmed...'});
  const adType = 0;  // adType managed by parent, not here
  const adTypes = ['textbook', 'other'];
  // variable declaration moved to the outside of the component
  // let formData = new FormData();
  // let pledgeConfirmed = false;

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        toSwitchAdType(0);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

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
    toSwitchAdType(1);
  };

  const handleInputChange = (identifier, value) => {
    handleResetVali(identifier);
    if (identifier==='pledge') {
      pledgeConfirmed = value;
      return;
    }
    if (identifier==='images') {
      formData.delete('images');
      value.forEach((f) => {
        formData.append('images', f);
      });
      return;
    }
    if (identifier==='tagId') {
      setSelectedTextbook(value);
    }
    formData.set(identifier, value);
  };

  const handleResetVali = (identifier) => {
    if (identifier==='adTitle') {
      setValiAdTitle({...valiAdTitle, error: false});
    } else if (identifier==='images') {
      setValiImage({...valiImage, error: false});
    } else if (identifier==='tagId') {
      setValiTagId({...valiTagId, error: false});
    } else if (identifier==='price') {
      setValiPrice({...valiPrice, error: false});
    } else if (identifier==='comment') {
      setValiComment({...valiComment, error: false});
    } else if (identifier==='pledge') {
      setValiPledge({...valiPledge, error: false});
    }
  };

  const handleValidate = () => {
    let ans = true;
    if (!formData.get('adTitle') || formData.get('adTitle').length<1 || formData.get('adTitle').length>30) {
      setValiAdTitle({...valiAdTitle, error: true});
      ans = false;
    } else {setValiAdTitle({...valiAdTitle, error: false});}
    if (!formData.get('images') || formData.get('images').length<1) {
      setValiImage({...valiImage, error: true});
      ans = false;
    } else {setValiImage({...valiImage, error: false});}
    if (!formData.get('tagId')) {
      setValiTagId({...valiTagId, error: true});
      ans = false;
    } else {setValiTagId({...valiTagId, error: false});}
    if (!formData.get('price') || !/^[0-9]+$/.test((formData.get('price')).toString()) ||
      Number(formData.get('price'))<=0 || Number(formData.get('price'))>=1000) {
      setValiPrice({...valiPrice, error: true});
      ans = false;
    } else {setValiPrice({...valiPrice, error: false});}
    if (!formData.get('comment') || formData.get('comment').length>=100) {
      setValiComment({...valiComment, error: true});
      ans = false;
    } else {setValiComment({...valiComment, error: false});}
    if (!pledgeConfirmed) {
      setValiPledge({...valiPledge, error: true});
      ans = false;
    } else {setValiPledge({...valiPledge, error: false});}
    return ans;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.set('isTextbook', (adType===0).toString());
    if (handleValidate()) {
      toSubmit(formData);
    }
  };

  return (
    <div className={'AdUploadFormMUI card'} ref={ref}>

      <div className={'AdUploadFormMUI-row-title non-text'}>
        <p>New Advertisement</p>
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Ad Title</p>
        <MUITextField
          identifier={'adTitle'} onChange={handleInputChange}
          error={valiAdTitle.error} helperText={valiAdTitle.error?valiAdTitle.helperText:''}
        />
      </div>
      <div className={'AdUploadFormMUI-row'}>
        <MUIButtonGroup labels={adTypes} selected={adType}
                        buttonStyle={{width: '6.5em', height:'2.8em'}} onChange={handleChangeAdType}/>
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Picture(s)</p>
        <AdUploadFormDragDrop identifier={"images"} onChange={handleInputChange}/>
        {valiImage.error && (
          <div className={'AdUploadFormMUI-row-pledge-alert'}>
            <p>{valiImage.helperText}</p>
          </div>
        )}
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Select a tag</p>
        <MUITagSelect
          identifier={'tagId'} options={getTextbookData().map(op => {return {label: op.title, id: op.id};})}
          onChange={handleInputChange}
          error={valiTagId.error} helperText={valiTagId.error?valiTagId.helperText:''}
        />
        {selectedTextbook && (
          <TextbookSearchShowSelected selectedTextbook={getTextbookData().filter(op => op.id===selectedTextbook)[0]}/>
        )}
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Price to sell at</p>
        <MUINumber
          identifier={'price'} onChange={handleInputChange}
          error={valiPrice.error} helperText={valiPrice.error?valiPrice.helperText:''}
        />
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Comment</p>
        <MUITextField
          identifier={'comment'} size={'multiline'} onChange={handleInputChange}
          error={valiComment.error} helperText={valiComment.error?valiComment.helperText:''}
        />
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <MUICheckbox
          identifier={'pledge'} label={'I confirm that the ad information is accurate'} onChange={handleInputChange}
          error={valiPledge.error} helperText={valiPledge.error?valiPledge.helperText:''}
        />
        {valiPledge.error && (
          <div className={'AdUploadFormMUI-row-pledge-alert'}>
            <p>{valiPledge.helperText}</p>
          </div>
        )}
      </div>


      <div className={'AdUploadFormMUI-row-submit'}>
        <MUIButton label={'Submit'} variant={1} onClick={handleSubmit}/>
      </div>




    </div>
  );
}













