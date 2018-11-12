import React, { Component } from 'react';
import MapContainer from './components/MapContainer'
import axios from 'axios'
import './App.css';
import SideNav from './components/SideNav'


class App extends Component {
  state = {
    venues: [],
    markers: [],
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: {},
    selectedIndex: null,
    menuOpen: false,
    query: "",
    search: [],
    venuesToDisplay: [],
    realMarkers: [],
    generatedMarkers: null,
  };

  componentDidMount() {
    this.getVenues();
    this.liftState();
  }
  //lift markers in MapContainer to App
  liftState = (markers) => {
    this.setState({ generatedMarkers: markers }, () => console.log(this.state));
  };

  /*prevent generatedMarkers from expanding
  avoidExpand = () => {
    newGeneratedMarkers =[];
    const newMarkers = this.state.generatedMarkers.slice(0);
    this.newGeneratedMarkers.push(newMarkers);
    console.log(newGeneratedMarkers);
  }*/

  getVenues = () => {
    const endpoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "L105UNFOLBWBYAH2I4KRUPGRZZVZXIY3NFZAFZ0V4OSRWXHN",
      client_secret: "531CGS50AMTVAHMAJXV1BGE35KC4445ZCG30O4QWBB5BR3LR",
      query: "beach",
      near: "Seattle, WA",
      v: "20181010"
    };
    //fetch foursquare data with axios and set venues state
    axios
      .get(endpoint + new URLSearchParams(parameters))
      .then(Response => {
        const venues = Response.data.response.groups[0].items;
        const markers = venues.map(venue => {
          return venue.venue;
        });
        this.setState(
          {
            venues: venues,
            markers: markers
          },
          () => {
            this.setState({ load: false });
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  //when marker is clicked, infowindow shows, marker states updates on click
  onMarkerClick = (props, marker, e) => {
    console.log(props, marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  //when list item is clicked match venued id with marker id, set active marker
  onListClick = venue => {
    console.log(venue);
    this.state.generatedMarkers.forEach(marker => {
      console.log('list marker',marker);
      if (venue.id === marker.props.id) {
        this.setState({
          selectedPlace: venue,
          menuOpen: false,
          activeMarker: marker.marker,
          showingInfoWindow: true
        });
      }
    });
  };
  //run on infowindow close
  onInfoWindowClose = props => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
      menuOpen: false,
      selectedPlace: null
    });
  };

  //keeps state in sync with opening and closing of nav
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  //filter venue markers based on search
  searchVenues = query => {
    this.setState({
      query,
      menuOpen: true,
      showingInfoWindow: false,
      selectedIndex: null,
      selectedPlace:null
    });

    this.updateQuery(query);
  };
  //filter venues based on search
  updateQuery = query => {
    if (query) {
      const search = this.state.venues.filter(myVenue =>
        myVenue.venue.name.toLowerCase().includes(query.toLowerCase())
      );
      this.setState({ search });
    } else {
      this.setState({ search: [] });
    }
  };
  //when map is clicked, infowindow is hidden, marker states update
  onMapClick = props => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      menuOpen: false,
      selectedPlace: null
    });
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
            marker={this.state.markers}
            onMarkerClick={this.onMarkerClick}
            onClose={this.onInfoWindowClose}
            onMapClick={this.onMapClick}
            markerAnimate={this.markerAnimate}
            animation={this.markerAnimate}
            activeMarker={this.state.activeMarker}
            liftState={this.liftState}
            search={this.state.search}
            onListClick={this.onListClick}
            realMarkers={this.state.realMarkers}
            selectedPlace={this.state.selectedPlace}
          />
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
            onStateChange={state => this.handleStateChange(state)}
          />
        </div>
      </div>
    );
  }
}

export default App