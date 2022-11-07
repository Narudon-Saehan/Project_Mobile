import { useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native"
import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel"
import * as PostModel from "../../firebase/postModel"
import { myColor } from "../../component/myColor"
import { myFont } from '../../component/myFont'
import { Feather } from '@expo/vector-icons';

import { Card } from "../../component/card"
const tmpData = [
    {
        id: 0,
        title: "Test",
        img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
        creator: "Narudon Saehan",
        like: 10,
    },
    {
        id: 1,
        title: "Test",
        img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
        creator: "Narudon Saehan",
        like: 10,
    },
    {
        id: 2,
        title: "Test",
        img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
        creator: "Narudon Saehan",
        like: 10,
    },
    {
        id: 3,
        title: "Test",
        img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
        creator: "Narudon Saehan",
        like: 10,
    },
    {
        id: 4,
        title: "Test",
        img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
        creator: "Narudon Saehan",
        like: 10,
    },
]

export const Profile = ({ navigation,route }) => {
    const [profile, setProfile] = useState()
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState([])
    const unsuccess = (msg) => {
        console.log(msg);
    }
    const getPostSuccess = (posts) => {
        //console.log(posts);
        setPost(posts);
    }
    const success = (doc) => {
        //console.log("success",doc.id);
        setProfile(doc.data())
        PostModel.getAllPostByCreator(doc.id, getPostSuccess, unsuccess)
        setLoading(false)
    }
    const signoutSuccess = () => {
        navigation.navigate('Login')
    }

    const onSignoutPress = () => {
        console.log('Logout now')
        AuthModel.signOut(signoutSuccess, unsuccess)
    }

    const renderItem = (item, index) => {
        return (
            // <Card 
            //     key={index} 
            //     img={item.images.length===0?"":item.images[0]}  
            //     title={item.title}  
            //     creator={item.creator.fristName + " " +item.creator.lastName}
            //     imgCreator={item.creator.profileImg } 
            //     like={item.like} 
            // />
            <View key={index} style={{ width: "100%", marginBottom: 10, marginTop: (index === 0) ? 10 : 0 }}>
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

    useEffect(() => {
        console.log(route);
        if(route.name === "CreatorProfile"){
            UserModel.getUserByDocID(route.params,success,unsuccess)
            console.log("test");
        }else{
            let emailCurrentUser = AuthModel.getCurrentUser().email
            UserModel.getUserByEamil(emailCurrentUser, success, unsuccess)
        }
    }, [])
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading....</Text>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: myColor.primary, paddingHorizontal: 10 }}>
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
                            <TouchableOpacity style={{
                                width: 100,
                                height: 30,
                                backgroundColor: myColor.primary,
                                // padding:10,
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
                                // padding:10,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 40,

                            }}
                                onPress={() => onSignoutPress()}
                            >
                                <Text style={[myFont.h9, { fontWeight: "bold", color: myColor.neutral }]}>OUT</Text>

                            </TouchableOpacity>
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
                                    100
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
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: "30%" }}>
                                    <Text style={[myFont.h8, {}]}>{post.length}</Text>
                                    <Text style={[myFont.h8, {}]}>Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: "30%" }}>
                                    <Text style={[myFont.h8, {}]}>1023</Text>
                                    <Text style={[myFont.h8, {}]}>Following</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: "30%" }}>
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
                        {post.length!=0?
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
                    }
                        
                        {/* <FlatList
                        data={tmpData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        // ItemSeparatorComponent={() => (<Divider />)}
                        // ListEmptyComponent={headleEmpty}
                    >
                    </FlatList> */}
                    </View>
                </View>
                {/* <Text>{profile.fristName} {profile.lastName}</Text>

            <TouchableOpacity
                style={{width:100,backgroundColor:myColor.accent,padding:10,justifyContent:"center",alignItems:"center",borderRadius:10,marginBottom:20}}
                onPress={()=>navigation.navigate({
                    name: 'EditProfile',
                })}
            >
                <Text>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{width:100,backgroundColor:myColor.error,padding:10,justifyContent:"center",alignItems:"center",borderRadius:10}}
                onPress={()=>onSignoutPress()}
            >
                <Text>LOGOUT</Text>
            </TouchableOpacity> */}
            </ScrollView>
        </View>
    )
}