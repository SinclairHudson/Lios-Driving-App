import {Image, Text, TouchableOpacity, View, SafeAreaView, Picker, Button, ScrollView} from "react-native";
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import s from "./styling";
import {Icon} from 'react-native-elements'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

class DataScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        };
    }

    componentDidMount() {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                let textElements = [];
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    textElements.push(key);
                    textElements.push(value);
                });
                this.setState({list: textElements})
            });
        });
    }

    refresh() {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                let textElements = [];
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    textElements.push(key);
                    textElements.push(value);
                });
                this.setState({list: textElements})
            });
        });
    }

    displayStore() {
        return this.state.list.map((element, index) => (<Text style={s.text} key={index}>{element}</Text>));
    }

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <View style={s.wrapper}>
                    <Button title="Refresh" onPress={() => {
                        this.refresh();
                    }}/>
                    <ScrollView>
                        {this.displayStore()}
                    </ScrollView>
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
                </View>
            </SafeAreaView>
        );
    }
}

export default DataScreen;