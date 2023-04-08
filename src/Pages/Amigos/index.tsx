import React, { useEffect, useState, Component } from 'react';
import { ScrollView, Text,RefreshControl, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import endereco from '../../../Api/Porta.json'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat'; '../../../Api/Config'
import { Ionicons } from '@expo/vector-icons'

type amigos = {
  id_pessoa: string,
  NomeDeUsuario: string,
  VistoPorUltimo: string,
  status: string
}
export default function Amigos({navigation}) {
  const [ Amigos, setAmigos ] = useState<amigos[]>([])
  const [ currentId, setcurrentId] = useState<string>()
  const [userimages, setUserImages] = useState<Record<string, string>>({});
  const[ loading, setLoading] = useState<boolean>(true)
  const[ online, setOnline] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState(false);

  AsyncStorage.getItem('ChatClass').then((values)=>{
    setcurrentId(values)
  })
  const handleRefresh = async () => {
    setRefreshing(true);
    const data = new Date();
    try {
      const response = await axios.put(`${endereco[0].porta}/active/${currentId}`);
      const res =  await axios.put(`${endereco[0].porta}/visto/${currentId}`);
      console.log('esse')
    }catch(err){
      console.log(err)
    }
    fetchData().then(() => {
      setRefreshing(false);
    });
  };

  const loadUserImages = async () => {
    for (let i = 0; i < Amigos.length; i++) {
      const user = Amigos[i];
      await UserimageProfile(user.id_pessoa);
    }
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
          setLoading(false)
        })
        .catch((error) => {
          console.error("Erro ao obter URL de download da imagem:", error);
          reject(error);
        });
    });
  }
  const GetAllAmigos = async () =>{
    try{
      const respose  = await axios.get(`${endereco[0].porta}/amigos/${currentId}`)
      setAmigos(respose.data)
    }catch(err){

    }
  }
  const fetchData = async () =>{
    await GetAllAmigos()
    await loadUserImages()
  }
  useEffect(()=>{
    if(loading){
      GetAllAmigos()
      loadUserImages()
    }
  },[])

  useEffect(() => {
    async function Load(){
      const data = new Date();
      try {
        const response = await axios.put(`${endereco[0].porta}/active/${currentId}`);
        const re =await  axios.put(`${endereco[0].porta}/visto/${currentId}`);
        if(Amigos){
          const respose  = await axios.get(`${endereco[0].porta}/amigos/${currentId}`)
          setAmigos(respose.data)
        }
      }catch(err){
        console.log(err)
      }
    }
    const intervalId = setInterval(Load, 10000)
    return () => clearInterval(intervalId);
  }, []);
  return (
    <ScrollView style={styles.container}
    showsVerticalScrollIndicator={false}
    onScroll={({ nativeEvent }) => {
      // Verifica se o usuário está próximo ou no topo da tela
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
        Amigos.map((user,i)=>(
          <View key={i} style={styles.userinfo}>
            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
              <View style={styles.fotodeperfil}>
                {userimages[user.id_pessoa] ? (
                  <Image source={{uri: userimages[user.id_pessoa]}} style={{width:'100%', height:'100%'}}/>
                  ) : (
                    <ActivityIndicator size={25} color='#fff'/>
                    )}
                </View>
                <View style={{flexDirection:'column'}}>
                  <Text style={{marginLeft:10, fontFamily:'roboto-bold'}}>{user.NomeDeUsuario}</Text>
                  {
                    user.status === "online" ? (
                      <Text style={{marginLeft:10, fontSize:12,fontFamily:'roboto-bold', color:'#007fff'}}>Online</Text>
                    ) : (
                      <Text style={{marginLeft:10, fontSize:12, marginTop:6,fontFamily:'noto-bold'}}>
                        <Text style={{fontFamily:'noto'}}>Visto por ultimno: </Text>
                        {new Date(user.VistoPorUltimo).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).slice(0, -3)}
                      </Text>
                    )
                  }

                </View>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Conversas')} style={{width:40, justifyContent:'center',alignItems:"center",height:40, backgroundColor:"#007fff", borderRadius:10}}>
              <Ionicons name='chatbox-ellipses' size={20} color='#fff'/>
            </TouchableOpacity>
          </View>
        ))
      }
    </ScrollView>
  );
}
