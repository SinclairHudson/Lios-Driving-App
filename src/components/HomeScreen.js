import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styling";
import Icon from "@builderx/icons";
import React from 'react';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.root}>
                <Image
                    source={require("../assets/LiosLogo.png")}
                    style={styles.image}
                />
                <View style={styles.driveButton}>
                    <TouchableOpacity style={styles.button}/>

                    <Icon
                        style={styles.icon}
                        name="steering"
                        type="MaterialCommunityIcons"
                    />
                    <Text style={styles.text}>DRIVE</Text>
                </View>
                <View style={styles.analyticsButton}>
                    <TouchableOpacity style={styles.button2}/>
                    {/*
                    <Icon
                        style={styles.icon2}
                        name="trending-up"
                        type="MaterialCommunityIcons"
                    />      */}
                    <Text style={styles.text2}>ANALYTICS</Text>
                </View>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => {
                        this.props.navigation.push("SettingsScreen");
                    }}
                >
                    <TouchableOpacity style={styles.button3} />
                    {/*
                    <Icon
                        style={styles.icon3}
                        name="settings-outline"
                        type="MaterialCommunityIcons"
                    /> */}
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeScreen;