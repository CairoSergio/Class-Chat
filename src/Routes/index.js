import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Ionicons} from '@expo/vector-icons'
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { View } from 'react-native';

import Chats from '../Pages/Chats';
import Home from '../Pages/Home';
import Stettings from '../Pages/Settings';
import Account from '../Pages/acount';

const Tab = createBottomTabNavigator();
export default function Routes(){
    const [fontlod] = useFonts({
        Roboto_700Bold,
        
    })
    
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarActiveTintColor:'rgb(44, 43, 43)',
                tabBarInactiveTintColor:'rgba(44, 43, 43, 0.5)',
                tabBarLabelStyle:{
                    fontFamily: 'extrabold'
                },
                tabBarStyle:{
                    backgroundColor:'#D9D9D9',
                    bottom:0,
                },
                
            }}>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon:({color , size ,focused}) =>{
                        if(focused){
                            return(
                                <View>
                                    <Ionicons color={color} size={size} name="home"/>
                                </View>
                            )
                        }
                        return <Ionicons color={color} size={size} name="home-outline"/>

                    }
                }}
            />
            <Tab.Screen
                name='Chats' 
                component={Chats}
                options={{
                    headerTitleStyle:{
                        fontFamily:'Roboto_400Regular'
                    },
                    tabBarIcon:({color , size ,focused}) =>{
                        if(focused){
                            return(
                                <View>
                                    <Ionicons color={color} size={size} name="chatbox"/>
                                </View>
                            )
                        }
                        return <Ionicons name='chatbox-outline' color={color} size={size}/>
                    }
                }}
            />
            <Tab.Screen
                name='Account'
                component={Account}
                options={{
                    tabBarIcon:({color , size ,focused}) =>{
                        if(focused){
                            return(
                                <View>
                                    <Ionicons color={color} size={size} name="person"/>
                                </View>
                            )
                        }
                        return <Ionicons color={color} size={size} name="person-outline"/>
                    }
                }}
            />
            <Tab.Screen
                name='Settings'
                component={Stettings}
                options={{
                    tabBarIcon:({color , size ,focused}) =>{
                        if(focused){
                            return(
                                <View>
                                    <Ionicons color={color} size={size} name="settings"/>
                                </View>
                            )
                        }
                        return <Ionicons color={color} size={size} name="settings-outline"/>
                    }
                }}
            />
        </Tab.Navigator>
    )

}
