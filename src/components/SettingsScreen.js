import {accelerometer} from "react-native-sensors";
import {Dimensions, Text, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import React from 'react';
import styles from './styling';


class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }
}
export default SettingsScreen;