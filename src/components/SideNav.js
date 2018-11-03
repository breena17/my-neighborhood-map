import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'


class SideNav extends Component {
    state = {
        menuOpen: false
    }
    showSettings(event) {
        event.preventDefault();
    }
    render() {
        
        return (
            <Menu
                width={ '40%' }
                isOpen={this.props.menuOpen}>
                <div className="listNav" aria-label="venue list">
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