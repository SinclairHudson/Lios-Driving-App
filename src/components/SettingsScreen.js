import {Alert, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import s from './styling';
import {Icon} from "react-native-elements";


//The SettingsScreen is really just for adding and deleting cars off of the app. We figured we should include this
//feature because some users have multiple cars, and for insurance reasons it's important to know what car you're driving.
//There is quite a bit of space on this page; more settings could be added to it.
class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: ['Charlie', "Delta"],
            modalVisible: false,
            textInput: "Lamborghini",
        };
        //binding THIS to mean SettingsScreen, so that everything can access the same state.
        this.save = this.save.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.newCar = this.newCar.bind(this);
        this.listCars = this.listCars.bind(this);

    }

    //The save function just takes the carlist pumps it into AsyncStorage. Then it navigates to home.
    save() {
        AsyncStorage.setItem('CarList', JSON.stringify({list: this.state.vehicles}));
        this.props.navigation.navigate("Home");
    }

    //newCar takes the data from the text input in the popup and adds it to the list of vehicles.
    newCar() {
        this.state.vehicles.push(this.state.textInput);
        this.setState({
            currentCar: this.state.textInput
        });
        this.setModalVisible();
    }

    //listCars takes all the vehicles in the state, and display them with a delete button.
    listCars() {
        return this.state.vehicles.map((item, index) => {
            return (
                <View key={index} style={s.listCar}>
                    <Text style={s.text}>
                        {item}                      
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

    //this function just toggles the visibility of the modal, which is the pop up that appears when you add a new car.
    setModalVisible() {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    //on the first render, pull the CarList out of AsyncStorage.
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
                    {/*Modal is the pop-up view when you add a car. So it's always rendered, but not always visible.
                    It's very handy, because it's in the same component.*/}
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
                                {/*On cancel, just have the modal go away.*/}
                                <TouchableOpacity style={[s.button, {backgroundColor: "rgb(247,245,250)"}]}
                                                  onPress={this.setModalVisible}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={s.saveCancel}>
                        {/*If we are saving changes, then call save()*/}
                        <TouchableOpacity style={[s.button, {backgroundColor: "rgb(94,224,250)"}]}
                                          onPress={this.save}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                        {/*If we cancel saving changes, then just migrate to the Home page*/}
                        <TouchableOpacity style={[s.button, {backgroundColor: "rgb(247,245,250)"}]}
                                          onPress={() => {
                                              this.props.navigation.navigate("Home");
                                          }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{flex: 4}}>
                        {/*Display all the cars*/}
                        {this.listCars()}
                        <TouchableOpacity
                            style={[s.button, {height: 61}]}
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
                            {/*Button that makes the modal viewable.*/}
                            <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={s.buttonText}>Add Vehicle</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default SettingsScreen;