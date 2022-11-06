import {View} from 'react-native'
import { myColor } from './myColor'
export const FrameLayout = (props) => {
    return(
        <View style={{ flex: 1, backgroundColor: myColor.primary }}>
            <View style={{flex:1,paddingHorizontal:10}}>
                <View style={{flex:1,backgroundColor:myColor.neutral4}}>
                    <props.content/>
                </View>
            </View>
        </View>
    )
}