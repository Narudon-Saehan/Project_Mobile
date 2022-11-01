import firebaseApp from "./connect";
import 'firebase/firestore'

const DB = firebaseApp.firestore()
const userColl = DB.collection('users')

export const addUser=(email,profile,profileImg,success,unsuccess)=>{
    userColl.add({
        email,
        fristName:profile.fristName,
        lastName:profile.lastName,
        profileImg:profileImg,
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
export const getUserByEamil =(email,success,unsuccess)=>{
    userColl.where("email","==",email).get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            console.log(doc.id,"=>",doc.data())
            success(doc)
        })
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

export const getUserByDocID =(docID,success,unsuccess)=>{
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

