import {Image, Text, TouchableOpacity, View, SafeAreaView, AsyncStorage, Picker, ScrollView} from "react-native";
import {withNavigation} from 'react-navigation';
import s from "./styling";
import {Icon} from 'react-native-elements'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

class DataScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.forceUpdate();
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                this.setState(stores);
            });
        });
    }

    render() {
        return (
            <LinearGradient
                colors={['#3760a3', '#328bc3']}
                style={s.grad}>
                <ScrollView>
                  <Text>
                      {JSON.stringify(this.state)}
                  </Text>
                </ScrollView>
            </LinearGradient>
        );
    }
}

export default DataScreen;