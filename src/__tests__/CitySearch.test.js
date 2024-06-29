// src/__tests__/CitySearch.test.js


import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  let allLocations;

  beforeEach(async () => {
    await act(async () => {
      const allEvents = await getEvents();
      allLocations = extractLocations(allEvents);
      CitySearchComponent = render(<CitySearch allLocations={allLocations} />);
    });
  });

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await act(async () => {
      await user.click(cityTextBox);
    });
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await act(async () => {
      await user.type(cityTextBox, "Berlin");
    });
    const suggestions = allLocations ? allLocations.filter(location => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }) : [];
    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await act(async () => {
      await user.type(cityTextBox, "Berlin");
    });
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
    await act(async () => {
      await user.click(BerlinGermanySuggestion);
    });
    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

  // Additional test to cover line 13
  test('hides the suggestion list when the city input loses focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await act(async () => {
      await user.click(cityTextBox);
      await user.click(document.body); // Click outside to trigger blur
    });
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  // Additional test to cover line 39
  test('shows suggestions when the input field is focused again', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await act(async () => {
      await user.click(cityTextBox);
      await user.type(cityTextBox, 'Berlin');
      await user.click(document.body); // Click outside to trigger blur
      await user.click(cityTextBox); // Focus again
    });
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
  });
});
