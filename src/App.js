import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import EventCount from './EventCount';
import CitySearch from './CitySearch';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
    './api';

import './nprogress.css';

class App extends Component {
    state = {
        events: [],
        locations: [],
        countEvents: 32,
        selectedLocation: 'all',
        showWelcomeScreen: undefined,
    }

    updateEvents = (location, count) => {
        // Use the number of events in state if we don't get an arg
        if (!count || isNaN(parseInt(count)) ) {
            // If for some reason the state isn't defined or is 0, use 32
            if (!this.state.countEvents || this.state.countEvents === 0) {
                count = 32;
            } else {
                count = this.state.countEvents;
            }
        }

        // If no location is provided, get the selected location from state
        if (!location) {
            location = this.state.selectedLocation;
        }

        // Obtain all events
        getEvents().then((events) => {
            if (location === 'all') {
                events = events.slice(0, count);
            } else {
                // Filter down to just the events matching the location arg
                events = events.filter(event => event.location === location)
            }

            // Trim to the correct number of events
            events = events.slice(0, count)

            // Update state accordingly
            this.setState({
                events,
            });
        });
    }

    updateCount = (count) => {

        this.setState({
            countEvents: count,
        });
        this.updateEvents(null, count);
    }

    updateSelectedLocation = (selectedLocation) => {
        this.setState({
            selectedLocation
        });
        this.updateEvents(selectedLocation);
    }

    async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = (await checkToken(accessToken)).error ? false : true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        this.setState({ showWelcomeScreen: !(code || isTokenValid) });

        if ((code || isTokenValid) && this.mounted) {
            getEvents().then((events) => {
                if (this.mounted) {
                    this.setState({ events, locations: extractLocations(events) });
                }
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (this.state.showWelcomeScreen === undefined) {
            return <div className='App' />
        }
        return <>
            <div className="App">
                <CitySearch locations={this.state.locations} updateSelectedLocation={this.updateSelectedLocation} />
                <EventCount countEvents={this.state.countEvents} updateCount={this.updateCount} />
                <EventList events={this.state.events} />
                <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => { getAccessToken() }} />
            </div>
        </>
    }
}

export default App;
