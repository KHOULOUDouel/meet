// src/api.js

import mockData from './mock-data';

/**
 * Extracts all unique locations from the events.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Returns the mock data representing the list of all events.
 */
export const getEvents = async () => {
  return mockData;
};
