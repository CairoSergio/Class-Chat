import React from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'roboto-bold',

  },
});

export default function Pesquisar() {
  return (
    <ScrollView style={{flex:1, width:'100%', height:'100%'}}
    
    
    >
      <Text style={styles.text}>Sua fonte do Google está funcionando!</Text>
    </ScrollView>
  );
}
