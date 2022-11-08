import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Loading } from "../Loading"

import * as PostModel from "../../firebase/postModel"
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel"

import { FrameLayout } from "../../component/frame"
import { Card } from "../../component/card"
import { myColor } from "../../component/myColor"
import { myFont } from "../../component/myFont"


export const Subscription = ({ navigation }) => {
    const docIdUserLogin = useSelector((state) => state.todos.docIdUser)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState()
    const [following, setFollowing] = useState({ data: [] })
    const [post, setPost] = useState({ data: [] })
    const unsuccess = (msg) => {
    }
    const getPostSuccess = (posts) => {
        posts.sort((a, b) => a.updateDate < b.updateDate);
        setPost({ data: posts })
        setLoading(false)
    }
    const getFollowerSuccess = (allFollower) => {
        let allDocIdFollower = []
        allFollower.map((data) => {
            allDocIdFollower.push(data.id)
        })
        PostModel.getAllPostByFollower(allDocIdFollower, getPostSuccess, unsuccess)
        setFollowing({ data: allFollower })
    }
    const getProfileUserSuccess = (doc) => {
        setProfile({ ...doc.data(), id: doc.id })
    }
    const toCreatorProfile = (docIdUser) => {
        navigation.navigate({
            name: "CreatorProfile",
            params: docIdUser
        })
    }
    const renderItem2 = ({ item, index }) => {
        return (
            <View style={{ flex: 1, marginLeft: 10, marginBottom: 1 }}>
                <View key={index} style={{ height: 85, marginBottom: 10, marginLeft: 10, alignItems: "center" }}>
                    <Image
                        style={{ width: 70, height: 70, borderRadius: 100, borderWidth: 1.6, borderColor: myColor.neutral }}
                        source={{ uri: item.profileImg }}
                    />
                    <Text style={[myFont.h10, {}]}>{item.fristName} {item.lastName}</Text>
                </View>
            </View>
        )
    }
    const renderItem = ({ item, index }) => {
        const checkUserLike = item.likeFromId.find(data => data === docIdUserLogin) !== undefined
        let creator = following.data.find((data) => data.id === item.creator)
        if (creator === undefined)
            creator = { fristName: "", lastName: "", id: "", profileImg: "#" }

        return (
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate({
                    name: "Details",
                    params: { postId: item.id },
                })}
            >
                <Card
                    key={index}
                    img={item.images.length === 0 ? "" : item.images[0]}
                    title={item.title}
                    creator={creator.fristName + " " + creator.lastName}
                    creatorId={creator.id}
                    imgCreator={creator.profileImg}
                    like={item.likeFromId.length}
                    userLike={checkUserLike}
                    toCreatorProfile={toCreatorProfile}
                />
            </TouchableOpacity>
        )
    }
    useEffect(() => {
        UserModel.getUserByDocID(docIdUserLogin, getProfileUserSuccess, unsuccess)
        UserModel.getFollowingByDocID(docIdUserLogin, getFollowerSuccess, unsuccess)
    }, [])
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <FrameLayout>
            <View style={{ backgroundColor: myColor.neutral4, width: "100%", paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 }}>
                <View style={{ backgroundColor: myColor.neutral3, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={[myFont.h3, { color: myColor.neutral2 }]}>Topic List</Text>
                    <Text style={[myFont.h7, { color: myColor.neutral2 }]}>{profile?.fristName} {profile?.lastName}</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <FlatList
                    data={following.data}
                    renderItem={renderItem2}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                >
                </FlatList>
            </View>

            <FlatList
                data={post.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id}
            >
            </FlatList>
        </FrameLayout>
    )
}