import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

import { Login} from '../auth/Login'
import { Register } from '../auth/Register'
import { Profile } from '../user/Profile'
import { Home } from '../user/Home'
import { Search } from '../user/Search'
import { Subscription } from '../user/Subscription'
import { CreatePost } from '../user/CreatePost'
import { ForgotPassword } from '../auth/ForgotPassword'
import { EditProfile } from '../user/EditProfile'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


const MainNav=()=>{
    return(
        <Tab.Navigator
            initialRouteName='Home'
        >
            <Tab.Screen name="CreatePost" component={CreatePost}/>
            <Tab.Screen name="Search" component={Search}/>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Subscription" component={Subscription}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}

export const StackNav = () => {
    return (
        <Stack.Navigator
            screenOptions={
                { headerShown: false }
            }
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="MainNav" component={MainNav} />
        </Stack.Navigator>
    )
}

