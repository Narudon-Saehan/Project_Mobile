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
    const getCreatorSuccess=(doc)=>{
        let indexCreator = profileCreator.data.findIndex((data)=>data.docId === doc.id)
        let newProfileCreator = profileCreator.data
        newProfileCreator[indexCreator].fristName = doc.data().fristName
        newProfileCreator[indexCreator].lastName = doc.data().lastName
        newProfileCreator[indexCreator].profileImg = doc.data().profileImg
        setProfileCreator({data:newProfileCreator})
    }
    const getPostSuccess=(dataPost)=>{
        console.log(dataPost);
        let newPost =  dataPost;
        let newProfileCreator = profileCreator.data;
        let checkNewCreator = false;
        dataPost.map((data,index)=>{
            newPost[index] = {...newPost[index],creator:data.creator._delegate._key.path.segments[6]}
            let likeFromId =[]
            data.likeFromId.map((item)=>{
                likeFromId.push(item._delegate._key.path.segments[6])
            })
            newPost[index].likeFromId = likeFromId
            if (newProfileCreator.find((item)=>item.docId === data.creator._delegate._key.path.segments[6]) === undefined){
                checkNewCreator = true;
                newProfileCreator.push({docId:data.creator._delegate._key.path.segments[6],fristName:"",lastName:"",profileImg:"#",get:false})
            }
        })

        setPosts({data:newPost})
        if(checkNewCreator) {
            setProfileCreator({data:newProfileCreator})
            getNewCreator(newProfileCreator)
        }
        //setLoading(false)
    }
    const getProfileSuccess=(doc)=>{
        console.log(doc.data());
        setProfile({...doc.data(),docId:doc.id})
        setLoading(false)
    }
    const getNewCreator=(newProfileCreator)=>{
        newProfileCreator.map((data)=>{
            if(data.fristName===""){
                UserModel.getCreatorByDocID(data.docId,getCreatorSuccess,unsuccess)
            }
        })
    }
    const renderItem = ({ item, index }) => {
        const checkUserLike = item.likeFromId.find(data => data === profile.id) !== undefined
        let creator = profileCreator.data.find(data => data.docId === item.creator)
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
                    creator={creator.fristName+ " " +creator.lastName}
                    creatorId={creator.docId}
                    imgCreator={creator.profileImg} 
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
            {/* <View style={{width:"100%",backgroundColor:myColor.neutral4,borderRadius:10,paddingHorizontal:10,paddingVertical:10}}>
            <Text>HHH</Text><Text>HHH</Text><Text>HHH</Text><Text>HHH</Text><Text>HHH</Text>
            </View> */}
            <View style={{flex:1,width:"100%"}}>
            <FlatList
                data={posts.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                >
            </FlatList>
            </View>
        </View>
    )
}