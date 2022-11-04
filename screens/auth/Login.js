import { View, Text, Button,Alert, TouchableOpacity,KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Keyboard,
   } from "react-native"
import { useFonts } from "expo-font"
import { useState } from "react";
import { TextBox } from "../../component/forms";
import * as AuthModel from "../../firebase/authModel"
import { myColor } from "../../component/myColor";
import KeyboardAvoidingWrapper from "../../component/KeyboardAvoidingWrapper";
import { SafeAreaView } from 'react-native-safe-area-context'


export const Login = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'mali': require('../../assets/fonts/Mali-Bold.ttf'),
        'cursive': require('../../assets/fonts/Cursive-standard.ttf'),
        'fuzzyBubbles': require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
    });
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const toRegister = () => {
        navigation.navigate({
            name: 'Register',
        })
    }
    const toForgotPassword = () => {
        navigation.navigate({
            name: 'ForgotPassword',
        })
    }
    const unsuccess=(msg)=>{
        console.log(msg);
        Alert.alert(msg)
    }
    const success=(msg)=>{
        console.log(msg);
        Alert.alert(msg)
        navigation.navigate({
            name: 'MainNav',
        })
    }
    const onLogin=()=>{
        AuthModel.signInEmailPass(email,password,success,unsuccess)
    }
    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>loading</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1,height:"100%", justifyContent: "center", alignItems: "center" ,backgroundColor:myColor.primary}}>
            {/* <ScrollView style={{flex:1,borderWidth:5,width:"100%",height:"100%"}}>
            <View style={{flex:1,justifyContent: "center", alignItems: "center"}}> */}
            <View>
                <Text style={{ fontFamily: "mali", fontSize: 50, width: "100%", justifyContent: "center",color:myColor.accent }}>MY APP</Text>
            </View>
            <TextBox
                text="Email"
                setTextInput={{
                    value: email,
                    onChangeText: (text) => setEmail(text),
                }}
            />
            <TextBox
                text="Password"
                setTextInput={{
                    value: password,
                    onChangeText: (text) => setPassword(text),
                }}
            />
            <TouchableOpacity
                style={{
                    width:"80%",
                    justifyContent:"flex-end",
                    alignItems:"flex-end",
                    marginBottom:10,
                    color:myColor.error,
                }}
                onPress={()=>toForgotPassword()}
            >
                <Text>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor:myColor.accent,
                    borderRadius:10,
                    padding:10,
                    width:"80%",
                    justifyContent:"center",
                    alignItems:"center",
                    marginBottom:10,
                }}
                onPress={()=>onLogin()}
            >
                <Text>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor:myColor.accent,
                    borderRadius:10,
                    padding:10,
                    width:"80%",
                    justifyContent:"center",
                    alignItems:"center"
                }}
                onPress={() => toRegister()}
            >
                <Text>REGISTER</Text>
            </TouchableOpacity>
            {/* </View>
            </ScrollView> */}
        </SafeAreaView>
    )
}