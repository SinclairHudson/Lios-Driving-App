import {
    Dimensions,
    Text,
    View,
    TouchableOpacity,
    Vibration,
    Alert,
    SafeAreaView,
    PermissionsAndroid,
    Button, Picker,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import s from './styling';
import MapViewDirections from 'react-native-maps-directions';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import LinearGradient from "react-native-linear-gradient";
import AccValues from "./AccValues";
import Tracker from "./Tracker";
import {accelerometer} from "react-native-sensors";
import MapView, {OverlayComponent} from 'react-native-maps';


let mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8ec3b9"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1a3646"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#64779e"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#334e87"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6f9ba5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3C7680"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#304a7d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c6675"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#255763"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#b0d5ce"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3a4762"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0e1626"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4e6d70"
            }
        ]
    }
];
let GOOGLE_MAPS_APIKEY = 'AIzaSyBOxltbqEmdl2WW-mg96uHSTGzWSEy_yzM';

class DrivingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driving: false,
            sess: 'defined',
            vehicles: ['Charlie', "Delta"],
            currentCar: 'Charlie',
            Ax: -1,
            Ay: -1,
            Az: -1,
            speed: 0,
            longitude: 0,
            latitude: 0,
            timestamp: -1,
        };
        accelerometer.subscribe(({x, y, z, timestamp}) => {
            if (timestamp - this.state.timestamp > 500) {
                this.setState({
                    Ax: x,
                    Ay: y,
                    Az: z,
                    timestamp: timestamp
                });
                if (this.state.driving) {
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
                            } catch (e) {

                            }
                        });
                    } catch (e) {
                    }
                }
            }
        });
        this.toggleDriving = this.toggleDriving.bind(this);
        this.sendCurrentSession = this.sendCurrentSession.bind(this);
        this.directions = this.directions.bind(this);
    }

    addSession() {
        try {
            let string = String(this.state.timestamp);
            AsyncStorage.getItem('SessionList')
                .then(data => {
                    // transform it back to an object
                    data = JSON.parse(data);
                    data.list.push(string);
                    AsyncStorage.setItem('SessionList', JSON.stringify(data));
                    AsyncStorage.getItem('UserId', (err, result) => {
                        if (err) {
                            alert(JSON.stringify(err));
                        }
                        AsyncStorage.setItem(string, JSON.stringify({
                            Ax: [],
                            Ay: [],
                            Az: [],
                            speeds: [],
                            starttimestamp: this.state.timestamp,
                            userID: result
                        }))
                    });
                }).done();
            this.setState({
                driving: true,
                sess: string,
            });
        } catch (er) {
            error(er);
        }
    }

    directions() {
        if (this.state.latitude === 0) {
            return;
        } else {
            return (
                <MapViewDirections
                    origin={this.state}
                    destination={{
                        latitude: 43.476536,
                        longitude: -80.539197,
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor={'hotpink'}
                />
            );
        }

    }

    toggleDriving() {
        Vibration.vibrate([1, 100], false);
        if (!this.state.driving) {  //if we're starting to drive!!!!
            this.addSession();
        } else {
            this.setState({
                driving: !this.state.driving,
                sess: this.state.sess,
                timestamp: this.state.timestamp
            });
            this.sendCurrentSession();
        }
    }

    sendCurrentSession() {
        AsyncStorage.getItem(this.state.sess, (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            }
            let pack = JSON.parse(res);
            pack.stoptimestamp = this.state.timestamp;
            try {
                fetch('https://ne6nmf3qcf.execute-api.us-east-1.amazonaws.com/dev/sessionData', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pack),
                }).then((response) => {
                    if (response.status === 200) {
                        AsyncStorage.removeItem(this.state.sess, (err, res) => {
                            if (err) {
                                alert(JSON.stringify(err));
                            }
                            AsyncStorage.getItem("SessionList", (err, res) => {
                                if (err) {
                                    alert(JSON.stringify(err));
                                }
                                let a = JSON.parse(res).list;
                                if (a.length > 7) {
                                    a.shift();
                                }
                                AsyncStorage.setItem("SessionList", JSON.stringify({list: a}), (err, res) => {
                                    if (err) {
                                        alert(JSON.stringify(err));
                                    }
                                    alert("session pushed and deleted, sessionList shifted.")
                                });
                            });
                        });
                    } else {
                        alert("failed to send session data to database: " + JSON.stringify(response));
                    }
                });
            } catch (e) {
                alert(JSON.stringify(e));
            }
        });
    }

    componentDidMount() {
        AsyncStorage.getItem('CarList', (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            }
            let data = JSON.parse(res);
            this.setState({vehicles: data.list})
        });
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    speed: position.coords.speed,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
            },
            (error) => this.setState({
                error: error.message,
            }),
            {enableHighAccuracy: true, timeout: 200, maximumAge: 10, distanceFilter: 1},
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        let kmh = Math.round(this.state.speed * 100.6);
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <View style={s.wrapper}>
                    <MapView
                        initialRegion={{
                            latitude: 43.450901,
                            longitude: -80.498454,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        customMapStyle={mapStyle}
                        style={s.map}
                    >
                        {this.directions()}
                    </MapView>
                    <View style={s.bottomDriver}>
                        {/*
                        <AnimatedCircularProgress
                            size={60}
                            width={5}
                            fill={kmh}
                            tintColor={(kmh > 100) ? "#FFFFFF" : "#5ee0fa"}
                            backgroundColor={(kmh > 100) ? "#5ee0fa" : "#3d5875"}>
                            {
                                (fill) => (
                                    <View style={s.inDial}>
                                        <Text style={s.dialValue}>
                                            {fill}
                                        </Text>
                                        <Text style={s.kmh}>
                                            KM/H
                                        </Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                        */}
                        <Picker
                            selectedValue={this.state.currentCar}
                            style={{height: 50, width: 200, color: '#FFFFFF', fontSize: 22,}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({currentCar: itemValue})
                            }>
                            {this.state.vehicles.map((item, index) => {
                                return (<Picker.Item style={{color: '#FFFFFF', fontSize: 22,}} label={item} value={item}
                                                     key={index}/>)
                            })}
                        </Picker>
                        <TouchableOpacity
                            style={(this.state.driving) ? s.stop : s.start}
                            onPress={this.toggleDriving}
                        >
                            <Text style={{
                                fontSize: 25,
                                color: "rgba(255,255,255,1)"
                            }}>{(this.state.driving) ? "Stop Driving" : "Start Driving"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default DrivingScreen;