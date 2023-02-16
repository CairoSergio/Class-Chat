import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Login';
import SignIn from '../SignIn';
import UserConfirme from '../UserComfirme';
import { NavigationContainer } from "@react-navigation/native"

const Stack = createNativeStackNavigator();

export default function LoginRoutes(){
    return(
        
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{headerShown:false}}
            />
            <Stack.Screen 
                name="SignIn" 
                component={SignIn} 
                options={{headerShown:false}}
            />
            <Stack.Screen 
                name="UserComfirme" 
                component={UserConfirme} 
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}