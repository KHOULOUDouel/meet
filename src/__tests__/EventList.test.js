
// src/__tests__/EventList.test.js
import { render, act } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

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
    await act(async () => {
      const allEvents = await getEvents();
      EventListComponent.rerender(<EventList events={allEvents} />);
    });
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });

  // Additional test to cover line 10
  test('renders the events with correct data', async () => {
    await act(async () => {
      const allEvents = await getEvents();
      EventListComponent.rerender(<EventList events={allEvents} />);
    });
    const eventListItems = EventListComponent.getAllByRole("listitem");
    eventListItems.forEach((item, index) => {
      expect(item.textContent).toContain(allEvents[index].summary); // Assuming summary is part of the event data
    });
  });
});
