import { View,Text,TouchableOpacity,Image, Alert } from "react-native"
import { myColor } from "../../component/myColor"
import { TextBox,CreateButton } from "../../component/forms"
import { useState,useEffect } from "react"
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel" 
import * as ImagePicker from 'expo-image-picker';
import * as StorageModel from "../../firebase/storageModel"
import {FrameLayout} from "../../component/frame"
import { Loading } from "../Loading"
import {myFont} from "../../component/myFont"

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
    const uploadPhotoSuccess=(email,url)=>{
        UserModel.updateUserById(docID,{...profile,profileImg:url},editSuccess,unsuccess)
    }
    const onEditProfile=()=>{
        setLoading(true)
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
        <FrameLayout >
            <View style={{flex:1,justifyContent:"center",alignItems:"center",paddingHorizontal:10}}>
                {/* <Text>EditProfile</Text> */}
                <Image 
                    style={{width: 150,height: 150,resizeMode: 'cover',borderRadius: 150,borderWidth: 2,
                    borderColor: "white",}}
                    source={{uri:profile.profileImg}}
                ></Image>
                <CreateButton
                    text="Upload"
                    color={myColor.secondary}
                    funOnPress={() => openImagePickerAsync()}
                    pStyle={myFont.h9}
                    styles={{width:100,
                        height:30,
                        padding:0,}}
                />

                <TextBox 
                    text="First Name"
                    setTextInput={{
                        value: profile.fristName,
                        onChangeText: (text) => changeProfile("fristName", text),
                    }}
                    pStyle={myFont.h7}
                    mainStyle={{paddingBottom:0}}
                />
                <TextBox 
                    text="Last Name"
                    setTextInput={{
                        value: profile.lastName,
                        onChangeText: (text) => changeProfile("lastName", text),
                    }}
                    pStyle={myFont.h7}
                />

                <CreateButton
                    text="Save"
                    color={myColor.primary}
                    styles={{width:100,
                        height:30,padding:0}}
                    funOnPress={() => onEditProfile()}
                    pStyle={myFont.h9}
                />
                
                <CreateButton
                    text="Cancel"
                    color={myColor.error}
                    styles={{width:100,
                        height:30,
                        padding:0,
                        margin:0
                    }}
                    funOnPress={() => navigation.navigate({
                        name: 'Profile',
                    })}
                />
        </View>
            
            
        </FrameLayout>

    )
}