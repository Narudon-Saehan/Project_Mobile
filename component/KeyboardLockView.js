import {KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Keyboard} from "react-native"

const KeyboardLockView = ({children}) => {
    // console.log(enabled);
    return (
        <KeyboardAvoidingView behavior="height" enabled={false} style={{flex:1}}>
                {children} 
        </KeyboardAvoidingView>
    )
}

export default KeyboardLockView;