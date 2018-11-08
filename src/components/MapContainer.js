import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    let filterMarkers = this.props.query ? this.props.search : this.props.venues;
    //let markers =[];
    //let filterMarkersNotCreated = [];
    //Check if new array contains any element of existing array
    //if no match, add to new array filterMarkersNotCreated
    //First time filterMarkersNotCreated will be equal to filterMarkers, but afterward it will be different
    /*
    let notPresentInData = filterMarkersNotCreated.filter(val => !filterMarkers.includes(val));
      if (notPresentInData) {
        filterMarkers.push(filterMarkersNotCreated);
      }
      */
    
    /*******
     arrayOne.forEach(function(venue) {
      if (arrayTwo.findIndex(secondVenue => venue.id = secondVenue .id)) !== -1) {
      // match found
    }
    })
    ********/
      
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
          {/*map thru venues state to create markers, filter markers on search*/}
          {filterMarkers.map((myVenue,id) => {
          const marker = <Marker position={{lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng}}
                  title={myVenue.venue.name}
                  id={myVenue.venue.id}
                  key={id}
                  onClick={this.props.onMarkerClick}
                  visible={this.props.markerShowing}
                  //animation={this.props.markerAnimate}
                  />
                  /*if (marker) {
                    this.markers.push(marker) 
                    this.props.onMarkerCreated(marker);
                  }*/
                  return marker
                    
                    
                  
          })  }
          
          <InfoWindow onClose={this.props.onClose}
                      marker={this.props.activeMarker}
                      visible={this.props.showingInfoWindow}>
                <div>
                  {this.props.selectedPlace && (
                    <h2>{this.props.selectedPlace.title}</h2>
                    
                  )}
                  <h3>{this.props.markers.name}</h3>
                </div>
          </InfoWindow>
        </Map>  
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCjl6vYjUvbWFn9KPvdPdgea0umn1B8d-4")
})(MapContainer)