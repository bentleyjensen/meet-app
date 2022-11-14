Feature: User can specify the number of events shown
    Scenario: Users are shown 32 events by default
        Given the app is closed
        When the user opens the app
        Then thirty-two events are shown
    Scenario: Users can change the number of events shown
        Given the app is open
        When the user changes the number of events
        Then that number of events are listed
