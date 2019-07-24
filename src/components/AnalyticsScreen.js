import {Picker, processColor, SafeAreaView, View} from "react-native";
import s from "./styling";
import AsyncStorage from '@react-native-community/async-storage';
import {LineChart} from 'react-native-charts-wrapper';
import React from 'react';
import {NavigationEvents} from "react-navigation";

//This screen is the one in which the user can look back on their 7 most recent sessions, and see the acceleration and
//speed graphs for each of them.

class AnalyticsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session: "Select a Session",
            sessions: [],
            userID: null,
            Ax: [{x: 0, y: 2}, {x: 1, y: 2}],
            Ay: [{x: 0, y: 1}, {x: 1, y: 1}],
            Az: [{x: 0, y: 0}, {x: 1, y: 0}],
            speeds: [{x: 5, y: 94}],
            loading: false
        };
    }

    //on the first render, update the Session list so that they're all available to view.
    componentDidMount() {
        this.updateSessionList();
    }

    //fetch session gets the session from the backend, and AWS API GET request.
    //this is called every time the user picks a new session from the drop down menu.
    fetchSession() {
        //if we've actually chosen a session (so this doesn't get called immediately and throw an error)
        if (this.state.userID !== null && this.state.session !== null) {
            fetch('https://ne6nmf3qcf.execute-api.us-east-1.amazonaws.com/dev/sessionData?userID=' + this.state.userID + '&startTimestamp=' + this.state.session)
                .then((response) => response.json())
                .then((responseJson) => {
                    // alert("Response of " + this.state.userID + " " + this.state.session + " " + JSON.stringify(responseJson));
                    //set the state with the new data, so that the graphs can display it.
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

    //updateSessionList is pretty simple. when called, it gets data from AsyncStorage, and then sets the state to reflect
    //all the recent sessions.
    updateSessionList() {
        AsyncStorage.getItem('SessionList', (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            }
            let data = JSON.parse(res);

            this.setState({sessions: data.list})
        });
    }

    //gets the UserID from asyncstorage, which should be set once when installing the app and never changed.
    //this just populates the state with that info that is stored on the phone.

    updateUserID() {
        AsyncStorage.getItem('UserId', (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            }
            this.setState({userID: res})
        });
    }

    render() {
        //this is the data object that gets fed into the acceleration graph. It's kinda wonky and breaks easily,
        //so modify it one piece at a time.
        let data = {
            dataSets: [
                {
                    values: this.state.Ax,
                    label: 'X',
                    config: {
                        drawCircles: false,
                        color: processColor('#FFFFFF')
                    }
                },
                {
                    values: this.state.Ay,
                    label: 'Y',
                    config: {
                        drawCircles: false,
                        color: processColor('#5EDFF9')
                    }
                },
                {
                    values: this.state.Az,
                    label: 'Z',
                    config: {
                        drawCircles: false,
                        color: processColor('#5cbbff')
                    }
                }]
        };
        //data object for the speed graph
        let speedData = {
            dataSets: [
                {
                    values: this.state.speeds,
                    label: 'Speed',
                    config: {
                        drawCircles: false,
                        color: processColor('#FFFFFF')
                    }
                }]
        };
        //this works
        let xAxis = {
            textColor: processColor('#FFFFFF'),
        };
        //this doesn't work...
        let yAxis = {
            textColor: processColor('#FFFFFF'),
        };
        //this object specifies how legends are displayed in the graph. Again, this one is really tricky and some
        //features don't work at the time of writing, so be careful and don't expect a lot of flexibility.
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
            // at the time of writing, saveareaview should make it possible to work around the notch. Currently,
            // android doesn't support it.
            <SafeAreaView style={s.droidSafeArea}>
                {/*whenever the user navigates to this page, update the session list and the user id.*/}
                <NavigationEvents
                    onWillFocus={() => {
                        this.updateSessionList();
                        this.updateUserID()
                    }}
                />
                <View style={s.wrapper}>
                    {/*This is the drop down menu for choosing sessions*/}
                    <Picker
                        selectedValue={this.state.session}
                        style={{height: 50, width: 200, color: '#FFFFFF', fontSize: 22,}}
                        onValueChange={(itemValue, itemIndex) => {
                            //remember, setState is actually async, so fetchSession needs to be in the callback!!!!
                            this.setState({session: itemValue}, () => {
                                this.fetchSession();
                            })
                        }

                        }>
                        {/*This is the initial option, so that the screen starts off without having to fetch an unneeded*/}
                        {/*session.*/}
                        <Picker.Item style={{color: '#FFFFFF', fontSize: 22,}}
                                     label={"Select a Session"} value={null}
                                     key={-1}/>
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
                        {/*Two line charts with a lot of properties. Not all of them seem to do what they say they do..*/}
                        {/*Modify these properties one at a time.*/}
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
                    <View style={{flex: 1}}>
                        <LineChart
                            style={s.chart}
                            data={speedData}
                            xAxis={xAxis}
                            yAxis={yAxis}
                            legend={legend}
                            chartDescription={{text: 'Speed', textColor: processColor('#FFFFFF'), textSize: 22}}
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