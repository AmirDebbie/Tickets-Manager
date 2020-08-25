import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ticket from './components/Ticket';
import TextField from '@material-ui/core/TextField'
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [hiddenCounter, setHiddenCounter] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get('api/tickets');
      setList(data);
    }
    fetch();
  }, []);

  const handleInputChange = async (e) => {
    const queryText = encodeURIComponent(e.target.value)
    const { data } = await axios.get(`api/tickets?searchText=${queryText}`)
    setList(data);
  }
  const raiseCounter = () => {
    setHiddenCounter(hiddenCounter + 1);
  }

  const restoreHidden = () => {
    setHiddenCounter(0);
  }

  return (
    <main>
      <h1 className='title'>Ticket Manager</h1>
      <div className='center'>
        <TextField className='textArea' variant="outlined" label='Search ticket by title' id='searchInput' onChange={handleInputChange} /> <br />
        <span>showing {list.length} results. </span>
        {
          hiddenCounter > 0 &&
          <span>
            <span id='hideTicketsCounter'>{hiddenCounter}</span> hidden tickets. <button onClick={restoreHidden} id='restoreHideTickets'>restore</button>
          </span>
        }
      </div>
      {list.map((item, i) => 
      <Ticket 
        raiseCounter={raiseCounter} 
        key={i} 
        item={item} 
        hiddenCounter={hiddenCounter}
      />)}
    </main>
  );
}



export default App;
