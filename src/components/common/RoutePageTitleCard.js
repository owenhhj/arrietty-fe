
// Title card used in Notifications / Favorites / My Posts / ...
function RoutePageTitleCard({
  pageTitle='Arrietty'
                            }) {
  const styleDiv = {
    width: '100%',
    height: '6em',
    backgroundColor: '#F3F3F3',
    display: 'flex',
    alignItems: 'center'
  };

  const styleP = {
    width: '90%',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#57068C',
    textAlign: 'left'
  };

  return (
    <div className={'card non-text'} style={styleDiv}>
      <p style={styleP}>{pageTitle}</p>
    </div>
  );
}

export default RoutePageTitleCard;





