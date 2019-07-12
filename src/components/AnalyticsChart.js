import {Dimensions, Text, View, ScrollView, Picker, processColor} from "react-native";
import s from "./styling";
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {LineChart} from 'react-native-charts-wrapper';
import LinearGradient from "react-native-linear-gradient";

class AnalyticsChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session: this.props.session,
            userID: 'a9b9be93-914c-4a17-a4e6-797533a6e782',
            Ax: [{x: 0, y: 5.023107051849365}, {x: 1, y: 1.3409830331802368}],
            Ay: [{x: 0, y: 5.023107051849365}, {x: 500, y: 1.3409830331802368}],
            Az: [{x: 0, y: 5.023107051849365}, {x: 500, y: 1.3409830331802368}],
            speeds: [{x: 5, y: 94}],
            xAxis: {
                textColor: processColor('#FFFFFF'),
            },
            yAxis: {
                textColor: processColor('#FFFFFF'),
            },
            legend: {
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
            },
            loading: false
        };
    }

    componentDidUpdate(prevProps) {
        alert("I should change");
        if (prevProps.session !== this.props.session) {
            this.setState({session: this.props.session});
        }
    }

    componentDidMount() {
        alert("Doing a fetch");
        fetch('https://ne6nmf3qcf.execute-api.us-east-1.amazonaws.com/dev/sessionData?userID=' + this.state.userID + '&startTimestamp=' + this.state.session)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        Ax: responseJson.Ax,
                        Ay: responseJson.Ay,
                        Az: responseJson.Az,
                        speeds: responseJson.Speed
                    });
                alert(JSON.stringify(this.state.Ax));
            })
            .catch((error) => {
                alert(JSON.stringify(error));
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
        return (
            <View style={{flex: 1}}>
                <LineChart
                    style={s.chart}
                    data={data}
                    xAxis={this.state.xAxis}
                    yAxis={this.state.yAxis}
                    legend={this.state.legend}
                    chartDescription={{text: 'Acceleration', textColor: processColor('#FFFFFF'), textSize: 22}}
                    drawGridBackground={false}
                    borderColor={processColor('#FFFFFF')}
                    borderWidth={1}
                    drawBorders={true}
                    marker={this.state.marker}
                    autoScaleMinMaxEnabled={false}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={false}
                    scaleXEnabled={false}
                    scaleYEnabled={false}
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
                <LineChart
                    style={s.chart}
                    data={speedData}
                    xAxis={this.state.xAxis}
                    yAxis={this.state.yAxis}
                    chartDescription={{text: 'Speed', textColor: processColor('#FFFFFF'), textSize: 22}}
                    drawGridBackground={false}
                    borderColor={processColor('#FFFFFF')}
                    borderWidth={1}
                    drawBorders={true}
                    marker={this.state.marker}
                    autoScaleMinMaxEnabled={false}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleEnabled={false}
                    scaleXEnabled={false}
                    scaleYEnabled={false}
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
        );
    }
}

export default AnalyticsChart;