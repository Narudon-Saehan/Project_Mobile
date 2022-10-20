import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login} from '../auth/Login'
import { Register } from '../auth/Register'

const Stack = createNativeStackNavigator()

export const StackNav = () => {
    return (
        <Stack.Navigator
            screenOptions={
                { headerShown: false }
            }
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

