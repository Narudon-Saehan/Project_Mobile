import { View, Text, TextInput } from "react-native"


export const TextBox = (props) => {
    return (
        <View style={{ width: "80%", marginBottom: 20 }}>
            <Text style={{ alignSelf: "flex-start" }}>{props.text}</Text>
            <TextInput 
                style={{ borderWidth: 1, borderRadius: 10, width: "100%" }} 
                {...props.setTextInput}
            />
        </View>
    )
}