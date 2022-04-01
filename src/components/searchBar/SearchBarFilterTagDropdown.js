import './SearchBarFilterDropdown.css';
import {useState} from "react";

function SearchBarFilterTagDropdown({
  type='tag',
  options=['text??book'],
  selectedOptionsParent=['0'],
  callback=null
                                    }) {
  const [selectedOptions, setSelectedOptions] = useState(selectedOptionsParent);

  const handleSet = (i) => {
    let temp = selectedOptions;
    if (selectedOptions.includes(i)) {
      temp = temp.filter((e) => (e !== i));
      setSelectedOptions(temp);
    } else {
      temp = temp.concat([i]);
      setSelectedOptions(temp);
    }
    // callback({  // this is used without `handleDone`
    //   'type': type,
    //   'selectedOptions': temp
    // });
  }

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedOptions([]);
    callback({
      'type': type,
      'selectedOptions': []
    });
  }

  const handleDone = (e) => {
    e.preventDefault();
    callback({
      'type': type,
      'selectedOptions': selectedOptions
    });
  }

  return (
    <div className={'SearchBarFilterDropdown dropdown-tag'}>
      <div className={'row-options'}>
        {options.map((op, index) => {
          return (
            <OptionEntry key={index} index={index.toString()} option={op} isClicked={selectedOptions.includes(index.toString())} callback={handleSet}/>
          );
        })}
      </div>
      <hr/>
      <div className={'row-buttons'}>
        <p className={'primary clickable'} onClick={handleDone}>Done</p>
        <p className={'clickable'} onClick={handleReset}>Reset</p>
      </div>
    </div>
  );
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

export default SearchBarFilterTagDropdown;













