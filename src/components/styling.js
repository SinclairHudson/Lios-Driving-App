//this is the main styleSheet for all the app. Use Ctrl+F to find everything.
import {StyleSheet, Platform, absoluteFillObject} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 50,
        height: 100,
    },
    chart: {
        flex: 1,
        width: 360,
        height: 250,
    },
    droidSafeArea: {
        flex: 1,
        backgroundColor: "#152d44",
        paddingTop: Platform.OS === 'android' ? 0 : 0
    },
    icon:{
        margin: 6,
        flex: 1,
        color: "rgb(94,224,250)",
    },
    wrapper:{
        flex: 1,
        backgroundColor: "rgb(21,45,68)",
        color: 'white',
        alignItems: 'center'
    },
    buttonText:{
        flex: 1,
        marginTop: 12,
        marginRight: 30,
        fontSize: 25,
        color: "rgba(255,255,255,1)",
    },
    buttons:{
        flex: 1,
        justifyContent: 'space-around',
    },
    modal:{
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 120,
        marginLeft: 40,
        marginRight: 40,
        padding: 40,
    },
    stop:{
        flex: 1,
        margin: 10,
        height: 70,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "rgb(61,88,117)",
        borderRadius: 20
    },
    start:{
        flex: 1,
        margin: 10,
        height: 70,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "rgb(94,224,250)",
        borderRadius: 20
    },
    chartLabel:{
        color: 'rgba(255,255,255,0.97)',
        marginLeft: 40,
    },
    inDial:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeCircleWrapper:{
        flex: 3,
        marginTop: 45,
    },
    circleLabel:{
        marginTop: 15,
    },
    circleWrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    twoCircleWrapper:{
        flex:2,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    kmh:{
        flex:1,
        color: "rgba(255,255,255,1)",
    },
    kmhText:{
        color: "rgba(255,255,255,1)",
    },
    image:{
        paddingLeft: 100,
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        marginLeft: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bottomDriver:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: "rgb(21,45,68)",
    },
    grad:{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        color: "rgba(255,255,255,1)"
    },
    dialValue:{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        color: "rgba(255,255,255,1)",
        fontSize: 100,
        marginTop: 70,
    },
    smallDialValue:{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        marginTop: 3,
    },
    dialValueText:{
        color: "rgba(255,255,255,1)",
        fontSize: 100,
    },
    smallDialValueText:{
        color: "rgba(255,255,255,1)",
        fontSize: 50,
    },
    button: {
        margin: 30,
        flex: 1,
        width: 300,
        height: 40,
        color: 'black',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "rgb(61,88,117)",
        borderRadius: 20
    },
    saveCancel:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    listCar:{
        flex: 1,
        margin: 20,
        flexDirection: 'row',
        alignContent: 'space-around',
    },
    text: {
        flex: 1,
        backgroundColor: "transparent",
        fontSize: 22,
        fontFamily: "AvenirNext-DemiBold",
        textAlign: "center",
        color: '#FFFFFF'
    },
    valueContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    valueValue: {
        width: 200,
        fontSize: 20
    },
    valueName: {
        width: 50,
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default styles;