import React, { Component } from 'react';
import { ErrorAlert } from "./Alert";

class EventCount extends Component {
    state = {
        errMsg: '',
    }

    // Keep in mind that this event arg is the 'change' event, not a calendar event
    handleOnChange = (event) => {
        if (event.target.value === '') {
            this.setState({ errMsg: '' });
            this.props.updateCount('');
            return;
        }
        const num = parseInt(event.target.value || 0);
        const numInRange = num > 0 && num <= 64;

        if (!num || !numInRange) {
            this.setState({ errMsg: 'Please choose a number between 1 and 64' });
        } else {
            this.setState({ errMsg: '' });
        }
        this.props.updateCount(num);
    }

    render() {
        const displayValue = this.props.countEvents || '';
        return <>
            <input
                className='eventCount'
                value={displayValue}
                onChange={this.handleOnChange}
                onFocus={(event) => event.target.select()} // Highlight text on focus
            ></input>
            <ErrorAlert text={this.state.errMsg} />
        </>;
    }
}
export default EventCount;
