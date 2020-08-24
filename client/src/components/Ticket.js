import React, { useState, useEffect } from 'react';

function Ticket(props) {

  const [show, setShow] = useState(true);

  const handleHide = () => {
    setShow(false); 
    props.raiseCounter()
  }

  useEffect(() => {
    if(props.hiddenCounter === 0) {
      setShow(true);
    }
  }, [props.hiddenCounter])

  const { item } = props;
  return (
    <>
    {show &&
      <div className='ticket'>
        <button className='hideTicketButton' onClick={handleHide}>hide</button>
        <h2>{item.title}</h2>
        <p>{item.content}</p>
        <div>
          <p>By {item.userEmail} | {new Date(item.creationTime).toUTCString()}</p>
          {item.labels &&
            item.labels.map((label, i) => <span key={i} className='label'>{label}</span>)
          }
        </div>
      </div>}
    </>
  )
}

export default Ticket;
