
// src/__tests__/App.test.js
import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import { getEvents, extractLocations } from '../api';
import mockData from '../mock-data';
import userEvent from '@testing-library/user-event';

jest.mock('../api');

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(async () => {
    getEvents.mockResolvedValue(mockData);
    extractLocations.mockReturnValue(['Berlin, Germany', 'London, UK', 'New York, USA']);
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', async () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', async () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test("render NumberOfEvents", async () => {
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    getEvents.mockResolvedValue(mockData);
    extractLocations.mockReturnValue(['Berlin, Germany', 'London, UK', 'New York, USA']);
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = await within(CitySearchDOM).findByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    await waitFor(() => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

      // Debugging logs
      console.log('allRenderedEventItems:', allRenderedEventItems.length);

      const allEvents = mockData; // Use mockData directly here for comparison
      const berlinEvents = allEvents.filter(
        event => event.location === 'Berlin, Germany'
      );

      expect(allRenderedEventItems.length).toBe(berlinEvents.length);

      allRenderedEventItems.forEach(event => {
        expect(event.textContent).toContain("Berlin, Germany");
      });
    });
  });
});