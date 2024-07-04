// src/__tests__/NumberOfEvents.test.js
import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setEventCount={() => {}} setErrorAlert={() => {}} />
    );
  });

  test('renders number input', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
  });

  test('default value is 32', () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberInput.value).toBe("32");
  });

  test('value changes when user types in it', async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    await user.clear(numberInput); // Clear the input before typing
    await user.type(numberInput, '10');
    expect(numberInput.value).toBe("10");
  });

  test('displays error when input is invalid', async () => {
    const setErrorAlert = jest.fn();
    NumberOfEventsComponent.rerender(<NumberOfEvents setEventCount={() => {}} setErrorAlert={setErrorAlert} />);
    
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    await user.clear(numberInput); // Clear the input before typing
    await user.type(numberInput, '-1');
    expect(setErrorAlert).toHaveBeenCalledWith("Please enter a valid number of events.");
  });
});
