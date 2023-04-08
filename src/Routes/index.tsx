import React,{useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {BackHandler, Alert } from 'react-native'
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Text, View } from 'react-native';
import Chats from '../Pages/Chats';
import Home from '../Pages/Home';
import Settings from '../Pages/Settings';
import Account from '../Pages/acount';
import Notifications from '../Pages/Notifications';
import endereco from '../../Api/Porta.json'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conversas from "../Pages/Conversas";
import Pesquisar from "../Pages/Pesquisa";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function Routes({ onLoginOut }) {
  const [currentId, setCurrentId] = useState<string>();

  const getId = async () => {
    try {
      const dados = await AsyncStorage.getItem('ChatClass');
      setCurrentId(dados);
      console.log(`ID atualizado para ${dados}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateStatus =  async () => {
    const dados = await AsyncStorage.getItem('ChatClass');
    try {
      await axios.put(`${endereco[0].porta}/visto/${dados}`);
      await axios.put(`${endereco[0].porta}/inactive/${dados}`).then(() => {
        BackHandler.exitApp();
      });
      console.log(`usuario com o ID ${dados} esta offline`);
    } catch (error) {
      console.log(`Erro ao atualizar status do usuário com ID ${dados}:`, error);
    }
  };
  
  const handleBackPress = () => {
    Alert.alert('Atenção!', 'Tem certeza que deseja sair do aplicativo?', [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => updateStatus(),
      },
    ]);
    return true;
  };
  
  const fetchData = async () => {
    await getId();
  };
  
  useEffect(() => {
    fetchData();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);
  
  useEffect(() => {
    console.log(`currentId atualizado paraaaaaaa ${currentId}`);
  }, [currentId]);
  

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
      }}
      
      initialRouteName='Home'>
      <Tab.Screen
        name="Home"
        options={({ route }) => ({
          headerShown:false,
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
        })}
      >
      {() => (
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={Home}/>
          <Stack.Screen name="Conversas" component={Conversas}         
          />
          <Stack.Screen name="Pesquisar" component={Pesquisar}/>
        </Stack.Navigator>
      )}
      </Tab.Screen>
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
