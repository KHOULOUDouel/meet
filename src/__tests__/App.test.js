
// src/__tests__/App.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents, extractLocations } from '../api';
import mockData from '../mock-data';
import userEvent from '@testing-library/user-event';

jest.mock('../api');

describe('<App /> component', () => {
  beforeEach(() => {
    getEvents.mockResolvedValue(mockData);
    extractLocations.mockReturnValue(['Berlin, Germany', 'London, UK', 'New York, USA']);
  });

  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('Search for a city')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for a city')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument(); // for NumberOfEvents input
  });

  test('updates event list when a city is selected', async () => {
    render(<App />);
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole('textbox');
    
    await user.type(cityTextBox, 'Berlin');
    await user.click(screen.getByText('Berlin, Germany'));
    
    const eventItems = await screen.findAllByRole('listitem');
    expect(eventItems.length).toBeGreaterThan(0);
  });

  test('updates event list when number of events changes', async () => {
    render(<App />);
    const user = userEvent.setup();
    const numberOfEventsInput = screen.getByRole('spinbutton');
    
    await user.clear(numberOfEventsInput);
    await user.type(numberOfEventsInput, '1');
    
    const eventItems = await screen.findAllByRole('listitem');
    expect(eventItems.length).toBe(1);
  });

  test('fetches events when city is changed', async () => {
    render(<App />);
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole('textbox');

    await user.type(cityTextBox, 'London');
    await user.click(screen.getByText('London, UK'));

    await waitFor(() => {
      expect(screen.getByText('See all cities')).toBeInTheDocument();
    });

    const eventItems = await screen.findAllByRole('listitem');
    expect(eventItems.length).toBeGreaterThan(0);
  });

  test('fetches events when "See all cities" is clicked', async () => {
    render(<App />);
    const user = userEvent.setup();
    const cityTextBox = screen.getByRole('textbox');

    await user.type(cityTextBox, 'Berlin');
    await user.click(screen.getByText('See all cities'));

    await waitFor(() => {
      expect(screen.getByText('Search for a city')).toBeInTheDocument();
    });

    const eventItems = await screen.findAllByRole('listitem');
    expect(eventItems.length).toBeGreaterThan(0);
  });
});
