import '../adUploadForm/AdUploadFormMUI.css';
import {useEffect, useRef, useState} from "react";
import {MUIButton, MUINumber, MUITextField} from "../common/MUIComponents";
import AdUploadFormDragDrop from "../adUploadForm/AdUploadFormDragDrop";
import TextbookSearchShowSelected from "../adUploadForm/TextbookSearchShowSelected";
import {fileSizeCheck} from "../common/common";

let formData = new FormData();

function MyPostsEditFormMUI({
                              adDataOriginal,
                              toClose,
                              toSubmit
                            }) {
  const ref = useRef(null);
  const [valiImage, setValiImage] = useState({error: false, helperText: 'one or more pictures needed...'})
  const [valiPrice, setValiPrice] = useState({error: false, helperText: 'within 1~999RMB...'});
  const [valiComment, setValiComment] = useState({error: false, helperText: 'comment of suitable length needed...'});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {toClose();}
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  const getTextbookData = () => {
    let needed = ['textbookTitle', 'isbn', 'author', 'edition', 'publisher', 'relatedCourse', 'originalPrice'];
    let ans = {};
    for (let k in adDataOriginal) {
      if (needed.includes(k)) {
        ans[k] = adDataOriginal[k];
      }
    }
    return ans;
  };

  const handleInputChange = (identifier, value) => {
    handleResetVali(identifier);
    if (identifier==='images') {
      formData.delete('images');
      value.forEach((f) => {
        formData.append('images', f);
      });
      return;
    }
    formData.set(identifier, value);
  };

  const handleResetVali = (identifier) => {
    if (identifier==='images') {
      setValiImage({...valiImage, error: false});
    } else if (identifier==='price') {
      setValiPrice({...valiPrice, error: false});
    } else if (identifier==='comment') {
      setValiComment({...valiComment, error: false});
    }
  };

  const handleValidate = () => {
    let ans = true;
    if (!formData.get('images')) {  // or, formData.getAll('images').length<1
      setValiImage({error: true, helperText: 'one or more pictures needed...'});
      ans = false;
    } else if (!fileSizeCheck(formData.getAll('images'))) {
      setValiImage({error: true, helperText: `Any picture must be smaller than ${process.env.REACT_APP_DEFAULT_IMAGE_SIZE}MB`});
      ans = false;
    } else {setValiImage({...valiImage, error: false});}
    if (formData.get('price') && (
      !/^[0-9]+$/.test((formData.get('price')).toString()) ||
      Number(formData.get('price'))<=0 || Number(formData.get('price'))>=1000
    )) {
      setValiPrice({...valiPrice, error: true});
      ans = false;
    } else {setValiPrice({...valiPrice, error: false});}
    if (formData.get('comment') && formData.get('comment').length>=100) {
      setValiComment({...valiComment, error: true});
      ans = false;
    } else {setValiComment({...valiComment, error: false});}
    return ans;
  };

  const handleFormSubmit = () => {
    if (handleValidate()) {
      toSubmit(formData);
    }
  };

  return (
    <div className={'AdUploadFormMUI card'} ref={ref}>

      <img className={'icon-close clickable-icon'} src="./close_black_48dp.svg" alt="" onClick={toClose}/>

      <div className={'AdUploadFormMUI-row-title non-text'}>
        <p>Edit Advertisement</p>
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Ad Title</p>
        <MUITextField
          identifier={'adTitle'} onChange={handleInputChange}
          placeholder={adDataOriginal.adTitle} readOnly={true}
        />
      </div>
      <div className={'AdUploadFormMUI-row'}>
        <MUIButton label={adDataOriginal.adType} variant={1}/>
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Picture(s)</p>
        <AdUploadFormDragDrop identifier={"images"} imageIdsOriginal={adDataOriginal.imageIds} onChange={handleInputChange}/>
        {valiImage.error && (
          <div className={'AdUploadFormMUI-row-pledge-alert'}>
            <p>{valiImage.helperText}</p>
          </div>
        )}
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Selected {adDataOriginal.adType}</p>
        {adDataOriginal.adType!=='textbook' && (
          <MUIButton label={adDataOriginal.otherTag ? adDataOriginal.otherTag : 'other'}/>
        )}
        {adDataOriginal.adType==='textbook' && (
          <TextbookSearchShowSelected selectedTextbook={getTextbookData()} dispTitle={true}/>
        )}
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Price to sell at</p>
        <MUINumber
          identifier={'price'} onChange={handleInputChange}
          placeholder={adDataOriginal.price}
          error={valiPrice.error} helperText={valiPrice.error?valiPrice.helperText:''}
        />
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Comment</p>
        <MUITextField
          identifier={'comment'} size={'multiline'} onChange={handleInputChange}
          placeholder={adDataOriginal.comment}
          error={valiComment.error} helperText={valiComment.error?valiComment.helperText:''}
        />
      </div>

      <div className={'AdUploadFormMUI-row-submit'}>
        <MUIButton label={'Submit'} variant={1} onClick={handleFormSubmit}/>
      </div>

    </div>
  );
}

export default MyPostsEditFormMUI;



