import firebaseApp from "./connect";
import firebase from 'firebase'
import 'firebase/firestore'

const DB = firebaseApp.firestore()
const postColl = DB.collection('posts')

export const addPost= (dataPost,success,unsuccess)=>{
    const setDataPost={
        updateDate:new Date(),
        title:dataPost.title,
        selectId:dataPost.selectId,
        images:[],
        description:dataPost.description,
        link:dataPost.link,
        creator: DB.doc("users/"+dataPost.id),
        like:0,
        likeFromId:[],
    }
    postColl.add({
        ...setDataPost
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        success(docRef.id)
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        unsuccess(error)
    });
}

export const updateImagesPdfPost= (images,pdf,docIdPost,success,unsuccess)=>{
    console.log("updateImagesPost",images);
    console.log("updateImagesPost",pdf);
    // console.log(docIdPost);
    postColl.doc(docIdPost).update({
        updateDate:new Date(),
        images,
        pdf
    }).then(()=>{
        success("OK");
    }).catch((err)=>{
        unsuccess(err);
        console.error("error");
    })
    // const setDataPost={
    //     updateDate:new Date(),
    //     title:dataPost.title,
    //     selectId:dataPost.selectId,
    //     images:[],
    //     description:dataPost.description,
    //     link:dataPost.link,
    //     creator: DB.doc("users/"+dataPost.id),
    //     like:0,
    // }
    // postColl.add({
    //     ...setDataPost
    // })
    // .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    //     success(docRef.id)
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    //     unsuccess(error)
    // });
}

export const getAllPost =(success,unsuccess)=>{
    postColl.orderBy("updateDate", "desc").onSnapshot( async (querySnapshot) => {
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

export const getAllPostByCreator =(creatorId,success,unsuccess)=>{
    postColl.where("creator","==",DB.doc("users/"+creatorId)).onSnapshot( async (querySnapshot) => {
        let posts = []
        let post=
        querySnapshot.forEach((doc) => {
            //console.log("querySnapshot",doc.data());
            post = doc.data()
            delete post.creator;
            posts.push({...post,id:doc.id})
        });
        success(posts)
        // posts.map(async(data,index)=>{
        //     creator = await data.creator.get()
        //     posts[index]={...data,creator:creator.data()}
        //     //console.log("data",data);
        //     if(index === posts.length - 1 )
        //         success(posts)
        // })
        //success(posts)
    }),(error)=>{
        unsuccess(error);
    };
}

export const getAllPostByFollower =(follower,success,unsuccess)=>{
    let dbfollower = []
    follower.map((data)=>{
        dbfollower.push(DB.doc("users/"+data))
    })
    if(dbfollower.length>0){
        postColl.where("creator","in",dbfollower).onSnapshot( (querySnapshot) => {
            let posts = []
            let post
            querySnapshot.forEach((doc) => {
                post = doc.data()
                post.creator = post.creator._delegate._key.path.segments[6];
                post.likeFromId.map((data,index)=>{
                    post.likeFromId[index] = data._delegate._key.path.segments[6]
                })
                posts.push({...post,id:doc.id})
            });
            success(posts)
        }),(error)=>{
            unsuccess(error);
        };
        // .then((querySnapshot)=>{
        //     let posts = []
        //     let post
        //     querySnapshot.forEach((doc) => {
        //         post = doc.data()
        //         post.creator = post.creator._delegate._key.path.segments[6];
        //         post.likeFromId.map((data,index)=>{
        //             post.likeFromId[index] = data._delegate._key.path.segments[6]
        //         })
        //         posts.push({...post,id:doc.id})
        //     });
        //     success(posts)
        // }).catch((err)=>{
        //     unsuccess(err)
        // })
    }
    else{
        success([])
    }
}

export const getAllPostByTitle =(search,success,unsuccess)=>{
    postColl.get()
    .then((querySnapshot)=>{
        let posts = []
            let post
            querySnapshot.forEach((doc) => {
                post = doc.data()
                //post.creator = post.creator._delegate._key.path.segments[6];
                // post.likeFromId.map((data,index)=>{
                //     post.likeFromId[index] = data._delegate._key.path.segments[6]
                // })
                posts.push({...post,id:doc.id})
            });
            posts=posts.filter((data)=>data.title.toLowerCase().search(search.toLowerCase())!==-1)
            success(posts)
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

export const getPostById =(postId,success,unsuccess)=>{
    postColl.doc(postId).get()
    .then((doc)=>{
        success(doc)
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

export const updateLikeFromIdPost= (docIdPost,docIdUser,likeAndUnlike,success,unsuccess)=>{
    let updatelike
    if(likeAndUnlike){
        updatelike=firebase.firestore.FieldValue.arrayUnion(DB.doc("users/"+docIdUser))
    }else{
        updatelike=firebase.firestore.FieldValue.arrayRemove(DB.doc("users/"+docIdUser))
    }
    postColl.doc(docIdPost)
    .update({
        likeFromId: updatelike
    })
    .then(()=>{
        success(likeAndUnlike)
    })
    .catch((err)=>{
        unsuccess(err)
    })
    //console.log("updateImagesPost",images);
    // console.log(docIdPost);
    // postColl.doc(docIdPost).update({
    //     updateDate:new Date(),
    //     images
    // }).then(()=>{
    //     success("OK");
    // }).catch((err)=>{
    //     unsuccess(err);
    //     console.error("error");
    // })
}