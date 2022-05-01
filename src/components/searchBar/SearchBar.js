import SearchBarFilterPrice from "./SearchBarFilterPrice";
import SearchBarFilterTag from "./SearchBarFilterTag";
import SearchBarKeywordSuggest from "./SearchBarKeywordSuggest";
import './SearchBar.css';
import {useState, useEffect, useRef} from "react";
import {dataFetch} from "../common/common";

const fakeTagOptions = ['furniture', 'stationary', 'electronic', 'free'];

function SearchBar({
                     callback
                   }) {
  const ROOT = process.env.REACT_APP_URL_ROOT;
  const ref = useRef();  // to bind text suggestion window
  const priceOrders = [null, 'asc', 'desc'];
  let filterPrice = {'type': 'price', 'priceOrder': 0, 'priceRange': [null, null]};
  let filterTag = {'type': 'tag', 'selectedOptions': []};
  const [keyword, setKeyword] = useState('');  // if not state --> callback not update
  const [tagOptions, setTagOptions] = useState([]);
  const adTypes = ['textbook', 'other'];
  const [adType, setAdType] = useState(0);
  const [showKeywordSuggest, setShowKeywordSuggest] = useState(false);
  const [keywordSuggest, setKeywordSuggest] = useState(['textbook1', 'textbook2', 'test']);

  useEffect(() => {
    // setTagOptions(fakeTagOptions);
    dataFetch(
      `${ROOT}otherTag?id=`,
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

  // todo adTypeChange cannot refresh: component forced to reMount
  const handleAdTypeChange = () => {
    let newType = 1-adType;
    setAdType(newType);
    // handleSubmit(newType);
  };

  const handleKeywordSuggest = (i) => {
    let temp = keywordSuggest[i];
    setKeyword(temp);
    document.getElementById('inputKeyword').value = temp;
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
    let temp = e.target.value;
    setKeyword(temp);
    if (temp.length > 0) {  // API rejects empty string
      dataFetch(
        `${ROOT}suggest?type=${adTypes[adType]}&keyword=${temp}`,
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

  const handleSubmit = (newType=null) => {
    setShowKeywordSuggest(false);
    let tags = [];
    filterTag.selectedOptions.forEach(idx => {
      tags.push(tagOptions[Number(idx)])
    });
    callback({
      'adType': adTypes[adType],
      'keyword': keyword,
      'priceOrder': priceOrders[filterPrice.priceOrder],
      'minPrice': filterPrice.priceRange[0],
      'maxPrice': filterPrice.priceRange[1],
      'tag': tags.length>0 ? tags.join(',') : null
    });
  };

  return (
    <div className={'SearchBar card'}>

      <div className={'row-input-container'}>
        <div className={'row-input'}>

          <div className={'choose-tag clickable-btn'} onClick={handleAdTypeChange}>
            <div className={'choose-tag-p-container'}>
              <p>{adTypes[adType]}</p>
            </div>
            <div className={'choose-tag-img-container'}>
              <img src="./change_circle_black_48dp.svg" alt=""/>
            </div>
          </div>

          <div className={'search-input'} ref={ref}>
            <input
              id={'inputKeyword'} type="text" placeholder={'want to purchase...'}
              onChange={handleKeywordInput} onKeyDown={handleKeyDown}
            />
            {showKeywordSuggest && (
              <SearchBarKeywordSuggest suggestions={keywordSuggest} callback={handleKeywordSuggest}/>
            )}
          </div>
          <div className={'search-button clickable-icon'} onClick={handleSubmit}>
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
          {adType !== 0 && <SearchBarFilterTag options={tagOptions} callback={handleFilterTag}/>}
        </div>
      </div>

    </div>
  );
}

export default SearchBar;















