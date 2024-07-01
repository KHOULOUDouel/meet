
// src/__tests__/EventList.test.js
import { render, within, waitFor } from '@testing-library/react';
import { act } from 'react'; // Importing act from react
import { getEvents } from '../api';
import EventList from '../components/EventList';
import App from '../App';

describe('<EventList /> component', () => {
  let EventListComponent;

  beforeEach(async () => {
    await act(async () => {
      EventListComponent = render(<EventList events={[]} />);
    });
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    await act(async () => {
      EventListComponent.rerender(<EventList events={allEvents} />);
    });
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });

  test('renders the events with correct data', async () => {
    const allEvents = await getEvents();
    await act(async () => {
      EventListComponent.rerender(<EventList events={allEvents} />);
    });
    const eventListItems = EventListComponent.getAllByRole("listitem");
    eventListItems.forEach((item, index) => {
      expect(item.textContent).toContain(allEvents[index].summary);
    });
  });
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('.event-list'); // Ensure the class name is used correctly
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });
});
