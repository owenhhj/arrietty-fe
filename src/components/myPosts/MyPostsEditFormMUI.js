import '../adUploadForm/AdUploadFormMUI.css';
import {useEffect, useRef, useState} from "react";
import {MUIButton, MUINumber, MUITextField} from "../common/MUIComponents";
import AdUploadFormDragDrop from "../adUploadForm/AdUploadFormDragDrop";
import TextbookSearchShowSelected from "../adUploadForm/TextbookSearchShowSelected";
import {dataFetch} from "../common/common";

let formData = new FormData();

function MyPostsEditFormMUI({
                              adDataOriginal,
                              toClose,
                              toSubmit
                            }) {
  const ROOT = 'https://localhost:8000/';
  const ref = useRef(null);
  const [tagName, setTagName] = useState('nulltag');
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

  useEffect(() => {
    if (!adDataOriginal.isTextbook) {
      dataFetch(
        `${ROOT}otherTag?id=${adDataOriginal.tagId}`,
        {method: 'GET'},
        res => {
          console.log('tagId get returned', res)
          setTagName(res);
        },
        null
      )
    }
  }, []);

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
    if (!formData.get('images') || formData.get('images').length<1) {
      setValiImage({...valiImage, error: true});
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
        <MUIButton label={adDataOriginal.isTextbook?'textbook':'other'} variant={1}/>
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
        <p>Selected {adDataOriginal.isTextbook?'textbook':'tag'}</p>
        {!adDataOriginal.isTextbook && (
          <MUIButton label={tagName}/>
        )}
        {adDataOriginal.isTextbook && (
          <TextbookSearchShowSelected selectedTextbook={getTextbookData()}/>
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


