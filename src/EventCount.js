import React, { Component } from 'react';

class Event extends Component {
    // Keep in mind that this event arg is the 'change' event, not a calendar event
    handleOnChange = (event) => {
        const num = parseInt(event.target.value);
        if (num > 0) {
            this.props.updateCount(num)
        }
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
