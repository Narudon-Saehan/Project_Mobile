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

export const signInEmailPass = (email, password, success, unsuccess) => {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential)=>{
            let user = userCredential.user
            success(user.email)
        }).catch((err)=>{
            console.log('signInEmailPass error');
            unsuccess(err.code + ' ' + err.message)
        })
}
export const signOut = (success,unsuccess)=>{
    auth.signOut()
        .then(()=>{
            success()
        })
        .catch((err)=>{
            console.log('signOut error');
            unsuccess(err.code + ' ' + err.message)
        })
}

export const getCurrentUser = ()=>{
    return auth.currentUser
}

export const recoverPassword=(email,success,unsuccess)=>{
    auth.sendPasswordResetEmail(email)
        .then(()=>{
            success(`We sent an email to (${email})`)
        })
        .catch((err)=>{
            console.log("signUpEmailPass error");
            unsuccess(err.code+" "+err.message)
        })
}
