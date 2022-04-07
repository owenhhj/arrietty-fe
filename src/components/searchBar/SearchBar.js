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
  const ref = useRef();  // to bind text suggestion window
  const priceOrders = [null, 'asc', 'desc'];
  let filterPrice = {'type': 'price', 'priceOrder': 0, 'priceRange': [null, null]};
  let filterTag = {'type': 'tag', 'selectedOptions': []};
  const [keyword, setKeyword] = useState('');  // if not state --> callback not update
  const [tagOptions, setTagOptions] = useState([]);
  const [adType, setAdType] = useState('textbook');  // may need future refactoring
  const [showKeywordSuggest, setShowKeywordSuggest] = useState(false);
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
    setAdType(adType==='textbook'?'other':'textbook');
  }

  const handleKeywordSuggest = (i) => {
    let temp = keywordSuggest[i];
    setKeyword(temp);
    document.getElementById('inputKeyword').value = temp;
    setShowKeywordSuggest(false);
  }

  const handleFilterPrice = (e) => {
    filterPrice = e;
    handleSubmit();
  }

  const handleFilterTag = (e) => {
    filterTag = e;
    handleSubmit();
  }

  // todo potential delay --> setInterval as adListing scrolling?
  const handleKeywordInput = (e) => {
    let temp = e.target.value;
    setKeyword(temp);
    if (temp.length > 0) {  // API rejects empty string
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
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    setShowKeywordSuggest(false);
    let tags = [];
    filterTag.selectedOptions.forEach(idx => {
      tags.push(tagOptions[Number(idx)])
    })
    callback({
      'adType': adType,
      'keyword': keyword,
      'priceOrder': priceOrders[filterPrice.priceOrder],
      'minPrice': filterPrice.priceRange[0],
      'maxPrice': filterPrice.priceRange[1],
      'tag': tags.join(',').length>0 ? tags.join(',') : null
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















