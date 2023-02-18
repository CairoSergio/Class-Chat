import React, { useState } from 'react';
import { ActivityIndicator,StyleSheet, Text, View, Platform, Linking, AppLoading, Button } from 'react-native';
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

export default function Home({ onLoginOut }) {
  const [loading, setLoading] = useState(false);

  // let [fontsLoaded] = useFonts({
  //   Roboto_700Bold,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  function Logout() {
    setLoading(true)
    AsyncStorage.removeItem('ChatClass').then(() => {
      onLoginOut();
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home!</Text>
      {
        loading ? (
          <ActivityIndicator color='#fff' size={25}/>
        ):(
          <Button title='LogOut' onPress={Logout} />
        )
      }
    </View>
  );
}
