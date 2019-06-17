import {accelerometer} from "react-native-sensors";
import {Dimensions, Text, View, Picker} from "react-native";
import {LineChart} from "react-native-chart-kit";
import React from 'react';
import s from './styling';
import LinearGradient from "react-native-linear-gradient";


class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: "suv",
        };
    }
    render() {
        return (
            <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                colors={['#3760a3','#328bc3']}
                style={s.grad}
            >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Picker
                    selectedValue={this.state.vehicle}
                    style={{height: 50, width: 200}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({vehicle: itemValue})
                    }>
                    <Picker.Item label="SUV" value="suv" />
                    <Picker.Item label="Dodge Grand Caravan" value="minivan" />
                    <Picker.Item label="Jeep" value="jeep" />
                </Picker>
            </View>
            </LinearGradient>
        );
    }
}
export default SettingsScreen;