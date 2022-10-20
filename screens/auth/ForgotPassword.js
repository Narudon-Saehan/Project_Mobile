import { useState } from "react"
import { View,Text, Alert } from "react-native"
import { TextBox,CreateButton } from "../../component/forms"
import { myColor } from "../../component/myColor"
import * as AuthModel from "../../firebase/authModel"

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
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:myColor.primary}}>
            <Text style={{fontSize:30,color:myColor.accent}}>Forgot Password</Text>
            <TextBox 
                text="Email"    
                setTextInput={{
                    value:email,
                    onChangeText: (text) => setEmail(text)
                }}
            />
            <CreateButton
                text="Send Email"
                color={myColor.success}
                funOnPress={()=>sendEmail()}
                styles={{width:"80%"}}
            />
            <CreateButton
                text="Cancel"
                color={myColor.error}
                funOnPress={()=>toLogin()}
                styles={{width:"80%"}}
            />
        </View>
    )
}