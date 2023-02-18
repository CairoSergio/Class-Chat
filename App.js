import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes';
import LoginRoutes from './src/Pages/LoginRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('ChatClass').then(
      (value)=>{
        if(value){
          setIsLoggedIn(true)
        }
      }
    )
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <Routes onLoginOut={() => setIsLoggedIn(false)} /> : <LoginRoutes onLoginSuccess={()=> setIsLoggedIn(true)}/>}
    </NavigationContainer>
  );
}
