import { View, Text, TextInput,TouchableOpacity } from "react-native"


export const TextBox = (props) => {
    return (
        <View style={{ width: "80%", margin: 10 }}>
            <Text style={{ alignSelf: "flex-start" }}>{props.text}</Text>
            <TextInput
                style={{ borderWidth: 1, borderRadius: 10, width: "100%" }}
                {...props.setTextInput}
            />
        </View>
    )
}

export const CreateButton = (props) => {
    return (
        <TouchableOpacity
                style={{
                    backgroundColor:props.color,
                    borderRadius:10,
                    padding:10,
                    justifyContent:"center",
                    alignItems:"center",
                    margin:10,
                    ...props.styles,
                }}
                onPress={props.funOnPress}
            >
                <Text>{props.text}</Text>
            </TouchableOpacity>
    )
}