import React, { useState, useEffect } from 'react';

function Ticket(props) {

  const [showTicket, setShowTicket] = useState(true);
  const [showHideButton, setShowHideButton] = useState(false);

  const handleHide = () => {
    setShowTicket(false); 
    props.raiseCounter()
  }

  const hanleShowHideButton = () => {
    setShowHideButton(!showHideButton);
  }

  useEffect(() => {
    if(props.hiddenCounter === 0) {
      setShowTicket(true);
    }
  }, [props.hiddenCounter])

  const { item } = props;
  return (
    <>
    {showTicket &&
      <div onMouseOver={hanleShowHideButton} onMouseOut={hanleShowHideButton} className='ticket'>
        <button className={showHideButton ? 'hideTicketButton' : 'hide'} onClick={handleHide}>hide</button>
        <h3>{item.title}</h3>
        <p>{item.content}</p>
        <div>
          <p className='emailAndDate'>By {item.userEmail} | {new Date(item.creationTime).toUTCString()}</p>
          {item.labels &&
            item.labels.map((label, i) => <span key={i} className='label'>{label}</span>)
          }
        </div>
      </div>}
    </>
  )
}

export default Ticket;
