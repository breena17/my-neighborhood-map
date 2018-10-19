import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'
class MapContainer extends Component {
    state = {
      venues:[],
      markers:[]
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
    /*
    getMarkers = () => {
      
      this.state.venues.map(myVenue => {
          let marker = new window.google.maps.Marker({
            position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
            map: Map,
            title: myVenue.venue.name,
            id: myVenue.venue.id 
          })
          this.markers.push(marker)
      })
    }*/
    
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }/*
    this.state.venues.map((myVenue,key) => {
      new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        setMap: Map,
        title: myVenue.venue.name,
        id: myVenue.venue.id 
      })
      this.state.markers.push(myVenue)

      //console.log(this.state.markers)
    })*/
    
  
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
                  />)}
        <InfoWindow onClose={this.onInfoWindowClose}>
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