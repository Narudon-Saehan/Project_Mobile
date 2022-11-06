import { useEffect, useState } from "react"
import { View, Text, Image, FlatList } from "react-native"
import { myColor } from "../../component/myColor"

import * as PostModel from "../../firebase/postModel" 

import { Card } from "../../component/card"
import { Loading } from "../Loading"
import { myFont } from "../../component/myFont"
import { FrameLayout } from "../../component/frame"
export const Home = () => {
    //console.log("555");
    const [post,setPost] = useState({data:[]})
    const [loading,setLoading] = useState(true)
    const tmpData = [
        {
            id:0,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
        {
            id:1,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
        {
            id:2,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
        {
            id:3,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
        {
            id:4,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
    ]
    const renderItem = ({ item, index }) => {
        return (
            <Card 
                key={index} 
                img={item.images.length===0?"":item.images[0]}  
                title={item.title}  
                creator={item.creator.fristName + " " +item.creator.lastName}
                imgCreator={item.creator.profileImg } 
                like={item.like} 
            />
            // <View key={index} style={{ width: "100%", marginBottom: 10 ,marginTop:(index===0)?10:0}}>
            //     <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: myColor.neutral, borderRadius: 20 }}>
            //         <Image
            //             style={{ width: "100%", height: 150, resizeMode: 'cover', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            //             source={{ uri: item.img }}
            //         ></Image>
            //         <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            //             <Text>{item.title}</Text>
            //             <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            //                 <Text>by:{item.creator}</Text>
            //                 <Text>like:{item.like}</Text>
            //             </View>
            //         </View>
            //     </View>
            // </View>
        )
    }
    const unsuccess=(msg)=>{
        console.log(msg);
    }
    const success= (dataPost)=>{

        console.log(dataPost);
        let creator
        //setLoading(false)
        // dataPost.map((data)=>{
        //     console.log( data.creator);
        //     console.log( data.creator.user);
        // })
        // let newPost = post;
        //  (dataPost.map(async(data,index)=>{
        //     creator = await data.creator.get()
        //     //newPost = post;
        //     console.log(creator.data());
        //     //newPost[index].creator = creator.data()
        //     //setPost(newPost)
        // }))
        let newPost =  dataPost;
        dataPost.map( async(data,index)=>{
            creator = await data.creator.onSnapshot((data)=>{
                console.log(data.data());
                newPost[index] = {...newPost[index],creator:data.data()}
                setPost({data:newPost})
            })
            // newPost[index] = {...newPost[index],creator:creator.data()}
            // setPost({data:newPost})
            //console.log(data.creator);
        })

        setPost(dataPost)   
        setLoading(false) 
    }
    useEffect(()=>{
        PostModel.getAllPost(success,unsuccess)
    },[])
    if(loading){
        return(
            <Loading/>
        )
    }
    return (
        <FrameLayout content={()=>{
            return(
                <>
                <View style={{backgroundColor:myColor.neutral4,width:"100%",paddingHorizontal:20,paddingTop:10,paddingBottom:30}}>
                    <View style={{ backgroundColor: myColor.neutral3, borderRadius: 20,paddingHorizontal:10,paddingVertical:10}}>
                            <Text style={[myFont.h3,{color:myColor.neutral2}]}>Hello</Text>
                            <Text style={[myFont.h7,{color:myColor.neutral2}]}>Narudon Saehan</Text>
                    </View>
                </View>
                    <FlatList
                        data={post.data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        // ItemSeparatorComponent={() => (<Divider />)}
                        // ListEmptyComponent={headleEmpty}
                    >
                    </FlatList>
                </>
            )
        }}/>

        // <View style={{ flex: 1, backgroundColor: myColor.primary }}>
        //     <View style={{flex:1,paddingHorizontal:10}}>
        //         <View style={{flex:1,backgroundColor:myColor.neutral4}}>
        //             <View style={{backgroundColor:myColor.neutral4,width:"100%",paddingHorizontal:20,paddingTop:10,paddingBottom:30}}>
        //                 <View style={{ backgroundColor: myColor.neutral3, borderRadius: 20,paddingHorizontal:10,paddingVertical:10}}>
        //                     <Text style={[myFont.h3,{color:myColor.neutral2}]}>Hello</Text>
        //                     <Text style={[myFont.h7,{color:myColor.neutral2}]}>Narudon Saehan</Text>
        //                 </View>
        //             </View>
        //             <FlatList
        //                 data={post.data}
        //                 renderItem={renderItem}
        //                 keyExtractor={(item) => item.id}
        //                 // ItemSeparatorComponent={() => (<Divider />)}
        //                 // ListEmptyComponent={headleEmpty}
        //             >
        //             </FlatList>
        //         </View>
        //     </View>
        // </View>
    )
}