import { View,Text,Image } from "react-native"
import { myColor } from "../component/myColor"
export const Loading =()=>{
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:myColor.primary}}>
            <Image source={{uri:'https://flevix.com/wp-content/uploads/2019/08/Loading-Image-1.gif'}}
                style = {{width:'70%',height:'70%'}}
            />
        </View>
    )
}