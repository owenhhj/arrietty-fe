import './SearchBarFilterDropdown.css';
import {useState} from "react";

function SearchBarFilterPriceDropdown({
  type='price',
  priceRangeParent=[null, null],
  priceOrderParent=0,
  callback=null
                                      }) {
  const [priceRange, setPriceRange] = useState(priceRangeParent);
  const [priceOrder, setPriceOrder] = useState(priceOrderParent);  // index --> `orders`
  const priceOrders = ['not set', 'lowest', 'highest'];

  const handleOrderChange = (e) => {
    e.preventDefault();
    setPriceOrder((priceOrder+1)%3);
  }

  const handlePriceInput = (e) => {
    e.preventDefault();
    let tempRange = priceRange;
    if (e.target.id === 'rangeDown') {
      tempRange[0] = e.target.value;
    } else {
      tempRange[1] = e.target.value;
    }
    setPriceRange(tempRange);
  }

  const handleDone = (e) => {
    e.preventDefault();
    callback({
      'type': type,
      'priceOrder': priceOrder,
      'priceRange': priceRange
    });
  }

  const handleReset = (e) => {
    e.preventDefault();
    callback({
      'type': type,
      'priceOrder': 0,
      'priceRange': [null, null]
    });
  }

  return (
    <div className={'SearchBarFilterDropdown dropdown-price'}>
      <div className={'row-order clickable'} onClick={handleOrderChange}>
        <p>Order: {priceOrders[priceOrder]}</p>
        {priceOrder!==0 && <img src="./sort_black_48dp.svg" alt="" style={{transform: priceOrder===1?'scaleY(-1)':'none'}}/>}
      </div>
      <hr/>
      <div className={'row-input'}>
        <input type="number" id={'rangeDown'} min={0} onChange={handlePriceInput} placeholder={priceRange[0]}/>
        <p>-</p>
        <input type="number" id={'rangeUp'} min={0} onChange={handlePriceInput} placeholder={priceRange[1]}/>
      </div>
      <hr/>
      <div className={'row-buttons'}>
        <p className={'primary clickable'} onClick={handleDone}>Done</p>
        <p className={'clickable'} onClick={handleReset}>Reset</p>
      </div>
    </div>
  );
}

export default SearchBarFilterPriceDropdown;














