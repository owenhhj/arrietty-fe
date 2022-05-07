import SearchBarFilterPrice from "./SearchBarFilterPrice";
import SearchBarFilterTag from "./SearchBarFilterTag";
import SearchBarKeywordSuggest from "./SearchBarKeywordSuggest";
import './SearchBar.css';
import {useState, useEffect, useRef} from "react";
import {capFirstLetter, dataFetch} from "../common/common";

// defined outside to deal with React forcing the component to re-mount, may try useState & pass to filter as props
let filterPrice = {'type': 'price', 'priceOrder': 0, 'priceRange': [null, null]};
let filterTag = {'type': 'tag', 'selectedOptions': []};

function SearchBar({
                     adType,
                     setAdType,
                     callback
                   }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const SUGGEST = process.env.REACT_APP_API_SUGGEST;
  const TAG = process.env.REACT_APP_API_TAG;
  const ref = useRef();  // to bind text suggestion window
  const priceOrders = [null, 'asc', 'desc'];
  const [keyword, setKeyword] = useState('');  // if not state --> callback not update
  const [tagOptions, setTagOptions] = useState([]);
  const [showKeywordSuggest, setShowKeywordSuggest] = useState(false);
  const [keywordSuggest, setKeywordSuggest] = useState([]);

  useEffect(() => {
    dataFetch(
      `${ROOT}${TAG}?id=`,
      {method: 'GET'},
      res => {
        setTagOptions(res.map(ob => ob.name));
      },
      null
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowKeywordSuggest(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  const handleAdTypeChange = () => {
    let newType = adType === 'textbook' ? 'other' : 'textbook';
    setAdType(newType);
    setKeyword('')
    handleSubmit(newType, '');
  };

  const handleKeywordSuggest = (i) => {
    let temp = keywordSuggest[i];
    setKeyword(temp);
    handleSubmit(null, temp);
    setShowKeywordSuggest(false);
  };

  const handleFilterPrice = (e) => {
    filterPrice = e;
    handleSubmit();
  };

  const handleFilterTag = (e) => {
    filterTag = e;
    handleSubmit();
  };

  // potential delay --> setInterval as `adListing` scrolling?
  const handleKeywordInput = (e) => {
    let temp = e.target.value ? e.target.value : '';
    setKeyword(temp);
    if (temp.length > 0) {  // API rejects empty string
      dataFetch(
        `${ROOT}${SUGGEST}?type=${adType}&keyword=${temp}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
        },
        (r) => {
          setKeywordSuggest(r);
          setShowKeywordSuggest(true);
        },
        null
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = (newType = null, newKeyword = null) => {
    setShowKeywordSuggest(false);
    let tags = [];
    filterTag.selectedOptions.forEach(idx => {
      tags.push(tagOptions[Number(idx)])
    });
    callback({
      'adType': newType !== null ? newType : adType,
      'keyword': (newKeyword !== null ? newKeyword : keyword).trim(),
      'priceOrder': priceOrders[filterPrice.priceOrder],
      'minPrice': filterPrice.priceRange[0] ? filterPrice.priceRange[0] : -1,  // back-end not accept both null
      'maxPrice': filterPrice.priceRange[1] ? filterPrice.priceRange[1] : 100000,  // lazy avoidance here
      'tag': tags.length > 0 ? tags.join(',') : null
    });
  };

  return (
    <div className={'SearchBar card'}>

      <div className={'row-input-container'}>
        <div className={'row-input'}>

          <div className={'choose-tag clickable-btn'} onClick={handleAdTypeChange}>
            <div className={'choose-tag-p-container'}>
              <p>{capFirstLetter(adType)}</p>
            </div>
            <div className={'choose-tag-img-container'}>
              <img src="./change_circle_black_48dp.svg" alt=""/>
            </div>
          </div>

          <div className={'search-input'} ref={ref}>
            <input
              id={'inputKeyword'} type="text" placeholder={'want to purchase...'}
              value={keyword}
              onChange={handleKeywordInput} onKeyDown={handleKeyDown}
            />
            {showKeywordSuggest && (
              <SearchBarKeywordSuggest suggestions={keywordSuggest} callback={handleKeywordSuggest}/>
            )}
          </div>
          <div className={'search-button clickable-icon'} onClick={() => {handleSubmit()}}>
            <img src="./search_black_48dp.svg" alt=""/>
          </div>
        </div>
      </div>

      <div className={'row-filters-container'}>
        <div className={'row-filters'}>
          <div className={'filter-label non-text'}>
            <img src="./filter_alt_black_48dp.svg" alt=""/>
            <p>Filters</p>
          </div>
          <SearchBarFilterPrice callback={handleFilterPrice}/>
          {adType === 'other' && <SearchBarFilterTag options={tagOptions} callback={handleFilterTag}/>}
        </div>
      </div>

    </div>
  );
}

export default SearchBar;















