# Meet App

Meet App is a React application that allows users to search for and view upcoming events in various cities. The app supports filtering events by city, showing and hiding event details, specifying the number of events displayed, offline functionality, adding a shortcut to the home screen, and visualizing event details with charts.

## Features

### Feature 1: Filter Events By City
**User Story 1:**  
As a user, I want to see upcoming events from all cities when I haven't searched for a specific city.

**User Story 2:**  
As a user, I want to see a list of suggestions when I search for a city.

**User Story 3:**  
As a user, I want to be able to select a city from the suggested list.

**Scenario 1:**  
Given the user hasn't searched for any city  
When they access the app  
Then upcoming events from all cities should be displayed.

**Scenario 2:**  
Given the user is typing in the search bar  
When they type at least one character  
Then a list of suggested cities should be displayed.

**Scenario 3:**  
Given the user has typed in a city in the search bar  
When they select a city from the suggested list  
Then events for the selected city should be displayed.

### Feature 2: Show/Hide Event Details
**User Story 1:**  
As a user, I want event details to be collapsed by default.

**User Story 2:**  
As a user, I want to be able to expand an event to see its details.

**User Story 3:**  
As a user, I want to be able to collapse an event to hide its details.

**Scenario 1:**  
Given the user is viewing the events list  
When they open the app  
Then event details should be collapsed by default.

**Scenario 2:**  
Given the user is viewing an event with collapsed details  
When they click on the event  
Then the event details should expand to show more information.

**Scenario 3:**  
Given the user is viewing an event with expanded details  
When they click on the event again  
Then the event details should collapse to hide extra information.

### Feature 3: Specify Number of Events
**User Story 1:**  
As a user, I want to see 32 events by default when I haven't specified a number.

**User Story 2:**  
As a user, I want to be able to change the number of events displayed.

**Scenario 1:**  
Given the user hasn't specified the number of events  
When they access the app  
Then 32 events should be displayed by default.

**Scenario 2:**  
Given the user is viewing the events list  
When they change the number of events to be displayed  
Then the events list should update to show the specified number of events.

### Feature 4: Use the App When Offline
**User Story 1:**  
As a user, I want to see cached data when there's no internet connection.

**User Story 2:**  
As a user, I want to see an error message when I change search settings without an internet connection.

**Scenario 1:**  
Given the user has accessed the app before and has cached data  
When they open the app without an internet connection  
Then the app should display cached event data.

**Scenario 2:**  
Given the user has changed search settings (city, number of events)  
When there's no internet connection  
Then the app should display an error message indicating the lack of internet connection.

### Feature 5: Add an App Shortcut to the Home Screen
**User Story 1:**  
As a user, I want to install the meet app as a shortcut on my device's home screen.

**Scenario 1:**  
Given the user is accessing the app on a mobile device  
When they choose to add a shortcut to the home screen  
Then the app should be installed as a shortcut for easy access.

### Feature 6: Display Charts Visualizing Event Details
**User Story 1:**  
As a user, I want to see a chart displaying the number of upcoming events in each city.

**Scenario 1:**  
Given the user is viewing the events page  
When they navigate to the charts section  
Then a chart should be displayed showing the number of upcoming events in each city.

## Basic Information
Meet App is designed to help users find and keep track of upcoming events in various cities. The app offers features such as filtering events by city, showing/hiding event details, specifying the number of events displayed, offline access, adding the app to the home screen, and visualizing event details with charts.

The app is built using React and leverages the create-react-app (CRA) tool for efficient project setup and management. The app also supports Progressive Web App (PWA) capabilities, allowing users to install it on their devices for a native app-like experience.

Using Serverless Functions in Meet App
In the Meet app, we leverage serverless functions to handle various backend tasks efficiently. Serverless functions, deployed on AWS Lambda, allow us to execute code in response to specific events such as HTTP requests via API Gateway. This approach offers several benefits, including scalability, reduced server management overhead, and cost-effectiveness as we only pay for the compute time we use.

Key Use Cases for Serverless Functions:
Event Handling: Serverless functions will be used to process and respond to user interactions and other application events in real-time.
Data Processing: Functions can be triggered to perform data processing tasks, such as parsing and transforming data received from the frontend.
Third-Party Integrations: We can use serverless functions to securely interact with third-party APIs, ensuring that our app remains modular and easy to maintain.
Authentication and Authorization: By utilizing serverless functions, we can manage user authentication and authorization, ensuring secure access to the app's features.
By using the Serverless Framework, we can easily deploy and manage these functions, ensuring that our app remains responsive and scalable.

