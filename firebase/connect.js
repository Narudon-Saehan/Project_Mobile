// Import the functions you need from the SDKs you need
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdqCXaN_A-t2PBohtpZ0ArxkBwhd82-JU",
    authDomain: "project-mobile-ea735.firebaseapp.com",
    projectId: "project-mobile-ea735",
    storageBucket: "project-mobile-ea735.appspot.com",
    messagingSenderId: "599123472329",
    appId: "1:599123472329:web:5519fde3585dd9d2ac0218",
    measurementId: "G-9CRSPMWNS0"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp