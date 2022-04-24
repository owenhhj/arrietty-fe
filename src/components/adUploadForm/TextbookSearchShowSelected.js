import './TextbookSearchShowSelected.css';

function TextbookSearchShowSelected({selectedTextbook}) {
  return (
    <>
      <div className={"textbook-info"}>
        <div className={"textbook-info-row"}>
          <p className={"info-prompt"}>ISBN:</p>
          <p className={"info-value"}>{selectedTextbook.isbn}</p>
        </div>
        <div className={"textbook-info-row"}>
          <p className={"info-prompt"}>Author:</p>
          <p className={"info-value"}>{selectedTextbook.author}</p>
        </div>
        <div className={"textbook-info-row"}>
          <p className={"info-prompt"}>Edition:</p>
          <p className={"info-value"}>{selectedTextbook.edition}</p>
        </div>
        <div className={"textbook-info-row"}>
          <p className={"info-prompt"}>Publisher:</p>
          <p className={"info-value"}>{selectedTextbook.publisher}</p>
        </div>
        <div className={"textbook-info-row"}>
          <p className={"info-prompt"}>Related course:</p>
          <p className={"info-value"}>{selectedTextbook.relatedCourse}</p>
        </div>
        <div className={"textbook-info-row"}>
          <p className={"info-prompt"}>Original price:</p>
          <p className={"info-value"}>{selectedTextbook.originalPrice}</p>
        </div>
      </div>
    </>
  );
}

export default TextbookSearchShowSelected;








