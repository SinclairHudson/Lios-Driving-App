import {accelerometer} from "react-native-sensors";
import {AsyncStorage, Dimensions, Text, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import React from 'react';
import styles from './styling';

const Value = ({name, value}) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 10)}</Text>
    </View>
);

class DrivingScreen extends React.Component {
    constructor(props) {
        super(props);

        accelerometer.subscribe(({x,y,z,timestamp}) => this.maybeSetState({x,y,z,timestamp}));
        this.state = {x: 0, y: 0, z: 0, timestamp: 0};
        let init={Ax: [], Ay: [], Az: [], timestamps: []};
        try {
            AsyncStorage.setItem('Session', JSON.stringify(init));
        } catch (er) {
            error(er);
        }
    }
    maybeSetState(update){
        if(update.timestamp - this.state.timestamp > 50){
            this.setState(update);
            try {
                AsyncStorage.getItem( 'Session' )
                    .then( data => {

                        // transform it back to an object
                        data = JSON.parse( data );
                        data.Ax.push(update.x);
                        data.Ay.push(update.y);
                        data.Az.push(update.z);
                        data.timestamps.push(update.timestamp);

                        //save the value to AsyncStorage again
                        AsyncStorage.setItem( 'Session', JSON.stringify( data ));
                    }).done();
            } catch (er) {
                error(er);
            }
        }
        else{
            return;
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headline}>
                    Accelerometer values
                </Text>
                <Value name="x" value={this.state.x} />
                <Value name="y" value={this.state.y} />
                <Value name="z" value={this.state.z} />
                <Value name="ts" value={this.state.timestamp} />
            </View>

        );
    }
}

export default DrivingScreen;