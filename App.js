import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import LoginRoutes from "./src/Pages/LoginRoutes";
// import Routes from "./src/Pages/Routes";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export default function App() {
  return (
    <NavigationContainer>
      <LoginRoutes/>
    </NavigationContainer>
  );
}

