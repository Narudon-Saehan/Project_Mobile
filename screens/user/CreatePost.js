import { useState,useEffect } from "react"
import { View, Text, Image, FlatList, Modal, TouchableOpacity, ScrollView } from "react-native"

import { TextBox, CreateButton } from "../../component/forms"
import { myColor } from "../../component/myColor"
import { myFont } from "../../component/myFont"
import { Card } from "../../component/card"

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import ImageViewer from 'react-native-image-zoom-viewer';

import * as AuthModel from "../../firebase/authModel"
import * as UserModel from "../../firebase/userModel" 

import { Loading } from "../Loading"

export const CreatePost = () => {
    const [profile,setProfile] = useState()
    const [loading,setLoading] = useState(true)

    const [post,setPost] = useState({header:"",selectId:"",description:"",link:""})

    const [imgs, setImgs] = useState({ data: [] })
    const [pdfs, setPdfs] = useState({ data: [] })
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    //const temp = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
    const changePost=(keyName,value)=>{
        setPost({...post,[keyName]:value})
    }
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({allowsMultipleSelection:true});
        if (pickerResult.cancelled === true) {
            return;
        }
        if(pickerResult.selected){
            console.log("multi");
            console.log(pickerResult)
        }else{
            console.log("one");
        }
        //console.log(pickerResult);
        return pickerResult.uri
        //setImgs({data:[...imgs.data,{id:imgs.data.length,url:pickerResult.uri}]})
    }
    const openDocumentPickerAsync = async () => {
        let permissionResult = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
        console.log(permissionResult);
        if (permissionResult.type === "success"); {
            console.log(permissionResult.uri);
            setPdfs({ data: [...pdfs.data, { id: pdfs.data.length, name: permissionResult.name, url: permissionResult.uri }] });
        }
    }
    const addImg = async () => {
        let imgUri = await openImagePickerAsync()
        if (imgUri) {
            setImgs({ data: [...imgs.data, { id: imgs.data.length, url: imgUri }] })
        }
    }
    const editImg = async (index) => {
        let imgUri = await openImagePickerAsync()
        if (imgUri) {
            let newImgs = imgs.data
            newImgs[index] = { id: index, url: imgUri }
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
    }
    const success =(doc)=>{
        setProfile(doc.data())
        setLoading(false)
    }
    useEffect(()=>{
        let emailCurrentUser="test";
        emailCurrentUser=AuthModel.getCurrentUser().email
        UserModel.getUserByEamil(emailCurrentUser,success,unsuccess)
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
                <Card img={imgs.data.length===0?"":imgs.data[0].url}  title={post.header}  creator={profile.fristName + " " + profile.lastName}   like={0} />
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
                        setTextInput={{
                            value: post.header,
                            onChangeText: (text) =>changePost("header",text),
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
                        }}
                    />

                    <TextBox
                        text={"Link"}
                        setTextInput={{
                            value: post.link,
                            onChangeText: (text) =>changePost("link",text),
                        }}
                    />

                    {pdfs.data.map((data) => {
                        return (
                            <Text>{data.name}</Text>
                        )
                    })}
                    <CreateButton
                        text="upload PDF"
                        color={myColor.accent}
                        styles={{ width: 100 }}
                        funOnPress={() => openDocumentPickerAsync()}
                    />

                <CreateButton
                    text="POST"
                    color={myColor.accent}
                    styles={{width:"100%",margin:0}}
                    // funOnPress={()=>addImg()}
                />
                </View>
            </ScrollView>
        </View>
    )
}