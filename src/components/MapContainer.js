import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'
class MapContainer extends Component {
    state = {

    }
    componentDidMount() {
      this.getVenues()
    }
    getVenues = () => {
      const endpoint = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        cliend_id:"L105UNFOLBWBYAH2I4KRUPGRZZVZXIY3NFZAFZ0V4OSRWXHN",
        client_secret:"531CGS50AMTVAHMAJXV1BGE35KC4445ZCG30O4QWBB5BR3LR",
        query:"food",
        near:"Seattle",
        v:"20181009"
      }
      axios.get(endpoint + new URLSearchParams(parameters))
        .then(Response => {
          console.log(Response)
        })
        .catch(error => {
            console.log(error)
        })
    }
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
        <Map 
          google={this.props.google} 
          zoom={11}
          style={{height: 'calc(100% - 101px)'}}
          initialCenter={{
            lat: 47.638459,
            lng: -122.367408
          }}>
        <Marker onClick={this.onMarkerClick}
                position={{lat:47.6918 , lng:-122.4031}}
                name={'Golden Gardens'} />
        <Marker onClick={this.onMarkerClick}
                position={{lat:47.6608683, lng:-122.4328379}}
                name={'Discovery Park Beach'}/>
        <Marker onClick={this.onMarkerClick}
                position={{lat:47.5791, lng:-122.4114}}
                name={'Alki Beach'}/>
        <Marker onClick={this.onMarkerClick}
                position={{lat:47.7048, lng:-122.2154}}
                name={'Juanita Beach Park'}/>
        <Marker onClick={this.onMarkerClick}
                position={{lat:47.6194, lng:-122.3618}}
                name={'Myrtle Edwards Park'}/>
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