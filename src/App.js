import React, { Component } from 'react';
import MapContainer from './components/MapContainer'
import axios from 'axios'
import './App.css';
import SideNav from './components/SideNav'


class App extends Component {
  state = {
    venues:[],
    markers: [],
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: {},
    menuOpen: false,
    query:'',
    search: [],
    venuesToDisplay: [],
    realMarkers: []
  }
  
  componentDidMount() {
    this.getVenues()
  }
  /*
  onMarkerMounted = element => {
    console.log(element);
    this.setState(
      {
        realMarkers: [...this.state.realMarkers, element.marker]
      },
      () => {
        console.log(this.state.realMarkers);
      }
    );
  };
*/


/*
  addRealMarkers = object => {
    console.log('mark',object.marker)
    
    this.setState(
      {
        realMarkers: [object.marker]
      },
      () => {
        console.log("the real markers: ", this.state.realMarkers);
      }
    )
  }
*/
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
        const venues = Response.data.response.groups[0].items;
        const markers = venues.map(venue => {
          return venue.venue
        });
        this.setState({
          venues: venues,
          markers: markers
        }, () => {
          this.setState({ load: false})
        } )
      })
      .catch(error => {
          console.log(error)
      })
  }
  
  //when marker is clicked, infowindow shows, marker states updates on click
  onMarkerClick = (props, marker, e) => {
    console.log(marker)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      menuOpen: true
    });
  };
  
  onListClick= (object) => {
    this.setState({
      selectedPlace: object,
      menuOpen: true,
      
    });
    /*this.setState({venuesToDisplay: Object.assign({}, this.state.venuesToDisplay,
      {venueId:object.id},
      {venueName:object.name},
      {venueLocation:object.location},
      {open:false}
    )})*/
    
    if (this.state.selectedPlace.name === this.state.markers.name) {
      window.google.maps.event.trigger(this.state.selectedPlace[0], 'click');
    }
  };
    /**/
    /*let filterList = this.state.query ? this.state.search : this.state.venues;
    filterList.map((myVenue)=> {
    const marker = filterList.find(myVenue => this.state.selectedPlace.id === myVenue.venue.id)
    this.setState({
      selectedPlace: object,
      activeMarker: marker,
      showingInfoWindow: true,
      menuOpen: true 
    })
    return marker;
    
    //if(this.state.selectedPlace.id === this.marker.id) {
      //console.log('match')
      //this.onMarkerClick(object)
  
    });*/
    //console.log(marker)
  
    /*
    let filterList = this.state.query ? this.state.search : this.state.venues;
    filterList.map((myVenue)=> {
      const marker = filterList.find(myVenue => selectedPlace.id === myVenue.venue.id);
      this.setState ({
      activeMarker: marker,
      showingInfoWindow: true,
      menuOpen: true
    })
    return marker;
    })
*//*let filterList = this.state.query ? this.state.search : this.state.venues;
    filterList.map((myVenue)=> {
    if(this.state.selectedPlace.id === this.state.myVenue.venue.id) {
      this.setState({
        activeMarker: !null,
        showingInforWindow: true,
        menuOpen: true
      })
    }
    this.onMarkerClick(o)
  })
   
    
    */

  //when infowindow is closed, infowindow is hidden, marker states update
  onInfoWindowClose = (props) => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
      menuOpen: false
    });
  };
  
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
    });
    this.updateQuery(query);
};
  //filter venues based on search
  updateQuery = (query) => {
    if (query) {
      const search = this.state.venues.filter( myVenue => myVenue.venue.name.toLowerCase().includes(query.toLowerCase()));
      this.setState({search});
    } else {
      this.setState({ search: [] });
    }
  };
  //when map is clicked, infowindow is hidden, marker states update
  onMapClick = (props) => {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        menuOpen: false
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
            //onChange={(state) => this.handleMarkers(state)}
            onMarkerClick={this.onMarkerClick}
            onClose={this.onInfoWindowClose}
            onMapClick={this.onMapClick}
            markerAnimate={this.markerAnimate}
            animation={this.markerAnimate}
            activeMarker={this.state.activeMarker}
            //onMarkerMounted={this.onMarkerMounted}
            //addRealMarkers={this.addRealMarkers}
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
            activeMarker={this.state.activeMarker}
            onStateChange={(state) => this.handleStateChange(state)}
            
          />
        </div>
      </div>  
    );
  }
}

export default App