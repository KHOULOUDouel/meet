// src/components/CitySearch.js
import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(allLocations);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
    const filteredSuggestions = allLocations.filter(location =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setQuery(value);
    setSuggestions(filteredSuggestions);

    let infoText;
    if (filteredSuggestions.length === 0) {
      infoText = "We cannot find the city you are looking for. Please try another city.";
    } else {
      infoText = "";
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("");
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        value={query}
        onChange={handleInputChanged}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search for a city"
      />
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li key={suggestion} onClick={handleItemClicked}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
    </div>
  );
};

export default CitySearch;
