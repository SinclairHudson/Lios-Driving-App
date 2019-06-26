import {
    Dimensions,
    Text,
    View,
    TouchableOpacity,
    Vibration,
    Alert,
    SafeAreaView,
    PermissionsAndroid
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import s from './styling';
import LinearGradient from "react-native-linear-gradient";
import AccValues from "./AccValues";
import Tracker from "./Tracker";
import {accelerometer} from "react-native-sensors";

class DrivingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driving: false,
            sess: false,
            Ax: -1,
            Ay: -1,
            Az: -1,
            speed: -1,
            timestamp: -1,
        };
        accelerometer.subscribe(({x, y, z, timestamp}) => {
            if ((timestamp - this.state.timestamp > 500 && this.state.driving) && this.state.sess) {
                this.setState({
                    Ax: x,
                    Ay: y,
                    Az: z,
                    timestamp: timestamp
                });
                try {
                    AsyncStorage.getItem(this.state.sess, (error, result) => {
                        if (error) {
                            alert(JSON.stringify(error));
                        }
                        let res = JSON.parse(result);
                        try {
                            res.Ax.push(x);
                            res.Ay.push(y);
                            res.Az.push(z);
                            res.speeds.push(this.state.speed);
                            AsyncStorage.setItem(this.state.sess, JSON.stringify(res));
                        }catch (e) {
                            
                        }
                    });
                }catch (e) {
                }
            }
        });
        this.toggleDriving = this.toggleDriving.bind(this);
    }

    addSession(string) {
        try {
            AsyncStorage.getItem('SessionList')
                .then(data => {
                    // transform it back to an object
                    data = JSON.parse(data);
                    data.list.push(string);
                    AsyncStorage.setItem('SessionList', JSON.stringify(data));
                    alert(string + ' was added to SessionList');
                    AsyncStorage.setItem(string, JSON.stringify({
                        Ax: [],
                        Ay: [],
                        Az: [],
                        speeds: [],
                    }))
                }).done();
            this.setState({
                driving: true,
                sess: string,
            });
        } catch (er) {
            error(er);
        }
    }

    toggleDriving() {
        Vibration.vibrate([1, 100], false);
        if (!this.state.driving) {  //if we're starting to drive!!!!
            let currentDate = new Date();

            let date = currentDate.getDate();
            let month = currentDate.getMonth(); //Be careful! January is 0 not 1
            let year = currentDate.getFullYear();
            let hour = currentDate.getHours();
            let minute = currentDate.getMinutes();
            if (minute < 10) {
                minute = '0' + String(minute);
            }
            if (hour < 10) {
                hour = '0' + String(hour);
            }

            let dateString = hour + ":" + minute + ' ' + date + "-" + (month + 1) + "-" + year;
            this.addSession(dateString);
        } else {
            this.setState({
                driving: !this.state.driving,
                sess: this.state.sess,
                timestamp: this.state.timestamp
            });
        }

    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    speed: position.coords.speed,
                })
            },
            (error) => this.setState({
                error: error.message,
            }),
            {enableHighAccuracy: false, timeout: 200, maximumAge: 10, distanceFilter: 1},
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <View style={s.wrapper}>
                    <TouchableOpacity
                        style={(this.state.driving) ? s.stop : s.start}
                        onPress={this.toggleDriving}
                    >
                        <Text style={s.buttonText}>{(this.state.driving) ? "Stop Driving" : "Start Driving"}</Text>
                    </TouchableOpacity>
                    <Text style={s.text}>{JSON.stringify(this.state)}</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default DrivingScreen;