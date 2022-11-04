import { View,Text,TouchableOpacity,Image, Alert } from "react-native"
import { myColor } from "../../component/myColor"
import { TextBox,CreateButton } from "../../component/forms"
import { useState,useEffect } from "react"
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel" 
import * as ImagePicker from 'expo-image-picker';
import * as StorageModel from "../../firebase/storageModel"

import { Loading } from "../Loading"

export const EditProfile=({navigation})=>{
    const [docID,setdocID] =useState()
    const [profile,setProfile] =useState()
    const [loading,setLoading] = useState(true)
    const changeProfile = (keyName, value) => {
        setProfile({ ...profile, [keyName]: value })
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

    const unsuccess=(msg)=>{
        console.log(msg);
        setLoading(false)
    }
    const editSuccess=()=>{
        Alert.alert("Edit Profile",
        "Edit Success",
        [
            { text: "OK", onPress: () =>  navigation.navigate({
                name: 'Profile',
            })}
        ]);
        setLoading(false)
    }
    const getUserSuccess =(doc)=>{
        setdocID(doc.id)
        setProfile(doc.data())
        setLoading(false)
    }
    const uploadPhotoSuccess=()=>{
        UserModel.updateUserById(docID,profile,editSuccess,unsuccess)
    }
    const onEditProfile=()=>{
        setLoading(true)
        // console.log(docID);
        // console.log(profile);
        //UserModel.updateUserById(docID,profile,editSuccess,unsuccess)
        StorageModel.uploadImage(profile.profileImg,profile.email,uploadPhotoSuccess,unsuccess)
    }
    useEffect(()=>{
        const emailCurrentUser=AuthModel.getCurrentUser().email
        UserModel.getUserByEamil(emailCurrentUser,getUserSuccess,unsuccess)
    },[])

    if(loading){
        return(
            <Loading/>
        )
    }
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:myColor.primary}}>
            <Text>EditProfile</Text>
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
                text="first name"
                setTextInput={{
                    value: profile.fristName,
                    onChangeText: (text) => changeProfile("fristName", text),
                }}
            />
            <TextBox 
                text="last name"
                setTextInput={{
                    value: profile.lastName,
                    onChangeText: (text) => changeProfile("lastName", text),
                }}
            />

            <CreateButton
                text="Save"
                color={myColor.success}
                styles={{width:100}}
                funOnPress={() => onEditProfile()}
            />
            
            <CreateButton
                text="Cancel"
                color={myColor.error}
                styles={{width:100}}
                funOnPress={() => navigation.navigate({
                    name: 'Profile',
                })}
            />
        </View>
    )
}