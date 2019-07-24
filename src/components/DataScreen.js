import {Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import s from "./styling";
import {Icon} from 'react-native-elements'
import React from 'react';

class DataScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        this.refresh()
    }

    //refresh just throws everything in asyncstorage into the state.
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

    //Display everything in it's own Text Element.
    displayStore() {
        return this.state.list.map((element, index) => (<Text style={s.text} key={index}>{element}</Text>));
    }

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <View style={s.wrapper}>
                    <View style={s.buttons}>
                        <Button title="Refresh" onPress={() => {
                            this.refresh();
                        }}/>
                    </View>
                    <View style={s.buttons}>
                        {/*This button Clears AsyncStorage, initializing with some default values so that not everything will*/}
                        {/*crash. Be careful using this button!*/}
                        <TouchableOpacity
                            style={s.button}
                            onPress={() => {
                                AsyncStorage.getAllKeys((err, keys) => {
                                    AsyncStorage.multiGet(keys, (err, stores) => {
                                        stores.map((result, i, store) => {
                                            // get at each store's key/value so you can work with it
                                            let key = store[i][0];
                                            if (key !== 'UserId') {    //if it's not an important one
                                                AsyncStorage.removeItem(key);
                                            }
                                        });
                                        //set some defaults
                                        AsyncStorage.setItem('SessionList', JSON.stringify({list: []}));
                                        AsyncStorage.setItem('CarList', JSON.stringify({list: ['McQueen']}));
                                        AsyncStorage.setItem('currentCar', "McQueen");
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
                    <View style={s.buttons}>
                        <ScrollView>
                            {//just vomit the whole storage into a scrollview.
                                this.displayStore()}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default DataScreen;