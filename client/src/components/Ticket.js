import React, { useState } from "react";
import axios from "axios";
import { Tooltip } from "@material-ui/core";
import ReadMore from "./ReadMore";

function Ticket(props) {
  const { item } = props;
  const [isDone, setIsDone] = useState(item.done);
  const [showHideButton, setShowHideButton] = useState(false);

  // activates the onHide method from the App component.
  const handleHide = () => {
    props.onHide(item.id);
  };

  // Function that changes the visibility of the hide button.
  const handleShowHideButton = () => {
    setShowHideButton(!showHideButton);
  };

  // Changes the is done value and also send the proper post request to change the done property in the json file.
  const handleDone = async () => {
    if (isDone === undefined || isDone === false) {
      const { data } = await axios.post(`/api/tickets/${item.id}/done`);
      if (data.updated) {
        setIsDone(true);
      }
    } else {
      const { data } = await axios.post(`/api/tickets/${item.id}/undone`);
      if (data.updated) {
        setIsDone(false);
      }
    }
  };

  return (
    <div
      data-aos={props.left ? "fade-left" : "fade-right"}
      onMouseOver={handleShowHideButton}
      onMouseOut={handleShowHideButton}
      className="ticket"
    >
      {isDone ? (
        <>
          <button
            className={showHideButton ? "hideTicketButton" : "hide"}
            onClick={handleHide}
          >
            hide
          </button>
          <Tooltip placement="top" title="Done">
            <button
              id={props.doneButtonId}
              className="doneButton"
              onClick={handleDone}
            >
              <img
                alt="Undone"
                className="icons"
                src={require("../Icons/vIcon.png")}
              />
            </button>
          </Tooltip>
          <h3>{item.title}</h3>
          <div>
            <p className="emailAndDate">
              {`By ${item.userEmail} | ${new Date(
                item.creationTime
              ).toString()}`}
            </p>
            {item.labels &&
              item.labels.map((label, i) => (
                <span key={i} className="label">
                  {label}
                </span>
              ))}
          </div>
        </>
      ) : (
        <>
          <button
            className={showHideButton ? "hideTicketButton" : "hide"}
            onClick={handleHide}
          >
            hide
          </button>
          <Tooltip placement="top" title="Undone">
            <button
              id={props.doneButtonId}
              className="doneButton"
              onClick={handleDone}
            >
              <img
                alt="done"
                className="icons"
                src={require("../Icons/xIcon.png")}
              />
            </button>
          </Tooltip>
          <h3>{item.title}</h3>
          <ReadMore content={item.content} maxChar="450" />
          <div>
            <p className="emailAndDate">
              {`By ${item.userEmail} | ${new Date(
                item.creationTime
              ).toString()}`}
            </p>
            {item.labels &&
              item.labels.map((label, i) => (
                <span key={i} className="label">
                  {label}
                </span>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Ticket;
