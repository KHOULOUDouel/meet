import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showAndHideEventsDetails.feature');

defineFeature(feature, (test) => {
  let AppComponent;

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user first opens the app', () => {
      AppComponent = render(<App />);
    });

    when('the user receives the full list of events (specific for the city or all events)', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    then('all events will collapse by default', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user gets a list of events', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    when("a user selects an event's details", async () => {
      const button = AppComponent.queryAllByText('Show details')[0];
      await userEvent.click(button);
    });

    then('the details will show up for that chosen event', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let button;
    given('the user sees the details of an event', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });

      button = AppComponent.queryAllByText('Show details')[0];
      await userEvent.click(button);

      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).toBeInTheDocument();
    });

    when("the user presses a button to hide event's details", async () => {
      await userEvent.click(button);
    });

    then('the details of that event will be hidden', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });
  });
});
