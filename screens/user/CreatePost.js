import { useState,useEffect } from "react"
import { View, Text, Image, FlatList, Modal, TouchableOpacity, ScrollView, Alert } from "react-native"

import { TextBox, CreateButton } from "../../component/forms"
import { myColor } from "../../component/myColor"
import { myFont } from "../../component/myFont"
import { Card } from "../../component/card"

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import ImageViewer from 'react-native-image-zoom-viewer';

import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel" 
import * as PostModel from "../../firebase/postModel"
import * as StorageModel from "../../firebase/storageModel"

import { Loading } from "../Loading"

export const CreatePost = () => {
    const [profile,setProfile] = useState()
    const [loading,setLoading] = useState(true)

    const [post,setPost] = useState({title:"",selectId:"",description:"",link:""})

    const [imgs, setImgs] = useState({ data: [] })
    const [pdfs, setPdfs] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    //const temp = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
    const changePost=(keyName,value)=>{
        setPost({...post,[keyName]:value})
    }
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return;
        }
        try{
            let pickerResult = await ImagePicker.launchImageLibraryAsync({allowsMultipleSelection:true});
            if (pickerResult.cancelled === true) {
                return;
            }
            if(pickerResult.selected){
                //console.log(pickerResult.selected);
                let imgUri = pickerResult.selected.map((data)=>{return {url:data.uri}})
                //console.log(imgUri);
                return imgUri
            }else{
                //console.log(pickerResult);
                //console.log([{url:pickerResult.uri}]);
                return [{url:pickerResult.uri}]
            }
        }
        catch{
            Alert.alert("NOT UP")
            return;
        }
        //setImgs({data:[...imgs.data,{id:imgs.data.length,url:pickerResult.uri}]})
    }
    const openImageEditPickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return;
        }
        try{
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            if (pickerResult.cancelled === true) {
                return;
            }
            return pickerResult.uri
        }
        catch{
            Alert.alert("NOT UP")
            return;
        }
        //setImgs({data:[...imgs.data,{id:imgs.data.length,url:pickerResult.uri}]})
    }

    const openDocumentPickerAsync = async () => {
        let permissionResult = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
        //console.log(permissionResult);
        if (permissionResult.type === "success"); {
            console.log(permissionResult.uri);
            setPdfs({name: permissionResult.name, url: permissionResult.uri });
        }
    }
    const addImg = async () => {
        let imgUri = await openImagePickerAsync()
        if (imgUri) {
            setImgs({ data: [...imgs.data, ...imgUri] })
        }
    }
    const editImg = async (index) => {
        let imgUri = await openImageEditPickerAsync()
        if (imgUri) {
            let newImgs = imgs.data
            newImgs[index] = { url: imgUri }
            setImgs({ data: newImgs })
        }
    }
    const deleteImg = (index) => {
        let newImgs = imgs.data
        newImgs.splice(index, 1)
        if(newImgs.length===0)
            setModalIndex(0)
        else if(index>=newImgs.length)
            setModalIndex(newImgs.length-1)
        setImgs({ data: newImgs })
    }
    // const headleEmpty = () => {
    //     return (
    //         <View style={{ justifyContent: "center", alignItems: "center" }}>
    //             <Text>Img Empty</Text>
    //         </View>
    //     )
    // }
    // const renderItem = ({ item, index }) => {
    //     return (
    //         <View key={index} style={{ width: "100%", height: 300, marginBottom: 10, backgroundColor: myColor.secondary, borderRadius: 20 }}>
    //             <TouchableOpacity
    //                 onPress={() => [setModalIndex(index), setModalVisible(true)]}
    //             >
    //                 <Image
    //                     style={{ width: "100%", height: "100%", resizeMode: "contain" }}
    //                     source={{ uri: item.url }}
    //                 ></Image>
    //             </TouchableOpacity>
    //             <View style={{ flexDirection: "row", position: "absolute", alignSelf: "flex-end" }}>
    //                 <CreateButton
    //                     text="E"
    //                     color={myColor.accent}
    //                     styles={{ width: 40, height: 40, borderRadius: 5, padding: 0, margin: 0, marginRight: 5 }}
    //                     funOnPress={() => editImg(index)}
    //                 />
    //                 <CreateButton
    //                     text="X"
    //                     color={myColor.error}
    //                     styles={{ width: 40, height: 40, borderRadius: 5, padding: 0, margin: 0, marginRight: 20 }}
    //                     funOnPress={() => deleteImg(index)}
    //                 />
    //             </View>
    //         </View>
    //     )
    // }
    const unsuccess=(msg)=>{
        console.log(msg);
        setLoading(false)
    }
    const success=(msg)=>{
        console.log(msg);
        Alert.alert("success")
        setLoading(false)
    }
    const addImagesSuccess=(images,docIdPost)=>{
        //console.log(images);
        // console.log(docIdPost);
        PostModel.updateImagesPost(images,docIdPost,success,unsuccess)
        //setLoading(false)
    }
    const addPostSuccess =(doc)=>{
        //console.log(doc);
        StorageModel.uploadPostImage(imgs.data,doc,addImagesSuccess,unsuccess)
        //console.log(doc);
    }
    const getUserSuccess =(doc)=>{
        setProfile({...doc.data(),id:doc.id})
        setLoading(false)
    }
    const onSubmitPost=()=>{
        if(post.title){
            setLoading(true)
            PostModel.addPost({...post,id:profile.id},addPostSuccess,unsuccess)
        }
        else{
            Alert.alert("Please fill out the required information.")
        }
    }
    useEffect(()=>{
        let emailCurrentUser="test";
        emailCurrentUser=AuthModel.getCurrentUser().email
        UserModel.getUserByEamil(emailCurrentUser,getUserSuccess,unsuccess)
    },[])
    if(loading){
        return(
            <Loading/>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: myColor.primary,padding:10 }}>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ImageViewer imageUrls={imgs.data} index={modalIndex} />
            </Modal>
            <ScrollView style={{flex:1}}>
                <Text style={{...myFont.h2}}>Sample Post</Text>
                <Card 
                    img={imgs.data.length===0?"":imgs.data[0].url}  
                    title={post.title}  
                    creator={profile.fristName + " " + profile.lastName}   
                    imgCreator={profile.profileImg}
                    like={0} 
                />
                <Text>Image</Text>
                <CreateButton
                    text="upload"
                    color={myColor.accent}
                    styles={{width:"100%",margin:0}}
                    funOnPress={()=>addImg()}
                />
                <View style={{ flex: 5, padding: 15, height: "50%" }}>
                    {
                        imgs.data.length>0?
                        
                        <View style={{ width: "100%", height: 300, marginBottom: 10, backgroundColor: myColor.secondary, borderRadius: 10 }}>
                            <TouchableOpacity
                                onPress={() => [setModalIndex(modalIndex), setModalVisible(true)]}
                            >
                                <Image
                                    style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                                    source={{ uri: imgs.data[modalIndex].url }}
                                ></Image>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", position: "absolute", justifyContent:"center",width:"100%" }}>
                                <CreateButton
                                    text="E"
                                    color={myColor.accent}
                                    styles={{ width: 40, height: 40, borderRadius: 5, padding: 0, margin: 0, marginRight: 5 }}
                                    funOnPress={() => editImg(modalIndex)}
                                />
                                <CreateButton
                                    text="X"
                                    color={myColor.error}
                                    styles={{ width: 40, height: 40, borderRadius: 5, padding: 0, margin: 0 }}
                                    funOnPress={() => deleteImg(modalIndex)}
                                />
                            </View>
                            <View style={{ flexDirection: "row", position: "absolute",justifyContent:"space-between",width:"100%"}}>
                                <CreateButton
                                    text="<="
                                    color={myColor.neutral2}
                                    styles={{ width: 40, height: 300, borderRadius: 10, padding: 0, margin: 0 ,opacity:modalIndex===0?0.3:0.6}}
                                    textStyles={{color:myColor.neutral}}
                                    setButton={{disabled:modalIndex===0}}
                                    funOnPress={() => setModalIndex(modalIndex-1)}
                                />
                                <CreateButton
                                    text="=>"
                                    color={myColor.neutral2}
                                    styles={{ width: 40, height: 300, borderRadius: 10, padding: 0, margin: 0 ,opacity:modalIndex===imgs.data.length-1?0.3:0.6 }}
                                    textStyles={{color:myColor.neutral}}
                                    setButton={{disabled:modalIndex===imgs.data.length-1}}
                                    funOnPress={() => setModalIndex(modalIndex+1)}
                                />
                            </View>
                    </View>
                        
                        :
                        
                        <View style={{ width: "100%", height: 300, marginBottom: 10, backgroundColor: myColor.secondary, borderRadius: 10,justifyContent:"center",alignItems:"center" }}>
                            <Text style={{...myFont.h2}}> NO Image </Text>
                        </View>
                    }
                </View>
                <View style={{ flex: 1 }}>
                    <TextBox
                        text={"Title"}
                        required={true}
                        setTextInput={{
                            value: post.title,
                            onChangeText: (text) =>changePost("title",text),
                        }}
                    />

                    <TextBox
                        text={"Select ID"}
                        setTextInput={{
                            value: post.selectId,
                            onChangeText: (text) =>changePost("selectId",text),
                        }}
                    />

                    <TextBox
                        text={"Description"}
                        setTextInput={{
                            value: post.description,
                            onChangeText: (text) =>changePost("description",text),
                            multiline:true,
                            numberOfLines:4
                        }}
                    />

                    <TextBox
                        text={"Link"}
                        required={true}
                        setTextInput={{
                            value: post.link,
                            onChangeText: (text) =>changePost("link",text),
                        }}
                    />

                    {/* {pdfs.data.map((data) => {
                        return (
                            <Text>{data.name}</Text>
                        )
                    })} */}
                    <Text>PDF  {pdfs?.name}</Text>
                    <CreateButton
                        text="upload PDF"
                        color={myColor.accent}
                        styles={{ width: "100%",margin:0 }}
                        funOnPress={() => openDocumentPickerAsync()}
                    />


                <CreateButton
                    text="POST"
                    color={myColor.accent}
                    styles={{width:"100%",margin:0,marginTop:5,marginBottom:5}}
                    funOnPress={()=>onSubmitPost()}
                />
                </View>
            </ScrollView>
        </View>
    )
}