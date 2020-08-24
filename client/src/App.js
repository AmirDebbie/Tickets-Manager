import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get('api/tickets');
      setList(data);
    }
    fetch();
  }, []);

  return (
    <main>
      {list.map((item) => <Ticket item={item} />)}
    </main>
  );
}



export default App;
