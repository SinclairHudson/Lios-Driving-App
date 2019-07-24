import {Picker, SafeAreaView, Text, TouchableOpacity, Vibration, View,} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import s from './styling';
import MapViewDirections from 'react-native-maps-directions';
import {accelerometer} from "react-native-sensors";
import MapView from 'react-native-maps';
import {NavigationEvents} from 'react-navigation';

//these are the constants used for the Google maps components. You'll have to register your app with google to get the
// google maps api key, which is a little confusing but not time-consuming. Below a certain threshold, using this API
// is free.

let GOOGLE_MAPS_APIKEY = 'YouNeedYourOwnKey!';

//mapStyle is the massive object that specifies how every element of the google map is rendered.
// if you want to have all bodies of water displayed as bright pink, you can do that here.
// it would be a pain to manually edit this 250 line object, so go to
// https://mapstyle.withgoogle.com/ to use a GUI, and then download whatever you create and paste it here.
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

//interval is important: it specifies how many milliseconds must pass between data points. If this is very low, you might
// run into performance issues. We found that half a second was good enough and captured all the features we needed.
const interval = 500;

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
        //accelerometer.subscribe basically means that every time the accelerometer gets a new value, call this function
        accelerometer.subscribe(({x, y, z, timestamp}) => {
            //we don't want EVERY update, so make sure they're a small interval apart.
            if (timestamp - this.state.timestamp > interval) {
                //start by updating the state with the current sensor values.
                this.setState({
                    Ax: x,
                    Ay: y,
                    Az: z,
                    timestamp: timestamp
                });
                // if we're actually driving, we have to log things.
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
        //binding THIS in functions to mean the DrivingScreen, not the Component that calls them.
        //basically, this always refers to the DrivingScreen component and all the functions can access the state.
        this.toggleDriving = this.toggleDriving.bind(this);
        this.sendCurrentSession = this.sendCurrentSession.bind(this);
        this.directions = this.directions.bind(this);
        this.updateCarList = this.updateCarList.bind(this);
    }

    //addSession adds the current Session to the SessionList in AsyncStorage, so it can be accessed by the whole app.
    //these sessions in the SessionList are indexed by the start timestamp, so they will appear in chronological order.
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
                        //initialize the object. We'll fill the arrays afterwards.
                        // we add the user ID so that when we send this package to the backend, they know who sent it.
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
            //finish by setting the driving state to True, and set the current session to the current open session.
            this.setState({
                driving: true,
                sess: string,
            });
        } catch (er) {
            error(er);
        }
    }

    //directions returns the object that overlays the Google map View, tracing a line from the origin to the destination.
    //Currently, just the line is implemented, but you can add waypoints, markers, areas, etc. Check out the package on
    //npm for more details, they have some nice demos.
    directions() {
        //if the GPS hasn't started working, don't bother giving directions because the latitude and longitude will be
        // the default (wrong) values. Nobody needs driving directions to the center of the Gulf of Guinea
        if (this.state.latitude !== 0) {
            return (
                //
                <MapViewDirections
                    origin={this.state}  //the state has elements longitude and latitude, so passing in the whole object works
                    destination={{     //destination is set to the best university in the world.     :)
                        latitude: 43.471665,
                        longitude: -80.543353,
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}     //required
                    strokeWidth={3}
                    strokeColor={'hotpink' /* <- very cool */}
                />
            );
        }

    }

    toggleDriving() {
        //small vibration for feedback to the user.
        Vibration.vibrate([1, 100], false);
        if (!this.state.driving) {  //if we're starting to drive!!!!
            this.addSession();
        } else {            //if we're stopping
            this.setState({
                driving: !this.state.driving,
            });
            //send all the data that we just collected to the backend.
            this.sendCurrentSession();
        }
    }

    //sendCurrentSession is triggered as the user clicks "Stop Driving". It packages everything up and sends it to the
    //backend by an AWS API POST.

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
        //on first render, update the car list.
        this.updateCarList();
        //start streaming the GPS data to the state. the state updates every time geolocation gets new info.
        //this stream is fairly unreliable tbh, but very accurate. So keep that in mind while debugging.
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                //every time we get a new position, update the state to reflect the most recent info.
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
            //high accuracy only seems to work outside...
            {enableHighAccuracy: true, timeout: 200, maximumAge: 10, distanceFilter: 1}
        );
    }

    componentWillUnmount() {   //stop using GPS services, to not stalk users.
        //this will only trigger when the app is actually closed.
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        return (
            // SafeAreaVew is supposed to allow the app to operate in the space beside the notch on top of phones.
            // In my experience, it doesn't work on android, but that might change if it gets supported in the future.
            <SafeAreaView style={s.droidSafeArea}>
                {/*Important tag: NavigationEvents onWillFocus triggers whenever the user navigates to this page*/}
                {/*it's useful for re-rendering, but right now the only thing we need to update is the list of cars, in case they*/}
                {/*came from settings and just added a vehicle.*/}
                <NavigationEvents
                    onWillFocus={() => this.updateCarList()}
                />
                <View style={s.wrapper}>
                    {/*MapView is the Google Maps component. You can't do native navigation services, because google*/}
                    {/*keeps that for themselves. But, there is a crude workaround made by the community, implemented below.*/}
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
                        {/*Implements the bright pink line that renders over top of the map.*/}
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