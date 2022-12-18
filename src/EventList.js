import React, { Component } from 'react';
import Event from './Event';
import { WarningAlert } from "./Alert";

class EventList extends Component {
    render() {
        const { events } = this.props;
        return <>
            {!navigator.onLine && <WarningAlert text='You are offline. This content was loaded from the cache and may be out of date.' />}
            <ul className='eventList'>
                {events.map((event, index) => {
                    return <li key={event.id}>
                        <Event event={event} />
                    </li>
                })}
            </ul>
        </>
    }
}

export default EventList;
