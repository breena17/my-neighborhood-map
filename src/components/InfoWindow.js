import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server'

class InfoWindow extends React.Component {
    componentDidUpdate(prevProps) {
        //map instance becomes available
        if (this.props.map !== prevProps.map) {
            this.renderInfoWindow();
        }
        //if content of infowindow updates, update infowindow
        if (this.props.children !== prevProps.children) {
            this.updateContent();
        }
        //if visible state changes, open or close infowindow
        if ((this.props.visible !== prevProps.visible) || 
            (this.props.marker !== prevProps.marker)) {
                this.props.visible ?
                    this.openWindow() : this.closeWindow();
        }
    }
    //open infowindow
    openWindow() {
        this.infowindow.open(this.props.map, this.props.marker);
    }
    //close infowindow
    closeWindow() {
        this.infowindow.close();
    }
    //update infowindow content
    updateContent() {
        const content = this.renderChildren();
        this.infowindow.setContent(content);
    }
    //render children of infowindow component
    renderChildren() {
        const {children} = this.props;
        return ReactDOMServer.renderToString(children);
    }
    renderInfoWindow() {
        let {map, google, mapCenter} = this.props;

        const info = this.infowindow = new google.maps.InfoWindow({
            content:''
        });
        google.maps.event.addListener(info, 'closeclick', this.onClose.bind(this))
        google.maps.event.addListener(info, 'domready', this.onOpen.bind(this));
    }
    onOpen() {
        if (this.props.onOpen) this.props.onOpen();
    }
    onClose() {
        if (this.props.onClose) this.props.onClose();
    }
    render() {
        return null;
    }
}
export default InfoWindow