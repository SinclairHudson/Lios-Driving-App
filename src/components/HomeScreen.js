import {Image, Text, TouchableOpacity, View, Picker, Alert, SafeAreaView, PermissionsAndroid} from "react-native";
import {NavigationEvents, withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import s from "./styling";
import {Icon} from 'react-native-elements'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import UUIDGenerator from 'react-native-uuid-generator';
import {AnimatedCircularProgress} from 'react-native-circular-progress';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
            avgScore: 0,
        }
    }

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
        this.requestLocationPermission();
        //check to see if SessionList exists in the store
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
                    AsyncStorage.setItem('SessionList', JSON.stringify({list: ['Alpha', 'Beta']}));
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
        this.getScores();
    }

    async getScores() {
        fetch('https://ne6nmf3qcf.execute-api.us-east-1.amazonaws.com/dev/userData?userID=' + await AsyncStorage.getItem("UserId"))
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(JSON.stringify(responseJson));
                this.setState({scores: responseJson.sessionScores, avgScore: Math.round(responseJson.userScore)});
            })
            .catch((error) => {
                // alert("oof");
                alert(JSON.stringify(error));
            });
    }

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <NavigationEvents
                    onWillFocus={payload => this.getScores()}
                />
                <View style={s.wrapper}>
                    <View style={s.circleWrapper}>
                        <AnimatedCircularProgress
                            size={300}
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
                    <View style={s.twoCircleWrapper}>
                        <View style={s.circleWrapper}>
                            <AnimatedCircularProgress
                                size={100}
                                width={5}
                                fill={this.state.avgScore}
                                tintColor={(this.state.avgScore > 100) ? "#FFFFFF" : "#5ee0fa"}
                                backgroundColor={(this.state.avgScore > 100) ? "#5ee0fa" : "#3d5875"}>
                                {
                                    (fill) => (
                                        <View style={s.inDial}>
                                            <View style={s.smallDialValue}>
                                                <Text style={s.smallDialValueText}>
                                                    {this.state.avgScore}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <Text style={s.kmhText}>
                                LAST SESSION
                            </Text>
                        </View>
                        <View style={s.circleWrapper}>
                            <AnimatedCircularProgress
                                size={100}
                                width={5}
                                fill={this.state.avgScore}
                                tintColor={(this.state.avgScore > 100) ? "#FFFFFF" : "#5ee0fa"}
                                backgroundColor={(this.state.avgScore > 100) ? "#5ee0fa" : "#3d5875"}>
                                {
                                    (fill) => (
                                        <View style={s.inDial}>
                                            <View style={s.smallDialValue}>
                                                <Text style={s.smallDialValueText}>
                                                    {this.state.avgScore}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <Text style={s.kmhText}>
                                PAST 7 SCORES
                            </Text>
                        </View>
                    </View>
                    {/*<Image*/}
                    {/*    source={require("../assets/LiosLogo.png")}*/}
                    {/*    style={s.image}*/}
                    {/*/>*/}
                    <View style={s.buttons}>
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
                            <Text style={s.buttonText}>DRIVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={s.button}
                            onPress={() => {
                                this.props.navigation.navigate("Analytics");
                            }}>
                            <View style={s.icon}>
                                <Icon
                                    name='timeline'
                                    type='material'
                                    color='#5EE0FA'
                                />
                            </View>
                            <Text style={s.buttonText}>ANALYTICS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={s.button}
                            onPress={() => {
                                this.props.navigation.navigate("Settings");
                            }}>
                            <View style={s.icon}>
                                <Icon
                                    name="settings"
                                    type="material"
                                    color='#5EE0FA'
                                />
                            </View>
                            <Text style={s.buttonText}>SETTINGS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default HomeScreen;