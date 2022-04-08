import './SearchBar.css';
import SearchBarFilterPriceDropdown from "./SearchBarFilterPriceDropdown";
import {useState, useRef, useEffect} from "react";

function SearchBarFilterPrice({
  type='price',
  priceOrderParent=0,
  priceRangeParent=[null, null],
  callback=null
                              }) {
  console.assert(type==='price');
  const ref = useRef();
  const [showFilterPrice, setShowFilterPrice] = useState(false);
  const [priceRange, setPriceRange] = useState(priceRangeParent);
  const [priceOrder, setPriceOrder] = useState(priceOrderParent);
  // todo state necessary? or pass callback through middle component without local manipulation

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowFilterPrice(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  }, [ref]);

  const handleFilterPrice = (e) => {
    setShowFilterPrice(false);
    setPriceRange(e.priceRange);
    setPriceOrder(e.priceOrder);
    callback(e);
  }

  const getFilterStyle = () => {
    if (showFilterPrice) {
      return {
        backgroundColor: '#DBDBDB'
      };
    } else {return {};}
  }

  return (
    <div className={'choose-filter-container'} ref={ref}>
      <div className={'choose-filter clickable'} onClick={()=>{setShowFilterPrice(!showFilterPrice)}} style={getFilterStyle()}>
        <p>{'price'}</p>
        <div className={'choose-filter-svg-container'}>
          <img src="./expand_more_black_48dp.svg" alt=""/>
        </div>
      </div>
      {showFilterPrice && <SearchBarFilterPriceDropdown type={type} priceOrderParent={priceOrder} priceRangeParent={priceRange} callback={handleFilterPrice}/>}
    </div>
  );
}

export default SearchBarFilterPrice;














