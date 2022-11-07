import { useEffect, useState } from "react"
import { View, Text, Image, FlatList, TouchableOpacity, Button } from "react-native"
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
    const [docIdCreator,setDocIdCreator] = useState([])
    const [profileCreator,setProfileCreator] = useState({data:[]})
    const [loading,setLoading] = useState(true)
    const [loading2,setLoading2] = useState(true)
    const renderItem = ({ item, index }) => {
        //console.log("renderItem",item.id);
       // console.log("renderItem",item.creator);
        const checkUserLike = item.likeFromId.find(data => data === profile.id) !== undefined
        //let creator = {fristName:"",lastName:"",profileImg:"#"}
        let creator = profileCreator.data.find(data => data.docId === item.creator)
        //console.log(findCreator);
        // if(findCreator !== undefined)
        //     creator = findCreator
        //console.log(profileCreator.data.find(data => data.docId === item.creator));
        //profileCreator.data.find(data => data.docId === item.creator)
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
                    creator={creator.fristName+ " " +creator.lastName}
                    creatorId={creator.docId}
                    imgCreator={creator.profileImg } 
                    like={item.likeFromId.length} 
                    onLike={onLike}
                    docIdUser={profile.id}
                    docIdPost={item.id}
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

    const onLike=(docIdPost,docIdUser,likeAndUnlike)=>{
        //UserModel.updateLikedPosts(docIdUser,docIdPost,likeAndUnlike,unsuccess,unsuccess)
        PostModel.updateLikeFromIdPost(docIdPost,docIdUser,likeAndUnlike,unsuccess,unsuccess)
    }
    const unsuccess=(msg)=>{
        console.log(msg);
    }
    const success= (dataPost)=>{

        //console.log(dataPost);
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
        let newProfileCreator = profileCreator.data;
        let checkNewCreator = false;
        dataPost.map((data,index)=>{
            newPost[index] = {...newPost[index],creator:data.creator._delegate._key.path.segments[6]}
            let likeFromId =[]
            data.likeFromId.map((item)=>{
                likeFromId.push(item._delegate._key.path.segments[6])
            })
            newPost[index].likeFromId = likeFromId
            //console.log(likeFromId);
            //console.log(data.creator._delegate._key.path.segments[6]);
            if (newProfileCreator.find((item)=>item.docId === data.creator._delegate._key.path.segments[6]) === undefined){
                checkNewCreator = true;
                newProfileCreator.push({docId:data.creator._delegate._key.path.segments[6],fristName:"",lastName:"",profileImg:"#",get:false})
                //UserModel.getCreatorByDocID(data.creator._delegate._key.path.segments[6],getCreatorSuccess,unsuccess)
            }
            //     //console.log(data._delegate._key.path.segments[6]);
            //     likedPosts.push(data._delegate._key.path.segments[6])
            // })
            // creator = await data.creator.get()
            // .then((doc)=>{
            //     newPost[index] = {...newPost[index],creator:doc.data()}
            //     setPost({data:newPost})
            // })
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
        //console.log("newPost",newPost);
        setPost({data:newPost})
        if(checkNewCreator) {
            setProfileCreator({data:newProfileCreator})
            getNewCreator(newProfileCreator)
        }
        setLoading(false) 
    }
    const getCreatorSuccess=(doc)=>{
        //console.log("getCreatorSuccess",profileCreator.data.findIndex((data)=>data.docId === doc.id)); 
        let indexCreator = profileCreator.data.findIndex((data)=>data.docId === doc.id)
        let newProfileCreator = profileCreator.data
        newProfileCreator[indexCreator].fristName = doc.data().fristName
        newProfileCreator[indexCreator].lastName = doc.data().lastName
        newProfileCreator[indexCreator].profileImg = doc.data().profileImg
        setProfileCreator({data:newProfileCreator})
        //setProfileCreator({data:[...profileCreator.data,{...doc.data(),docId:doc.id}]})
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
    const getNewCreator=(newProfileCreator)=>{
        newProfileCreator.map((data)=>{
            if(data.fristName===""){
                UserModel.getCreatorByDocID(data.docId,getCreatorSuccess,unsuccess)
            }
        })
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