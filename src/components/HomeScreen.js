import {PermissionsAndroid, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {NavigationEvents} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import s from "./styling";
import {Icon} from 'react-native-elements'
import React from 'react';
import UUIDGenerator from 'react-native-uuid-generator';
import {AnimatedCircularProgress} from 'react-native-circular-progress';


//this is the first screen that renders, and it has the user's scores on it, as well as a drive button.
//scores go from 0 to 100, so a circular indicator is perfect.


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
            avgScore: 0,
            seven: 0,
            lastScore: 0,
        }
    }

    //this needs to be called when the app renders. Otherwise, GPS functionality won't work.
    //this really only shows up once, when you first install the app, and after that it seems to remember that
    // you already opted in.
    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'This App needs access to your location ' +
                        'so we can know where you are.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use locations ")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }


    componentDidMount() {
        //get permission in case that hasn't been done yet.
        this.requestLocationPermission();
        //check to see if SessionList exists in the store
        this.maybeInitAsync();
        this.getScores();
    }

    //initAsync checks to see if all the required fields are set in AsyncStorage. If they aren't then the app will certainly
    //crash later on. So it sets SessionList, UserId, Carlist, and Options to make sure they're all initialized.
    async maybeInitAsync() {
        let good = false;
        let good2 = false;
        let good3 = false;
        let good4 = false;
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    if (key === 'SessionList') {
                        good = true;
                    }
                    if (key === 'UserId') {
                        good2 = true;
                    }
                    if (key === 'CarList') {
                        good3 = true;
                    }
                    if (key === 'Options') {
                        good4 = true;
                    }
                });
                if (!good) {    // if SessionList is not in the store, add it with empty.
                    AsyncStorage.setItem('SessionList', JSON.stringify({list: []}));
                }
                if (!good2) {    // if UserId is not in the store, add it with empty.
                    UUIDGenerator.getRandomUUID((uuid) => {
                        AsyncStorage.setItem('UserId', uuid)
                    });
                }
                if (!good3) {    // if SessionList is not in the store, add it with empty.
                    AsyncStorage.setItem('CarList', JSON.stringify({list: ['Lamborghini', 'Ferrari']}));
                }
                if (!good4) {    // if SessionList is not in the store, add it with empty.
                    AsyncStorage.setItem('Options', JSON.stringify({currentCar: 'Ferrari'}));
                }
            });
        });
    }

    //getScores is a GET request to the AWS API backend. It gets all the score data for the user.

    async getScores() {
        fetch('https://ne6nmf3qcf.execute-api.us-east-1.amazonaws.com/dev/userData?userID=' + await AsyncStorage.getItem("UserId"))
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 400) {
                    alert(JSON.stringify(responseJson));
                } else {
                    //pretty simple stuff. just update the state with the data that the backend returns.
                    this.setState({
                        lastScore: Math.round(responseJson.lastsessionScore),
                        avgScore: Math.round(responseJson.userScore),
                        seven: Math.round(responseJson.averageOfSessions)
                    });
                }
            })
            .catch((error) => {
                // alert("oof");
                alert(JSON.stringify(error));
            });
    }

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                {/*get the scores whenever the user navigates to this page, because they may have just completed a session*/}
                <NavigationEvents
                    onWillFocus={() => this.getScores()}
                />
                <View style={s.wrapper}>
                    {/*This displays the user's current score, in a big progress circle.*/}
                    <View style={s.largeCircleWrapper}>
                        <AnimatedCircularProgress
                            size={320}
                            width={10}
                            fill={this.state.avgScore}
                            tintColor={(this.state.avgScore > 100) ? "#FFFFFF" : "#5ee0fa"}
                            backgroundColor={(this.state.avgScore > 100) ? "#5ee0fa" : "#3d5875"}>
                            {
                                (fill) => (
                                    <View style={s.inDial}>
                                        <View style={s.dialValue}>
                                            <Text style={s.dialValueText}>
                                                {this.state.avgScore}
                                            </Text>
                                        </View>
                                        <View style={s.kmh}>
                                            <Text style={s.kmhText}>
                                                CURRENT SCORE
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                    {/*These next two circles show last session's score, and the average of the past 7 scores*/}
                    <View style={s.twoCircleWrapper}>
                        <View style={s.circleWrapper}>
                            <AnimatedCircularProgress
                                size={125}
                                width={5}
                                fill={this.state.lastScore}
                                tintColor={(this.state.avgScore > 100) ? "#FFFFFF" : "#5ee0fa"}
                                backgroundColor={(this.state.avgScore > 100) ? "#5ee0fa" : "#3d5875"}>
                                {
                                    (fill) => (
                                        <View style={s.inDial}>
                                            <View style={s.smallDialValue}>
                                                <Text style={s.smallDialValueText}>
                                                    {this.state.lastScore}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <View style={s.circleLabel}>
                                <Text style={s.kmhText}>
                                    LAST SESSION
                                </Text>
                            </View>
                        </View>
                        <View style={s.circleWrapper}>
                            <AnimatedCircularProgress
                                size={125}
                                width={5}
                                fill={this.state.seven}
                                tintColor={(this.state.avgScore > 100) ? "#FFFFFF" : "#5ee0fa"}
                                backgroundColor={(this.state.avgScore > 100) ? "#5ee0fa" : "#3d5875"}>
                                {
                                    (fill) => (
                                        <View style={s.inDial}>
                                            <View style={s.smallDialValue}>
                                                <Text style={s.smallDialValueText}>
                                                    {this.state.seven}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <View style={s.circleLabel}>
                                <Text style={s.kmhText}>
                                    PAST 7 SCORES
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={s.buttons}>
                        {/*Button that takes you to the driving screen*/}
                        <TouchableOpacity
                            style={s.button}
                            onPress={() => {
                                this.props.navigation.navigate("Driving");
                            }}>
                            <View style={s.icon}>
                                <Icon
                                    name="drive-eta"
                                    type="material"
                                    color='#5EE0FA'
                                />
                            </View>
                            <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={s.buttonText}>DRIVE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default HomeScreen;