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

const Tab = createBottomTabNavigator();

export default function Routes({ onLoginOut }) {
  const [fontlod] = useFonts({
    Roboto_700Bold,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(44, 43, 43, 0.5)',
        tabBarShowLabel:false,
        tabBarLabelStyle: {
          fontFamily: 'extrabold',
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
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View style={{display:'flex', alignItems:'center', height:'100%',width:'100%', justifyContent:'center'}}>
                  <View style={{flexDirection:'row',borderRadius:50,backgroundColor:'#007fff',alignItems:'center',height:'70%', width:'100%', justifyContent:'center'}}>
                    <Ionicons color={color} size={20} name="home"/>
                    <Text style={{color:color, marginLeft:4}}>Home</Text>

                  </View>
                </View>
              );
            }
            return <Ionicons color={color} size={size} name="home-outline" />;
          },
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          headerTitleStyle: {
            fontFamily: 'Roboto_400Regular',
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View style={{display:'flex', alignItems:'center', height:'100%',width:'100%', justifyContent:'center'}}>
                  <View style={{flexDirection:'row',borderRadius:50,backgroundColor:'#007fff',alignItems:'center',height:'70%', width:'100%', justifyContent:'center'}}>
                    <Ionicons color={color} size={20} name="chatbox"/>
                    <Text style={{color:color, marginLeft:4}}>Chat</Text>
                  </View>
                </View>
              );
            }
            return <Ionicons name="chatbox-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View style={{display:'flex', alignItems:'center', height:'100%',width:'100%', justifyContent:'center'}}>
                  <View style={{flexDirection:'row',borderRadius:50,backgroundColor:'#007fff',alignItems:'center',height:'70%', width:'100%', justifyContent:'center'}}>
                    <Ionicons color={color} size={20} name="person"/>
                    <Text style={{color:color, marginLeft:4}}>Account</Text>
                  </View>
                </View>
              );
            }
            return <Ionicons color={color} size={size} name="person-outline" />;
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
                    <Text style={{color:color, marginLeft:4}}>Setting</Text>
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
