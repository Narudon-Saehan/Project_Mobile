import { View,Text,Image } from "react-native"
import { myColor } from "../component/myColor"
export const Loading =()=>{
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:myColor.primary}}>
            <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/project-mobile-ea735.appspot.com/o/profile_image%2Ftumblr_mszaqvAGZ01rgpyeqo1_250.gif?alt=media&token=2e4a5d31-6f34-47bd-8d35-cfb6ab33d241'}}
                style = {{width:'100%',height:'60%'}}
            />
        </View>
    )
}