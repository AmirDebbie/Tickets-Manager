import React from 'react';

function Ticket(props) {

  const { item } = props;
  return (
    <div className='ticket'>
      <h2>{item.title}</h2>
      <p>{item.content}</p>
      <p>By {item.userEmail} | {new Date(item.creationTime).toUTCString()}</p>
    </div>
  )
}

export default Ticket;
