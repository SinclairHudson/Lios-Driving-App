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
import {NavigationEvents} from 'react-navigation';


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
        //binding this in functions to mean the DrivingScreen, not the Component that calls them.
        this.toggleDriving = this.toggleDriving.bind(this);
        this.sendCurrentSession = this.sendCurrentSession.bind(this);
        this.directions = this.directions.bind(this);
        this.updateCarList = this.updateCarList.bind(this);
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

    //directions returns the object that overlays the Google map View, tracing a line from the origin to the destination.
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
        //small vibration for feedback to the user.
        Vibration.vibrate([1, 100], false);
        if (!this.state.driving) {  //if we're starting to drive!!!!
            this.addSession();
        } else {
            this.setState({
                driving: !this.state.driving,
                sess: this.state.sess,
                timestamp: this.state.timestamp
            });
            //send all the data that we just collected to the backend.
            this.sendCurrentSession();
        }
    }

    sendCurrentSession() {
        //get all the current session data from AsyncStorage
        AsyncStorage.getItem(this.state.sess, (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            }
            //create the final package object to be sent to the backend.
            let pack = JSON.parse(res);
            //set the final timestamp
            pack.stoptimestamp = this.state.timestamp;
            pack.car = this.state.currentCar;
            try {
                //fetch API to POST the data of the session to the backend.
                fetch('https://ne6nmf3qcf.execute-api.us-east-1.amazonaws.com/dev/sessionData', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pack),
                }).then((response) => {   //wait for a response
                    if (response.status === 200) {
                        //if the status is 200, so the data was successfully received, then we can delete the
                        //local data of the session.
                        AsyncStorage.removeItem(this.state.sess, (err, res) => {
                            if (err) {
                                alert(JSON.stringify(err));
                            }
                            //remove the entry for the session, and when that's done, modify the sessionList
                            AsyncStorage.getItem("SessionList", (err, res) => {
                                if (err) {
                                    alert(JSON.stringify(err));
                                }
                                //parse the session list, and cut it so that the length is seven.
                                //This is arbitrary, but currently the backend only holds analytics on the last seven
                                //Trips, so the frontend only needs to worry about remembering the last seven.
                                let a = JSON.parse(res).list;
                                if (a.length > 7) {
                                    a.shift(); //mutate the list, don't need to create a new one.
                                }
                                //save the SessionList
                                AsyncStorage.setItem("SessionList", JSON.stringify({list: a}), (err, res) => {
                                    if (err) {
                                        alert(JSON.stringify(err));
                                    }
                                    //If all goes according to plan, alert saying that the push was successful.
                                    alert("Session was successfully recorded.")
                                });
                            });
                        });
                    } else {
                        //if the initial post was not successful, alert with the error message sent by the backend.
                        alert("failed to send session data to database: " + JSON.stringify(response));
                    }
                });
            } catch (e) {
                //catch any errors if something goes wrong, and alert the user.
                alert(JSON.stringify(e));
            }
        });
    }

    //updateCarList is called whenever the user navigates to the DrivingScreen, to make sure that we have the most
    //updated list of cars for the user to choose from.
    updateCarList() {
        AsyncStorage.getItem('CarList', (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            }
            let data = JSON.parse(res);
            this.setState({vehicles: data.list})
        });
    }

    componentDidMount() {
        this.updateCarList();
        //start streaming the GPS data to the state. the state updates every time geolocation gets new info.
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    speed: position.coords.speed,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
            },
            (error) => {
                this.setState({
                    error: error.message,
                });
                alert(JSON.stringify(error));   //alert the error
            },
            //high accuracy only seems to work outside..
            {enableHighAccuracy: true, timeout: 200, maximumAge: 10, distanceFilter: 1}
        );
    }

    componentWillUnmount() {   //stop using GPS services, to not stalk users.
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        return (
            // SafeAreaVew is supposed to allow the app to operate in the space beside the notch on top of phones.
            <SafeAreaView style={s.droidSafeArea}>
                <NavigationEvents
                    onWillFocus={() => this.updateCarList()}
                />
                <View style={s.wrapper}>
                    <MapView
                        initialRegion={{   //set initial coordinates to the Tannery Building in Downtown Kitchener, Ontario, Canada
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
                        {/*The dropdown for the User's Current Car*/}
                        <Picker
                            selectedValue={this.state.currentCar}
                            style={{height: 50, width: 200, color: '#FFFFFF', fontSize: 25,}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({currentCar: itemValue})
                            }>
                            {/*for each vehicle, create a drop down item for it, with a unique key*/}
                            {this.state.vehicles.map((item, index) => {
                                return (<Picker.Item style={{color: '#FFFFFF', fontSize: 22,}} label={item} value={item}
                                                     key={index}/>)
                            })}
                        </Picker>
                        {/*The button for toggling if the user is driving or not*/}
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