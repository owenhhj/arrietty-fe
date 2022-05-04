import './TextbookSearchShowSelected.css';

function TextbookSearchShowSelected({
                                      selectedTextbook,
                                      dispTitle = false
                                    }) {
  return (
    <>
      <div className={"textbook-info"}>
        {dispTitle && (
          <div className={"textbook-info-row"}>
            <p>
              <span className={"info-prompt"}>Title:</span>
              <span className={"info-value"}>{selectedTextbook.textbookTitle}</span>
            </p>
          </div>
        )}
        <div className={"textbook-info-row"}>
          <p>
            <span className={"info-prompt"}>ISBN:</span>
            <span className={"info-value"}>{selectedTextbook.isbn}</span>
          </p>
        </div>
        <div className={"textbook-info-row"}>
          <p>
            <span className={"info-prompt"}>Author:</span>
            <span className={"info-value"}>{selectedTextbook.author}</span>
          </p>
        </div>
        <div className={"textbook-info-row"}>
          <p>
            <span className={"info-prompt"}>Edition:</span>
            <span className={"info-value"}>{selectedTextbook.edition}</span>
          </p>
        </div>
        <div className={"textbook-info-row"}>
          <p>
            <span className={"info-prompt"}>Publisher:</span>
            <span className={"info-value"}>{selectedTextbook.publisher}</span>
          </p>
        </div>
        <div className={"textbook-info-row"}>
          <p>
            <span className={"info-prompt"}>Related course:</span>
            <span className={"info-value"}>{selectedTextbook.relatedCourse}</span>
          </p>
        </div>
        <div className={"textbook-info-row"}>
          <p>
            <span className={"info-prompt"}>Original price:</span>
            <span className={"info-value"}>{selectedTextbook.originalPrice}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default TextbookSearchShowSelected;








