import {Image, Text, TouchableOpacity, View, Picker, Alert, SafeAreaView, PermissionsAndroid} from "react-native";
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import s from "./styling";
import {Icon} from 'react-native-elements'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import UUIDGenerator from 'react-native-uuid-generator';

class HomeScreen extends React.Component {
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
                });
                if (!good) {    // if SessionList is not in the store, add it with empty.
                    AsyncStorage.setItem('SessionList', JSON.stringify({list: ['Alpha', 'Beta']}));
                }
                if (!good) {    // if UserId is not in the store, add it with empty.
                    UUIDGenerator.getRandomUUID((uuid) => {
                        AsyncStorage.setItem('UserId', uuid)
                    });
                }
            });
        });
    }

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <View style={s.wrapper}>
                    <Image
                        source={require("../assets/LiosLogo.png")}
                        style={s.image}
                    />
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
                                AsyncStorage.getAllKeys((err, keys) => {
                                    AsyncStorage.multiGet(keys, (err, stores) => {
                                        stores.map((result, i, store) => {
                                            // get at each store's key/value so you can work with it
                                            let key = store[i][0];
                                            if (key !== 'SessionList' && key !== 'UserId') {    //if it's not an important one
                                                AsyncStorage.removeItem(key);
                                            }
                                            AsyncStorage.setItem('SessionList', JSON.stringify({list: ['Alpha']}));
                                        });
                                    });
                                });
                            }}>
                            <View style={s.icon}>
                                <Icon
                                    name="drive-eta"
                                    type="material"
                                    color='#5EE0FA'
                                />
                            </View>
                            <Text style={s.buttonText}>CLEAR ASYNC</Text>
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