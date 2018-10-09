import React, { Component } from 'react';
//import Map from './components/Map'
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <nav id="top-nav" style={{backgroundImage: 'url(' + require('./img/beachfinder-nav.jpg') + ')'}}>
          <h1>BeachFinder</h1>
        </nav>
        <div id="map">
        <Map google={this.props.google} />
        </div>
      </div>  
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCjl6vYjUvbWFn9KPvdPdgea0umn1B8d-4")
})(App)