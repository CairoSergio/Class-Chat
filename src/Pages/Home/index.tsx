import React, { useEffect, useState,useLayoutEffect } from 'react';
import {Ionicons} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity,ScrollView,ActivityIndicator,Text, View , Image} from 'react-native';
import { styles } from './styles';
import axios from 'axios';
import firebase from '../../../Api/Config';
import endereco from '../../../Api/Porta.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id_pessoa: string;
  NomeDeUsuario: string;
};
export default function Home({ navigation }) {
  const [allusers, setallusers] = useState<User[]>([])
  const [images, setImages] = useState<Record<string, string>>({});
  const [ currentid, setcurrentid] = useState<number>()
  const [ LoadUsers, setLoadUsers ] = useState<boolean>(false)
  const [ Loading, setLoading ] = useState<boolean>(true)
  const getid = () =>{
    AsyncStorage.getItem('ChatClass').then(( dados: any)=>{
      setcurrentid(dados)
    })
  }
  const getallusers = async () => {
    try {
      const response = await axios.get(`${endereco[0].porta}/allFilteredusers/${currentid}`);
      setallusers(response.data);
      setLoadUsers(false)
    } catch (error) {
      console.log(error)
    }
  };
  
  const loadImages = async () => {
    for (let i = 0; i < allusers.length; i++) {
      const user = allusers[i];
      await imageProfile(user.id_pessoa);
    }
  };
  const imageProfile = async (id: string) => {
    const filename = `${id}.perfil`;
    const storageRef = firebase.storage().ref().child(filename);
    return new Promise<string>((resolve, reject) => {
      storageRef
        .getDownloadURL()
        .then((url) => {
          setImages((images) => ({ ...images, [id]: url }));
          resolve(url);
          setLoading(false)
        })
        .catch((error) => {
          console.error("Erro ao obter URL de download da imagem:", error);
          reject(error);
        });
    });

  };
  async function Adicionar(receptor: number){
    try {
      setLoadUsers(true)
      const response = await axios.post(`${endereco[0].porta}/pedido`,{
        Remitente: currentid,
        Receptor: receptor,
      });
      alert('adicionado')
      getallusers();
    } catch (error) {
      console.log(error)
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ borderBottomColor:'#ccc',flexDirection: 'row', alignItems: 'center', width:'95%',justifyContent:'space-between' }}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.text}>Chat</Text>
              <Text style={[styles.text, {color:'#007fff'}]}>Class</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="md-search-outline" size={24} color='#4fa6fd' />
            </TouchableOpacity>            
        </View>
        
        ),
      });
    }, [navigation]);
    useEffect(() => {
      if (currentid) {
        getallusers();
      }
    }, [currentid]);
      
    useEffect(()=>{
      getallusers()
      loadImages()
      getid()
    },[])
    if(![images].length){
      loadImages()
    }
    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     getallusers()
    //   }, 50000);
    //   return () => clearInterval(intervalId);
    // }, []);
    if (Loading) {
      return(
        <View style={{justifyContent:'center', alignItems:'center', height:'90%', width:'100%'}}>
          <ActivityIndicator size={60} color='#007fff'/>
        </View>
      )
    }

  return (
    <ScrollView style={styles.container}>
      {
        allusers.length > 0 ? (
          <Text style={{fontFamily:"noto", fontSize:12, padding:10}}>Veja pessoas que voçê talvez conheça.</Text>

        ) : (<></>)
      }
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.people}>
        {
          allusers.map((users:any,i)=>( 
            <View style={{justifyContent:'center', alignContent:'center', flexDirection:'row'}} key={i}>
              <View style={styles.userinfo}>
                <View style={styles.fotodeperfil}>
                  {images[users.id_pessoa] ? (
                    <Image source={{uri: images[users.id_pessoa]}} style={{width:'100%', height:'100%'}}/>
                  ) : (
                    <ActivityIndicator size={25} color='#fff'/>
                  )}
                </View>
                <Text style={styles.username}>{users.NomeDeUsuario}</Text>
                <TouchableOpacity onPress={()=>Adicionar(users.id_pessoa)} style={{justifyContent:'center', alignItems:'center',width:'90%', backgroundColor:'#007fff', padding:6,marginTop:5, borderRadius:5}}>
                  {
                    LoadUsers ? (
                      <ActivityIndicator color='#fff' size={18}/>
                    ) :
                    (
                      <Text style={{color:"#fff",fontFamily:"roboto-bold",fontSize:12}}>Adicionar</Text>
                    )
                  }
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>
      <StatusBar/>
    </ScrollView>
  );
}