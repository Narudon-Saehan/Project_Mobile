import { useState } from "react"
import { View, Text, TouchableOpacity, Alert,Image } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel"
import * as StorageModel from "../../firebase/storageModel"
import { TextBox, CreateButton } from "../../component/forms"
import { myColor } from "../../component/myColor"
import { Loading } from "../Loading"
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
        Alert.alert(msg)
        setLoading(false)
    }
    const allsuccess = (msg) => {
        console.log(msg);
        Alert.alert("Register Success")
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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 30 }}>Register</Text>
            <Image 
                style={{width: 150,height: 150,resizeMode: 'cover',borderRadius: 150,}}
                source={{uri:profile.profileImg}}
            ></Image>
            <CreateButton
                text="upload"
                color={myColor.secondary}
                funOnPress={() => openImagePickerAsync()}
            />

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
                text={"Confirm Password"}
                setTextInput={{
                    value: profile.confirmPassword,
                    onChangeText: (text) => changeProfile("confirmPassword", text)
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
                        backgroundColor: myColor.success,
                        borderRadius: 10,
                        padding: 10,
                        marginRight: 10,
                    }}
                    onPress={() => onRegister()}
                >
                    <Text style={{ fontSize: 20 }}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: myColor.error,
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