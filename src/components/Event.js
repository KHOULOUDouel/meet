// src/components/Event.js

import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="event">
      <h2>{event.summary}</h2>
      <p>{new Date(event.start.dateTime).toLocaleString()}</p>
      <p>{event.location}</p>
      <button onClick={handleShowDetails}>
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
      {showDetails && (
        <div className="event-details">
          <h3>About event:</h3>
          <p>{event.description}</p>
          <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
            See details on Google Calendar
          </a>
        </div>
      )}
    </div>
  );
};

export default Event;
