import { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native"
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel"
import * as PostModel from "../../firebase/postModel"
import { myColor } from "../../component/myColor"
import { myFont } from '../../component/myFont'
import { Feather } from '@expo/vector-icons';

import { Card, FollowCard } from "../../component/card"
import { useSelector } from 'react-redux'

export const Profile = ({ navigation,route }) => {
    const routeName = route.name
    const docIdUserLogin = useSelector((state) => state.todos.docIdUser)
    const [profile, setProfile] = useState()
    const [checkFollower, setCheckFollower] = useState(false)
    const [likeAll, setLikeAll] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    const [post, setPost] = useState([])
    const [following, setFollowing] = useState({data:[]})

    const [pageBar,setPageBar] = useState("Post")
    const [pageFollowing,setPageFollowing] = useState(false)
    const [pageFollower,setPageFollower] = useState(false)
    const unsuccess = (msg) => {
        console.log(msg);
    }
    // const unsuccess = (msg) => {
    //     console.log(msg);
    // }
    const getFollowingSuccess = (doc) => {
        // //console.log("getFollowingSuccess",following.data);
        // if(following.data.find((data)=>data.docId === doc.id) !== undefined){
        //     if(profile.following.find((data)=>data === docIdUserLogin)===undefined){
        //         let newFollowing = following.data
        //         let index = newFollowing.findIndex((data)=>data.docId === doc.id)
        //         newFollowing[index].splice(index, 1)
        //         setFollowing({data:newFollowing})
        //     }
        // }
        // else 
        if(following.data.find((data)=>data.docId === doc.id) === undefined){
            const {fristName,lastName,profileImg} = doc.data()
            let follower = []
            let newFollowing = following.data
            doc.data().following.map((data)=>{
                follower.push(data._delegate._key.path.segments[6])
            })
            newFollowing.push({docId:doc.id,fristName,lastName,profileImg,following:follower})
            setFollowing({data:newFollowing})
        }
    }
    const getPostSuccess = (posts) => {
        //console.log(posts);
        let templikeAll = 0
        let newPost =  posts;
        posts.map((data,index)=>{
            let likeFromId =[]
            data.likeFromId.map((item)=>{
                likeFromId.push(item._delegate._key.path.segments[6])
            })
            templikeAll += likeFromId.length
            newPost[index].likeFromId = likeFromId
        })
        setLikeAll(templikeAll)
        setPost(newPost);
    }
    // const getProfileUserLoginSuccess = (doc) => {
    //     let tempFollowing = []
    //     doc.data().following.map((data)=>{
    //         tempFollowing.push(data._delegate._key.path.segments[6])
    //     })
    //     if(tempFollowing.find((data)=>data === route.params)!== undefined)
    //         setCheckFollower(true)
    //     else
    //         setCheckFollower(false)
    //     //console.log("getProfileUserLoginSuccess");
    //     //setCheckFollower({...doc.data(),docId:doc.id})
    //     setLoading2(false)
    // }
    const success = (doc) => {
        //console.log("success",doc.data().following);
        let tempFollowing = []
        doc.data().following.map((data)=>{
            tempFollowing.push({docId:data._delegate._key.path.segments[6],fristName:"",lastName:"",profileImg:"#",following:[]})
        })
        if(tempFollowing.find((data)=>data.docId === docIdUserLogin)!== undefined)
            setCheckFollower(true)
        else
            setCheckFollower(false)
        
        PostModel.getAllPostByCreator(doc.id, getPostSuccess, unsuccess)
        //setFollowing({data:[]})
        getDataFollowing(tempFollowing)
        setProfile({...doc.data(),docId:doc.id,following:tempFollowing})
        setLoading(false)
    }
    const getDataFollowing = (tempFollowing)=>{
        console.log(tempFollowing);
        tempFollowing.map((data)=>{
            if(following.data.find((data)=>data.docId === data) === undefined)
                UserModel.getUserByDocID2(data.docId,getFollowingSuccess,unsuccess)
            console.log(data.docId);
        })
    }
    const toCreatorProfile=(docIdUser)=>{
        //console.log(docIdUser);
        navigation.navigate({
            name:"CreatorProfile",
            params:docIdUser
        })
    }

    const signoutSuccess = () => {
        navigation.navigate('Login')
    }

    const onSignoutPress = () => {
        console.log('Logout now')
        AuthModel.signOut(signoutSuccess, unsuccess)
    }
    const onFollowingPress = () => {
        UserModel.updateFollowing(profile.docId,docIdUserLogin,!checkFollower,unsuccess,unsuccess)
        //AuthModel.signOut(signoutSuccess, unsuccess)
    }

    const pageBarOptions = () => {
        if (pageBar === "Post") {
            return(<>
            {post.length!=0?
                post.map((data, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={()=>navigation.navigate({
                                name:"Details",
                                params:{postId:data.id},
                            })} 
                        >
                            <Card
                                key={index}
                                img={data.images.length === 0 ? "" : data.images[0]}
                                mainStyle={{marginTop:7,marginBottom:1}}
                                title={data.title}
                                creator={profile.fristName + " " + profile.lastName}
                                creatorId={profile.docId}
                                imgCreator={profile.profileImg}
                                like={data.likeFromId.length}
                                userLike={data.likeFromId.find((data)=>data === docIdUserLogin)!==undefined}
                                toCreatorProfile={toCreatorProfile}
                            />
                        </TouchableOpacity>
                    )
                })
            :
                <View style={{flex:1,height:250,justifyContent:"center",alignItems:"center"}}>
                    <Text style={[myFont.h5,{fontWeight:'bold'}]}>Wanna try something to post?</Text>
                </View>
            }
            </>)
        }else if(pageBar === "Following"){
            return(
                <>
                    {profile.following.map((data,index)=>{
                        //console.log("tempProfile",data);
                        let tempProfile = data
                        if(following.data.find((item) =>item.docId === data.docId ) !== undefined){
                            tempProfile = following.data.find((item) =>item.docId === data.docId )
                        }
                        console.log("tempProfile",tempProfile);
                        console.log(docIdUserLogin);
                        return(
                            <FollowCard
                                key={index}
                                nameText={tempProfile.fristName+" "+tempProfile.lastName}
                                //text={(tempProfile.docId === docIdUserLogin)?"ME":(tempProfile.following.find((data)=>data === docIdUserLogin) === undefined)?"not follower":"follower"}
                                //text={"temp"}
                                color={myColor.primary}
                                pStyle={myFont.h10}
                            />
                        )
                    })}
                    {/* <FollowCard
                        nameText="Narudon Saehan"
                        text="Follower"
                        color={myColor.primary}
                        pStyle={myFont.h10}
                    />
                    <FollowCard
                        nameText="Narudon Saehan2"  
                        text="Following"
                        color={myColor.neutral}
                        TborderColor={myColor.primary}
                        TborderWidth={1}
                        pStyle={myFont.h10}
                    /> */}
                </>
                )
        }else if(pageBar === "Follower"){
            return(
            <>
                <FollowCard
                    checkSelfFollower="Sapol Mahawong"
                    nameText="Narudon Saehan"
                    text="Follower"
                    color={myColor.primary}
                    pStyle={myFont.h10}
                />
                <FollowCard
                    checkSelfFollower="Sapol Mahawongewhggegegegergergewgggggeg33"
                    nameText="Sapol Mahawongewhggegegegergergewgggggeg33"
                    text="Following"
                    color={myColor.neutral}
                    TborderColor={myColor.primary}
                    TborderWidth={1}
                    pStyle={myFont.h10}
                />
            </>
            )
        }
    }

    useEffect(() => {
        //console.log(route);
        if(routeName === "CreatorProfile"){
            //setLoading2(true)
            UserModel.getUserByDocID(route.params,success,unsuccess)
            //UserModel.getUserByDocID(docIdUserLogin,getProfileUserLoginSuccess,unsuccess)
        }else{
            let emailCurrentUser = AuthModel.getCurrentUser().email
            UserModel.getUserByEamil(emailCurrentUser, success, unsuccess)
        }
    }, [])
    if (loading || loading2) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading....</Text>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: myColor.primary, paddingHorizontal: 0 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 100 }}>

                </View>
                {/* <Text style={{fontSize:30,marginBottom:10}}>Profile</Text> */}
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <View style={{ flex: 1, backgroundColor: myColor.neutral4 }}>
                        <Image
                            style={{
                                width: 130,
                                height: 130,
                                borderRadius: 63,
                                borderWidth: 4,
                                borderColor: "white",
                                marginBottom: 10,
                                // alignSelf:'center',
                                position: 'absolute',
                                // marginTop:20,
                                marginHorizontal: 20,
                                marginVertical: -60,
                            }}
                            source={{ uri: profile.profileImg }}
                        ></Image>
                        <View style={{ alignItems: "flex-end", height: 70, padding: 10 }}>
                            
                            {routeName==="Profile"?
                                <>
                                <TouchableOpacity style={{
                                    width: 100,
                                    height: 30,
                                    backgroundColor: myColor.primary,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 40,

                                }}
                                    onPress={() => navigation.navigate({
                                        name: 'EditProfile',
                                    })}
                                >
                                    <Text style={[myFont.h9, { fontWeight: "bold", color: myColor.neutral }]}>Edit</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: 100,
                                    height: 30,
                                    backgroundColor: myColor.error,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 40,
                                    }}
                                    onPress={() => onSignoutPress()}
                                >
                                    <Text style={[myFont.h9, { fontWeight: "bold", color: myColor.neutral }]}>OUT</Text>
                                </TouchableOpacity>
                                </>
                                :
                                route.params !==docIdUserLogin?
                                <TouchableOpacity style={{
                                    width: 100,
                                    height: 30,
                                    backgroundColor: myColor.success,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 40,
                                    }}
                                    onPress={() => onFollowingPress()}
                                >
                                    <Text style={[myFont.h9, { fontWeight: "bold", color: myColor.neutral }]}>{checkFollower?"UnFollower":"Follower"}</Text>
                                </TouchableOpacity>
                                :
                                <></>

                            }

                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            paddingVertical: 20
                        }}
                        >
                            <Text style={[myFont.h8, {}]}>
                                {profile.fristName} {profile.lastName}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[myFont.h8, { paddingRight: 10 }]}>
                                    {likeAll}
                                </Text>
                                <Feather name="heart" size={24} color="black" />
                            </View>
                        </View>
                        <View style={{
                            height: 70,
                            backgroundColor: myColor.neutral3,
                        }}
                        >
                            <View style={{
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                height: 70,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                            >
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: "30%" }}
                                    onPress={()=>{setPageBar("Post")}}>
                                    <Text style={[myFont.h8, {}]}>{post.length}</Text>
                                    <Text style={[myFont.h8, {}]}>Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: "30%" }}
                                                    onPress={()=>{setPageBar("Following")}}
                                >
                                    <Text style={[myFont.h8, {}]}>{profile.following.length}</Text>
                                    <Text style={[myFont.h8, {}]}>Following</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: "30%" }}
                                    onPress={()=>{setPageBar("Follower")}}>
                                    <Text style={[myFont.h8, {}]}>54</Text>
                                    <Text style={[myFont.h8, {}]}>Follower</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {/* {tmpData.map((data,index)=>{
                        return(
                            renderItem(data,index)
                        )
                    })} */}
                        {pageBarOptions()}
                        {/* {post.length!=0?
                            post.map((data, index) => {
                                return (
                                    <Card
                                        key={index}
                                        img={data.images.length === 0 ? "" : data.images[0]}
                                        mainStyle={{marginTop:7,marginBottom:1}}
                                        title={data.title}
                                        creator={profile.fristName + " " + profile.lastName}
                                        imgCreator={profile.profileImg}
                                        like={data.like}
                                    />
                                )
                            })
                        :
                            <View style={{flex:1,height:250,justifyContent:"center",alignItems:"center"}}>
                                <Text style={[myFont.h5,{fontWeight:'bold'}]}>Wanna try something to post?</Text>
                            </View>
                        } */}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}