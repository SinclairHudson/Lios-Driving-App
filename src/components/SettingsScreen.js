import {accelerometer} from "react-native-sensors";
import {
    Dimensions,
    Text,
    View,
    Picker,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    SafeAreaView
} from "react-native";
import {LineChart} from "react-native-chart-kit";
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import s from './styling';
import LinearGradient from "react-native-linear-gradient";
import {Icon} from "react-native-elements";


class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: "suv",
            modalVisible: false,
            textInput: "Lamborghini",
        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <View style={s.wrapper}>
                    <Picker
                        selectedValue={this.state.vehicle}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({vehicle: itemValue})
                        }>
                        <Picker.Item label="SUV" value="suv"/>
                        <Picker.Item label="Dodge Grand Caravan" value="minivan"/>
                        <Picker.Item label="Jeep" value="jeep"/>
                    </Picker>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={s.modal}>
                            <View>
                                <Text>Add a new car</Text>
                                <TextInput
                                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                    onChangeText={(text) => this.setState({textInput: text})}
                                    value={this.state.textInput}
                                />
                                <View style={s.buttons}>
                                    <TouchableOpacity
                                        style={s.button}
                                        onPress={() => {
                                            this.setModalVisible(false)
                                        }}>
                                        <View style={s.icon}>
                                            <Icon
                                                name='timeline'
                                                type='material'
                                                color='#FFD630'
                                            />
                                        </View>
                                        <Text style={s.buttonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={s.button}
                                        onPress={() => {
                                            this.setModalVisible(false)
                                        }}>
                                        <View style={s.icon}>
                                            <Icon
                                                name='timeline'
                                                type='material'
                                                color='#FFD630'
                                            />
                                            <Text style={s.buttonText}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Save</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity
                        style={[s.button, {height: 30}]}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <View style={s.icon}>
                            <Icon
                                name="car"
                                type="font-awesome"
                                color='#FFD630'
                            />
                        </View>
                        <Text style={s.buttonText}>Add Vehicle</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

export default SettingsScreen;