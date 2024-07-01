// src/components/CitySearch.js
import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(allLocations);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
    const filteredSuggestions = allLocations.filter(location => {
      return location.toLowerCase().includes(value.toLowerCase());
    });
    setSuggestions(filteredSuggestions);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        value={query}
        onChange={handleInputChanged}
        placeholder="Search for a city"
      />
      <ul className="suggestions">
        {suggestions.map((suggestion) => (
          <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
        ))}
        <li key='See all cities' onClick={handleItemClicked}>
          <b>See all cities</b>
        </li>
      </ul>
    </div>
  );
};

export default CitySearch;
