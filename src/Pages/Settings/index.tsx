import React,{useState, useEffect} from 'react';
import { Image, Text, View,  TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import porta from '../../../Api/Porta.json'

export default function Stettings({onLoginOut}):JSX.Element{
  const [loading, setLoading] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [curreinfo, setCurrectinfo] = useState<string[]>([]);
  const portaatual = [...porta]
  const fetchProfileImage = async () => {
    try {
      const image = await AsyncStorage.getItem('Imagem');
      setProfileImage(image);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fectNameAndCity = async () =>{
    AsyncStorage.getItem('ChatClass').then(async (id)=>{
      try {
        const response = await axios.get(`${portaatual[0].porta}/getNome/${id}`);
        setCurrectinfo(response.data)
        console.log(response.data[0])
      } catch (error) {
        console.log(error);
      }
    })
  }
  useEffect(() => {
    fetchProfileImage();
    fectNameAndCity()
    console.log(curreinfo)
  }, []);
  
  if (loading) {
    return <ActivityIndicator />;
  }
  
  function Sair(){
    AsyncStorage.removeItem('Imagem')
    AsyncStorage.removeItem('ChatClass')
    onLoginOut();
  }
  return (
    <View style={styles.container}>
      <Text style={{fontFamily:'roboto-bold', marginTop:30,fontSize:25}}>Definições</Text>
      <View style={styles.header}>
        <View style={styles.info}>
          <View style={styles.image}>
            <Image source={{uri: profileImage}} style={{height:"100%", width:"100%"}}/>
          </View>
          <View style={{flexDirection:'column'}}>
          {curreinfo?.map((info:any, index) => (
            <View key={index}>
              <Text style={styles.username}>{info.NomeDeUsuario}</Text>
              <Text style={styles.usercity}>{info.Cidade}</Text>
            </View>
          ))}
          </View>
        </View>
        <TouchableOpacity onPress={Sair}>
          <Ionicons name='log-out-outline' size={30} color='#f50000'/>
        </TouchableOpacity>
      </View>
      <StatusBar/>
    </View>
  );
}
