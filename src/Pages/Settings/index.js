import React from 'react';
import { StyleSheet, Text, View, Platform, Linking, AppLoading, Button } from 'react-native';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto_700Bold',
  },
});

export default function Stettings({onLoginOut}) {
  function Sair(){
    AsyncStorage.removeItem('ChatClass').then(() => {
    onLoginOut();
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stettings!</Text>
      <Button title='Sair' onPress={Sair}/>
    </View>
  );
}
