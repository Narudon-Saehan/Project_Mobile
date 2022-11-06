import { View, Text, TextInput,TouchableOpacity } from "react-native"
import { myColor } from "./myColor"
import { myFont } from "./myFont"

export const TextBox = (props) => {
    return (
        <View style={{ width: "100%",paddingBottom:6,...props.mainStyle}}>
            <View style={{ alignSelf: "flex-start",flexDirection:"row" }}>
                <Text style={[props.pStyle,{...props.textStyles}]}>{props.text}</Text>
                <Text style={{color:myColor.error}}>{(props.required && !props.setTextInput.value)?" *required":""}</Text>
            </View>
            <TextInput
                style={{ borderWidth: 1, 
                    borderRadius: 10, 
                    width: "100%",
                    paddingLeft:10,
                    height:50,
                    paddingStart:10,
                    marginBottom:8,
                    backgroundColor:myColor.neutral,
                    borderColor:(props.required && !props.setTextInput.value)?myColor.error:"black",
                }}
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
                {...props.setButton}
            >
                <Text
                    style={[props.pStyle,{
                        ...props.textStyles
                    }]}
                >{props.text}</Text>
            </TouchableOpacity>
    )
}