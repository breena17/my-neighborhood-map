import React, { Component } from 'react';
import MapContainer from './components/MapContainer'
import axios from 'axios'
import './App.css';
import SideNav from './components/SideNav'


class App extends Component {
  state = {
    venues:[],
    markers:[],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    menuOpen: false,
    markerShowing: true,
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
  }
  componentDidUpdate() {
    this.pushMarkers()
  }
  //adding markers to state
  pushMarkers = () => {
    this.state.venues.map((marker,id) => {
    return  this.state.markers.push(marker)
    })
  }
  //when marker is clicked, infowindow shows, marker states updates on click
  onMarkerClick = (props, marker, e) => {
    console.log('test');
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      menuOpen: true
    });
    console.log(this.state);
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
  //keeps query state in sync with markers
  handleMarkers (state) {
    this.setState({markerShowing: state.visibility})
  }
  //filter venue markers based on search
  searchVenues = (query) => {
    this.setState({query});

    this.state.venues.map(myVenue => {
        const match = myVenue.venue.name.toLowerCase().includes(query.toLowerCase());
        const marker = this.state.markers.find(marker => marker.venue.id === myVenue.venue.id);
    if (match) {
        //marker.setVisible(true);
        this.setState({
            markerShowing: true
        })
    } else {
        //marker.setVisible(false);
        this.setState({
            markerShowing: false
        })
    }
    return marker;
    });
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
            onChange={(state) => this.handleMarkers(state)}
            onMarkerClick={this.onMarkerClick}
            onClose={this.onInfoWindowClose}
            onMapClick={this.onMapClick}/>
        </div>
        <div id="side-nav" aria-label="venue navigation">
          <SideNav
            {...this.state} 
            pageWrapId={"nav-list"}
            outerContainerId={"app"}
            venues={this.state.venues}
            isOpen={this.state.menuOpen}
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