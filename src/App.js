import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import EventCount from './EventCount';
import CitySearch from './CitySearch';

import { extractLocations, getEvents } from './api';

import './nprogress.css';

class App extends Component {
    state = {
        events: [],
        locations: [],
        countEvents: 32,
    }

    updateEvents = (location) => {
        // Obtain  all events
        getEvents().then((events) => {
            if (location === 'all') {
                this.setState({
                    events,
                });
                return;
            }
            // Filter down to just the events matching the location arg
            const locationEvents = events.filter(event => event.location === location)
            // Update state accordingly
            this.setState({
                events: locationEvents,
            });
        });
    }

    updateCount = (count) => {
        this.setState({
            countEvents: count,
        })
    }

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            if (this.mounted) {
                this.setState({
                    events: events,
                    locations: extractLocations(events)
                });
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <>
            <div className="App">
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                <EventCount countEvents={this.state.countEvents} updateCount={this.updateCount} />
                <EventList events={this.state.events} />
            </div>
        </>
    }
}

export default App;
