import React, { Component } from 'react';

class Event extends Component {
    state = {
        collapsed: true,
    }
    toggleCollapsed = (event) => {
        this.setState((state, props) => {
            return {
                collapsed: !state.collapsed
            }
        })
    }
    render() {
        const { collapsed } = this.state;
        const { event } = this.props;
        return (
            <div className='event'>
                <h1 className='summary'>{event.summary}</h1>
                <p className='datetime'>{new Date(event.start.dateTime).toString()}</p>
                <p className='location'>{event.location}</p>
                { !collapsed && <h3 className='aboutHeading'>About</h3> }
                {!collapsed && <a href={event.htmlLink} className='calendarLink'>See details on Google Calendar</a> }
                { !collapsed && <p className='description' >{event.description}</p> }
                <button className='detailsButton' onClick={this.toggleCollapsed}>{collapsed ? 'Show' : 'Hide'} Details</button>
            </div>
        );
    }
}

export default Event;
