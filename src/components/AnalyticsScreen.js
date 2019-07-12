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
            sess: '1562858835605',
            sessions: ['Alpha', 'Bravo'],
        };
    }

    componentDidMount() {
        this.updateSessionList();
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

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <View style={s.wrapper}>
                    <Picker
                        selectedValue={this.state.sess}
                        style={{height: 50, width: 200, color: '#FFFFFF', fontSize: 22,}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({sess: itemValue})
                        }>
                        {/*for each vehicle, create a drop down item for it, with a unique key*/}
                        {this.state.sessions.map((item, index) => {
                            return (
                                <Picker.Item style={{color: '#FFFFFF', fontSize: 22,}} label={item} value={item}
                                             key={index}/>)
                        })}
                    </Picker>
                    <AnalyticsChart session={this.state.sess}/>
                    <View><Text>{JSON.stringify(this.state.sess)}</Text></View>
                </View>
            </SafeAreaView>

        );
    }
}

export default AnalyticsScreen;