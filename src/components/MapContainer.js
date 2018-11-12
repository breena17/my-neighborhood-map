import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  
  realMarkers = [];
  //as markers are being created put them into real markers array, lift state to App
  addRealMarker = marker => {
    //console.log("mark", marker);
    if(this.realMarkers.length<30) {
      this.realMarkers.push(marker);
    this.props.liftState(this.realMarkers);
    }
  };
  

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    //infowindow address
    let contentString = this.props.markers.map(marker => {
     if(this.props.selectedPlace.title === marker.name ||
        this.props.selectedPlace.name === marker.name)
      return marker.location.address;
    }
  );
  
    
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
        zoom={11}
        style={{ height: "calc(100% - 101px)" }}
        initialCenter={{
          lat: 47.6262,
          lng: -122.3500
        }}>
        {/*map thru venues state to create markers, filter markers on search*/}
        {markers}
        
        <InfoWindow
          ref={this.addContent}
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
            <h3>{contentString}</h3>
            
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCjl6vYjUvbWFn9KPvdPdgea0umn1B8d-4")
})(MapContainer)