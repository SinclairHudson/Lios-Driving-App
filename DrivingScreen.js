import {accelerometer} from "react-native-sensors";
import {Dimensions, Text, View} from "react-native";
import {LineChart} from "react-native-chart-kit";

class DrivingScreen extends React.Component {
    constructor(props) {
        super(props);

        accelerometer.subscribe(({x,y,z,timestamp}) => this.maybeSetState({x,y,z,timestamp}));
        this.state = {x: 0, y: 0, z: 0, timestamp: 0};
    }
    maybeSetState(update){
        if(update.timestamp - this.state.timestamp > 50){
            
            this.setState(latest);
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
                <Text>{this.state.timestamp}</Text>
                <View>
                    <Text>
                        Bezier Line Chart
                    </Text>
                    <LineChart
                        data={{
                            labels: ['X', 'Y', 'Z'],
                            datasets: [{
                                data: this.state.queue
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

export default DrivingScreen;