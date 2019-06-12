import React from 'react';
import Icon from "@builderx/icons";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createAppContainer, } from 'react-navigation';
import { accelerometer, gyroscope } from "react-native-sensors";
//import DrivingScreen from "DrivingScreen";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'

const Value = ({name, value}) => (
    <View style={styles.valueContainer}>
        <Text style={styles.valueName}>{name}:</Text>
        <Text style={styles.valueValue}>{new String(value).substr(0, 10)}</Text>
    </View>
)

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.root}>
                <Image
                    source={require("./src/assets/LiosLogo.png")}
                    style={styles.image}
                />
                <View style={styles.driveButton}>
                    <TouchableOpacity style={styles.button}/>

                    <Icon
                        style={styles.icon}
                        name="steering"
                        type="MaterialCommunityIcons"
                    />            
                    <Text style={styles.text}>DRIVE</Text>
                </View>
                <View style={styles.analyticsButton}>
                    <TouchableOpacity style={styles.button2}/>
                    {/*
                    <Icon
                        style={styles.icon2}
                        name="trending-up"
                        type="MaterialCommunityIcons"
                    />      */}
                    <Text style={styles.text2}>ANALYTICS</Text>
                </View>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => {
                        this.props.navigation.push("SettingsScreen");
                    }}
                >
                    <TouchableOpacity style={styles.button3} />
                    {/*
                    <Icon
                        style={styles.icon3}
                        name="settings-outline"
                        type="MaterialCommunityIcons"
                    /> */}
                </TouchableOpacity>
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
    );
  }
}
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
const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
    Analytics: AnalyticsScreen,
    Driving: DrivingScreen
});
const styles = StyleSheet.create({
    root: {
        backgroundColor: "#328BC3",
        flex: 1
    },
    image: {
        height: 313,
        width: 300,
        position: "absolute",
        top: "17.36%",
        left: "13.6%"
    },

    settingsButton: {
        height: 54,
        width: 60,
        top: 720,
        left: 283,
        position: "absolute"
    },
    button3: {
        top: "0%",
        left: "0%",
        width: 60,
        height: 54,
        position: "absolute",
        backgroundColor: "rgba(55,96,163,1)",
        opacity: 1,
        borderRadius: 33
    },
    icon3: {
        top: 7,
        left: 10,
        position: "absolute",
        backgroundColor: "transparent",
        color: "rgba(255,214,48,1)",
        fontSize: 40
    },
    driveButton: {
        height: 57,
        width: 197,
        top: 471,
        left: 89,
        position: "absolute"
    },
    button: {
        top: "0%",
        left: "0%",
        width: 197,
        height: 57,
        position: "absolute",
        backgroundColor: "rgba(55,96,163,1)",
        opacity: 1,
        borderRadius: 33
    },
    icon: {
        top: 8,
        left: 10,
        position: "absolute",
        backgroundColor: "transparent",
        transform: [
            {
                rotate: "0deg"
            }
        ],
        color: "rgba(255,214,48,1)",
        fontSize: 40
    },
    text: {
        top: 19,
        left: "15.23%",
        width: 164,
        height: 26,
        position: "absolute",
        backgroundColor: "transparent",
        fontSize: 22,
        fontFamily: "AvenirNext-DemiBold",
        textAlign: "center",
        color: "rgba(255,214,48,1)"
    },
    analyticsButton: {
        height: 55,
        width: 198,
        top: 558,
        left: 89,
        position: "absolute"
    },
    button2: {
        top: "0%",
        left: "0%",
        width: 197,
        height: 55,
        position: "absolute",
        backgroundColor: "rgba(55,96,163,1)",
        opacity: 1,
        borderRadius: 33
    },
    icon2: {
        top: 8,
        left: 10,
        position: "absolute",
        backgroundColor: "transparent",
        color: "rgba(255,214,48,1)",
        fontSize: 40
    },
    text2: {
        top: 17,
        left: "16.67%",
        width: 165,
        height: 24,
        position: "absolute",
        backgroundColor: "transparent",
        fontSize: 22,
        fontFamily: "AvenirNext-DemiBold",
        textAlign: "center",
        color: "rgba(255,214,48,1)"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headline: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    valueContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    valueValue: {
        width: 200,
        fontSize: 20
    },
    valueName: {
        width: 50,
        fontSize: 20,
        fontWeight: 'bold'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
export default createAppContainer(TabNavigator);