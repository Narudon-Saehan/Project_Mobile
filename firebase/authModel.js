import firebaseApp from "./connect";
import 'firebase/auth'
const auth = firebaseApp.auth()


export const signUpEmailPass = (email, password, success, unsuccess) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(`singin = ${userCredential.user}`);
            success(userCredential.user)
        })
        .catch((err)=>{
            console.log("signUpEmailPass ERROR");
            unsuccess(err.code +" " + err.message)
        })
}
