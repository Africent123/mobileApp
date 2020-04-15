import React from "react";
import {View, Image, StyleSheet} from "react-native";

import {Logo} from "../assets/Logo"

const SplashScreen = () => {
    return(
        <View style={styles.container}>
            <Logo />
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#808080",
        justifyContent: "center",
        alignItems: "center"
    },
    logo:{
        width: 188,
        height: 106,
        justifyContent: 'center'
    }
})

export default SplashScreen