import React, { Component } from 'react';
import {View, Text, PermissionsAndroid, Dimensions, Vibration} from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import Speedometer from 'react-native-speedometer-chart';

class Tracker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            speed: 0,
            error: null,
        };
    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    speed: position.coords.speed,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 200, maximumAge: 500, distanceFilter: 1 },
        );
    }



    render() {
        return (
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <Text>Speed: {this.state.speed}</Text>
                <Speedometer
                    value={this.state.speed}
                    totalValue={5}
                    size={250}
                    outerColor="#d3d3d3"
                    internalColor="#ff0000"
                    showIndicator
                    textStyle={{ color: 'green' }}
                    showLabels
                    labelStyle={{ color: 'blue' }}
                    showPercent
                    percentStyle={{ color: 'red' }}
                />
                <Text>{JSON.stringify(this.state)}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            </View>
        );
    }
}

export default Tracker;