import './AdUploadFormMUI.css';
import {MUITextField, MUINumber, MUICheckbox, MUITagSelect, MUIButtonGroup, MUIButton} from "../common/MUIComponents";
import {useEffect, useRef, useState} from "react";
import {dataFetch, fileSizeCheck} from "../common/common";
import AdUploadFormDragDrop from "./AdUploadFormDragDrop";

let formData = new FormData();
let pledgeConfirmed = false;

export default function AdUploadFormMUIOther({
                                          toSwitchAdType,
                                          toSubmit
                                        }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const TAG = process.env.REACT_APP_API_TAG;
  const ref = useRef(null);
  const [otherTagData, setOtherTagData] = useState([]);
  const [valiAdTitle, setValiAdTitle] = useState({error: false, helperText: 'ad title between 1 and 99 characters...'});
  const [valiImage, setValiImage] = useState({error: false, helperText: 'one or more pictures needed...'});
  const [valiTagId, setValiTagId] = useState({error: false, helperText: 'select a tag...'});
  const [valiPrice, setValiPrice] = useState({error: false, helperText: 'advertised price between 0RMB and 9999RMB...'});
  const [valiComment, setValiComment] = useState({error: false, helperText: 'comment between 1 and 255 characters...'});
  const [valiPledge, setValiPledge] = useState({error: false, helperText: 'Please sign the pledge!'});
  const adType = 1;  // adType managed by parent, not here
  const adTypes = ['textbook', 'other'];

  useEffect(() => {
    dataFetch(
      `${ROOT}${TAG}?id=`,
      {method:"GET"},
      setOtherTagData,
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

  const handleChangeAdType = (e) => {
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
      if (value === null) {
        formData.delete('tagId');
        return;
      }
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
    if (!formData.get('adTitle') || formData.get('adTitle').length<1 || formData.get('adTitle').length>99) {
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
      Number(formData.get('price'))<0 || Number(formData.get('price'))>9999) {
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
        <p>Ad Type</p>
        <MUIButtonGroup labels={adTypes} selected={adType}
                        buttonStyle={{width: '6.5em', height:'2.8em'}} onChange={handleChangeAdType}/>
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Ad Title</p>
        <MUITextField
          identifier={'adTitle'} onChange={handleInputChange}
          error={valiAdTitle.error} helperText={valiAdTitle.error?valiAdTitle.helperText:''}
        />
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
          identifier={'tagId'} options={otherTagData.map(op => {return {label: op.name, id: op.id};})}
          onChange={handleInputChange}
        />
        {valiTagId.error && (
          <div className={'AdUploadFormMUI-row-pledge-alert'}>
            <p>{valiTagId.helperText}</p>
          </div>
        )}
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Price to sell at</p>
        <MUINumber
          identifier={'price'} onChange={handleInputChange}
          error={valiPrice.error}
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











