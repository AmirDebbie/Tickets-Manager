import React, { useState, useEffect } from 'react';
import ReadMore from './ReadMore';
import axios from 'axios';
import { Tooltip } from '@material-ui/core';

function Ticket(props) {
  const { item } = props;
  const [isDone, setIsDone] = useState(item.done);
  const [showTicket, setShowTicket] = useState('ticket');
  const [showHideButton, setShowHideButton] = useState(false);

  const handleHide = (e) => {
    setShowTicket('hideTicket'); 
    props.raiseCounter();
  }

  const handleShowHideButton = () => {
    setShowHideButton(!showHideButton);
  }

  const handleDone = async () => {
    if (item.done === undefined || item.done === false) {
      const { data } = await axios.post(`/api/tickets/${item.id}/done`)
      if (data.updated) {
        setIsDone(true);
      }
    } else {
      const { data } = await axios.post(`/api/tickets/${item.id}/undone`)
      if (data.updated) {
        setIsDone(false);
      }
    }
    props.fetch();
  }

  useEffect(() => {
    if(props.hiddenCounter === 0) {
      setShowTicket('ticket');
    }
  }, [props.hiddenCounter])
  
  return (
      <div onMouseOver={handleShowHideButton} onMouseOut={handleShowHideButton} className={showTicket}>
        {isDone ? 
          <>
            <button className={showHideButton ? 'hideTicketButton' : 'hide'} onClick={handleHide}>hide</button>
            <Tooltip placement="top" title='Done'>
              <button id={props.doneButtonId} className='doneButton' onClick={handleDone}><img className='icons' src={require('../Icons/vIcon.png')} /></button>
            </Tooltip>
            <h3>{item.title}</h3>
            <div>
              <p className='emailAndDate'>By {item.userEmail} | {new Date(item.creationTime).toUTCString()}</p>
              {item.labels &&
                item.labels.map((label, i) => <span key={i} className='label'>{label}</span>)
              }
            </div>
          </>
        :
        <>
          <button className={showHideButton ? 'hideTicketButton' : 'hide'} onClick={handleHide}>hide</button>
          <Tooltip placement="top" title='Undone'>
            <button id={props.doneButtonId} className='doneButton' onClick={handleDone}><img className='icons' src={require('../Icons/xIcon.png')} /></button>
          </Tooltip>
          <h3>{item.title}</h3>
          <ReadMore content={item.content} maxChar='400' />
          <div>
            <p className='emailAndDate'>By {item.userEmail} | {new Date(item.creationTime).toUTCString()}</p>
            {item.labels &&
              item.labels.map((label, i) => <span key={i} className='label'>{label}</span>)
            }
          </div>
        </>
        }
      </div>
  )
}

export default Ticket;
