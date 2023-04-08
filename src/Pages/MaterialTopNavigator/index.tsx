import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Amigos from '../Amigos';
import Chats from '../Chats';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontFamily: 'roboto-bold' },
      }}
    >
    <TopTab.Screen
        component={Chats}
        name='Chats'
        options={{tabBarLabel:'Conversas'}}
        />
      <TopTab.Screen
        component={Amigos}
        name='Amigos'
        options={{tabBarLabel:'Amigos'}}
      />
    </TopTab.Navigator>
  );
}
