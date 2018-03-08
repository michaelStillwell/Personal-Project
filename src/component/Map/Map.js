// React Imports
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLocation: {
                lat: this.props.initialCircle.lat,
                lng: this.props.initialCircle.lng,
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Map Page</h1>
                <Map google={this.props.google} zoom={14}>
                    <Marker onClick={this.onMarkerClick}
                        name={'Current Location'} />
                    
                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({ apiKey: "AIzaSyDdBoADH3v-VyfdPUaUUHH8xSuegOSWYFo" })(MapContainer);