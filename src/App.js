import React, { Component } from 'react';
import MapContainer from './components/MapContainer'
import './App.css';



class App extends Component {
  
  render() {
    return (
      <div>
        <nav id="top-nav">
          <h1>BeachFinder</h1>
        </nav>
        <div id="map">
        <MapContainer/>
        </div>
      </div>  
    );
  }
}

export default App