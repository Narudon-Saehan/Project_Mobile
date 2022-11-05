import { View,Text,Image } from "react-native"
import { myColor } from "../component/myColor"
export const Loading =()=>{
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:myColor.primary}}>
            <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/project-mobile-ea735.appspot.com/o/profile_image%2F93533501-53aa0d80-f943-11ea-90d1-e6e70eca2e29.gif?alt=media&token=f8445a5c-0f21-409c-9104-7d78d43b70f8'}}
                style = {{width:'70%',height:'70%'}}
            />
        </View>
    )
}