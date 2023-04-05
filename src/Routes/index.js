// Routes.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Text, View } from 'react-native';
import Chats from '../Pages/Chats';
import Home from '../Pages/Home';
import Settings from '../Pages/Settings';
import Account from '../Pages/acount';
import Notifications from '../Pages/Notifications';
const Tab = createBottomTabNavigator();

export default function Routes({ onLoginOut }) {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(44, 43, 43, 0.5)',
        tabBarShowLabel:false,
        tabBarLabelStyle: {
          fontFamily: 'roboto-bold',
        },
        
        tabBarStyle: {
          backgroundColor: '#D9D9D9',
          bottom: 0,
          height:70,
          paddingLeft:10,
          paddingRight:10
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown:true,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View style={{display:'flex', alignItems:'center', height:'100%',width:'100%', justifyContent:'center'}}>
                  <View style={{flexDirection:'row',borderRadius:50,backgroundColor:'#007fff',alignItems:'center',height:'70%', width:'100%', justifyContent:'center'}}>
                    <Ionicons color={color} size={20} name="home"/>
                    <Text style={{color:color, marginLeft:4}}>Inicio</Text>

                  </View>
                </View>
              );
            }
            return <Ionicons color={color} size={size} name="home-outline" />;
          },
        }}
      />
      <Tab.Screen
        name="Notificatios"
        component={Notifications}
        options={{
          headerTitleStyle: {
            fontFamily: 'roboto-bold',
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View style={{display:'flex', alignItems:'center', height:'100%',width:'100%', justifyContent:'center'}}>
                  <View style={{flexDirection:'row',borderRadius:50,backgroundColor:'#007fff',alignItems:'center',height:'70%', width:'100%', justifyContent:'center'}}>
                    <Ionicons color={color} size={20} name="notifications"/>
                    <Text style={{color:color,marginLeft:4}}>Alertas</Text>
                  </View>
                </View>
              );
            }
            return <Ionicons name="notifications-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View style={{display:'flex', alignItems:'center', height:'100%',width:'100%', justifyContent:'center'}}>
                  <View style={{flexDirection:'row',borderRadius:50,backgroundColor:'#007fff',alignItems:'center',height:'70%', width:'100%', justifyContent:'center'}}>
                    <Ionicons color={color} size={20} name="settings"/>
                    <Text style={{color:color, marginLeft:4}}>Ajustes</Text>
                  </View>
                </View>
              );
            }
            return <Ionicons color={color} size={size} name="settings-outline" />;
          },
        }}>
        {(props) => <Settings {...props} onLoginOut={onLoginOut} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
