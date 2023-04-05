import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Login';
import SignIn from '../SignIn';
import UserConfirme from '../UserComfirme';

const Stack = createNativeStackNavigator();

export default function LoginRoutes({onLoginSuccess}){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Login" 
                options={{headerShown:false}}>
                {(props) => <Login {...props} onLoginSuccess={onLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen 
                name="SignIn" 
                component={SignIn} 
                options={{headerShown:false}}
            />
            <Stack.Screen 
                name="UserComfirme" 
                options={{headerShown:false}}>
                {(props) => <UserConfirme {...props} onLoginSuccess={onLoginSuccess} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
