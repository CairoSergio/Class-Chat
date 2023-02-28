import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('ChatScreen');
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./assets/whatsapp-logo.png')} />
      <Text style={{ fontSize: 20, marginTop: 10 }}>from meta</Text>
    </View>
  );
};

export default SplashScreen;
