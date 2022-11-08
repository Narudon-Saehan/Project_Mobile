import { useState } from "react"
import { View,Text, Alert } from "react-native"
import { TextBox,CreateButton } from "../../component/forms"
import { myColor } from "../../component/myColor"
import {myFont} from "../../component/myFont"
import * as AuthModel from "../../firebase/authModel"
import {SafeAreaView} from "react-native-safe-area-context"
export const ForgotPassword=({navigation})=>{
    const [email,setEmail] = useState("")
    const toLogin=()=>{
        navigation.navigate({
            name:"Login"
        })
    }
    const unsuccess =(msg)=>{
        Alert.alert(msg)
    }
    const success =(msg)=>{
        Alert.alert(msg)
        toLogin()
    }
    const sendEmail=()=>{
        AuthModel.recoverPassword(email,success,unsuccess)
    }
    return(
        <SafeAreaView style={{flex:1,paddingHorizontal:10,backgroundColor:myColor.primary}}>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <View style={{width:"100%",height:270,backgroundColor:myColor.neutral,justifyContent:"center",alignItems:"center",borderRadius:30,paddingHorizontal:10}}>
                    <Text style={{fontSize:32,color:myColor.neutral2}}>Forgot Password</Text>
                    <TextBox 
                        text="Email"    
                        setTextInput={{
                            value:email,
                            onChangeText: (text) => setEmail(text)
                        }}
                    />
                    <CreateButton
                        text="Send Email"
                        color={myColor.primary}
                        funOnPress={()=>sendEmail()}
                        styles={{width:"80%",margin:0,marginbottom:5}}
                        pStyle={myFont.h9}
                        textStyles={{color:myColor.neutral,fontWeight:'bold'}}
                    />
                    <CreateButton
                        text="Cancel"
                        color={myColor.error}
                        funOnPress={()=>toLogin()}
                        styles={{width:"80%"}}
                        pStyle={myFont.h9}
                        textStyles={{color:myColor.neutral,fontWeight:'bold'}}
                    />
                </View>
                
            </View>
        </SafeAreaView>
    )
}