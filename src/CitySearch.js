import React, { Component } from 'react';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const locations = this.props.locations.filter(location => {
            return location.toUpperCase().indexOf(value.toUpperCase()) !== -1
        });
        this.setState({
            query: value,
            suggestions: locations,
        });
    }

    handleItemClicked = (suggestion) => {
        // Expand 'all' for displaying
        const queryString = (suggestion === 'all') ? 'See all Cities' : suggestion;

        this.setState({
            query: queryString
        });
        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <div className='citySearch'>
                <input type='text'
                    className='cityInput'
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />
                <ul className='suggestions'>
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
