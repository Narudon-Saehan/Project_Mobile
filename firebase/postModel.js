import firebaseApp from "./connect";
import 'firebase/firestore'

const DB = firebaseApp.firestore()
const postColl = DB.collection('posts')

export const getAllPost =(success,unsuccess)=>{
    postColl.onSnapshot( async (querySnapshot) => {
        let posts = []
        let creator=""
        querySnapshot.forEach((doc) => {
            //creator = await doc.data().creator.get()
            // console.log("creator",creator.data());
            // .then((data)=>{
            //     //console.log("creator",data.data());
            //     creator = data.data()
            //     posts.push({...doc.data(),id:doc.id,creator})
            // })
            posts.push({...doc.data(),id:doc.id})
        });
        // posts.map(async(data,index)=>{
        //     creator = await data.creator.get()
        //     posts[index]={...data,creator:creator.data()}
        //     //console.log("data",data);
        //     if(index === posts.length - 1 )
        //         success(posts)
        // })
        success(posts)
    }),(error)=>{
        unsuccess(error);
    };
}