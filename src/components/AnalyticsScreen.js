import {Dimensions, Text, View, ScrollView, Picker, SafeAreaView, processColor} from "react-native";
import s from "./styling";
import AsyncStorage from '@react-native-community/async-storage';
import {LineChart} from 'react-native-charts-wrapper';
import React from 'react';
import LinearGradient from "react-native-linear-gradient";
import AnalyticsChart from "./AnalyticsChart";
import {NavigationEvents} from "react-navigation";


class AnalyticsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session: '',
            sessions: [],
            userID: '',
            Ax: [{x: 0, y: 5.023107051849365}, {x: 1, y: 1.3409830331802368}],
            Ay: [{x: 0, y: 5.023107051849365}, {x: 500, y: 1.3409830331802368}],
            Az: [{x: 0, y: 5.023107051849365}, {x: 500, y: 1.3409830331802368}],
            speeds: [{x: 5, y: 94}],
            loading: false
        };
    }

    componentDidMount() {
        this.updateSessionList();
        this.fetchSession();
    }

    fetchSession() {
        if(this.state.userID !== null && this.state.session !== null) {
            fetch('https://ne6nmf3qcf.execute-api.us-east-1.amazonaws.com/dev/sessionData?userID=' + this.state.userID + '&startTimestamp=' + this.state.session)
                .then((response) => response.json())
                .then((responseJson) => {
                    alert("Response of " + this.state.userID + " " + this.state.session + " " + JSON.stringify(responseJson));
                    this.setState(
                        {
                            Ax: responseJson.Ax,
                            Ay: responseJson.Ay,
                            Az: responseJson.Az,
                            speeds: responseJson.Speed
                        });
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
                });
        }
    }

    updateSessionList() {
        AsyncStorage.getItem('SessionList', (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            }
            let data = JSON.parse(res);

            this.setState({sessions: data.list})
        });
    }

    updateUserID() {
        AsyncStorage.getItem('UserId', (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            }
            this.setState({userID: res})
        });
    }

    render() {
        let data = {
            dataSets: [
                {
                    values: this.state.Ax,
                    label: 'X',
                    config: {
                        color: processColor('#FFFFFF')
                    }
                },
                {
                    values: this.state.Ay,
                    label: 'Y',
                    config: {
                        color: processColor('#5EDFF9')
                    }
                },
                {
                    values: this.state.Az,
                    label: 'Z',
                    config: {
                        color: processColor('#5cbbff')
                    }
                }]
        };
        let speedData = {
            dataSets: [
                {
                    values: this.state.speeds,
                    label: 'Speed',
                    config: {
                        color: processColor('#FFFFFF')
                    }
                }]
        };
        let xAxis = {
            textColor: processColor('#FFFFFF'),
        };
        let yAxis = {
            textColor: processColor('#FFFFFF'),
        };
        let legend = {
            enabled: true,
            textColor:
                processColor('#FFFFFF'),
            textSize:
                12,
            position:
                'BELOW_CHART_RIGHT',
            form:
                'SQUARE',
            formSize:
                14,
            xEntrySpace:
                10,
            yEntrySpace:
                5,
            formToTextSpace:
                5,
            wordWrapEnabled:
                true,
            maxSizePercent:
                0.5,
            fontFamily:
                'monospace',
            fontStyle:
                1,
        };
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <NavigationEvents
                    onWillFocus={() => {
                        this.updateSessionList();
                        this.updateUserID()
                    }}
                />
                <View style={s.wrapper}>
                    <Picker
                        selectedValue={this.state.session}
                        style={{height: 50, width: 200, color: '#FFFFFF', fontSize: 22,}}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({session: itemValue});
                            this.fetchSession();
                        }

                        }>
                        {/*for each vehicle, create a drop down item for it, with a unique key*/}
                        {this.state.sessions.map((item, index) => {
                            return (
                                <Picker.Item style={{color: '#FFFFFF', fontSize: 22,}}
                                             label={new Date(parseInt(item)).toLocaleTimeString() + " " +
                                             new Date(parseInt(item)).toLocaleDateString()} value={item}
                                             key={index}/>)
                        })}
                    </Picker>
                    <View style={{flex: 1}}>
                        <LineChart
                            style={s.chart}
                            data={data}
                            xAxis={xAxis}
                            yAxis={yAxis}
                            legend={legend}
                            chartDescription={{text: 'Acceleration', textColor: processColor('#FFFFFF'), textSize: 22}}
                            drawGridBackground={false}
                            borderColor={processColor('#FFFFFF')}
                            borderWidth={1}
                            drawBorders={true}
                            marker={this.state.marker}
                            autoScaleMinMaxEnabled={false}
                            touchEnabled={true}
                            dragEnabled={true}
                            scaleEnabled={true}
                            scaleXEnabled={true}
                            scaleYEnabled={true}
                            pinchZoom={true}
                            doubleTapToZoomEnabled={true}
                            highlightPerTapEnabled={true}
                            highlightPerDragEnabled={false}
                            // visibleRange={this.state.visibleRange}
                            dragDecelerationEnabled={true}
                            dragDecelerationFrictionCoef={0.99}
                            ref="chart"
                            keepPositionOnRotation={false}
                            onChange={(event) => console.log(event.nativeEvent)}
                        />
                    </View>
                </View>
            </SafeAreaView>

        );
    }
}

export default AnalyticsScreen;