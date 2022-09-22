# meet-app
Meet with your friends! Search through cities to find events near you.

This app brought to you by create-react-app and yours truly.
To start, run `npm start`.
To deploy, run `npm run deploy`

As a user,
I should be able to show and hide details
So that I can only see information relevant to me

 * Given an event is retrieved, when it is rendered, then the details are hidden
 * Given an event has detials hidden, when the user clicks a button, the details become visible
 * Given an event has details visible, when the user clicks a button, the details become hidden

As a user,
I should be able to limit the number of events
So that I can see more or less information at a time

 * Given a user has not changed any settings, when they navigate to the page, up to 32 events are shown
 * Given a user is on the event view, when they select a new number of events, only that many events are shown

As a user,
I should be able to use the app offline
So that I have a good experience on a bad connection

 * Given a user is using the app, when they lose connection, the cache is used
 * Given a user has no connection, when they change the city or time range, an error is shown

As a user,
I should be able to see a graph of the events
So that I can identify popular cities

 * Given a user is on the data page, when the page renders, a graph will be visible 
