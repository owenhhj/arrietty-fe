import SearchBarFilterPrice from "./SearchBarFilterPrice";
import SearchBarFilterTag from "./SearchBarFilterTag";
import SearchBarKeywordSuggest from "./SearchBarKeywordSuggest";
import './SearchBar.css';
import {useState, useEffect, useRef} from "react";
import {dataFetch} from "../common/common";

function SearchBar({
  callback=null
                   }) {
  const ROOT = 'https://localhost:8000/';
  const ref = useRef();
  const priceOrders = [null, 'asc', 'desc'];
  let filterPrice = {'type': 'price', 'priceOrder': 0, 'priceRange': [null, null]};
  let filterTag = {'type': 'tag', 'selectedOptions': []};
  const [keyword, setKeyword] = useState('');  // if not state --> callback not update
  const [tagOptions, setTagOptions] = useState([]);
  const [adType, setAdType] = useState('textbook');
  const [showKeywordSuggest, setShowKeywordSuggest] = useState(true);  // fixme change to false when finished
  const [keywordSuggest, setKeywordSuggest] = useState(['textbook1', 'textbook2', 'test']);

  // todo fetch tags onMount
  useEffect(() => {
    setTagOptions(['furniture', 'stationary', 'electronic', 'free']);
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
    setAdType(adType==='textbook'?'other':'textbook');  // todo back-end change 'other' to 'others'?
  }

  const handleKeywordSuggest = (i) => {
    let temp = keywordSuggest[i];
    setKeyword(temp);
    document.getElementById('inputKeyword').value = temp;
    setShowKeywordSuggest(false);
  }

  const handleFilterPrice = (e) => {
    filterPrice = e;
  }

  const handleFilterTag = (e) => {
    filterTag = e;
  }

  // todo potential delay --> setInterval as adListing scrolling?
  const handleKeywordInput = (e) => {
    let temp = e.target.value;
    setKeyword(e.target.value)
    console.log('handleInput keyword set as:', temp);
    dataFetch(
      `${ROOT}suggest?type=${adType}&keyword=${temp}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      },
      (r) => {
        setKeywordSuggest(r);
        setShowKeywordSuggest(true);
      },
      null
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    setShowKeywordSuggest(false);
    callback({
      'adType': adType,
      'keyword': keyword,
      'priceOrder': priceOrders[filterPrice.priceOrder],
      'minPrice': filterPrice.priceRange[0],
      'maxPrice': filterPrice.priceRange[1],
      'tag': filterTag.selectedOptions.join(',')
    });
  }

  return (
    <div className={'SearchBar card'}>

      <div className={'row-input-container'}>
        <div className={'row-input'}>

          <div className={'choose-tag clickable'} onClick={handleAdTypeChange}>
            <div className={'choose-tag-p-container'}>
              <p>{adType}</p>
            </div>
            <div className={'choose-tag-img-container'}>
              <img src="./change_circle_black_48dp.svg" alt=""/>
            </div>
          </div>

          <div className={'search-input'} ref={ref}>
            <input id={'inputKeyword'} type="text" placeholder={'want to purchase...'} onChange={handleKeywordInput} onKeyDown={handleKeyDown}/>
            {showKeywordSuggest && <SearchBarKeywordSuggest suggestions={keywordSuggest} callback={handleKeywordSuggest}/>}
          </div>
          <div className={'search-button clickable'} onClick={handleSubmit}>
            <img src="./search_black_48dp.svg" alt=""/>
          </div>
        </div>
      </div>

      <div className={'row-filters-container'}>
        <div className={'row-filters'}>
          <div className={'filter-label'}>
            <img src="./filter_alt_black_48dp.svg" alt=""/>
            <p>Filters</p>
          </div>
          <SearchBarFilterPrice callback={handleFilterPrice}/>
          {adType!=='textbook' && <SearchBarFilterTag options={tagOptions} callback={handleFilterTag}/>}
        </div>
      </div>

    </div>
  );
}

export default SearchBar;















