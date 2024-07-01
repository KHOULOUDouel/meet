import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [eventCount, setEventCount] = useState(32);
  const [currentCity, setCurrentCity] = useState('See all cities');

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter(event => event.location === currentCity);
      setEvents(filteredEvents.slice(0, eventCount));
      setLocations(extractLocations(allEvents));
    };
    fetchEvents();
  }, [eventCount, currentCity]);

  return (
    <div className="App">
      <CitySearch allLocations={locations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setEventCount={setEventCount} />
      <EventList events={events} />
    </div>
  );
};

export default App;
