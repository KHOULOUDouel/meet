// src/components/NumberOfEvents.js

import React, { useState } from 'react';

const NumberOfEvents = ({ setEventCount, setErrorAlert }) => {
  const [eventCount, setLocalEventCount] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    if (isNaN(value) || value <= 0) {
      setErrorAlert("Please enter a valid number of events.");
      setLocalEventCount(value);
    } else {
      setErrorAlert("");
      setLocalEventCount(value);
      setEventCount(value);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="event-count">Number of Events:</label>
      <input
        id="event-count"
        type="number"
        value={eventCount}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;



