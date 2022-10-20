import { View, Text, TextInput, Button } from "react-native"
import { useFonts } from "expo-font"
import { useState } from "react";

export const Login = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'mali': require('../../assets/fonts/Mali-Bold.ttf'),
        'cursive': require('../../assets/fonts/Cursive-standard.ttf'),
        'fuzzyBubbles': require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
    });

    const toRegister = () => {
        navigation.navigate({
            name: 'Register',
        })
    }
    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>loading</Text>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View>
                <Text style={{ fontFamily: "mali", fontSize: 50, width: "100%", justifyContent: "center" }}>MY APP</Text>
            </View>
            <View style={{ width: "80%", marginBottom: 20 }}>
                <Text style={{ alignSelf: "flex-start" }}>Email</Text>
                <TextInput style={{ borderWidth: 1, borderRadius: 10, width: "100%" }} />
            </View>
            <View style={{ width: "80%", marginBottom: 20 }}>
                <Text style={{ alignSelf: "flex-start" }}>Password</Text>
                <TextInput style={{ borderWidth: 1, borderRadius: 10, width: "100%" }} />
            </View>
            <Button title="Login" />
            <Button title="Register" onPress={() => toRegister()} />
        </View>
    )
}