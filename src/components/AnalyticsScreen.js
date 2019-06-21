import {AsyncStorage, Dimensions, Text, View, ScrollView, Picker} from "react-native";
import s from "./styling";
import {LineChart} from "react-native-chart-kit";
import React from 'react';
import LinearGradient from "react-native-linear-gradient";
import AnalyticsChart from "./AnalyticsChart";


class AnalyticsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sess: 'Session',
        };
    }

    getSessionList() {
        try {
            AsyncStorage.getItem('SessionList')
                .then(data => {
                    let sessList = (JSON.parse(data).list);
                    return sessList.map((sessionName) => (
                        <Picker.Item label='excuse me?' value={sessionName} />
                    ));
                }).done();
        } catch (er) {
            let init = {
                list: ["Session", "Session2"]
            };
            AsyncStorage.setItem('SessionList', JSON.stringify(init))
        }
    }

    render() {
        return (
            <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                colors={['#3760a3', '#328bc3']}
                style={s.grad}>
                <ScrollView>
                    <View>
                        <Picker
                            selectedValue={this.state.sess}
                            style={{height: 50, width: 200}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({sess: itemValue})
                            }>
                            <Picker.Item label='Session2' value="Session2" />
                        </Picker>
                        <AnalyticsChart session={this.state.sess}/>
                    </View>
                </ScrollView>
            </LinearGradient>

        );
    }
}

export default AnalyticsScreen;