import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

const SplashScreen = ({ navigation }) => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginTop: 10 }}>from meta</Text>
    </View>
  );
};

export default SplashScreen;
