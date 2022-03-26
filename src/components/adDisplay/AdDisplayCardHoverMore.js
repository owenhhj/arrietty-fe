import './AdDisplayCardHoverMore.css';

function AdDisplayCardHoverMore({
  textbookTitle='caLcuLus',
  isbn='123-456789101112',
  author='Haojia He',
  publisher='JinQiao',
  edition='3rd edition',
  originalPrice=100,
  relatedCourse='MATHSHU-101',
  xPos=300,
  yPos=400
                                }) {
  const position = {
    top: xPos+'px',
    left: yPos+'px'
  }
  return (
    <div className={'AdDisplayCardHoverMore'} style={position}>
      <div className={'fields-container'}>
        <p><span>Title: </span>{textbookTitle}</p>
        <p><span>ISBN: </span>{isbn}</p>
        <p><span>Author: </span>{author}</p>
        <p><span>Publisher: </span>{publisher}</p>
        <p><span>Edition: </span>{edition}</p>
        <p><span>Price: </span>{originalPrice} RMB</p>
        <p><span>Related: </span>{relatedCourse}</p>
      </div>
    </div>
  );
}

export default AdDisplayCardHoverMore;
















