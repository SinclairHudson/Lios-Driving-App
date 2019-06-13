import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#328BC3",
        flex: 1
    },
    image: {
        height: 313,
        width: 300,
        position: "absolute",
        top: "17.36%",
        left: "13.6%"
    },

    settingsButton: {
        height: 54,
        width: 60,
        top: 720,
        left: 283,
        position: "absolute"
    },
    button3: {
        top: "0%",
        left: "0%",
        width: 60,
        height: 54,
        position: "absolute",
        backgroundColor: "rgba(55,96,163,1)",
        opacity: 1,
        borderRadius: 33
    },
    icon3: {
        top: 7,
        left: 10,
        position: "absolute",
        backgroundColor: "transparent",
        color: "rgba(255,214,48,1)",
        fontSize: 40
    },
    driveButton: {
        height: 57,
        width: 197,
        top: 471,
        left: 89,
        position: "absolute"
    },
    button: {
        top: "0%",
        left: "0%",
        width: 197,
        height: 57,
        position: "absolute",
        backgroundColor: "rgba(55,96,163,1)",
        opacity: 1,
        borderRadius: 33
    },
    icon: {
        top: 8,
        left: 10,
        position: "absolute",
        backgroundColor: "transparent",
        transform: [
            {
                rotate: "0deg"
            }
        ],
        color: "rgba(255,214,48,1)",
        fontSize: 40
    },
    text: {
        top: 19,
        left: "15.23%",
        width: 164,
        height: 26,
        position: "absolute",
        backgroundColor: "transparent",
        fontSize: 22,
        fontFamily: "AvenirNext-DemiBold",
        textAlign: "center",
        color: "rgba(255,214,48,1)"
    },
    analyticsButton: {
        height: 55,
        width: 198,
        top: 558,
        left: 89,
        position: "absolute"
    },
    button2: {
        top: "0%",
        left: "0%",
        width: 197,
        height: 55,
        position: "absolute",
        backgroundColor: "rgba(55,96,163,1)",
        opacity: 1,
        borderRadius: 33
    },
    icon2: {
        top: 8,
        left: 10,
        position: "absolute",
        backgroundColor: "transparent",
        color: "rgba(255,214,48,1)",
        fontSize: 40
    },
    text2: {
        top: 17,
        left: "16.67%",
        width: 165,
        height: 24,
        position: "absolute",
        backgroundColor: "transparent",
        fontSize: 22,
        fontFamily: "AvenirNext-DemiBold",
        textAlign: "center",
        color: "rgba(255,214,48,1)"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headline: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default styles;