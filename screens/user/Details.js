import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import * as UserModel from "../../firebase/userModel";
import * as PostModel from "../../firebase/postModel";
import * as AuthModel from "../../firebase/authModel";

import ImageViewer from "react-native-image-zoom-viewer";

import { myColor } from "../../component/myColor";
import { Loading } from "../Loading";
import { myFont } from "../../component/myFont";
import { TextBox, CreateButton, ShowText } from "../../component/forms";
import { Card } from "../../component/card";

import { useSelector } from 'react-redux'
const tmpData = [
  {
    id: 0,
    title: "Test",
    img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
    creator: "Narudon Saehan",
    like: 10,
  },
];

export const Details = ({ route, navigation }) => {
  const { postId } = route.params;
  const windowWidth = Dimensions.get("window").width;
  const docIdUserLogin = useSelector((state) => state.todos.docIdUser)
  const [creator, setCreator] = useState();
  const [post, setPost] = useState();
  const [profile, setProfile] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [likePost, setLikePost] = useState();
  const [imgs, setImgs] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const unsuccess = (err) => {
    console.log(err);
  };
  const getCreatorSuccess = (doc) => {
    //console.log("getCreatorSuccess",doc.data());
    setCreator({ ...doc.data(), docId: doc.id });
    //console.log("getCreatorSuccess",post.images);
    //setModalVisible(true)
  };
  const success = (doc) => {
    //console.log(doc.data());
    let tempPost = doc.data();
    tempPost.likeFromId.map((data, index) => {
      tempPost.likeFromId[index] = data._delegate._key.path.segments[6];
    });
    tempPost.creator = tempPost.creator._delegate._key.path.segments[6];
    let tempImages = [];
    tempPost.images.map((data, index) => {
      //console.log({url:data});
      tempImages.push({ id: tempImages.length, url: data });
    });
    setImgs({ data: tempImages });
    //console.log("tempPost",tempPost.images);
    //console.log("success", tempPost.images);
    UserModel.getCreatorByDocID(tempPost.creator, getCreatorSuccess, unsuccess);
    setPost({ ...tempPost, id: doc.id });
    setLoading(false);
  };
  const likeSuccess = (checkLikePost)=> {
    let newLikeFromId = post.likeFromId
    if(checkLikePost)
      newLikeFromId.push(docIdUserLogin)
    else
      newLikeFromId = newLikeFromId.filter((data)=>data!==docIdUserLogin)
    //newPost.title = "test"
    //console.log(newPost);
    setPost({...post,likeFromId:newLikeFromId})
  };
  const onLike=()=>{
    //UserModel.updateLikedPosts(docIdUser,docIdPost,likeAndUnlike,unsuccess,unsuccess)
    const checkLikePost = post.likeFromId.find((data)=>data === docIdUserLogin)!==undefined
    PostModel.updateLikeFromIdPost(postId,docIdUserLogin,!checkLikePost,likeSuccess,unsuccess)
  }
  const renderImage = ({ item, index }) => {
    return (
      <View style={{ flex: 1, marginRight: 10 ,marginVertical:10}}>
        <View
          style={{
            width: windowWidth - 60,
            height: 300,
            marginBottom: 10,
            backgroundColor: myColor.neutral5,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={() => [setModalVisible(true)]}>
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={{ uri: item.url }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getUserSuccess = (doc) => {
    let dataUser = doc.data();
    let likedPosts = [];
    // let checkLikePost = dataUser.likedPosts.find((data)=>{data._delegate._key.path.segments[6] === postId })
    // console.log("postId",postId);
    // if(checkLikePost !== undefined){
    //     likedPosts.push(postId)
    // }
    // dataUser.likedPosts.map((data)=>{
    //     console.log(data._delegate._key.path.segments[6]);
    // })
    dataUser.likedPosts = likedPosts;
    //console.log(dataUser);
    setProfile({ ...dataUser, id: doc.id });
    //setLoading2(false)
  };
  const toCreatorProfile = (docIdUser) => {
    navigation.navigate({
      name: "CreatorProfile",
      params: docIdUser,
    });
  };
  useEffect(() => {
    PostModel.getPostById(postId, success, unsuccess);
    const emailCurrentUser = AuthModel.getCurrentUser().email;
    UserModel.getUserByEamil(emailCurrentUser, getUserSuccess, unsuccess);
  }, []);
  if (loading) {
    return <Loading />;
  }
  //console.log(imgs.data)
  return (
    <View style={{ flex: 1, backgroundColor: myColor.primary }}>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ImageViewer imageUrls={imgs.data} index={0} />
      </Modal>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 0 }}>
          {/* <View>
                    {tmpData.map((data,index)=>{
                        return(
                            renderItem(data,index)
                        )
                    })}
                    </View> */}
          <Card
            mainStyle={{marginTop:3}}
            img={post.images.length === 0 ? "" : post.images[0]}
            title={post.title}
            creator={creator?.fristName + " " + creator?.lastName}
            creatorId={creator?.docId}
            imgCreator={creator?.profileImg}
            like={post.likeFromId.length}
            // onLike={onLike}
            docIdUser={profile.id}
            docIdPost={post.id}
            userLike={
              post.likeFromId.find((data) => data === docIdUserLogin) !== undefined
            }
            toCreatorProfile={toCreatorProfile}
          />
          <View style={{ flex: 1, paddingHorizontal: 0 }}>
            <View style={{
                flex: 1,
                backgroundColor: myColor.neutral4,
                borderRadius:20,
                marginHorizontal: 20,
                marginVertical:10,
            }}
            >
                <CreateButton
                    text={
                      post.likeFromId.find((data) => data === docIdUserLogin) === undefined?"Like post":"Unlike post"
                    }
                    color={
                      post.likeFromId.find((data) => data === docIdUserLogin) === undefined?myColor.like:myColor.neutral
                    }
                    styles={
                      {borderWidth:2,borderColor:myColor.like}
                    }
                    pStyle={myFont.h8}
                    textStyles={{fontWeight:'bold'}}
                    funOnPress={()=>onLike()}
                    //onLike
                />
            </View>
           </View>
          <View
            style={{
              flex: 1,
              backgroundColor: myColor.neutral4,
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
              marginHorizontal: 20,
              paddingHorizontal: 10,
              paddingTop: 10,
            }}
          >
            <Text style={[myFont.h7, {}]}>{post.title}</Text>

            <FlatList
              data={imgs.data}
              renderItem={renderImage}
              keyExtractor={(item) => item.id}
              horizontal={true}
              // ItemSeparatorComponent={() => (<Divider />)}
              // ListEmptyComponent={headleEmpty}
            />
            <ShowText text={post.description} pStyle={myFont.h9} />

            <View
              style={{
                flex: 1,
                backgroundColor: myColor.neutral3,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                marginBottom: 10,
              }}
            >
              <Text style={[myFont.h7, {}]}>Link Download</Text>
              <ShowText
                text={post.link}
                pStyle={myFont.h9}
                styles={{ marginVertical: 5 }}
              />
              <Text style={[myFont.h7, {}]}>PDF</Text>
              <ShowText
                text="Description"
                pStyle={myFont.h9}
                styles={{ marginVertical: 5 }}
              />
            </View>

            {/* <View style={{flex:1,
                                        backgroundColor:myColor.neutral,
                                        marginHorizontal:0,
                                        borderRadius:10,
                                        paddingHorizontal:10,
                                        marginHorizontal:20,
                                        paddingVertical:10,
                                        marginBottom:10
                        }}>
                            <Text style={[myFont.h9,{}]}>Description</Text>
                        </View> */}
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
  );
};
