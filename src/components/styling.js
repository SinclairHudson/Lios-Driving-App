import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    icon:{
        margin: 6,
        flex: 1,
        color: "rgba(255,214,48,1)",
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
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "rgba(55,96,163,1)",
        borderRadius: 20
    },
    text: {
        flex: 1,
        backgroundColor: "transparent",
        fontSize: 22,
        fontFamily: "AvenirNext-DemiBold",
        textAlign: "center",
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