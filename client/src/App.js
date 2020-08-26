import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "./components/Ticket";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import MyModal from "./components/MyModal";

function App() {
  const [list, setList] = useState([]);
  const [hiddenCounter, setHiddenCounter] = useState(0);

  // Fetch the json list from the server and push it into the state.
  const fetch = async () => {
    const { data } = await axios.get("api/tickets");
    setList(data);
  };

  // Fetch the data on load.
  useEffect(() => {
    fetch();
  }, []);

  // Function that takes a searched value and sends a get request with that value as a search query.
  const handleInputChange = async (e) => {
    const queryText = encodeURIComponent(e.target.value);
    const { data } = await axios.get(`api/tickets?searchText=${queryText}`);
    setList(data);
  };

  // Raises the hidden tickets counter + 1
  const raiseCounter = () => {
    setHiddenCounter(hiddenCounter + 1);
  };

  // Resets the hidden ticket counter to 0.
  const restoreHidden = () => {
    setHiddenCounter(0);
  };

  return (
    <main>
      <h1 className="title">Ticket Manager</h1>
      <div className="center">
        <TextField
          style={{ margin: 10, boxShadow: "5px 5px 18px #9e9797" }}
          size="small"
          className="textArea"
          variant="outlined"
          label="Search ticket by title"
          id="searchInput"
          onChange={handleInputChange}
        />
        <br />
        <span>showing {list.length} results </span>
        {hiddenCounter > 0 && (
          <span>
            {"("}
            <span id="hideTicketsCounter">{hiddenCounter}</span> hidden tickets
            -{" "}
            <button
              className="moreLess"
              onClick={restoreHidden}
              id="restoreHideTickets"
            >
              restore
            </button>
            {")"}
          </span>
        )}
        <br />
        <MyModal fetch={fetch} />
      </div>
      {list.map((item, i) => (
        <Ticket
          fetch={fetch}
          raiseCounter={raiseCounter}
          key={i}
          item={item}
          doneButtonId={`doneButton-${i}`}
          hiddenCounter={hiddenCounter}
        />
      ))}
    </main>
  );
}

export default App;
