import React, { useState, useEffect } from 'react';
import ReadMore from './ReadMore';

function Ticket(props) {

  const [showTicket, setShowTicket] = useState('ticket');
  const [showHideButton, setShowHideButton] = useState(false);

  const handleHide = (e) => {
    setShowTicket('hideTicket'); 
    props.raiseCounter();
  }

  const handleShowHideButton = () => {
    setShowHideButton(!showHideButton);
  }

  useEffect(() => {
    if(props.hiddenCounter === 0) {
      setShowTicket('ticket');
    }
  }, [props.hiddenCounter])

  const { item } = props;
  return (
      <div onMouseOver={handleShowHideButton} onMouseOut={handleShowHideButton} className={showTicket}>
        <button className={showHideButton ? 'hideTicketButton' : 'hide'} onClick={handleHide}>hide</button>
        <h3>{item.title}</h3>
        <ReadMore content={item.content} maxChar='400' />
        <div>
          <p className='emailAndDate'>By {item.userEmail} | {new Date(item.creationTime).toUTCString()}</p>
          {item.labels &&
            item.labels.map((label, i) => <span key={i} className='label'>{label}</span>)
          }
        </div>
      </div>
  )
}

export default Ticket;
