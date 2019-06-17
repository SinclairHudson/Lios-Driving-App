import {AsyncStorage, Dimensions, Text, View} from "react-native";
import s from "./styling";
import {LineChart} from "react-native-chart-kit";
import React from 'react';
import LinearGradient from "react-native-linear-gradient";


class AnalyticsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            timestamps: ["alpha", "bravo", "charlie", "delta", "echo"],
            Ax: [0, 0, 0, 0, 0],
            Ay: [0, 0, 0, 0, 0],
            Az: [0, 0, 0, 0, 0]
        };
    }

    render() {
        if (this.state.loaded) {
            return (
                <LinearGradient
                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    colors={['#3760a3', '#328bc3']}
                    style={s.grad}>
                    <View>
                        <Text style={s.chartLabel}>Acceleration</Text>
                        <LineChart
                            data={{
                                labels: this.state.timestamps,
                                datasets: [{
                                    data: this.state.Az
                                }]
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={220}
                            yAxisLabel={'acc'}
                            chartConfig={{
                                backgroundColor: '#040404',
                                backgroundGradientFrom: '#0a3c5d',
                                backgroundGradientTo: '#0a3c5d',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 214, 48, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                }
                            }}
                            bezier
                            style={{
                                margin: 20,
                                borderRadius: 16
                            }}
                            fromZero={true}/>
                    </View>
                    <View>
                        <Text style={s.chartLabel}>Speed</Text>
                        <LineChart
                            data={{
                                labels: this.state.timestamps,
                                datasets: [{
                                    data: this.state.Az
                                }]
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={220}
                            yAxisLabel={'acc'}
                            chartConfig={{
                                backgroundColor: '#040404',
                                backgroundGradientFrom: '#0a3c5d',
                                backgroundGradientTo: '#0a3c5d',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 214, 48, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                }
                            }}
                            bezier
                            style={{
                                margin: 20,
                                borderRadius: 16
                            }}
                            fromZero={true}/>
                    </View>
                </LinearGradient>

            );
        } else {
            return (<Text>Loading</Text>);
        }
    }
}

export default AnalyticsScreen;