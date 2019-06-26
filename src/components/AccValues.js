import {accelerometer} from "react-native-sensors";
import { Dimensions, Text, View, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {LineChart} from "react-native-chart-kit";
import React from 'react';
import s from './styling';
import LinearGradient from "react-native-linear-gradient";

const Value = ({name, value}) => (
    <View style={s.valueContainer}>
        <Text style={s.valueName}>{name}:</Text>
        <Text style={s.valueValue}>{new String(value).substr(0, 10)}</Text>
    </View>
);

class AccValues extends React.Component {
    constructor(props) {
        super(props);

        accelerometer.subscribe(({x, y, z, timestamp}) => this.maybeSetState({x, y, z, timestamp}));
        this.state = {x: 0, y: 0, z: 0, timestamp: 0, speed: 0};
        let init = {Ax: [], Ay: [], Az: [], timestamps: [], speeds: []};
        try {
            AsyncStorage.setItem(this.props.sess, JSON.stringify(init));
        } catch (er) {
            error(er);
        }
    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                let temp = this.state;
                temp.speed = position.coords.speed;
                this.setState(temp);
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 200, maximumAge: 500, distanceFilter: 1},
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    archive() {
        try {
            AsyncStorage.getItem(this.props.sess)
                .then(data => {
                    // transform it back to an object
                    try {
                        data = JSON.parse(data);
                        data.Ay.push(this.state.y);
                        data.Ax.push(this.state.x);

                        data.Az.push(this.state.z);
                        data.timestamps.push(this.state.timestamp);
                        data.speeds.push(this.state.speed);
                    } catch (e) {
                    }
                    //save the value to AsyncStorage again
                    AsyncStorage.setItem(this.props.sess, JSON.stringify(data));
                }).done();
        } catch (er) {
            return;
        }
    }

    maybeSetState(update) {
        if (update.timestamp - this.state.timestamp > 500) {
            this.setState(update);
            if (this.props.save) {
                this.archive();
            }
        } else {
            return;
        }
    }

    render() {
        return (
            <View>
                <Value name="x" value={this.state.x}/>
                <Value name="y" value={this.state.y}/>
                <Value name="z" value={this.state.z}/>
                <Value name="ts" value={this.state.timestamp}/>
                <Value name="speed" value={this.state.speed}/>
            </View>
        );
    }
}

export default AccValues;