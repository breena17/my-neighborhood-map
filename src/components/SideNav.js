import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'


class SideNav extends Component {
    
    
    
    showSettings(event) {
        event.preventDefault();
    }
    render() {
        let filterList = this.props.query ? this.props.search : this.props.venues;
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
                           onChange={(event) => this.props.searchVenues(event.target.value)}
                        />
                    
                    <ul className="list">
                        {/*filter list based on search*/}
                        {filterList.map(myVenue => (
                            <li className="nav-item"
                                id={myVenue.venue.id}
                                key={myVenue.venue.id}
                                tabIndex="0"
                                aria-label={myVenue.venue.name}
                                role="menuItem"
                                onClick={this.props.onListClick}>
                                
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