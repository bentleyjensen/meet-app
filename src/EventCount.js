import React, { Component } from 'react';

class EventCount extends Component {
    // Keep in mind that this event arg is the 'change' event, not a calendar event
    handleOnChange = (event) => {
        const num = parseInt(event.target.value);
        if (num > 0) {
            this.props.updateCount(num)
        } else {
            this.props.updateCount(0)
        }
    }

    render() {
        const displayValue = (this.props.countEvents === 0) ? '' : this.props.countEvents;
        return <input
            className='eventCount'
            value={displayValue}
            onChange={this.handleOnChange}
            onFocus={(event) => event.target.select()} // Highlight text on focus
        ></input>;
    }
}
export default EventCount;
