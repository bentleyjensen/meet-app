Feature: Show and Hide Event Details
    Scenario: Event details are hidden by default
        Given the app is closed
        When the user opens the app
        Then the details are collapsed
    Scenario: User can expand an event and see details
        Given an event is collapsed
        When the 'details' button is clicked
        Then the details become visible
    Scenario: User can collapse event details to hide them
        Given an event has its details visible
        When the 'details' button is clicked
        Then the details become hidden
