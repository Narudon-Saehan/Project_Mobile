
import { View,Image,Text, TouchableOpacity } from "react-native"
import { myColor } from "./myColor"
import { myFont } from "./myFont"
import { Feather,FontAwesome } from '@expo/vector-icons';
export const Card = (props) => {
    /// img={"url"}  title  creator  like imgCreator onLike
    return (
        <View style={{ width: "100%", marginBottom: 10 }}>
                <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: myColor.neutral, borderRadius: 20,borderWidth:1}}>
                    {props.img===""?
                    <View
                        style={{ width: "100%", height: 150, borderTopLeftRadius: 20, borderTopRightRadius: 20,justifyContent:"center",alignItems:"center",backgroundColor:myColor.neutral3 }}
                    >
                        <Text style={{...myFont.h1}}>{props.title}</Text>
                    </View>
                    :
                    <Image
                        style={{ width: "100%", height: 150, resizeMode: 'cover', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                        source={{ uri: props.img }}
                    ></Image>
                    }

                    <View style={{flexDirection:"row", paddingLeft: 20, paddingRight: 20,padding:5,alignItems:"center" }}>
                        <Image 
                            style={{width:50,height:50,borderRadius:50,marginRight:10}}
                            source={{uri:props.imgCreator}}
                        />
                        <View style={{flex:1}}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>{props.title}</Text>
                                <TouchableOpacity
                                    onPress={()=>props.onLike(props.docIdUser,props.docIdPost,!props.userLike)}
                                >
                                    {props.userLike?
                                        <FontAwesome name="heart" size={24} color={myColor.error} style={{marginRight:5}}/>
                                    :
                                        <Feather name="heart" size={24} color="black" style={{marginRight:5}} />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>by:{props.creator}</Text>
                                <Text>like:{props.like}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
    )
}