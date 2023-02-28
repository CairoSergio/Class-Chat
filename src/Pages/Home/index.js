import React, { useEffect, useState } from 'react';
import { ActivityIndicator,StyleSheet, Text, View, Platform, Linking, AppLoading, Button, Image, StatusBar } from 'react-native';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Buffer} from 'buffer'
import port from '../../../Api/Porta.json'
import axios from 'axios';
import { encode } from 'base-64';

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
export default function Home() {

  const [loading, setLoading] = useState(false);
  const [ identity, setIDentity] = useState('')
  const [ nome, setNome] = useState('')
  const portaatual= port;
  
  const [imagem, setImagem] = useState(null);
  useEffect(() => {
    const idUser = AsyncStorage.getItem('ChatClass').then((value)=>{
      setIDentity(value)
    });
    axios.post(`${portaatual[0].porta}/getImage/${identity}`)
    .then((response) => {
      try {
        const imgData = new Uint8Array(response.data);
        setImagem(encode(String.fromCharCode.apply(null, imgData)));
        console.log(imgData);
      } catch (error) {
        console.error(error);
      }
    })
    .catch((error) => {
      console.error(error);
    });
    axios.post(`${portaatual[0].porta}/getNome/${identity}`)
    .then((response) => {
      console.log(response.data[0].NomeDeUsuario)
      setNome(response.data[0].NomeDeUsuario)
    })
    .catch((error) => {
      console.error(error);
    });
    
  }, []);

  const renderImage = () => {
    if (imagem) {
      return <Image source={{ uri: `data:image/jpeg;base64,${imagem}` }}style={{width:'90%',height:250}}/>;
    }
    return null;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home!</Text>
      {
        loading ? (
          <ActivityIndicator color='#fff' size={25}/>
        ):(
          <Button title='LogOut' />
        )
      }
      {renderImage()}
      <Text>{nome}</Text>
    </View>
  );
}

