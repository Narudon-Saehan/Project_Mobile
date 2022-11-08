import { View,Text,FlatList,TouchableOpacity } from "react-native"
import {myColor} from "../../component/myColor"
import {myFont} from '../../component/myFont'
import { TextBox,CreateButton} from "../../component/forms"
import { useState,useEffect } from "react"
import { useSelector } from "react-redux"

import * as PostModel from "../../firebase/postModel" 
import * as UserModel from "../../firebase/userModel" 


import { Card } from "../../component/card"
import { Loading } from "../Loading"
export const Search=()=>{
    const docIdUserLogin = useSelector((state) => state.todos.docIdUser)
    const [search,setSearch] = useState("")
    const [posts,setPosts] = useState({data:[]})
    const [profileCreator,setProfileCreator] =useState({data:[]})
    const [profile,setProfile] = useState()
    const [loading,setLoading] =useState(true)

    const unsuccess=(msg)=>{
        console.log(msg);
    }
    const getPostSuccess=(posts)=>{
        console.log(posts);
        let newProfileCreator = profileCreator.data;
        let checkNewCreator = false;
        setPosts({data:posts})
        //setLoading(false)
    }
    const getProfileSuccess=(doc)=>{
        console.log(doc.data());
        setProfile({...doc.data(),docId:doc.id})
        setLoading(false)
    }
    const renderItem = ({ item, index }) => {
        const checkUserLike = item.likeFromId.find(data => data === profile.id) !== undefined
        //let creator = profileCreator.data.find(data => data.docId === item.creator)
        return (
            <TouchableOpacity 
                key={index}
                onPress={()=>navigation.navigate({
                    name:"Details",
                    params:{postId:item.id},
                })} 
            >
                <Card 
                    key={index} 
                    img={item.images.length===0?"":item.images[0]}  
                    title={item.title}  
                    creator={"creator.fristName"+ " " +"creator.lastName"}
                    creatorId={"creator.docId"}
                    imgCreator={"creator.profileImg" } 
                    like={item.likeFromId.length} 
                    userLike={checkUserLike}
                    toCreatorProfile={toCreatorProfile}
                />
            </TouchableOpacity>
        )
    }
    const toCreatorProfile=(docIdUser)=>{
        navigation.navigate({
            name:"CreatorProfile",
            params:docIdUser
        })
    }
    const toSearch=()=>{
        PostModel.getAllPostByTitle(search,getPostSuccess,unsuccess)
    }
    useEffect(()=>{
        UserModel.getUserByDocID2(docIdUserLogin,getProfileSuccess,unsuccess)
    },[])
    if(loading){
        return(
            <Loading/>
        )
    }
    return(
        <View style={{flex:1,alignItems:"center",backgroundColor:myColor.primary,paddingHorizontal:10}}>
            {/* <Text>Search</Text> */}
                <TextBox
                    text="Search"
                    mainStyle={{paddingBottom:0}}
                    textStyles={{color:myColor.neutral2,fontWeight:'bold'}}
                    setTextStyles={{alignSelf:'center'}}
                    pStyle={myFont.h2}
                    TStyles={{borderRadius: 30}}
                    setTextInput={{
                        value:search,
                        onChangeText: (text) => setSearch(text),
                    }}
                />
                <CreateButton
                    text="Search"
                    color={myColor.accent}
                    styles={{marginBottom:10,borderRadius:30,width:"25%"}}
                    pStyle={myFont.h9}
                    textStyles={{color:myColor.neutral2,fontWeight:'bold'}}
                    funOnPress={() => toSearch()}
                />
            <View style={{width:"100%",backgroundColor:myColor.neutral4,borderRadius:10,paddingHorizontal:10,paddingVertical:10}}>
            <Text>HHH</Text><Text>HHH</Text><Text>HHH</Text><Text>HHH</Text><Text>HHH</Text>
            </View>
            <FlatList
                data={posts.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                >
            </FlatList>
        </View>
    )
}