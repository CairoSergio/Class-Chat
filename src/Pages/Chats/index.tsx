import React, { useEffect, useState } from 'react';
import { TouchableOpacity, RefreshControl,Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { styles } from '../Amigos/styles';
import { Ionicons } from '@expo/vector-icons'
import porta from '../../../Api/Porta.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import firebase from 'firebase/compat'; '../../../Api/Config'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'


type amigos = {
  id_pessoa: string,
  NomeDeUsuario: string,
  VistoPorUltimo: string,
  status: string,
  fotodeperfil: string,
}

type RootStackParamList = {
  Tela1: undefined
  Conversas: { nome: string, foto: string,  visualizacao: string, id: string , meuid: string}
}
type ConversasNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Conversas'>

export default function Chats() {
  const [ conversas, setConversas ] = useState<amigos []>([])
  const [ currentId, setcurrentId] = useState<string>('')
  const [userimages, setUserImages] = useState<Record<string, string>>({});
  const [naolidas, setNaolidas] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<ConversasNavigationProp>()
  const getConversas = async () =>{
    try{
      AsyncStorage.getItem('ChatClass').then(async (values)=>{
        setcurrentId(values)
        const respose  = await axios.get(`${porta[0].porta}/conversas/${values}`)
        setConversas(respose.data)
        loadUserImages()
        CountNaoVistas()
      })
    }catch(erro){
      console.log(erro)
    }
  }
    const loadUserImages = async () => {
      if(conversas.length > 0){
        for (let i = 0; i < conversas.length; i++) {
          const user = conversas[i];
          await UserimageProfile(user.id_pessoa);
        }
      }
  };
  const CountNaoVistas =  async ()=>{
    conversas.forEach((element,i)=>{
      AsyncStorage.getItem('ChatClass').then(async (values)=>{
        try{
          const respose  = await axios.get(`${porta[0].porta}/naovistas/${values}/${element.id_pessoa}`)
          setNaolidas((naolidas) => ({ ...naolidas, [element.id_pessoa]: respose.data[0].todos }))
        }catch(erro){
          console.log(erro)
        }
      })
    })
  }
  const handleRefresh = async () => {
    setRefreshing(true);
    fetchData().then(() => {
      setRefreshing(false);
    });
  };
  const UserimageProfile = async (id: string) => {
    const filename = `${id}.perfil`;
    const storageRef = firebase.storage().ref().child(filename);
    return new Promise<string>((resolve, reject) => {
      storageRef
        .getDownloadURL()
        .then((url) => {
          setUserImages((images) => ({ ...images, [id]: url }));
          resolve(url);
        })
        .catch((error) => {
          console.error("Erro ao obter URL de download da imagem:", error);
          reject(error);
        });
    });
  }
  const Conversar = (nome:string, foto:string, visualizacao: string, id:string) =>{
    navigation.navigate('Conversas', {nome: nome, foto:foto, visualizacao: visualizacao, id: id, meuid:currentId})
    
  }
  const fetchData = async () =>{
    await getConversas(),
    await loadUserImages(),
    await CountNaoVistas()
  }
  useEffect(()=>{
    getConversas()
    fetchData()
    CountNaoVistas()
  },[])
  useEffect(()=>{
    if (conversas.length < 0){
      console.log("procurando......")
      const intervalId = setInterval(fetchData, 1000);
      return () => clearInterval(intervalId);
    }
  },[])
  useEffect(()=>{
    getConversas()
    loadUserImages()
    const intervalId = setInterval(CountNaoVistas, 10000);
    return () => clearInterval(intervalId);
  },[conversas || currentId || naolidas])
  return (
    <ScrollView style={{flex:1, width:'100%', height:'100%'}}
    showsVerticalScrollIndicator={false}
    onScroll={({ nativeEvent }) => {
      if (nativeEvent.contentOffset.y == 0) {
        handleRefresh();
      }
    }}
    scrollEventThrottle={400}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
    }
    
    >
      {
        conversas.map((user, i)=>(
          <TouchableOpacity 
          key={i} 
          onPress={() => Conversar(user.NomeDeUsuario, userimages[user.id_pessoa], user.status === 'online' ? 'online' : user.VistoPorUltimo, user.id_pessoa)}
          style={styles.userinfo}>
            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
              <View style={styles.fotodeperfil}>
                {userimages[user.id_pessoa] ? (
                  <Image source={{uri: userimages[user.id_pessoa]}} style={{width:'100%', height:'100%'}}/>
                  ) : (
                    <ActivityIndicator size={25} color='#fff'/>
                    )}
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', width:'80%'}}>
                  <View style={{flexDirection:'column'}}>
                    <Text style={{marginLeft:10, fontFamily:'roboto-bold'}}>{user.NomeDeUsuario}</Text>
                    {
                      user.status === "online" ? (
                        <Text style={{marginLeft:10, fontSize:12,fontFamily:'roboto-bold', color:'#007fff'}}>Online</Text>
                      ) : (
                        <Text style={{marginLeft:10, fontSize:12, marginTop:6,fontFamily:'noto-bold'}}>
                          {
                            new Date(user.VistoPorUltimo).getDate() == new Date().getDate() - 1 ? (
                              <Text style={{fontFamily:'noto'}}>Visto por ultimo ontem às: </Text>
                              ) : (new Date(user.VistoPorUltimo).getDate() == new Date().getDate())?(
                                <Text style={{fontFamily:'noto'}}>Visto por ultimo hoje às: </Text>
                                ) :(
                              <Text style={{fontFamily:'noto'}}>Visto por ultimo em {new Date(user.VistoPorUltimo).getDate()}/
                              {(new Date(user.VistoPorUltimo).getMonth() + 1).toString().padStart(2, '0')}/
                              {new Date(user.VistoPorUltimo).getFullYear().toString().slice(-2)} às: </Text>
                            )
                          }
                          {new Date(user.VistoPorUltimo).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).slice(0, -3)}
                        </Text>
                      )
                    }
                  </View>
                  {
                    naolidas[user.id_pessoa] ? (
                      <View style={{height:25, width:25, borderRadius:20,backgroundColor:'red', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:"#fff", fontFamily:'roboto-bold'}}>{naolidas[user.id_pessoa]}</Text>
                      </View>
                    ):(
                      <></>
                    )
                  }
                </View>
            </View>
          </TouchableOpacity>
        ))
      }
    </ScrollView>
  );
}
