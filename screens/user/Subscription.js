import { View,Text } from "react-native"

import * as PostModel from "../../firebase/postModel" 
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel" 


export const Subscription=()=>{
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>Subscription</Text>
        </View>
    )
}