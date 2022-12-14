
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
                            <View style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"flex-end" }}>
                                <View style={{flex:5}}>
                                    <Text>{props.title.substring(0,50)}{props.title.length>40?"...":""} </Text>
                                    <Text>by:{props.creator}</Text>
                                </View>

                                <View style={{flex:1,justifyContent:"flex-end",alignItems:"center"}}>
                                    {props.userLike?
                                        <FontAwesome name="heart" size={24} color={myColor.error} />
                                        :
                                        <Feather name="heart" size={24} color="black" />
                                    }
                                    <Text>like:{props.like}</Text>
                                </View>
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
                    source={{uri:props.uriProfile}}
                />
                <Text style={[myFont.h11,{flex:3,...props.nameTextStyles}]}>
                    {props.nameText}
                </Text>
                <View style={{width:80,height:30,margin:10,}}/>
                {/* {props.checkSelfFollower===props.nameText?
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
                } */}
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