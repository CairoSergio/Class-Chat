import React from 'react';
import { StyleSheet, Text, View, Platform, Linking, AppLoading } from 'react-native';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';

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

export default function Chats() {
  //   let [fontsLoaded] = useFonts({
  //     Roboto_700Bold,
  //   });

  //   if (!fontsLoaded) {
    //     return <AppLoading />;
    //   }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sua fonte do Google está funcionando!</Text>
    </View>
  );
}
