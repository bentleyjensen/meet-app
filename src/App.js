import React, { Component } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import './App.css';
import EventGenre from './EventGenre';
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

    getData = () => {
        const { locations, events } = this.state;
        const data = locations.map((location) => {
            const number = events.filter((event) => event.location === location).length;
            const city = location.split(', ').shift();
            return {city, number};
        });
        return data;
    }

    async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = (await checkToken(accessToken)).error ? false : true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        const isLocalhost = window.location.href.startsWith('http://localhost');

        // In order to show the screen:
        // Not on localhost
        // AND not have either of: a code or valid token
        this.setState({ showWelcomeScreen: (!isLocalhost && !( code || isTokenValid)) });

        if ((isLocalhost || code || isTokenValid) && this.mounted) {
            getEvents().then((events) => {
                if (this.mounted) {
                    this.setState({ events: events.slice(0,this.state.countEvents), locations: extractLocations(events) });
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
                <h4 style={{ 'marginBottom': 0}} >Search by city</h4>
                <CitySearch locations={this.state.locations} updateSelectedLocation={this.updateSelectedLocation} />
                <h4 style={{ 'marginBottom': '10px' }} >Number of events to show</h4>
                <EventCount countEvents={this.state.countEvents} updateCount={this.updateCount} />
                <div className='data-vis-wrapper'>
                    <EventGenre events={this.state.events} />
                    <ResponsiveContainer height={400}>
                        <ScatterChart
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                            <CartesianGrid />
                            <XAxis type='category' dataKey='city' name='City' />
                            <YAxis type='number' dataKey='number' name='# of Events' allowDecimals={false} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter data={this.getData()} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <EventList events={this.state.events} />
                <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => { getAccessToken() }} />
            </div>
        </>
    }
}

export default App;
