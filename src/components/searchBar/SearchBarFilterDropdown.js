import './SearchBarFilterDropdown.css';
import {useState} from "react";

function SearchBarFilterDropdown({
  type='filterPrice',
  options=[],
  callback=null
                                 }) {
  if (type === 'filterPrice') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [priceRange, setPriceRange] = useState([null, null]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [priceOrder, setPriceOrder] = useState(0);  // index --> `orders`
    const priceOrders = ['not set', 'lowest', 'highest'];

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
        <div className={'row-order clickable'} onClick={handleOrderChange}>
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
          {/*<p className={'clickable'} onClick={handleDone}>Done</p>*/}
          <p className={'clickable'} onClick={handleReset}>Reset</p>
        </div>
      </div>
    );
  }

  if (type === 'filterTag') {
    const map = new Map();

    const handleSet = (e) => {
      map.set(e, !map.get(e));
      submitFilter();
    }

    // reset buggy & not in use
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
        'selectedOptions': mapped
      });
    }

    return (
      <div className={'SearchBarFilterDropdown dropdown-tag'}>
        <div className={'row-options'}>
          {options.map((op, index) => {
            return (
              <OptionEntry key={index} index={index.toString()} option={op} isClicked={map.get(index.toString())} callback={handleSet}/>
            );
          })}
        </div>
        {/*<hr/>*/}
        {/*<div className={'row-buttons'}>*/}
        {/*  <p className={'clickable'} onClick={handleReset}>Reset</p>*/}
        {/*</div>*/}
      </div>
    );
  }
  return null;
}

function OptionEntry({
  index='0',
  option='text?book',
  isClicked=false,
  callback=null
                     }) {
  const [selfSelected, setSelfSelected] = useState(isClicked);

  const handleClick = (e) => {
    e.preventDefault();
    setSelfSelected(!selfSelected);
    callback(e.target.getAttribute('index'));
  }

  return (
    <div className={'option-entry clickable'}>
      <p index={index} onClick={handleClick} className={selfSelected?'selected':''}>{option}</p>
    </div>
  );
}

export default SearchBarFilterDropdown;







































