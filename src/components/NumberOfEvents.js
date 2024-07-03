// src/components/NumberOfEvents.js

import React, { useState } from 'react';

const NumberOfEvents = ({ setEventCount }) => {
  const [eventCount, setLocalEventCount] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setLocalEventCount(value);
    setEventCount(value);
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
