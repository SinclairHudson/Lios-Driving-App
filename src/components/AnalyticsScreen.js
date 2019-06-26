import {Dimensions, Text, View, ScrollView, Picker, SafeAreaView} from "react-native";
import s from "./styling";
import AsyncStorage from '@react-native-community/async-storage';
import {LineChart} from "react-native-chart-kit";
import React from 'react';
import LinearGradient from "react-native-linear-gradient";
import AnalyticsChart from "./AnalyticsChart";


class AnalyticsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sess: 'Session',
            sessionList: ['Alpha', 'Bravo'],
        };
    }

    getSessionList() {
        let sessList = [];
        try {
            AsyncStorage.getItem('SessionList')
                .then(data => {
                    let ob = JSON.parse(data);
                    sessList = (ob.list);
                    return (
                        <View>
                            <Picker
                                style={{height: 50, width: 200}}
                                mode="dropdown"
                                selectedValue={this.state.selected}
                                onValueChange={() => {
                                }}> //add your function to handle picker state change
                                {sessList.map((item, index) => {
                                    return (<Picker.Item label={item} value={index} key={index}/>)
                                })}
                            </Picker>
                        </View>
                    );
                });
        } catch (er) {
            alert("error, failed to get SessionList. " + JSON.stringify(er));
        }
    }

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <View style={s.wrapper}>
                    <ScrollView>
                        <View>
                            {this.getSessionList()}
                            <AnalyticsChart session={this.state.sess}/>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>

        );
    }
}

export default AnalyticsScreen;