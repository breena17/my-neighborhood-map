import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'
class MapContainer extends Component {
    state = {
      venues:[],
      markers:[],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    componentDidMount() {
      this.getVenues()
    }
    getVenues = () => {
      const endpoint = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        client_id:"L105UNFOLBWBYAH2I4KRUPGRZZVZXIY3NFZAFZ0V4OSRWXHN",
        client_secret:"531CGS50AMTVAHMAJXV1BGE35KC4445ZCG30O4QWBB5BR3LR",
        query:"beach",
        near:"Seattle, WA",
        v:"20181010"
      }
      axios.get(endpoint + new URLSearchParams(parameters))
        .then(Response => {
          console.log(Response.data.response.groups[0].items)
          this.setState({
            venues: Response.data.response.groups[0].items
          }, () => {
            this.setState({ load: false})
          } )
        })
        .catch(error => {
            console.log(error)
        })
    }
    onMarkerClick = (props,marker,e) => {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
    }
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    
    return (
        <Map 
          google={this.props.google} 
          zoom={10}
          style={{height: 'calc(100% - 101px)'}}
          initialCenter={{
            lat: 47.6194,
            lng: -122.6031
          }}>
          {this.state.venues.map((myVenue,id) => 
          <Marker position={{lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng}}
                  title={myVenue.venue.name}
                  id={myVenue.venue.id}
                  key={id}
                  onClick={this.onMarkerClick}
                  />)}
          <InfoWindow onClose={this.onInfoWindowClose}
                      marker={this.state.activeMarker}
                      visable={this.state.showingInfoWindow}>
              <div>
                <h1>Marker</h1>
              </div>
          </InfoWindow>
        </Map>  
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCjl6vYjUvbWFn9KPvdPdgea0umn1B8d-4")
})(MapContainer)