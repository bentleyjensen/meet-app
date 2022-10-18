import React, { Component } from 'react';

class Event extends Component {
    state = {
        count: 32,
    }

    // Keep in mind that this is the 'change' event, not a calendar event
    handleOnChange = (event) => {
        this.setState({
            count: event.target.value
        })
    }

    render() {
        return <input
            className='eventCount'
            value={this.state.count}
            onChange={this.handleOnChange}
        ></input>;
    }
}
export default Event;
