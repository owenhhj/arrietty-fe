import './SearchBarKeywordSuggest.css';


function SearchBarKeywordSuggest({
  suggestions=['one default suggestion'],
  callback=null
                              }) {

  return (
    <div className={'SearchBarTextSuggest'}>

      {suggestions.map((entry, index) => {
        return (
          <SuggestionEntry key={index} index={index} suggestion={entry} callback={callback}/>
        );
      })}

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
    console.log('SuggestionEntry choosing index:', index, suggestion);
    callback(index);
  }

  return (
    <div className={'SuggestionEntry'} onClick={handleChoose}>
      <p>{suggestion}</p>
    </div>
  );
}

export default SearchBarKeywordSuggest;
































