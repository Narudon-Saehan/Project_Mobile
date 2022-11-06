import { useEffect, useState } from "react"
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native"
import { myColor } from "../../component/myColor"

import * as PostModel from "../../firebase/postModel" 
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel" 

import { Card } from "../../component/card"
import { Loading } from "../Loading"
import { myFont } from "../../component/myFont"
import { FrameLayout } from "../../component/frame"
export const Home = ({ navigation }) => {
    //console.log("555");
    const [post,setPost] = useState({data:[]})
    const [profile,setProfile] = useState()
    const [loading,setLoading] = useState(true)
    const [loading2,setLoading2] = useState(true)
    const renderItem = ({ item, index }) => {
        //console.log("renderItem",item.id);
        const checkUserLike = profile.likedPosts.find(data => data === item.id) !== undefined
        //console.log("checkUserLike",checkUserLike);
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
                    creator={item.creator.fristName + " " +item.creator.lastName}
                    imgCreator={item.creator.profileImg } 
                    like={item.like} 
                    onLike={onLike}
                    docIdUser={profile.id}
                    docIdPost={item.id}
                    userLike={checkUserLike}
                />
            </TouchableOpacity>
            // <View key={index} style={{ width: "100%", marginBottom: 10 ,marginTop:(index===0)?10:0}}>
            //     <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: myColor.neutral, borderRadius: 20 }}>
            //         <Image
            //             style={{ width: "100%", height: 150, resizeMode: 'cover', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            //             source={{ uri: item.img }}
            //         ></Image>
            //         <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            //             <Text>{item.title}</Text>
            //             <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            //                 <Text>by:{item.creator}</Text>
            //                 <Text>like:{item.like}</Text>
            //             </View>
            //         </View>
            //     </View>
            // </View>
        )
    }
    const onLike=(docIdUser,docIdPost,likeAndUnlike)=>{
        UserModel.updateLikedPosts(docIdUser,docIdPost,likeAndUnlike,unsuccess,unsuccess)
    }
    const unsuccess=(msg)=>{
        console.log(msg);
    }
    const success= (dataPost)=>{

        console.log(dataPost);
        let creator
        //setLoading(false)
        // dataPost.map((data)=>{
        //     console.log( data.creator);
        //     console.log( data.creator.user);
        // })
        // let newPost = post;
        //  (dataPost.map(async(data,index)=>{
        //     creator = await data.creator.get()
        //     //newPost = post;
        //     console.log(creator.data());
        //     //newPost[index].creator = creator.data()
        //     //setPost(newPost)
        // }))
        let newPost =  dataPost;
        dataPost.map( async(data,index)=>{
            creator = await data.creator.get()
            .then((doc)=>{
                newPost[index] = {...newPost[index],creator:doc.data()}
                setPost({data:newPost})
            })
            //     ((data)=>{
            //     //console.log(data.data());
            //     delete data.data().likedPosts;
            //     newPost[index] = {...newPost[index],creator:data.data()}
            //     setPost({data:newPost})
            // })
            // newPost[index] = {...newPost[index],creator:creator.data()}
            // setPost({data:newPost})
            //console.log(data.creator);
        })

        setPost(dataPost)   
        setLoading(false) 
    }
    const getUserSuccess=(doc)=>{
        let dataUser = doc.data()
        let likedPosts=[]
        dataUser.likedPosts.map((data)=>{
            //console.log(data._delegate._key.path.segments[6]);
            likedPosts.push(data._delegate._key.path.segments[6])
        })
        dataUser.likedPosts = likedPosts
        //console.log(dataUser);
        setProfile({...dataUser,id:doc.id})
        setLoading2(false)
    }
    useEffect(()=>{
        PostModel.getAllPost(success,unsuccess)
        const emailCurrentUser=AuthModel.getCurrentUser().email
        UserModel.getUserByEamil(emailCurrentUser,getUserSuccess,unsuccess)
    },[])
    if(loading || loading2){
        return(
            <Loading/>
        )
    }
    return (
        <FrameLayout>

                <View style={{backgroundColor:myColor.neutral4,width:"100%",paddingHorizontal:20,paddingTop:10,paddingBottom:30}}>
                    <View style={{ backgroundColor: myColor.neutral3, borderRadius: 20,paddingHorizontal:10,paddingVertical:10}}>
                            <Text style={[myFont.h3,{color:myColor.neutral2}]}>Hello</Text>
                            <Text style={[myFont.h7,{color:myColor.neutral2}]}>{profile?.fristName} {profile?.lastName}</Text>
                    </View>
                </View>
                    <FlatList
                        data={post.data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        // ItemSeparatorComponent={() => (<Divider />)}
                        // ListEmptyComponent={headleEmpty}
                    >
                    </FlatList>
            </FrameLayout>
            


        // <View style={{ flex: 1, backgroundColor: myColor.primary }}>
        //     <View style={{flex:1,paddingHorizontal:10}}>
        //         <View style={{flex:1,backgroundColor:myColor.neutral4}}>
        //             <View style={{backgroundColor:myColor.neutral4,width:"100%",paddingHorizontal:20,paddingTop:10,paddingBottom:30}}>
        //                 <View style={{ backgroundColor: myColor.neutral3, borderRadius: 20,paddingHorizontal:10,paddingVertical:10}}>
        //                     <Text style={[myFont.h3,{color:myColor.neutral2}]}>Hello</Text>
        //                     <Text style={[myFont.h7,{color:myColor.neutral2}]}>Narudon Saehan</Text>
        //                 </View>
        //             </View>
        //             <FlatList
        //                 data={post.data}
        //                 renderItem={renderItem}
        //                 keyExtractor={(item) => item.id}
        //                 // ItemSeparatorComponent={() => (<Divider />)}
        //                 // ListEmptyComponent={headleEmpty}
        //             >
        //             </FlatList>
        //         </View>
        //     </View>
        // </View>
    )
}