
import { View,Image,Text, TouchableOpacity } from "react-native"
import { myColor } from "./myColor"
import { myFont } from "./myFont"
import { Feather,FontAwesome } from '@expo/vector-icons';
import { CreateButton } from "./forms";

export const Card = (props,{navigation}) => {
    /// img={"url"}  title  creator  like imgCreator onLike
    return (
        <View style={{ width: "100%", marginBottom: 10,...props.mainStyle }}>
                <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: myColor.neutral, borderRadius: 20,borderWidth:1,...props.mainStyle}}>
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
                        <TouchableOpacity
                            onPress={()=>props.toCreatorProfile(props.creatorId)}
                        >
                            <Image 
                                style={{width:50,height:50,borderRadius:50,marginRight:10}}
                                source={{uri:props.imgCreator}}
                            />
                        </TouchableOpacity>
                        <View style={{flex:1}}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>{props.title}</Text>
                                <TouchableOpacity
                                    onPress={()=>props.onLike(props.docIdPost,props.docIdUser,!props.userLike)}
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

export const FollowCard = (props) => {
    return(
        <View style={{flex:1,width:"100%"}}>              
            <View style={{ backgroundColor:myColor.neutral,
                borderRadius:20,
                paddingHorizontal:10,
                paddingVertical:10,
                marginHorizontal:10,
                marginTop:10,
                marginBottom:5,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                ...props.Styles,
            }}>
                <Image
                    style={{width:60,
                        height:60,
                        borderRadius:50,
                        marginRight:10,
                        ...props.iStyles,
                    }}
                    source={{uri:"https://firebasestorage.googleapis.com/v0/b/project-mobile-ea735.appspot.com/o/profile_image%2Fuser.jpg?alt=media&token=f28170a0-1d7f-42aa-8c49-7207ab17feb7"}}
                />
                <Text style={[myFont.h11,{flex:3,...props.nameTextStyles}]}>
                    {props.nameText}
                </Text>
                {props.checkSelfFollower===props.nameText?
                    <View style={{width:80,height:30,margin:10,}}/>
                    :
                    <TouchableOpacity
                        style={{width:80,
                            height:30,
                            backgroundColor:props.color,
                            borderRadius:10,
                            borderColor:props.TborderColor,
                            borderWidth:props.TborderWidth,
                            justifyContent:"center",
                            alignItems:"center",
                            margin:10,
                        }}
                        onPress={props.funOnPress}
                        {...props.setButton}
                    >
                        <Text
                            style={[props.pStyle,{
                                ...props.textStyles
                            }]}
                        >{props.text}</Text>
                    </TouchableOpacity>
                }
                {/* <TouchableOpacity
                    style={{width:80,
                        height:30,
                        backgroundColor:props.color,
                        borderRadius:10,
                        borderColor:props.TborderColor,
                        borderWidth:props.TborderWidth,
                        justifyContent:"center",
                        alignItems:"center",
                        margin:10,
                    }}
                    onPress={props.funOnPress}
                    {...props.setButton}
                >
                    <Text
                        style={[props.pStyle,{
                            ...props.textStyles
                        }]}
                    >{props.text}</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}