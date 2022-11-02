import { useState } from "react"
import { View,Text,Image,FlatList,Modal, TouchableOpacity} from "react-native"
import { TextBox,CreateButton } from "../../component/forms"
import { myColor } from "../../component/myColor"
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
export const CreatePost=()=>{
    const [imgs,setImgs]= useState({data:[]})
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        return pickerResult.uri
        //setImgs({data:[...imgs.data,{id:imgs.data.length,url:pickerResult.uri}]})
    }
    const openDocumentPickerAsync = async () => {
        let permissionResult = await DocumentPicker.getDocumentAsync({type:"pdf/*"});
        console.log(permissionResult);
    }
    const addImg= async()=>{
        let imgUri = await openImagePickerAsync()
        if(imgUri){
            setImgs({data:[...imgs.data,{id:imgs.data.length,url:imgUri}]})
        }
    }
    const editImg = async(index)=>{
        let imgUri = await openImagePickerAsync()
        if(imgUri){
            let newImgs = imgs.data
            newImgs[index] = {id:index,url:imgUri}
            setImgs({data:newImgs})
        }
    }
    const deleteImg=(index)=>{
        let newImgs = imgs.data
        newImgs.splice(index, 1)
        setImgs({data:newImgs})
    }
    const headleEmpty =()=>{
        return(
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <Text>Img Empty</Text>
            </View>
        )
    }
    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={{width:"100%", height:300,marginBottom:10,backgroundColor:myColor.secondary,borderRadius:20}}>
                <TouchableOpacity 
                    onPress={()=>[setModalIndex(index),setModalVisible(true)]}
                >
                    <Image
                        style={{ width: "100%", height:"100%", resizeMode:"contain"}}
                        source={{ uri: item.url }}
                    ></Image>
                </TouchableOpacity>
                <View style={{flexDirection:"row",position:"absolute",alignSelf:"flex-end"}}>
                    <CreateButton
                        text="E"
                        color={myColor.accent}
                        styles={{width:40,height:40,borderRadius:5,padding:0,margin:0,marginRight:5}}
                        funOnPress={()=>editImg(index)}
                    />
                    <CreateButton
                        text="X"
                        color={myColor.error}
                        styles={{width:40,height:40,borderRadius:5,padding:0,margin:0,marginRight:20}}
                        funOnPress={()=>deleteImg(index)}
                    />
                </View>
            </View>
        )
    }
    return(
        <View style={{flex:1,backgroundColor:myColor.primary}}>
            <Modal 
                visible={modalVisible} 
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ImageViewer imageUrls={imgs.data} index={modalIndex}/>
            </Modal>
            <Text>CreatePost</Text>
            <CreateButton
                text="upload"
                color={myColor.accent}
                styles={{width:100}}
                funOnPress={()=>addImg()}
            />
            <View style={{padding:20,height:"50%"}}>
                <FlatList
                    data={imgs.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    // ItemSeparatorComponent={() => (<Divider />)}
                    ListEmptyComponent={headleEmpty}
                >
                </FlatList>
            </View>

            <TextBox
                text={"Email"}
                // setTextInput={{
                //     value: profile.email,
                //     onChangeText: (text) => changeProfile("email", text),
                // }}
            />

            <TextBox
                text={"Email"}
                // setTextInput={{
                //     value: profile.email,
                //     onChangeText: (text) => changeProfile("email", text),
                // }}
            />
            <CreateButton
                text="upload PDF"
                color={myColor.accent}
                styles={{width:100}}
                funOnPress={()=>openDocumentPickerAsync()}
            />
        </View>
    )
}