import { useEffect, useState } from "react";
import {View, Text,Image,ScrollView} from "react-native"

import * as UserModel from "../../firebase/userModel" 
import * as PostModel from "../../firebase/postModel"
import { myColor } from "../../component/myColor";
import { Loading } from "../Loading";
import { myFont } from "../../component/myFont";
import { TextBox,CreateButton } from "../../component/forms";
const tmpData = [
    {
        id:0,
        title: "Test",
        img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
        creator: "Narudon Saehan",
        like: 10,
    },
]

export const Details = ({ route}) => {
    const {postId} =  route.params
    const [creator,setCreator] = useState()
    const [post,setPost] = useState()
    const [loading,setLoading] = useState(true)
    const unsuccess=(err)=>{
        console.log(err);
    }
    const success=(doc)=>{
        //console.log(doc.data());
        setPost(doc.data())
        setLoading(false)

    }

    const renderItem = ( item, index ) => {
        return (
            <View key={index} style={{ width: "100%", marginBottom: 10 ,marginTop:(index===0)?10:0}}>
                <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: myColor.neutral, borderRadius: 20 }}>
                    <Image
                        style={{ width: "100%", height: 150, resizeMode: 'cover', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                        source={{ uri: item.img }}
                    ></Image>
                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Text>{item.title}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>by:{item.creator}</Text>
                            <Text>like:{item.like}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    useEffect(()=>{
        PostModel.getPostById(postId,success,unsuccess)
    },[])
    if(loading){
        return <Loading/>
    }
    return (
        <View style={{ flex: 1, backgroundColor: myColor.primary }}>
            <ScrollView style={{flex:1}}>
                <View style={{flex:1,paddingHorizontal:0}}>
                    <View>
                    {tmpData.map((data,index)=>{
                        return(
                            renderItem(data,index)
                        )
                    })}
                    </View>
                    <View style={{flex:1,
                        backgroundColor:myColor.neutral4,
                        marginHorizontal:0,
                        borderTopStartRadius:20,
                        borderTopEndRadius:20,
                        paddingHorizontal:10,
                        marginHorizontal:20,
                        paddingTop:10
                        }}>
                        <Text style={[myFont.h7,{}]}>Description</Text>
                        {tmpData.map((data,index)=>{
                            return(
                                renderItem(data,index)
                            )
                        })}
                        <View style={{flex:1,
                        backgroundColor:myColor.neutral,
                        marginHorizontal:0,
                        borderRadius:20,
                        paddingHorizontal:10,
                        marginHorizontal:20,
                        paddingTop:10
                        }}>
                            <Text style={[myFont.h9,{}]}>Description</Text>
                        </View>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                        <Text>GGGGGG</Text>
                    </View>
                </View>
            </ScrollView>
            {/* <ScrollView style={{flex:1}}> */}
                {/* {tmpData.map((data,index)=>{
                    return(
                        renderItem(data,index)
                    )
                })} */}
            {/* <View style={{flex:1,paddingHorizontal:10}}>
                <View style={{flex:1,backgroundColor:myColor.neutral4}}>
                </View>
            </View> */}
            {/* </ScrollView> */}
        </View>
        // <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        //     <Text>{post.title}</Text>
        //     <Text>{post.selectId}</Text>
        //     <Text>{post.description}</Text>
        //     <Image
        //         style={{width:100,height:100,resizeMode:"contain"}}
        //         source={{uri:post.images[0]}}
        //     ></Image>
        // </View>

        // <ScrollView style={{flex:1}}>
        // <Text style={{...myFont.h2}}>Sample Post</Text>
        // <Card 
        //     img={imgs.data.length===0?"":imgs.data[0].url}  
        //     title={post.title}  
        //     creator={profile.fristName + " " + profile.lastName}   
        //     imgCreator={profile.profileImg}
        //     like={0} 
        // />
        // </ScrollView>
    )
}