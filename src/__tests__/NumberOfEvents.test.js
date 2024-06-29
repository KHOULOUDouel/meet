// src/__tests__/NumberOfEvents.test.js

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setEventCount={() => {}} />);
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
    await user.type(numberInput, '{backspace}{backspace}10');
    expect(numberInput.value).toBe("10");
  });
});
