import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'


class SideNav extends Component {
    state = {
        
        query:'',
        search: [],
        markerShowing: true 
    }
    
    //filter venue markers based on search
  searchVenues = (query) => {
    this.setState({query});

    this.props.venues.map(myVenue => {
        const match = myVenue.venue.name.toLowerCase().includes(query.toLowerCase());
        const marker = this.props.markers.find(marker => marker.venue.id === myVenue.venue.id);
    if (match) {
        //marker.setVisible(true);
        /*this.setState({
            markerShowing: true
        })*/
    } else {
        //marker.setVisible(false);
        /*this.setState({
            markerShowing: false
        })*/
    }
    return marker;
    });
    this.updateQuery(query);
}
  //filter venues based on search
  updateQuery = (query) => {
    if (query) {
      const search = this.props.venues.filter( myVenue => myVenue.venue.name.toLowerCase().includes(query.toLowerCase()));
      this.setState({search})
    } else {
      this.setState({ search: [] })
    }
  }
    showSettings(event) {
        event.preventDefault();
    }
    render() {
        let filtered = this.state.query ? this.state.search : this.props.venues;
        return (
            <Menu
                width={ '40%' }
                isOpen={this.props.menuOpen}
                >
                <div className="listNav" aria-label="venue list">
                    <input className="input"
                           tabIndex="0"
                           placeholder="Search for beaches..."
                           name="search"
                           title="Search Beaches"
                           type="search"
                           aria-label="search beaches"
                           onChange={(event) => this.searchVenues(event.target.value)}
                        />
                    
                    <ul className="list">
                        {filtered.map(myVenue => (
                            <li className="nav-item"
                                id={myVenue.venue.id}
                                key={myVenue.venue.id}
                                tabIndex="0"
                                aria-label={myVenue.venue.name}
                                role="menuItem">
                                
                                <h2>{myVenue.venue.name}</h2>
                                <p>{myVenue.venue.location.address}</p>
                            </li>
                            )   
                        )}
                    </ul>
                </div>
            </Menu>
        );
    }
    
}
export default SideNav