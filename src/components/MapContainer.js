import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    
    return (
        <Map
          onClick={this.props.onMapClick} 
          google={this.props.google} 
          zoom={10}
          style={{height: 'calc(100% - 101px)'}}
          initialCenter={{
            lat: 47.6194,
            lng: -122.6031
          }}>
          {/*map thru venues state to create markers*/}
          {this.props.venues.map((myVenue,id) => 
          <Marker position={{lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng}}
                  title={myVenue.venue.name}
                  id={myVenue.venue.id}
                  key={id}
                  onClick={this.props.onMarkerClick}
                  />
          )}
          
          <InfoWindow onClose={this.props.onClose}
                      marker={this.props.activeMarker}
                      visible={this.props.showingInfoWindow}>
                <div>
                  {this.props.selectedPlace && (
                    <h2>{this.props.selectedPlace.title}</h2>
                  )}
                </div>
          </InfoWindow>
        </Map>  
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCjl6vYjUvbWFn9KPvdPdgea0umn1B8d-4")
})(MapContainer)