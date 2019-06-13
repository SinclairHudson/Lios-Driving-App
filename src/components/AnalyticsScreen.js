import {AsyncStorage, Dimensions, Text, View} from "react-native";
import styles from "./styling";
import {LineChart} from "react-native-chart-kit";
import React from 'react';

class AnalyticsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    async componentDidMount(){
        await AsyncStorage.getItem( 'Session' )
            .then( data => {
                // transform it back to an object
                data = JSON.parse( data );
                this.setState(data);
            }).done();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>
                        Bezier Line Chart
                    </Text>
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
                            backgroundGradientFrom: '#1661db',
                            backgroundGradientTo: '#0403ff',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                        fromZero={true}
                    />
                </View>
            </View>

        );
    }
}

export default AnalyticsScreen;