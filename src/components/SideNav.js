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
                isOpen={this.props.menuOpen}
            >
                <ul>    
                    {this.props.venues.forEach(venue => {
                        console.log(venue);
                        return <li>{venue.venue.name}</li>
                    })}
                </ul>
            </Menu>
        );
    }
    
}
export default SideNav