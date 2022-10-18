import React from 'react';
import './App.css';
import EventList from './EventList';
import EventCount from './EventCount';
import CitySearch from './CitySearch';

function App() {
  return (
    <>
      <div className="App">
        <CitySearch />
        <EventCount />
        <EventList />
      </div>
    </>
  );
}

export default App;
