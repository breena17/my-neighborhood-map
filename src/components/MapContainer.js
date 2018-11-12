import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  realMarkers = [];

  addRealMarker = marker => {
    console.log("mark", marker);
    this.realMarkers.push(marker);
    this.props.liftState(this.realMarkers);
  };

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    let filterMarkers = this.props.query
      ? this.props.search
      : this.props.venues;

    let markers = filterMarkers.map((myVenue, index) => {
      const marker = (
        <Marker
          ref={this.addRealMarker}
          position={{
            lat: myVenue.venue.location.lat,
            lng: myVenue.venue.location.lng
          }}
          title={myVenue.venue.name}
          id={myVenue.venue.id}
          key={index}
          onClick={this.props.onMarkerClick}
          visible={this.props.markerShowing}
          animation={
            this.props.selectedPlace
              ? myVenue.venue.name === this.props.selectedPlace.title ||
                myVenue.venue.name === this.props.selectedPlace.name
                ? "1"
                : "0"
              : "0"
          }
        />
      );
      return marker;
    });

    return (
      <Map
        selectedPlace={this.props.selectedPlace}
        onClick={this.props.onMapClick}
        google={this.props.google}
        zoom={10}
        style={{ height: "calc(100% - 101px)" }}
        initialCenter={{
          lat: 47.6194,
          lng: -122.6031
        }}>
        {/*map thru venues state to create markers, filter markers on search*/}
        {markers}

        <InfoWindow
          onClose={this.props.onClose}
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}>
          <div>
            {this.props.selectedPlace && (
              <h2>
                {this.props.selectedPlace.title ||
                  this.props.selectedPlace.name}
              </h2>
            )}
            {this.props.selectedPlace && <h3>{this.props.selectedPlace.id}</h3>}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCjl6vYjUvbWFn9KPvdPdgea0umn1B8d-4")
})(MapContainer)