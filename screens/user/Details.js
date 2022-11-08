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
  Alert,
  Linking ,
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

import * as OpenAnything from "react-native-openanything";

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
  };
  const getCreatorSuccess = (doc) => {
    setCreator({ ...doc.data(), docId: doc.id });
  };
  const success = (doc) => {
    let tempPost = doc.data();
    tempPost.likeFromId.map((data, index) => {
      tempPost.likeFromId[index] = data._delegate._key.path.segments[6];
    });
    tempPost.creator = tempPost.creator._delegate._key.path.segments[6];
    let tempImages = [];
    tempPost.images.map((data, index) => {
      tempImages.push({ id: tempImages.length, url: data });
    });
    setImgs({ data: tempImages });
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
    setPost({...post,likeFromId:newLikeFromId})
  };
  const onLike=()=>{
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
    dataUser.likedPosts = likedPosts;
    setProfile({ ...dataUser, id: doc.id });
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
                />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: myColor.neutral4,
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,borderBottomEndRadius:5,borderBottomStartRadius:5,
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
              {post.link!==""?
              <>
                <Text style={[myFont.h7, {}]}>Link Download</Text>
                <TouchableOpacity
                  onPress={()=>OpenAnything.Web(post.link).catch(err => alert("Can't open a link due Incorrect link"))}
                >
                  <ShowText
                    text={post.link}
                    pStyle={myFont.h9}
                    styles={{ marginVertical: 5 }}
                    textStyles={{fontStyle:'italic',textDecorationLine:'underline'}}
                  />
                </TouchableOpacity>
              </>:
              <></>}

              {post.pdf!==""?
                <>
                  <Text style={[myFont.h7, {}]}>PDF</Text>
                  <View style={{flex:1}}>
                    <CreateButton
                        text="Download PDF"
                        color={
                          myColor.primary
                        }
                        styles={
                          {borderWidth:2,borderColor:myColor.primary,alignItems:"center",width:110,marginLeft:0}
                        }
                        pStyle={myFont.h10}
                        textStyles={{fontWeight:'bold',color:myColor.neutral}}
                        funOnPress={()=>OpenAnything.Pdf(post.pdf).catch(err => alert("Can't open a PDF"))}
                    />
                  </View>
                </>
              :
              <></>}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
