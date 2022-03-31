import './SearchBarFilterDropdown.css';
import {useState} from "react";

function SearchBarFilterDropdown({
  type='filterPrice',
  options=[],
  callback=null
                                 }) {
  const [priceRange, setPriceRange] = useState([null, null]);
  const [priceOrder, setPriceOrder] = useState(0);  // index --> `orders`
  const priceOrders = ['not set', 'lowest', 'highest']

  if (type === 'filterPrice') {
    const handleOrderChange = (e) => {
      e.preventDefault();
      setPriceOrder((priceOrder+1)%3);
      submitFilter();
    }

    const handlePriceInput = (e) => {
      e.preventDefault();
      if (e.target.id === 'rangeDown') {
        setPriceRange([e.target.value, priceRange[1]]);
      }
      if (e.target.id === 'rangeUp') {
        setPriceRange([priceRange[0], e.target.value]);
      }
      submitFilter();
    }

    const handleDone = (e) => {
      e.preventDefault();
    }

    const handleReset = (e) => {
      e.preventDefault();
      setPriceRange([null, null]);
      setPriceOrder(0);
      submitFilter();
    }

    const submitFilter = () => {
      callback({
        'type': type,
        'priceOrder': priceOrder,
        'priceRange': priceRange
      });
    }

    return (
      <div className={'SearchBarFilterDropdown dropdown-price'}>
        <div className={'row-order'} onClick={handleOrderChange}>
          <p>Order: {priceOrders[priceOrder]}</p>
          {priceOrder!==0 && <img src="./sort_black_48dp.svg" alt="" style={{transform: priceOrder===1?'scaleY(-1)':'none'}}/>}
        </div>
        <hr/>
        <div className={'row-input'}>
          <input type="number" id={'rangeDown'} min={0} onChange={handlePriceInput}/>
          <p>-</p>
          <input type="number" id={'rangeUp'} min={0} onChange={handlePriceInput}/>
        </div>
        <hr/>
        <div className={'row-buttons'}>
          <p onClick={handleDone}>Done</p>
          <p onClick={handleReset}>Reset</p>
        </div>
      </div>
    );
  }

  if (type === 'filterTag') {
    const map = new Map();

    const handleOptionToggle = (e) => {
      e.preventDefault();
      if (map.get(e.target.getAttribute('index'))) {
        map.set(e.target.getAttribute('index'), !map.get(e.target.getAttribute('index')));
      } else {
        map.set(e.target.getAttribute('index'), true);
      }
      submitFilter();
    }

    const handleReset = (e) => {
      e.preventDefault();
      map.clear();
      submitFilter();
    }

    const submitFilter = () => {
      let mapped = [];
      map.forEach((v, k) => {
        if (v) {
          mapped.push(options[Number(k)]);
        }
      });
      callback({
        'type': type,
        'selected': mapped
      });
    }

    return (
      <div className={'SearchBarFilterDropdown dropdown-tag'}>
        <div className={'row-options'}>
          {options.map((op, index) => {
            return (
              <div key={index} className={'option-entry'}>
                <p index={index} onClick={handleOptionToggle} className={map.get(index.toString())?'selected':''}>{op}</p>
              </div>
            );
          })}
        </div>
        <hr/>
        <div className={'row-buttons'}>
          <p onClick={handleReset}>Reset</p>
        </div>
      </div>
    );
  }



  return null;
}

export default SearchBarFilterDropdown;







































