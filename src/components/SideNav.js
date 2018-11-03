import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'


class SideNav extends Component {
    state = {
        menuOpen: false,
        query:'',
        search: [] 
    }
    //filter venue markers based on search
  searchVenues = (query) => {
    this.setState({query});

    this.props.venues.map(myVenue => {
        const match = myVenue.venue.name.toLowerCase().includes(query.toLowerCase());
    if (match) {
        this.setState({
            markerShowing: true
        })
    } else {
        this.setState({
            markerShowing: false
        })
    }
    return match;
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
                        {this.props.venues.map(myVenue => (
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