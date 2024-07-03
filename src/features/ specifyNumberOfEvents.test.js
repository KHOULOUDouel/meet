import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { render, waitFor, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppComponent;

  test('Default number of events', ({ given, when, then }) => {
    given('the user has not specified a number of events', () => {
      AppComponent = render(<App />);
    });

    when('the user opens the app', async () => {
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('the default number of displayed events should be 32', async () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      const EventListItems = await within(EventListDOM).findAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });

  test('User specifies number of events', ({ given, when, then }) => {
    given('the user wants to see a specific number of events', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    when('the user sets the number of events to 5', async () => {
      const input = AppComponent.getByPlaceholderText('Number of events');
      await userEvent.type(input, '{selectall}5');
      fireEvent.change(input, { target: { value: '5' } });
    });

    then('the app should display 5 events', async () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      const EventListItems = await within(EventListDOM).findAllByRole('listitem');
      expect(EventListItems.length).toBe(5);
    });
  });
});
