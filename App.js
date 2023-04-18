import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes';
import LoginRoutes from './src/Pages/LoginRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'inter-regular': require('./assets/fonts/static/Inter-Medium.ttf'),
        'noto': require('./assets/fonts/NotoSerif-Regular.ttf'),
        'noto-bold': require('./assets/fonts/NotoSerif-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    AsyncStorage.getItem('ChatClass').then(
      (value)=>{
        if(value){
          setIsLoggedIn(true)
        }
      }
    )

    loadFonts();
  }, []);

  if (!fontsLoaded){
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <Routes onLoginOut={() => setIsLoggedIn(false)} /> : <LoginRoutes onLoginSuccess={()=> setIsLoggedIn(true)}/>}
    </NavigationContainer>
  );
}
