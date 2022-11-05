import { Alert } from "react-native";

export const AlertMessage = (header,subheader) => {
    //setPassword(null)
    let checkSubheader = ""
    // console.log("ff",subheader);
    if (subheader == undefined){
        checkSubheader = ""
        // console.log("OOK");
    }else{
        checkSubheader = subheader
    }
    Alert.alert(
        `${header}`,
        `${checkSubheader}`,
        [
            {
            //   text: "OK",
              onPress: () => {/*console.log("ok");*/},
              style: "Ok",
            },
        ],
        {
            cancelable: true,
            onDismiss: () => {/*console.log("cancel");*/}
        }
    )
}
