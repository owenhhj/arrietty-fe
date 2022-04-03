


function SearchBarTextSuggest({
  suggestions
                              }) {




  return (
    <div>

    </div>
  );
}

function SuggestionEntry({
  index=0,
  suggestion='defaultSuggestion',
  callback=null
                         }) {

  const handleChoose = (e) => {
    e.preventDefault();
    callback(index);
  }

  return (
    <div className={'SuggestionEntry'} onClick={handleChoose}>
      <p>{suggestion}</p>
    </div>
  );
}

export default SearchBarTextSuggest;
































