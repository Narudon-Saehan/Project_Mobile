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

export const Profile = ({ navigation, route }) => {
    const routeName = route.name
    const docIdUserLogin = useSelector((state) => state.todos.docIdUser)
    const [profile, setProfile] = useState()
    const [checkFollower, setCheckFollower] = useState(false)
    const [likeAll, setLikeAll] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    const [post, setPost] = useState([])
    const [following, setFollowing] = useState({ data: [] })
    const [follower, setFollower] = useState({ data: [] })

    const [pageBar, setPageBar] = useState("Post")
    const [pageFollowing, setPageFollowing] = useState(false)
    const [pageFollower, setPageFollower] = useState(false)
    const unsuccess = (msg) => {
    }
    const getFollowingSuccess = (doc) => {
        if (follower.data.find((data) => data.docId === doc.id) === undefined) {
            const { fristName, lastName, profileImg } = doc.data()
            let follower = []
            let newFollowing = follower.data
            doc.data().following.map((data) => {
                follower.push(data._delegate._key.path.segments[6])
            })
            newFollowing.push({ docId: doc.id, fristName, lastName, profileImg, following: follower })
            console.log("getFollowingSuccess",newFollowing);
            setFollower({ data: newFollowing })
        }
    }
    const getFollowingSuccess2=(allfollower)=>{
        console.log("getFollowingSuccess2",allfollower);
        setFollowing({data:allfollower})
    }
    const getPostSuccess = (posts) => {
        let templikeAll = 0
        let newPost = posts;
        posts.sort((a, b) => a.updateDate < b.updateDate);
        posts.map((data, index) => {
            let likeFromId = []
            data.likeFromId.map((item) => {
                likeFromId.push(item._delegate._key.path.segments[6])
            })
            templikeAll += likeFromId.length
            newPost[index].likeFromId = likeFromId
        })
        setLikeAll(templikeAll)
        setPost(newPost);
    }
    const success = (doc) => {
        let tempFollowing = []
        doc.data().following.map((data) => {
            tempFollowing.push({ docId: data._delegate._key.path.segments[6], fristName: "", lastName: "", profileImg: "#", following: [] })
        })
        if (tempFollowing.find((data) => data.docId === docIdUserLogin) !== undefined)
            setCheckFollower(true)
        else
            setCheckFollower(false)

        PostModel.getAllPostByCreator(doc.id, getPostSuccess, unsuccess)
        getDataFollowing(tempFollowing)
        setProfile({ ...doc.data(), docId: doc.id, following: tempFollowing })
        setLoading(false)
    }
    const getDataFollowing = (tempFollowing) => {
        tempFollowing.map((data) => {
            if (follower.data.find((data) => data.docId === data) === undefined)
                UserModel.getUserByDocID2(data.docId, getFollowingSuccess, unsuccess)
        })
    }
    const toCreatorProfile = (docIdUser) => {
        navigation.navigate({
            name: "CreatorProfile",
            params: docIdUser
        })
    }

    const signoutSuccess = () => {
        navigation.navigate('Login')
    }

    const onSignoutPress = () => {
        AuthModel.signOut(signoutSuccess, unsuccess)
    }
    const onFollowingPress = () => {
        UserModel.updateFollowing(profile.docId, docIdUserLogin, !checkFollower, unsuccess, unsuccess)
    }

    const pageBarOptions = () => {
        if (pageBar === "Post") {
            return (<>
                {post.length != 0 ?
                    post.map((data, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate({
                                    name: "Details",
                                    params: { postId: data.id },
                                })}
                            >
                                <Card
                                    key={index}
                                    img={data.images.length === 0 ? "" : data.images[0]}
                                    mainStyle={{ marginTop: 7, marginBottom: 1 }}
                                    title={data.title}
                                    creator={profile.fristName + " " + profile.lastName}
                                    creatorId={profile.docId}
                                    imgCreator={profile.profileImg}
                                    like={data.likeFromId.length}
                                    userLike={data.likeFromId.find((data) => data === docIdUserLogin) !== undefined}
                                    toCreatorProfile={toCreatorProfile}
                                />
                            </TouchableOpacity>
                        )
                    })
                    :
                    <View style={{ flex: 1, height: 250, justifyContent: "center", alignItems: "center" }}>
                        <Text style={[myFont.h5, { fontWeight: 'bold' }]}>Wanna try something to post?</Text>
                    </View>
                }
            </>)
        } else if (pageBar === "Following") {
            return (
                <>
                    {following.data.map((data, index) => {
                        return (
                            <FollowCard
                                key={index}
                                nameText={data.fristName + " " + data.lastName}
                                uriProfile ={data.profileImg}
                                color={myColor.primary}
                                pStyle={myFont.h10}
                            />
                        )
                    })}
                </>
            )
        } else if (pageBar === "Follower") {
            return (
                <>
                    {profile.following.map((data, index) => {
                        //console.log();
                        console.log("follower  55",index," ",data);
                        // return (
                        //     <FollowCard
                        //         key={index}
                        //         nameText={data.fristName + " " + data.lastName}
                        //         color={myColor.primary}
                        //         pStyle={myFont.h10}
                        //     />
                        // )
                    })}
                </>
            )
        }
    }

    useEffect(() => {
        if (routeName === "CreatorProfile") {
            UserModel.getUserByDocID(route.params, success, unsuccess)
            UserModel.getFollowingByDocID(route.params, getFollowingSuccess2, unsuccess)
        } else {
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

                            {routeName === "Profile" ?
                                <>
                                    <TouchableOpacity style={{
                                        width: 100,
                                        height: 30,
                                        backgroundColor: myColor.primary,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 40,
                                        marginBottom: 4,
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
                                        <Text style={[myFont.h9, { fontWeight: "bold", color: myColor.neutral }]}>Log out</Text>
                                    </TouchableOpacity>
                                </>
                                :
                                route.params !== docIdUserLogin ?
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
                                        <Text style={[myFont.h9, { fontWeight: "bold", color: myColor.neutral }]}>{checkFollower ? "UnFollower" : "Follower"}</Text>
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
                                    onPress={() => { setPageBar("Post") }}>
                                    <Text style={[myFont.h8, {}]}>{post.length}</Text>
                                    <Text style={[myFont.h8, {}]}>Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: "30%" }}
                                    onPress={() => { setPageBar("Following") }}
                                >
                                    <Text style={[myFont.h8, {}]}>{following.data.length}</Text>
                                    <Text style={[myFont.h8, {}]}>Following</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: "30%" }}
                                    onPress={() => { setPageBar("Follower") }}>
                                    <Text style={[myFont.h8, {}]}>{profile.following.length}</Text>
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
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}