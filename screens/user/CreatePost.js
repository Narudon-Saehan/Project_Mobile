import { useState,useEffect } from "react"
import { View, Text, Image, FlatList, Modal, TouchableOpacity, ScrollView, Alert } from "react-native"

import { TextBox, CreateButton, ShowText} from "../../component/forms"
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
import {FrameLayout} from '../../component/frame'
import { Loading } from "../Loading"

import { useSelector } from "react-redux"

export const CreatePost = () => {
    const docIdUserLogin = useSelector((state) => state.todos.docIdUser)

    const [profile,setProfile] = useState()
    const [loading,setLoading] = useState(true)

    const [post,setPost] = useState({title:"",selectId:"",description:"",link:"",images:[],pdf:""})

    const [imgs, setImgs] = useState({ data: [] })
    const [pdfs, setPdfs] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);

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
                let imgUri = pickerResult.selected.map((data)=>{return {url:data.uri}})
                return imgUri
            }else{
                return [{url:pickerResult.uri}]
            }
        }
        catch{
            Alert.alert("NOT UP")
            return;
        }
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
    }

    const openDocumentPickerAsync = async () => {
        let permissionResult = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
        if (permissionResult.type === "success"); {
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
    const unsuccess=(msg)=>{
        setLoading(false)
    }
    const success=(msg)=>{
        Alert.alert("success")
        setLoading(false)
    }
    const addPdfSuccess=(images,pdfs,docIdPost)=>{
        PostModel.updateImagesPdfPost(images,pdfs,docIdPost,success,unsuccess)
    }
    const addImagesSuccess=(images,docIdPost)=>{
        StorageModel.uploadPdfImage(pdfs,docIdPost,images,addPdfSuccess,unsuccess)
    }
    const addPostSuccess =(doc)=>{
        StorageModel.uploadPostImage(imgs.data,doc,addImagesSuccess,unsuccess)
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
        <FrameLayout>
            <View style={{flex: 1,paddingHorizontal:10,paddingTop:10}}>
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
                    <Text style={{...myFont.h5}}>Sample Post</Text>
                    <Card 
                        img={imgs.data.length===0?"":imgs.data[0].url}  
                        title={post.title}  
                        creator={profile.fristName + " " + profile.lastName}   
                        imgCreator={profile.profileImg}
                        like={0}
                        mainStyle={{marginLeft: 0, marginRight: 0}}
                    />
                    <Text style={[myFont.h9,{}]}>Image</Text>
                    <CreateButton
                        text="upload"
                        color={myColor.accent}
                        styles={{width:"100%",margin:0,marginTop:3}}
                        funOnPress={()=>addImg()}
                        pStyle={myFont.h9}
                    />
                    <View style={{ flex: 5, paddingTop: 10, height: "50%" }}>
                        {
                            imgs.data.length>0?
                            
                            <View style={{ width: "100%", height: 300, marginBottom: 10, backgroundColor: myColor.neutral5, borderRadius: 10 }}>
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
                            
                            <View style={{ width: "100%", height: 300, marginBottom: 10, backgroundColor: myColor.neutral3, borderRadius: 10,justifyContent:"center",alignItems:"center" }}>
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
                            pStyle={myFont.h9}
                        />

                        <TextBox
                            text={"Select ID"}
                            setTextInput={{
                                value: post.selectId,
                                onChangeText: (text) =>changePost("selectId",text),
                            }}
                            pStyle={myFont.h9}
                        />

                        <TextBox
                            text={"Description"}
                            setTextInput={{
                                value: post.description,
                                onChangeText: (text) =>changePost("description",text),
                                multiline:true,
                                numberOfLines:4
                            }}
                            pStyle={myFont.h9}
                        />

                        <TextBox
                            text={"Link"}
                            setTextInput={{
                                value: post.link,
                                onChangeText: (text) =>changePost("link",text),
                            }}
                            pStyle={myFont.h9}
                        />
                        <View style={{flexDirection:"row"}}>
                            <Text style={myFont.h9}>PDF: </Text>  
                            <Text style={{
                                textDecorationLine:'underline',
                                fontStyle:'italic',
                                color:myColor.success}}
                            >{pdfs?.name}</Text>  
                        </View>
                        <CreateButton
                            text="upload PDF"
                            color={myColor.accent}
                            styles={{ width: "100%",margin:0 }}
                            funOnPress={() => openDocumentPickerAsync()}
                            pStyle={myFont.h9}
                        />


                    <CreateButton
                        text="POST"
                        color={myColor.primary}
                        styles={{width:"100%",margin:0,marginTop:5,marginBottom:5}}
                        funOnPress={()=>onSubmitPost()}
                        pStyle={myFont.h9}
                        textStyles={{fontWeight:'bold',color:myColor.neutral}}
                    />
                    </View>
                </ScrollView>
            </View>
        </FrameLayout>
    )
}