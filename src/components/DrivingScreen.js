import {AsyncStorage, Dimensions, Text, View, TouchableOpacity, Vibration, Alert} from "react-native";
import React from 'react';
import s from './styling';
import LinearGradient from "react-native-linear-gradient";
import AccValues from "./AccValues";
import Tracker from "./Tracker";

// Setting Data in AsyncStorage

// When calling component did mount, use storeItem to store initial time stamp and GPS coordinates
// Use storeItem when the session has started to store data points, key == timestamp and item == sensor value
// Lastly, use this function to note the stop timestamp.
async function storeItem(key, item) {
    try {
        //Wait for the Promise returned by AsyncStorage.setItem(), then return value.
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
        console.log(error.message);
    }
}

// Delete all once json created, delete all example code available in Doc.
class DrivingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driving: false,
            sess: "Alpha"
        };
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
                    Alert.alert(
                        'Update',
                        string + " was added to SessionList.",
                        [
                            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                    );
                }).done();
        } catch (er) {
            error(er);
        }
    }
    toggleDriving() {
        Vibration.vibrate([1, 100], false);
        if (!this.state.driving) {  //if we're starting to drive!!!!
            var currentDate = new Date();

            var date = currentDate.getDate();
            var month = currentDate.getMonth(); //Be careful! January is 0 not 1
            var year = currentDate.getFullYear();
            let hour = currentDate.getHours();
            let minute = currentDate.getMinutes();

            var dateString = hour + ":" + minute + ' ' + date + "-" + (month + 1) + "-" + year;
            this.addSession(dateString);
            this.setState({
                driving: !this.state.driving,
                sess: dateString
            });
        } else {
            this.setState({
                driving: !this.state.driving,
                sess: this.state.sess
            });
        }

    }
    conditionalRender(){
        if(this.state.driving){
            return(<AccValues sess={this.state.sess} save={true}/>);
        }
    }

    render() {
        return (
            <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                colors={['#3760a3', '#328bc3']}
                style={s.grad}
            >
                <TouchableOpacity
                    style={(this.state.driving) ? s.stop : s.start}
                    onPress={this.toggleDriving}
                >
                    <Text style={s.buttonText}>{(this.state.driving) ? "Stop Driving" : "Start Driving"}</Text>
                </TouchableOpacity>
                <Text>{JSON.stringify(this.state)}</Text>
                {this.conditionalRender()}
            </LinearGradient>

        );
    }
}

export default DrivingScreen;