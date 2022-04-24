import '../adUploadForm/AdUploadFormMUI.css';
import {useEffect, useRef, useState} from "react";
import {MUIButton, MUINumber, MUITextField} from "../common/MUIComponents";
import AdUploadFormDragDrop from "../adUploadForm/AdUploadFormDragDrop";
import TextbookSearchShowSelected from "../adUploadForm/TextbookSearchShowSelected";

let formData = new FormData();

function MyPostsEditFormMUI({
                              adDataOriginal,
                              toClose,
                              toSubmit
                            }) {
  const ref = useRef(null);
  const [valiAdTitle, setValiAdTitle] = useState({error: false, helperText: 'invalid entry...'});
  const [valiImage, setValiImage] = useState({error: false, helperText: 'one or more pictures needed...'})
  const [valiPrice, setValiPrice] = useState({error: false, helperText: 'invalid entry...'});
  const [valiComment, setValiComment] = useState({error: false, helperText: 'invalid entry...'});

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
    let needed = ['isbn', 'author', 'edition', 'publisher', 'relatedCourse', 'originalPrice'];
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
    if (identifier==='adTitle') {
      setValiAdTitle({...valiAdTitle, error: false});
    } else if (identifier==='images') {
      setValiImage({...valiImage, error: false});
    } else if (identifier==='price') {
      setValiPrice({...valiPrice, error: false});
    } else if (identifier==='comment') {
      setValiComment({...valiComment, error: false});
    }
  };

  const handleFormSubmit = () => {
    toSubmit(formData);
  };

  return (
    <div className={'AdUploadFormMUI card'} ref={ref}>

      <div className={'AdUploadFormMUI-row-title non-text'}>
        <p>Edit Advertisement</p>
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Ad Title</p>
        <MUITextField
          identifier={'adTitle'} onChange={handleInputChange}
          error={valiAdTitle.error} helperText={valiAdTitle.error?valiAdTitle.helperText:''}
        />
      </div>
      <div className={'AdUploadFormMUI-row'}>
        <MUIButton label={adDataOriginal.isTextbook?'textbook':'other'}/>
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Picture(s)</p>
        {/*<AdUploadFormDragDrop identifier={"images"} onChange={handleInputChange}/>*/}
        {valiImage.error && (
          <div className={'AdUploadFormMUI-row-pledge-alert'}>
            <p>{valiImage.helperText}</p>
          </div>
        )}
      </div>

      <div className={'AdUploadFormMUI-row'}>
        <p>Selected tag</p>
        {/*<MUITagSelect*/}
        {/*  identifier={'tagId'} options={getTextbookData().map(op => {return {label: op.title, id: op.id};})}*/}
        {/*  onChange={handleInputChange}*/}
        {/*  error={valiTagId.error} helperText={valiTagId.error?valiTagId.helperText:''}*/}
        {/*/>*/}
        {adDataOriginal.isTextbook && (
          <TextbookSearchShowSelected selectedTextbook={getTextbookData()}/>
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

      <div className={'AdUploadFormMUI-row-submit'}>
        <MUIButton label={'Submit'} variant={1} onClick={handleFormSubmit}/>
      </div>

    </div>
  );
}

export default MyPostsEditFormMUI;



