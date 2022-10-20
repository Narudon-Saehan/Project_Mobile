import firebaseApp from "./connect";
import 'firebase/firestore'

const DB = firebaseApp.firestore()
const userColl = DB.collection('users')

export const addUser=(email,profile,success,unsuccess)=>{
    userColl.add({
        email,
        fristName:profile.fristName,
        lastName:profile.lastName,
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

