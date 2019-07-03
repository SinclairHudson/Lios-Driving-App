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
    SafeAreaView,
    ScrollView,
    Alert
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
            vehicles: ['Charlie', "Delta"],
            modalVisible: false,
            textInput: "Lamborghini",
        };
        this.save = this.save.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.newCar = this.newCar.bind(this);
        this.listImages = this.listImages.bind(this);

    }

    save() {
        AsyncStorage.setItem('CarList', JSON.stringify({list: this.state.vehicles}));
        this.props.navigation.navigate("Home");
    }

    newCar() {
        this.state.vehicles.push(this.state.textInput);
        this.setState({
            currentCar: this.state.textInput
        });
        this.setModalVisible();
    }

    listImages() {
        return this.state.vehicles.map((item, index) => {
            return (
                <View key={index} style={s.listCar}>
                    <Text style={s.text}>
                        {item}                      
                    </Text>
                    <Text style={s.text}>
                        {index}
                    </Text>
                    <TouchableOpacity
                        onPress={()=>{
                        this.setState({ vehicles: this.state.vehicles.slice(0, index).concat(this.state.vehicles.slice(index+1))});
                    }}>
                        <Icon
                            name="delete"
                            type="material"
                            color='#5EE0FA'
                        />
                    </TouchableOpacity>
                </View>
            );
        });
    }

    setModalVisible() {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    componentDidMount() {
        AsyncStorage.getItem('CarList', (err, res) => {
            if (err) {
                alert(JSON.stringify(err));
            }
            let data = JSON.parse(res);
            this.setState({vehicles: data.list})
        });
    }

    render() {
        return (
            <SafeAreaView style={s.droidSafeArea}>
                <View style={s.wrapper}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={s.modal}>
                            <Text>Add a new car</Text>
                            <TextInput
                                style={{
                                    height: 40,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    marginBottom: 40,
                                    marginTop: 40
                                }}
                                onChangeText={(text) => this.setState({textInput: text})}
                                value={this.state.textInput}
                            />
                            <View style={s.saveCancel}>
                                <TouchableOpacity style={[s.button, {backgroundColor: "rgb(94,224,250)"}]}
                                                  onPress={this.newCar}>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[s.button, {backgroundColor: "rgb(247,245,250)"}]}
                                                  onPress={this.setModalVisible}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={s.saveCancel}>
                        <TouchableOpacity style={[s.button, {backgroundColor: "rgb(94,224,250)"}]}
                                          onPress={this.save}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[s.button, {backgroundColor: "rgb(247,245,250)"}]}
                                          onPress={() => {
                                              this.props.navigation.navigate("Home");
                                          }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{flex: 4}}>
                        {this.listImages()}
                        <TouchableOpacity
                            style={[s.button, {height: 30}]}
                            onPress={() => {
                                this.setModalVisible(true);
                            }}>
                            <View style={s.icon}>
                                <Icon
                                    name="add"
                                    type="material"
                                    color='#5EE0FA'
                                />
                            </View>
                            <Text style={s.buttonText}>Add Vehicle</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default SettingsScreen;