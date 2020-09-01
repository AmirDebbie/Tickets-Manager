import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Ticket from './components/Ticket';
import './App.css';
import MyModal from './components/MyModal';

function App() {
  const [list, setList] = useState([]);
  const [hiddenIds, setHiddenIds] = useState([]);
  const visibleList = list.filter(item => !item.hidden);
  const hiddenTicketsLength = list.length - visibleList.length;

  // Fetch the json list from the server and push it into the state.
  const fetch = async () => {
    const { data } = await axios.get('api/tickets');
    setList(data);
  };

  // Fetch the data on load.
  useEffect(() => {
    fetch();
  }, []);

  // Function that takes a searched value and sends a get request with that value as a search query.
  // Also converts all hidden tickets to hidden in the new data.
  const handleInputChange = async (e) => {
    const queryText = encodeURIComponent(e.target.value);
    const { data } = await axios.get(`api/tickets?searchText=${queryText}`);
    data.map(item => {
      if (hiddenIds.some(hiddenId => hiddenId === item.id)) {
        item.hidden = true;
      }
      return item;
    })
    setList(data);
  };

  const onHideTicket = ticketId => {
    setList(list.map(item => {
      if (item.id === ticketId) {
        item.hidden = true;
      }
      return item;
    }))
    setHiddenIds(hiddenIds.concat(ticketId));
  }

  // Changes the hidden prop of any ticket in the list to false. Also updates the hiddenIds list.
  const restoreHidden = () => {
    let hiddenIdsClone = hiddenIds.slice();
    setList(list.map(item => {
      if (item.hidden) {
        item.hidden = false;
        hiddenIdsClone = hiddenIdsClone.filter(id => item.id !== id);
      }
      return item;
    }))
    setHiddenIds(hiddenIdsClone);
  };
  
  return (
    <main>
      <h1 className="title">Ticket Manager</h1>
      <div className="center">
        <TextField
          style={{ margin: 10, boxShadow: '5px 5px 18px #9e9797' }}
          size="small"
          className="textArea"
          variant="outlined"
          label="Search ticket by title"
          id="searchInput"
          onChange={handleInputChange}
        />
        <br />
        <span>
          {`Showing ${list.length} results `}
        </span>
        {hiddenTicketsLength > 0 && (
          <span>
            (
            <span id="hideTicketsCounter">{hiddenTicketsLength}</span>
            {' hidden tickets - '}
            <button
              className="moreLess"
              onClick={restoreHidden}
              id="restoreHideTickets"
            >
              restore
            </button>
            )
          </span>
        )}
        <br />
        <MyModal fetch={fetch} setList={setList} />
      </div>
      {visibleList.map((item, i) => (
        <Ticket
          onHide={onHideTicket}
          fetch={fetch}
          key={item.id}
          item={item}
          doneButtonId={`doneButton-${i}`}
        />
      ))}
    </main>
  );
}

export default App;
