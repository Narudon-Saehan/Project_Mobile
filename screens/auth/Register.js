import { useState } from "react"
import { View, Text, TouchableOpacity ,Alert} from "react-native"
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel"
import { TextBox } from "../../component/forms"
import { myColor } from "../../component/myColor"
import { Loading } from "../Loading"
export const Register = ({ navigation }) => {
    const [profile, setProfile] = useState({ email: "", password: "", fristName: "", lastName: "" })
    const [loading,setLoading] = useState(false)
    const changeProfile = (keyName, value) => {
        setProfile({ ...profile, [keyName]: value })
    }
    const toLogin = () => {
        navigation.navigate({
            name: 'Login',
        })
    }
    const unsuccess=(msg)=>{
        console.log(msg);
        Alert.alert(msg)
        setLoading(false)
    }
    const allsuccess=(msg)=>{
        console.log(msg);
        Alert.alert("Register Success")
        setLoading(false)
        toLogin()
    }
    const createUserSuccess=(user)=>{
        console.log(user);
        UserModel.addUser(user.email,profile,allsuccess,unsuccess)

    }
    const onRegister=()=>{
        setLoading(true)
        console.log(profile);
        AuthModel.signUpEmailPass(profile.email,profile.password,createUserSuccess,unsuccess)
    }
    if(loading){
        return(
            <Loading/>
        )
    }
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 30 }}>Register</Text>

            <TextBox
                text={"Email"}
                setTextInput={{
                    value: profile.email,
                    onChangeText: (text) => changeProfile("email", text),
                }}
            />
            <TextBox
                text={"Password"}
                setTextInput={{
                    value: profile.password,
                    onChangeText: (text) => changeProfile("password", text)
                }}
            />
            <TextBox
                text={"Frist Name"}
                setTextInput={{
                    value: profile.fristName,
                    onChangeText: (text) => changeProfile("fristName", text)
                }}
            />
            <TextBox
                text={"Last Name"}
                setTextInput={{
                    value: profile.lastName,
                    onChangeText: (text) => changeProfile("lastName", text)
                }}
            />
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    style={{
                        backgroundColor:myColor.success,
                        borderRadius: 10,
                        padding: 10,
                        marginRight:10,
                    }}
                    onPress={() => onRegister()}
                >
                    <Text style={{ fontSize: 20 }}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor:myColor.error,
                        borderRadius: 10,
                        padding: 10,
                    }}
                    onPress={() => toLogin()}
                >
                    <Text style={{ fontSize: 20 }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}