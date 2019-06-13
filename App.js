import React from 'react';
import Icon from "@builderx/icons";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createAppContainer, } from 'react-navigation';
import { accelerometer, gyroscope } from "react-native-sensors";
//import DrivingScreen from "DrivingScreen";
import SettingsScreen from "./src/components/SettingsScreen";
import DrivingScreen from "./src/components/DrivingScreen";
import AnalyticsScreen from "./src/components/AnalyticsScreen";
import HomeScreen from "./src/components/HomeScreen";


const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
    Analytics: AnalyticsScreen,
    Driving: DrivingScreen
});

export default createAppContainer(TabNavigator);