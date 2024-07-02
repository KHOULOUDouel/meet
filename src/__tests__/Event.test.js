import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let event;

  beforeAll(async () => {
    const allEvents = await getEvents();
    event = allEvents[0];
  });

  test('renders event summary', () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.summary)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    render(<Event event={event} />);
    expect(screen.getByText(new Date(event.created).toLocaleString())).toBeInTheDocument();
  });

  test('renders event location', () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.location)).toBeInTheDocument();
  });

  test('renders details button', () => {
    render(<Event event={event} />);
    expect(screen.getByText('Show details')).toBeInTheDocument();
  });

  test('toggles event details on button click', () => {
    render(<Event event={event} />);
    const button = screen.getByText('Show details');
    fireEvent.click(button);
    expect(screen.getByText('Hide details')).toBeInTheDocument();
    expect(screen.getByText("About event:")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('Show details')).toBeInTheDocument();
    expect(screen.queryByText(event.description)).not.toBeInTheDocument();
  });
});