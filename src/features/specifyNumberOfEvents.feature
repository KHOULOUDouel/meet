Feature: Specify Number of Events

  Scenario: Default number of events
    Given the user has not specified a number of events
    When the user opens the app
    Then the default number of displayed events should be 32

  Scenario: User specifies number of events
    Given the user wants to see a specific number of events
    When the user sets the number of events to 5
    Then the app should display 5 events
