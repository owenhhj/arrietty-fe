import './SearchBarKeywordSuggest.css';

export default function SearchBarKeywordSuggest({
  suggestions=[''],
  callback=null
                              }) {
  return (
    <div className={'SearchBarTextSuggest card'}>
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
  suggestion='',
  callback
                         }) {
  const handleChoose = (e) => {
    e.preventDefault();
    callback(index);
  };

  return (
    <div className={'SuggestionEntry clickable-btn'} onClick={handleChoose}>
      <p>{suggestion}</p>
    </div>
  );
}
































