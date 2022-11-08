import firebaseApp from "./connect";
import "firebase/storage";
const storage = firebaseApp.storage("gs://project-mobile-ea735.appspot.com/");

export const uploadImage = async (imgUri, email, success, unsuccess) => {
    //console.log(imgUri);
    const resposns = await fetch(imgUri)
    const blob = await resposns.blob();
    const filename = imgUri.substring((imgUri.lastIndexOf('/') + 1))
    const metadata = {
        contentType: 'image/jpeg',
    };
    await storage.ref().child("image/" + `${email}.jpeg`).put(blob, metadata)
        .then(() => {
            storage.ref().child("image/" + `${email}.jpeg`).getDownloadURL()
                .then((url) => {
                    success(email, url)
                })
                .catch((error) => {
                    unsuccess(error)
                });
        })
        .catch((err) => {
            unsuccess(err)
        })
}

export const uploadPostImage = async (imgsUri, docIdPost, success, unsuccess) => {
    //console.log(imgsUri);
    //console.log(docIdPost);
    let images = [];
    if (imgsUri.length > 0) {
        imgsUri.map( async (imgUri, index) => {
            //console.log(imgUri);
            const resposns = await fetch(imgUri.url)
            const blob = await resposns.blob();
            const metadata = {
                contentType: 'image/jpeg',
            };
            await storage.ref().child(`media/${docIdPost}/` + `${docIdPost}_${index}.jpeg`).put(blob, metadata)
                .then(async() => {
                    const urlImg = await storage.ref().child(`media/${docIdPost}/` + `${docIdPost}_${index}.jpeg`).getDownloadURL()
                        .then((url) => {
                            images.push(url);
                            if(images.length === imgsUri.length){
                                images.sort()
                                success(images,docIdPost)
                            }
                        })
                        .catch((error) => {
                            unsuccess(error)
                        });
                })
                .catch((err) => {
                    unsuccess(err)
                })
        })
    }else{
        success(images,docIdPost)
    }
    //console.log(imgUri);
    // const resposns = await fetch(imgUri)
    // const blob = await resposns.blob();
    // const filename = imgUri.substring((imgUri.lastIndexOf('/')+1))
    // const metadata = {
    //     contentType: 'image/jpeg',
    // };
    // await storage.ref().child("Post/"+`${email}.jpeg`).put(blob, metadata)
    // .then(()=>{
    //     storage.ref().child("Post/"+`${email}.jpeg`).getDownloadURL()
    //     .then((url) => {
    //         success(email,url)
    //     })
    //     .catch((error) => {
    //         unsuccess(error)
    //     });
    // })
    // .catch((err)=>{
    //     unsuccess(err)
    // }) 
}

export const uploadPdfImage = async (pdfUri, docIdPost,images, success, unsuccess) => {
    console.log(pdfUri);
    console.log(docIdPost);
    if(pdfUri.url !== undefined && pdfUri.name !== undefined){
        const resposns = await fetch(pdfUri.url)
        const blob = await resposns.blob();
        //const filename = pdfUri.substring((imgUri.lastIndexOf('/')+1))
        console.log("OK");
        const metadata = {
            contentType: "application/pdf",
        };
        await storage.ref().child(`media/${docIdPost}/` + `${pdfUri.name}`).put(blob, metadata)
        .then(()=>{
            storage.ref().child(`media/${docIdPost}/` + `${pdfUri.name}`).getDownloadURL()
            .then((url) => {
                success(images,url,docIdPost)
            })
            .catch((error) => {
                unsuccess(error)
            });
        })
        .catch((err)=>{
            unsuccess(err)
        }) 
    }else{
        console.log("NO PDF");
        success(images,"",docIdPost)
    }
    //success(pdfUri,docIdPost)
}