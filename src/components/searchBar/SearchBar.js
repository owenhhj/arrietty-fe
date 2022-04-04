import SearchBarFilterPrice from "./SearchBarFilterPrice";
import SearchBarFilterTag from "./SearchBarFilterTag";
import './SearchBar.css';
import {useState, useEffect} from "react";

function SearchBar({
  callback=null
                   }) {
  let filterPrice = {'type': 'price', 'priceOrder': 0, 'priceRange': [null, null]};
  let filterTag = {'type': 'tag', 'selectedOptions': []};
  let keyword = '';
  const priceOrders = [null, 'asc', 'desc'];
  const [tagOptions, setTagOptions] = useState([]);
  const [adType, setAdType] = useState('textbook');
  const [showAdTypeDropdown, setShowAdTypeDropdown] = useState(false);

  useEffect(() => {
    setTagOptions(['textbook', 'furniture', 'stationary', 'electronic']);
  }, []);

  const handleAdTypeChange = () => {
    setAdType(adType==='textbook'?'others':'textbook');
  }

  const handleFilterPrice = (e) => {
    filterPrice = e;
  }

  const handleFilterTag = (e) => {
    filterTag = e;
  }

  const handleKeywordInput = (e) => {
    keyword = e.target.value;  // todo pending back-end update to accept null
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
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
              <img src="./change_circle_black_48dp.svg" alt=""/>{/*<img src="./expand_more_black_48dp.svg" alt=""/>*/}
            </div>
          </div>

          <div className={'search-input'}>
            <input type="text" placeholder={'want to purchase...'} onChange={handleKeywordInput} onKeyDown={handleKeyDown}/>
            {/* todo add search suggestions window */}
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

function AdTypeDropdown() {
  const getStyle = () => {
    return {
      width: '50px',
      height: '50px',
      position: 'absolute'
    }
  }

  return (
    <div className={'choose-tag-dropdown'} style={getStyle()}>
      <p>others</p>
    </div>
  );
}

export default SearchBar;















