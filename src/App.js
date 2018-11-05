import React, { Component } from 'react';
import MapContainer from './components/MapContainer'
import axios from 'axios'
import './App.css';
import SideNav from './components/SideNav'


class App extends Component {
  state = {
    venues:[],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    menuOpen: false,
    query:'',
    search: []
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
    //fetch foursquare data with axios and set venues state
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
  }/*
  componentDidUpdate() {
    this.pushMarkers()
  }
  //adding markers to state
  pushMarkers = () => {
    this.state.venues.map((marker,id) => {
    return  this.state.markers.push(marker)
    })
  }*/
  //when marker is clicked, infowindow shows, marker states updates on click
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      menuOpen: true
    })
    //this.markerAnimate(marker); 
    //marker.addListener('click', this.markerAnimate(marker));
  }/*
  markerAnimate = (marker) => {
    //marker.setAnimation(window.google.maps.Animation.BOUNCE)
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    }
  }*/
  onListClick= (o) => {
    this.setState({selectedPlace: o})
  //let filterList = this.state.query ? this.state.search : this.state.venues;
  //filterList.map((myVenue)=> {
    //const marker = filterList.find(marker => marker.id === myVenue.venue.id);
   // this.setState ({
    //activeMarker: marker,
    //showingInfoWindow: true,
    //menuOpen: true
  //})
  //return marker;
  //})


}
  //when infowindow is closed, infowindow is hidden, marker states update
  onInfoWindowClose = (props) => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
      menuOpen: false
    })
  }
  
  //keeps state in sync with opening and closing of nav
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})
  }
  
  //filter venue markers based on search
  searchVenues = (query) => {
    this.setState({
      query,
      menuOpen:true,
      showingInfoWindow:false
    })
    this.updateQuery(query);
}
  //filter venues based on search
  updateQuery = (query) => {
    if (query) {
      const search = this.state.venues.filter( myVenue => myVenue.venue.name.toLowerCase().includes(query.toLowerCase()));
      this.setState({search})
    } else {
      this.setState({ search: [] })
    }
  }
  //when map is clicked, infowindow is hidden, marker states update
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        menuOpen: false
      })
    }
  };
  render() {
    
    return (
      <div id="app">
        <nav id="top-nav" aria-label="header">
          <h1>BeachFinder</h1>
        </nav>
        <div id="map" aria-label="map" role="application">
          <MapContainer 
            {...this.state}
            google={this.state.google}
            visibility={this.state.markerShowing}
            //onChange={(state) => this.handleMarkers(state)}
            onMarkerClick={this.onMarkerClick}
            onClose={this.onInfoWindowClose}
            onMapClick={this.onMapClick}
            markerAnimate={this.markerAnimate}/>
        </div>
        <div id="side-nav" aria-label="venue navigation">
          <SideNav
            {...this.state} 
            pageWrapId={"nav-list"}
            outerContainerId={"app"}
            venues={this.state.venues}
            isOpen={this.state.menuOpen}
            onListClick={this.onListClick}
            query={this.state.query}
            search={this.state.search}
            updateQuery={this.updateQuery}
            searchVenues={this.searchVenues}
            onStateChange={(state) => this.handleStateChange(state)}
            
          />
        </div>
      </div>  
    );
  }
}

export default App