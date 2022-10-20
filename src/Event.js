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
        return (
            <>
                <h1 className='summary'>aoeu</h1>
                <p className='datetime'></p>
                <p className='location'></p>
                { !collapsed && <h3 className='aboutHeading'>aoeu</h3> }
                { !collapsed && <a href='/' className='calendarLink'>aoeu</a> }
                { !collapsed && <p className='description' ></p> }
                <button className='detailsButton' onClick={this.toggleCollapsed}>{collapsed ? 'Show' : 'Hide'} Details</button>
            </>
        );
    }
}

export default Event;
