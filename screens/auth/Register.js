import { useState } from "react"
import { View, Text, TouchableOpacity, Alert,Image,ScrollView } from "react-native"
import {SafeAreaView} from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel"
import * as StorageModel from "../../firebase/storageModel"
import { TextBox, CreateButton } from "../../component/forms"
import { myColor } from "../../component/myColor"
import {myFont} from "../../component/myFont"
import { Loading } from "../Loading"
import KeyboardLockView from "../../component/KeyboardLockView.js";
import { AlertMessage } from "../../component/alertMessage";

export const Register = ({ navigation }) => {
    const [profile, setProfile] = useState({ email: "", password: "",confirmPassword:"", fristName: "", lastName: "", profileImg:"https://firebasestorage.googleapis.com/v0/b/project-mobile-ea735.appspot.com/o/profile_image%2Fuser.jpg?alt=media&token=f28170a0-1d7f-42aa-8c49-7207ab17feb7" })
    const [loading, setLoading] = useState(false)
    const changeProfile = (keyName, value) => {
        setProfile({ ...profile, [keyName]: value })
    }
    const toLogin = () => {
        navigation.navigate({
            name: 'Login',
        })
    }
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        changeProfile("profileImg", pickerResult.uri );
    }
    const unsuccess = (msg) => {
        console.log(msg);
        AlertMessage(msg)
        setLoading(false)
    }
    const allsuccess = (msg) => {
        console.log(msg);
        AlertMessage("Register Success")
        setLoading(false)
        toLogin()
    }

    const uploadPhotoSuccess = (email,profileImg) => {
        UserModel.addUser(email, profile,profileImg, allsuccess, unsuccess)
    }

    const createUserSuccess = (user) => {
        console.log(user);
        //StorageModel.uploadImage(pickerResult.uri)
        //UserModel.addUser(user.email, profile, allsuccess, unsuccess)
        StorageModel.uploadImage(profile.profileImg,user.email,uploadPhotoSuccess,unsuccess)
    }

    const onRegister = () => {
        setLoading(true)
        console.log(profile);
        AuthModel.signUpEmailPass(profile.email, profile.password, createUserSuccess, unsuccess)
    }
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <SafeAreaView style={{flex:1,paddingHorizontal:10,backgroundColor:myColor.primary}}>
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, 
                justifyContent: "center", 
                alignItems: "center",
                backgroundColor:myColor.neutral,
                borderRadius:30,
                marginVertical:40,
                paddingHorizontal:5,
                paddingVertical:10,
            }}>
                <Text style={[myFont.h3,{}]}>Register</Text>
                <Image 
                    style={{width: 150,height: 150,resizeMode: 'cover',borderRadius: 150,borderColor:myColor.neutral3,borderWidth:2}}
                    source={{uri:profile.profileImg}}
                ></Image>
                <CreateButton
                    text="upload"
                    color={myColor.secondary}
                    styles={{padding:0,paddingHorizontal:10,paddingVertical:5,backgroundColor:myColor.primary}}
                    pStyle={myFont.h9}
                    textStyles={{color:myColor.neutral,fontWeight:'bold'}}
                    funOnPress={() => openImagePickerAsync()}
                />
                <TextBox
                    text={"Email"}
                    TStyles={{fontSize:16}}
                    setTextInput={{
                        value: profile.email,
                        onChangeText: (text) => changeProfile("email", text),
                    }}
                />
                <TextBox
                    text={"Password"}
                    TStyles={{fontSize:16}}
                    setTextInput={{
                        value: profile.password,
                        secureTextEntry:true,
                        onChangeText: (text) => changeProfile("password", text)
                    }}
                />
                <TextBox
                    text={"Confirm Password"}
                    TStyles={{fontSize:16}}
                    setTextInput={{
                        value: profile.confirmPassword,
                        secureTextEntry:true,
                        onChangeText: (text) => changeProfile("confirmPassword", text)
                    }}
                />
                <TextBox
                    text={"First Name"}
                    TStyles={{fontSize:16}}
                    setTextInput={{
                        value: profile.fristName,
                        onChangeText: (text) => changeProfile("fristName", text)
                    }}
                />
                <TextBox
                    text={"Last Name"}
                    TStyles={{fontSize:16}}
                    setTextInput={{
                        value: profile.lastName,
                        onChangeText: (text) => changeProfile("lastName", text)
                    }}
                />
                {/* styles={{padding:0,paddingHorizontal:10,paddingVertical:5,backgroundColor:myColor.primary}}
                pStyle={myFont.h9}
                textStyles={{color:myColor.neutral,fontWeight:'bold',}} */}
                <View style={{width:"100%",flexDirection: "row",justifyContent:'space-evenly',paddingHorizontal: 10,marginBottom:10 }}>
                    <TouchableOpacity
                        style={{
                            width:"30%",
                            paddingVertical:10,
                            backgroundColor: myColor.primary,
                            borderRadius: 10,
                            alignItems:'center',
                            justifyContent:'center',
                            
                        }}
                        onPress={() => onRegister()}
                    >
                        <Text style={{ fontSize: 20,color:myColor.neutral,fontWeight:'bold' }}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width:"30%",
                            backgroundColor: myColor.error,
                            paddingVertical:10,
                            borderRadius: 10,
                            alignItems:'center',
                            justifyContent:'center',
                            // marginHorizontal: 10,
                        }}
                        onPress={() => toLogin()}
                    >
                        <Text style={{ fontSize: 20,color:myColor.neutral,fontWeight:'bold' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}