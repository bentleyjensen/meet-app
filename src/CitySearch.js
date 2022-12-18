import React, { Component } from 'react';
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: false,
        infoText: '',
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const locations = this.props.locations.filter(location => {
            return location.toUpperCase().indexOf(value.toUpperCase()) !== -1
        });

        // We don't want to make multiple calls to setState, so we're duplicating a few lines
        // But it's intentional. Leave it alone.
        if (locations.length === 0) {
            this.setState({
                query: value,
                infoText: 'Oops, we couldn\'t find that city.',
                suggestions: locations,
            });
        } else {
            this.setState({
                query: value,
                infoText: '',
                suggestions: locations,
            });
        }
    }

    handleItemClicked = (suggestion) => {
        // Expand 'all' for displaying
        const queryString = (suggestion === 'all') ? 'See all Cities' : suggestion;

        this.setState({
            query: queryString,
            showSuggestions: false,
            infoText: '',
        });

        this.props.updateSelectedLocation(suggestion);
    }

    render() {
        return (
            <div className='citySearch'>
                <InfoAlert text={this.state.infoText} />
                <input type='text'
                    className='cityInput'
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    onFocus={() => { this.setState({ showSuggestions: true })}}
                />
                <ul className='suggestions'
                    style={this.state.showSuggestions ? {} : { display: 'none' }}
                >
                    {this.state.suggestions.map( suggestion => {
                        return <li key={suggestion} onClick={() => {this.handleItemClicked(suggestion)}} >{suggestion}</li>
                    })}
                    <li key='all' onClick={() => { this.handleItemClicked('all') }}>See All Cities</li>
                </ul>
            </div>
        )
    }
}

export default CitySearch;
