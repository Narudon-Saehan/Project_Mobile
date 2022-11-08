import firebaseApp from "./connect";
import firebase from 'firebase'
import 'firebase/firestore'

const DB = firebaseApp.firestore()
const userColl = DB.collection('users')

export const addUser=(email,profile,profileImg,success,unsuccess)=>{
    userColl.add({
        email,
        fristName:profile.fristName,
        lastName:profile.lastName,
        profileImg:profileImg,
        following:[],
        likedPosts:[],
    })
    .then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);
        success(docRef.id)
    })
    .catch((error) => {
        //console.error("Error adding document: ", error);
        unsuccess(error)
    });
}
export const getUserByEamil =(email,success,unsuccess)=>{
    userColl.where("email","==",email)
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(doc.id,"=>",doc.data())
            success(doc)
        });
    }),(error)=>{
        console.log(error);
    };
}

export const getUserByEamil2 =(email,success,unsuccess)=>{
    userColl.where("email","==",email).get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            //console.log(doc.id,"=>",doc.data())
            success(doc)
        })
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

export const getUserByDocID =(docID,success,unsuccess)=>{
    userColl.doc(docID)
    .onSnapshot((doc) => {
        success(doc)
    }),(error)=>{
        unsuccess(error);
    };
    // userColl.doc(docID).get()
    // .then((doc)=>{
    //     if(doc.exists){
    //         success(doc)
    //     }else{
    //         unsuccess("User not found")
    //     }
    // })
    // .catch((err)=>{
    //     unsuccess(err)
    // })
}

export const getUserByDocID2 =(docID,success,unsuccess)=>{
    userColl.doc(docID).get()
    .then((doc)=>{
        if(doc.exists){
            success(doc)
        }else{
            unsuccess("User not found")
        }
    })
    .catch((err)=>{
        unsuccess(err)
    })
}


export const getCreatorByDocID =(docID,success,unsuccess)=>{
    userColl.doc(docID)
    .onSnapshot((doc) => {
        //console.log("getCreatorByDocID",doc.data());
        success(doc)
        // querySnapshot.forEach((doc) => {
        //     //console.log(doc.id,"=>",doc.data())
        //     success(doc)
        // });
    }),(error)=>{
        console.log(error);
        unsuccess(error)
    };
}

export const getFollowingByDocID =(docID,success,unsuccess)=>{
    userColl.where("following","array-contains", DB.doc("users/"+docID))
    .onSnapshot((querySnapshot) => {
        let allfollower = []
        let follower
        querySnapshot.forEach((doc) => {
            follower = doc.data()
            delete follower.following;
            allfollower.push({...follower,id:doc.id})
            //console.log("allfollower",allfollower);
        });
        //console.log("allfollower",allfollower);
        success(allfollower)

        //console.log("getCreatorByDocID",doc.data());
        //success(doc)
        // querySnapshot.forEach((doc) => {
        //     //console.log(doc.id,"=>",doc.data())
        //     success(doc)
        // });
    }),(error)=>{
        console.log(error);
        unsuccess(error)
    };
}
export const getFollowerByDocID =(docID,success,unsuccess)=>{
    userColl.where("following","array-contains", DB.doc("users/"+docID))
    .onSnapshot((querySnapshot) => {
        let allfollower = []
        let follower
        querySnapshot.forEach((doc) => {
            follower = doc.data()
            delete follower.following;
            allfollower.push({...follower,id:doc.id})
            //console.log("allfollower",allfollower);
        });
        //console.log("allfollower",allfollower);
        success(allfollower)

        //console.log("getCreatorByDocID",doc.data());
        //success(doc)
        // querySnapshot.forEach((doc) => {
        //     //console.log(doc.id,"=>",doc.data())
        //     success(doc)
        // });
    }),(error)=>{
        console.log(error);
        unsuccess(error)
    };
}

export const updateUserById = (id,profile,success,unsuccess) =>{
    userColl.doc(id).update({
        fristName:profile.fristName,
        lastName:profile.lastName,
        profileImg:profile.profileImg,
    }).then(()=>{
        success();
    }).catch((err)=>{
        unsuccess(err);
        console.error("error");
    })
}

export const updateFollowing = (docIdfollower,docIdUser,follUnfoll,success,unsuccess) =>{
    let following
    if(follUnfoll){
        following=firebase.firestore.FieldValue.arrayUnion(DB.doc("users/"+docIdUser))
    }else{
        following=firebase.firestore.FieldValue.arrayRemove(DB.doc("users/"+docIdUser))
    }
    
    userColl.doc(docIdfollower)
    .update({
        following: following
    })
    .then(()=>{
        success("OK")
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

export const updateLikedPosts = (docIdUser,docIdPost,likeAndUnlike,success,unsuccess) =>{
    let updatelike
    if(likeAndUnlike){
        updatelike=firebase.firestore.FieldValue.arrayUnion(DB.doc("posts/"+docIdPost))
    }else{
        updatelike=firebase.firestore.FieldValue.arrayRemove(DB.doc("posts/"+docIdPost))
    }
    
    userColl.doc(docIdUser)
    .update({
        likedPosts: updatelike
    })
    .then(()=>{
        success("OK")
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

