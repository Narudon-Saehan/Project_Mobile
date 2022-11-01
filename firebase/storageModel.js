import firebaseApp from "./connect";
import "firebase/storage";
const storage = firebaseApp.storage("gs://project-mobile-ea735.appspot.com/");

export const uploadImage = async (imgUri,email,success,unsuccess)=>{
    console.log(imgUri);
    const resposns = await fetch(imgUri)
    const blob = await resposns.blob();
    const filename = imgUri.substring((imgUri.lastIndexOf('/')+1))
    const metadata = {
        contentType: 'image/jpeg',
    };
    await storage.ref().child("image/"+`${email}.jpeg`).put(blob, metadata)
    .then(()=>{
        storage.ref().child("image/"+`${email}.jpeg`).getDownloadURL()
        .then((url) => {
            success(email,url)
        })
        .catch((error) => {
            unsuccess(error)
        });
    })
    .catch((err)=>{
        unsuccess(err)
    }) 



}

