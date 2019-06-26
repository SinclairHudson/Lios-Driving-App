import {StyleSheet, Platform} from "react-native";

const styles = StyleSheet.create({
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
        flex: 3,
        fontSize: 25,
        color: "rgba(255,255,255,1)",
    },
    buttons:{
        flex:1,
        justifyContent: 'space-around',
    },
    stop:{
        paddingTop: 115,
        margin: 30,
        flex: 1,
        width: 300,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "rgb(255,26,31)",
        borderRadius: 20
    },
    modal:{
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 120,
        marginLeft: 40,
        marginRight: 40,
        padding: 20,
    },
    start:{
        paddingTop: 115,
        margin: 30,
        flex: 1,
        width: 300,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "rgb(75,226,27)",
        borderRadius: 20
    },
    chartLabel:{
        color: 'rgba(255,255,255,0.97)',
        marginLeft: 40,
    },
    image:{
        paddingLeft: 100,
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        marginLeft: 20,
    },
    grad:{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        color: "rgba(255,255,255,1)"
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