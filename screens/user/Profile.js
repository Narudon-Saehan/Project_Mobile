import { useEffect, useState } from "react"
import { View,Text,Image, TouchableOpacity } from "react-native"
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel" 
import { myColor } from "../../component/myColor"

export const Profile=({navigation})=>{
    const [profile,setProfile] = useState()
    const [loading,setLoading] = useState(true)
    const unsuccess=(msg)=>{
        console.log(msg);
    }
    const success =(doc)=>{
        console.log(doc.data());
        setProfile(doc.data())
        setLoading(false)
    }
    const signoutSuccess = () => {
        navigation.navigate('Login')
    }
    
    const onSignoutPress = () => {
        console.log('Logout now')
        AuthModel.signOut(signoutSuccess,unsuccess)
    }
    useEffect(()=>{
        let emailCurrentUser="test";
        emailCurrentUser=AuthModel.getCurrentUser().email
        UserModel.getUserByEamil(emailCurrentUser,success,unsuccess)
    },[])
    if(loading){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>Loading....</Text>
            </View>
        )
    }
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:30,marginBottom:10}}>Profile</Text>
            <Image 
                style={{width: 150,height: 150,resizeMode: 'cover',borderRadius: 150,}}
                source={{uri:profile.profileImg}}
            ></Image>
            <Text>{profile.fristName} {profile.lastName}</Text>

            <TouchableOpacity
                style={{width:100,backgroundColor:myColor.accent,padding:10,justifyContent:"center",alignItems:"center",borderRadius:10,marginBottom:20}}
                onPress={()=>navigation.navigate({
                    name: 'EditProfile',
                })}
            >
                <Text>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{width:100,backgroundColor:myColor.error,padding:10,justifyContent:"center",alignItems:"center",borderRadius:10}}
                onPress={()=>onSignoutPress()}
            >
                <Text>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    )
}