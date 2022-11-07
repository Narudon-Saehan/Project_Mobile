import { View,Text, Image } from "react-native"
import { CreateButton } from "../../component/forms"
import { FrameLayout } from "../../component/frame"
import { myColor } from "../../component/myColor"
import { myFont } from "../../component/myFont"


export const Following=(props)=>{
    return(
            <View style={{flex:1,width:"100%"}}>              
                <View style={{ backgroundColor:myColor.neutral,
                    borderRadius:20,
                    paddingHorizontal:10,
                    paddingVertical:10,
                    margin:10,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                    <Image
                        style={{width:60,
                            height:60,
                            borderRadius:50,
                            marginRight:10,
                            borderWidth:4,borderColor:'black'
                        }}
                        source={{uri:"https://firebasestorage.googleapis.com/v0/b/project-mobile-ea735.appspot.com/o/profile_image%2Fuser.jpg?alt=media&token=f28170a0-1d7f-42aa-8c49-7207ab17feb7"}}
                    />
                    <Text style={[myFont.h8,{}]}>
                        Sapol Mahawong
                    </Text>
                    <CreateButton
                        text="Follower"
                        color={myColor.primary}
                        styles={{width:100,height:30,padding:0}}
                        pStyle={myFont.h9}
                    />
                </View>
            </View>
    )
}