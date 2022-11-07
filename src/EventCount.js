import React, { Component } from 'react';

class Event extends Component {
    // Keep in mind that this event arg is the 'change' event, not a calendar event
    handleOnChange = (event) => {
        this.props.updateCount(event.target.value)
    }

    render() {
        return <input
            className='eventCount'
            value={this.props.countEvents}
            onChange={this.handleOnChange}
        ></input>;
    }
}
export default Event;
