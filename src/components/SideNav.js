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
            <Menu width={ '40%' }
                  isOpen={this.state.menuOpen}>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
            </Menu>
        );
    }
    
}
export default SideNav