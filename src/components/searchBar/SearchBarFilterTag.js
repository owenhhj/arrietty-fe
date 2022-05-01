import './SearchBar.css'
import SearchBarFilterTagDropdown from "./SearchBarFilterTagDropdown";
import {useEffect, useState, useRef} from "react";

function SearchBarFilterTag({
  type='tag',
  options=['text?book'],
  callback=null
                            }) {
  console.assert(type==='tag');
  const ref = useRef(null);
  const [showFilterTag, setShowFilterTag] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowFilterTag(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  const handleFilterTag = (e) => {
    setSelectedOptions(e.selectedOptions);
    callback(e);
    setShowFilterTag(false);
  }

  const getFilterStyle = () => {
    if (showFilterTag) {
      return {
        backgroundColor: '#DBDBDB'
      };
    } else {return {};}
  }

  return (
    <div className={'choose-filter-container'} ref={ref}>
      <div className={'choose-filter clickable-btn'} onClick={()=>{setShowFilterTag(!showFilterTag)}} style={{...getFilterStyle(), width:'3em'}}>
        <p>{'tag'}</p>
        <div className={'choose-filter-svg-container'}>
          <img src="./expand_more_black_48dp.svg" alt=""/>
        </div>
      </div>
      {showFilterTag && <SearchBarFilterTagDropdown type={type} options={options} selectedOptionsParent={selectedOptions} callback={handleFilterTag}/>}
    </div>
  );
}

export default SearchBarFilterTag;















