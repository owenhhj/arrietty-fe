import '../adUploadForm/AdUploadForm.css';
import Input from "../common/Input";
import AdUploadFormDragDrop from "../adUploadForm/AdUploadFormDragDrop";
import Button from "../common/Button";
import TextbookSearchShowSelected from "../adUploadForm/TextbookSearchShowSelected";
import {useEffect, useRef, useState} from "react";
import {dataFetch} from "../common/common";

function MyPostsEditForm({
  adDataOriginal={},
  toClose=null,
  toSubmit=null
                     }) {
  const ROOT = 'https://localhost:8000/';
  const [tagOri, setTagOri] = useState(null);
  const ref = useRef(null);
  let formData = new FormData();
  console.log(adDataOriginal)

  // useEffect(() => {
  //   if (adDataOriginal.adType !== 'textbook') {
  //     dataFetch(
  //       `${ROOT}otherTag?id=${adDataOriginal.tagId}`,
  //       {method: 'GET'},
  //       res => {
  //         setTagOri(res);
  //       },
  //       err => {console.warn(err);}
  //     );
  //   }
  // }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {toClose();}
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  // fixme wait for back-end to provide all textbook data, no need to fetch again
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
    if (identifier==='images') {
      formData.delete('images');
      value.forEach((f) => {
        formData.append('images', f);
      });
    } else {
      formData.set(identifier,value);
    }
  };

  const handleFormSubmit = () => {
    toSubmit(formData);
  };

  return (
    <div id={'adUploadComp'} className={"advertisement-upload-form card"} ref={ref}>
      <div className={"advertisement-upload-form-container"}>
        <div className={"form-row"}>
          <p className={"form-title"}>Edit Advertisement</p>
        </div>

        <div className={'form-row'}>
          <p className={'form-prompt'}>Ad Title</p>
          <Input type={'text'} identifier={'adTitle'} placeholder={adDataOriginal.adTitle}/>
        </div>

        <div className={"form-row"}>
          <p className={"form-prompt"}>Ad type</p>
          <div className={"ad-type-switch"} style={{width: '5rem'}}>
            <div className={"option-active non-text"} style={{width: '99%'}}>{adDataOriginal.adType}</div>
          </div>
        </div>

        <div className={"form-row"}>
          <p className={"form-prompt"}>Upload photos</p>
          <AdUploadFormDragDrop identifier={"images"} imageIdsOriginal={adDataOriginal.imageIds} onChange={handleInputChange}/>
        </div>

        <div className={"form-row textbook-search"}>
          {adDataOriginal.adType==='textbook' && <TextbookSearchShowSelected selectedTextbook={getTextbookData()}/>}
          {adDataOriginal.otherTag && <p className={'info-prompt'}>{adDataOriginal.otherTag}</p>}
        </div>

        <div className={"form-row"}>
          <div className={"pricing-row"}>
            <Input type={"price"} identifier={"price"} inputSize={"large"} placeholder={adDataOriginal.price} onChange={handleInputChange}/>
            <p>RMB</p>
          </div>
        </div>

        <div className={"form-row comment"}>
          <p className={"form-prompt"}>Additional comment</p>
          <Input type={"text"} identifier={"comment"} inputSize={"extra-large"} placeholder={adDataOriginal.comment} onChange={handleInputChange}/>
        </div>

        <div className={"button-row"}>
          <Button text={"Submit"} buttonStyle={"btn--primary"} buttonSize={"btn--large"} onClick={handleFormSubmit}/>
        </div>

      </div>

      <svg className={"cancel-btn"} onClick={()=>{toClose()}} width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
        <path d="m374.5 280 180.25-180.25c7-7 7-17.5 0-24.5s-17.5-7-24.5 0l-180.25 180.25-180.25-180.25c-7-7-17.5-7-24.5 0s-7 17.5 0 24.5l180.25 180.25-180.25 180.25c-7 7-7 17.5 0 24.5 3.5 3.5 7 5.25 12.25 5.25s8.75-1.75 12.25-5.25l180.25-180.25 180.25 180.25c3.5 3.5 8.75 5.25 12.25 5.25s8.75-1.75 12.25-5.25c7-7 7-17.5 0-24.5z"/>
      </svg>
    </div>
  );
}

export default MyPostsEditForm;




