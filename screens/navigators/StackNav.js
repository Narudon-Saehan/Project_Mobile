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
import { Details } from '../user/Details'
import { Following } from '../user/Following'

import {myColor} from '../../component/myColor'
import { MaterialCommunityIcons,MaterialIcons,FontAwesome,Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Alert,TouchableOpacity } from 'react-native'
import { Loading } from '../Loading'


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


const MainNav=({navigation})=>{
    return(
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({route})=>({
                tabBarIcon:({focused})=>{
                    if (route.name === "CreatePost"){
                        return <Ionicons name="add-circle" size={24} color={focused?myColor.primary:"black"} />
                    }else if(route.name === "Search"){
                        return <FontAwesome name="search" size={24} color={focused?myColor.primary:"black"} />
                    }else if(route.name === "Home"){
                        return <FontAwesome name="home" size={24} color={focused?myColor.primary:"black"} />
                    }else if(route.name === "Subscription"){
                        return <MaterialIcons name="subscriptions" size={24} color={focused?myColor.primary:"black"} />
                    }else if(route.name === "Profile"){
                        return <MaterialCommunityIcons name="face-man-profile" size={24} color={focused?myColor.primary:"black"} />
                    }else if(route.name === "Loading"){
                        return <MaterialCommunityIcons name="loading" size={24} color={focused?myColor.primary:"black"} />
                    }
                },
                tabBarActiveTintColor:myColor.primary,

            })}
            tabb
        >
            <Tab.Screen name="CreatePost" component={CreatePost}
                listeners={{
                    tabPress: e => {
                        // e.preventDefault();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        navigation.navigate('CreatePost');
                        
                    },
                }}
            />
            <Tab.Screen name="Search" component={Search}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        navigation.navigate('Search');
                        
                    },
                }}
            />
            <Tab.Screen name="Home" component={Home}
            listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        navigation.navigate('Home');
                        
                    },
                }}
            />
            <Tab.Screen name="Subscription" component={Subscription}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        navigation.navigate('Subscription');
                    },
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        navigation.navigate('Profile');
                    },
                }}
            />
            <Tab.Screen name="Loading" component={Loading}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        navigation.navigate('Loading');
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export const StackNav = () => {
    return (
        <Stack.Navigator
            screenOptions={({route})=>({
                headerShown: (route.name === "EditProfile") || 
                            (route.name === "Details") ||
                            (route.name === "CreatorProfile") || 
                            (route.name === "Following")
            })}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="CreatorProfile" component={Profile} />
            <Stack.Screen name="MainNav" component={MainNav} />
            <Stack.Screen name="Following" component={Following}/>
        </Stack.Navigator>
    )
}

