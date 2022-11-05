import { View, Text, Button,Alert, TouchableOpacity,KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Keyboard,Image
   } from "react-native"
import { useFonts } from "expo-font"
import { useState } from "react";
import { TextBox } from "../../component/forms";
import * as AuthModel from "../../firebase/authModel"
import { myColor } from "../../component/myColor";
import KeyboardLockView from "../../component/KeyboardLockView.js";
import { SafeAreaView } from 'react-native-safe-area-context'
import { AlertMessage } from "../../component/alertMessage";

import { Loading } from "../Loading";

export const Login = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'mali': require('../../assets/fonts/Mali-Bold.ttf'),
        'cursive': require('../../assets/fonts/Cursive-standard.ttf'),
        'fuzzyBubbles': require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
    });
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] =useState(false)

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
        //console.log(msg);
        setLoading(false)
        AlertMessage(msg)
    }
    const success=(msg)=>{
        //console.log(msg);
        //AlertMessage(msg)
        setLoading(false)
        navigation.navigate({
            name: 'MainNav',
        })
    }
    const onLogin=()=>{
        setLoading(true)
        AuthModel.signInEmailPass(email,password,success,unsuccess)
    }
    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>loading</Text>
            </View>
        )
    }
    if(loading){
        return(
            <SafeAreaView style={{ flex: 1,height:"100%", justifyContent: "center", alignItems: "center" ,backgroundColor:myColor.primary}}>
                <View style={{flex:1}}>
                    <Text style={{ fontFamily: "mali", fontSize: 50, width: "100%", justifyContent: "center",color:myColor.accent }}>MY APP</Text>
                </View>
                <View style={{flex: 2,width:"100%"}}>
                    <Loading/>
                </View>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1,height:"100%", justifyContent: "center", alignItems: "center" ,backgroundColor:myColor.primary}}>
            {/* <ScrollView style={{flex:1,borderWidth:5,width:"100%",height:"100%"}}>
            <View style={{flex:1,justifyContent: "center", alignItems: "center"}}> */}
            <Image style={{width: 150,height: 150,resizeMode: 'cover',}} 
                source={{uri:'https://firebasestorage.googleapis.com/v0/b/project-mobile-ea735.appspot.com/o/profile_image%2FBooks-illustration-on-transparent-background-PNG.png?alt=media&token=f9061344-6bbc-4459-8ca2-19ff0a1767c5'}}/>
            <View style={{flex:1}}>
                <Text style={{ fontFamily: "mali", fontSize: 50, width: "100%", justifyContent: "center",color:myColor.accent }}>MY APP</Text>
            </View>
            <View style={{flex: 2,width:"100%",justifyContent: "center", alignItems: "center"}}>
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
            </View>
            {/* </View>
            </ScrollView> */}
        </SafeAreaView>
    )
}