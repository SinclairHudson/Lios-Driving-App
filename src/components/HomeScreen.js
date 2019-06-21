import {Image, Text, TouchableOpacity, View, SafeAreaView, AsyncStorage, Picker, Alert} from "react-native";
import {withNavigation} from 'react-navigation';
import s from "./styling";
import {Icon} from 'react-native-elements'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

class HomeScreen extends React.Component {
    componentDidMount() {
        let good = false;
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    if (key === 'SessionList') {
                        good = true;
                    }
                });
                if (!good) {
                    AsyncStorage.setItem('SessionList', JSON.stringify({list: []}))
                }
            });
        });
    }

    render() {
        return (
            <LinearGradient
                colors={['#3760a3', '#328bc3']}
                style={s.grad}>
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
                                name="car"
                                type="font-awesome"
                                color='#FFD630'
                            />
                        </View>
                        <Text style={s.buttonText}>DRIVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={s.button}
                        onPress={() => {
                            AsyncStorage.removeItem('Session', (() => {
                                return;
                            }));
                        }}>
                        <View style={s.icon}>
                            <Icon
                                name="car"
                                type="font-awesome"
                                color='#FFD630'
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
                                color='#FFD630'
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
                                color='#FFD630'
                            />
                        </View>
                        <Text style={s.buttonText}>SETTINGS</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }
}

export default HomeScreen;