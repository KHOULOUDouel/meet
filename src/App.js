// src/App.js
import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './App.css';
import { InfoAlert, WarningAlert, ErrorAlert } from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [eventCount, setEventCount] = useState(32);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState(""); // State for InfoAlert text

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
      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />} {/* Conditionally render InfoAlert */}
      </div>
      <CitySearch allLocations={locations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
      <NumberOfEvents setEventCount={setEventCount} />
      <EventList events={events} />
    </div>
  );
};

export default App;
