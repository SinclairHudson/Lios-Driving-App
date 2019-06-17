import {AsyncStorage, Dimensions, Text, View, TouchableOpacity} from "react-native";
import React from 'react';
import s from './styling';
import LinearGradient from "react-native-linear-gradient";
import AccValues from "./AccValues";
import Tracker from "./Tracker";

const Value = ({name, value}) => (
    <View style={s.valueContainer}>
        <Text style={s.valueName}>{name}:</Text>
        <Text style={s.valueValue}>{new String(value).substr(0, 10)}</Text>
    </View>
);
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
            driving: false
        };
        this.whydoesthisnotwork = this.whydoesthisnotwork.bind(this);
    }
    whydoesthisnotwork() {
        this.setState({driving: !this.state.driving});
    }
    render() {
        return (
            <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                colors={['#3760a3', '#328bc3']}
                style={s.grad}
            >
                <TouchableOpacity
                    style={(this.state.driving)? s.stop : s.start }
                    onPress={this.whydoesthisnotwork}
                >
                    <Text style={s.buttonText}>{(this.state.driving)?"Stop Driving":"Start Driving"}</Text>
                </TouchableOpacity>
                <AccValues/>
                <Tracker/>
            </LinearGradient>

        );
    }
}

export default DrivingScreen;