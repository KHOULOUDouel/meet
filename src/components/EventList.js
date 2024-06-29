// src/components/EventList.js
// src/components/EventList.js
import React from 'react';
import Event from './Event';

const EventList = ({ events }) => {
  return (
    <ul className="event-list">
      {events.map(event => (
        <li key={event.id}>
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
};

export default EventList;
