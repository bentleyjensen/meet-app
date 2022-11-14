Feature: Filter Events By City
    Scenario: When a user hasn't searched for a city, show events from all cities
        Given a user hasn't searched for a city
        When the user opens the app
        Then events from all cities are displayed

    Scenario: User should see a list of suggestions when searching for a city
        Given the main page is open
        When the user begins typing in the searchbox
        Then a list of suggestions appears

    Scenario: User can select a city from the suggestions list
        Given A user has typed into the searchbox (such as 'berlin')
        And the list of suggestions is visible
        When the user clicks a suggested city (ie 'Berlin, Germany')
        Then the users city should be changed to that city (ie 'Berlin, Germany')
        And only events in that city should be listed
