import './AdUploadFormMUI.css';
import {MUITextField, MUINumber, MUICheckbox, MUITagSelect, MUIButtonGroup, MUIButton} from "../common/MUIComponents";
import {useEffect, useRef, useState} from "react";
import {dataFetch, fileSizeCheck} from "../common/common";
import AdUploadFormDragDrop from "./AdUploadFormDragDrop";
import TextbookSearchShowSelected from "./TextbookSearchShowSelected";

// local variable (form) declaration moved to the outside to deal with component remount
let formData = new FormData();
let pledgeConfirmed = false;

export default function AdUploadFormMUITextbook({
  toSwitchAdType,
  toSubmit
                                        }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const COURSE = process.env.REACT_APP_API_COURSE;
  const TEXTBOOK = process.env.REACT_APP_API_TEXTBOOK;
  const ref = useRef(null);
  const [textbookData, setTextbookData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [selectedTextbook, setSelectedTextbook] = useState(null);
  const [valiAdTitle, setValiAdTitle] = useState({error: false, helperText: 'ad title between 1 and 31 characters...'});
  const [valiImage, setValiImage] = useState({error: false, helperText: 'one or more pictures needed...'});
  const [valiTagId, setValiTagId] = useState({error: false, helperText: 'select a textbook...'});
  const [valiPrice, setValiPrice] = useState({error: false, helperText: 'advertised price between 1RMB and 999RMB...'});
  const [valiComment, setValiComment] = useState({error: false, helperText: 'comment between 1 and 255 characters...'});
  const [valiPledge, setValiPledge] = useState({error: false, helperText: 'Please sign the pledge!'});
  const adType = 0;  // adType managed by parent, not here
  const adTypes = ['textbook', 'other'];

  useEffect(() => {
    dataFetch(
      `${ROOT}${TEXTBOOK}?id=`,
      {method:"GET"},
      setTextbookData,
      null
    );
    dataFetch(
      `${ROOT}${COURSE}?id=`,
      {method:"GET"},
      setCourseData,
      null
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handleClose();
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
    if (!formData.get('adTitle') || formData.get('adTitle').length<1 || formData.get('adTitle').length>31) {
      setValiAdTitle({...valiAdTitle, error: true});
      ans = false;
    } else {setValiAdTitle({...valiAdTitle, error: false});}
    if (!formData.get('images')) {  // or, formData.getAll('images').length<1
      setValiImage({error: true, helperText: 'one or more pictures needed...'});
      ans = false;
    } else if (!fileSizeCheck(formData.getAll('images'))) {
      setValiImage({error: true, helperText: `Any picture must be smaller than ${process.env.REACT_APP_DEFAULT_IMAGE_SIZE}MB`});
      ans = false;
    } else {setValiImage({...valiImage, error: false});}
    if (!formData.get('tagId')) {
      setValiTagId({...valiTagId, error: true});
      ans = false;
    } else {setValiTagId({...valiTagId, error: false});}
    if (!formData.get('price') || !/^[0-9]+$/.test((formData.get('price')).toString()) ||
      Number(formData.get('price'))<1 || Number(formData.get('price'))>999) {
      setValiPrice({...valiPrice, error: true});
      ans = false;
    } else {setValiPrice({...valiPrice, error: false});}
    if (!formData.get('comment') || formData.get('comment').length<1 || formData.get('comment').length>255) {
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

  const handleClose = () => {
    toSwitchAdType(0);
  };

  return (
    <div className={'AdUploadFormMUI card'} ref={ref}>

      <img className={'icon-close clickable-icon'} src="./close_black_48dp.svg" alt="" onClick={handleClose}/>

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
        <p>Ad Type</p>
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
        <p>Select a textbook</p>
        <MUITagSelect
          identifier={'tagId'} options={getTextbookData().map(op => {return {label: op.title, id: op.id};})}
          onChange={handleInputChange}
        />
        {valiTagId.error && (
          <div className={'AdUploadFormMUI-row-pledge-alert'}>
            <p>{valiTagId.helperText}</p>
          </div>
        )}
        {selectedTextbook && (
          <TextbookSearchShowSelected selectedTextbook={getTextbookData().filter(op => op.id===selectedTextbook)[0]}/>
        )}
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Price to sell at</p>
        <MUINumber
          identifier={'price'} onChange={handleInputChange}
          error={valiPrice.error}
          // helperText={valiPrice.error?valiPrice.helperText:''}  // too long for MUI built-in prompt to display
        />
        {valiPrice.error && (
          <div className={'AdUploadFormMUI-row-pledge-alert'}>
            <p>{valiPrice.helperText}</p>
          </div>
        )}
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














