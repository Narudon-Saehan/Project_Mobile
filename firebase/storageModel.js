import firebaseApp from "./connect";
import "firebase/storage";
const storage = firebaseApp.storage("gs://project-mobile-ea735.appspot.com/");

export const uploadImage = async (imgUri)=>{
    console.log(imgUri);
    const resposns = await fetch(imgUri)
    const blob = await resposns.blob();
    const filename = imgUri.substring((imgUri.lastIndexOf('/')+1))
    const metadata = {
        contentType: 'image/jpeg',
    };
    await storage.ref().child("image/"+"filename5.jpeg").put(blob, metadata)
    .then((data)=>{
        console.log(data);
    })
}

