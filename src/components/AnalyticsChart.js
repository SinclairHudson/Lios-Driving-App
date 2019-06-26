import { Dimensions, Text, View, ScrollView, Picker} from "react-native";
import s from "./styling";
import AsyncStorage from '@react-native-community/async-storage';
import {LineChart} from "react-native-chart-kit";
import React from 'react';
import LinearGradient from "react-native-linear-gradient";

class AnalyticsChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Ax: [0,0,0,0,0],
            Ay: [0,0,0,0,0],
            Az: [0,0,0,0,0],
            timestamps: [0,0,0,0,0],
            speeds: [0,0,0,0,0]
        };
    }

    componentDidMount(){
        try {
            AsyncStorage.getItem(this.props.session)
                .then(data => {
                    this.setState(JSON.parse(data));

                }).done();
        } catch (er) {
            error(er);
        }
    }

    render() {
        return (
                <ScrollView>
                    <View>
                        <Text style={s.chartLabel}>Acceleration</Text>
                        <LineChart
                            data={{
                                labels: ["start", "end"],
                                datasets: [{
                                    data: this.state.Ax
                                },
                                    {
                                        data: this.state.Az
                                    },
                                    {
                                        data: this.state.Ay
                                    }
                                ]
                            }}
                            width={Dimensions.get('window').width - 20} // from react-native
                            height={220}
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
                                labels: ["alpha", "bravo", "charlie", "delta", "echo"],
                                datasets: [{
                                    data: this.state.speeds
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
                </ScrollView>
        );
    }
}

export default AnalyticsChart;