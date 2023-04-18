import React, { useEffect, useState,useLayoutEffect } from 'react';
import {Ionicons} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity,RefreshControl,ScrollView,ActivityIndicator,Text, View , Image} from 'react-native';
import { styles } from './styles';
import axios from 'axios';
import firebase from '../../../Api/Config';
import endereco from '../../../Api/Porta.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopTabNavigator from '../MaterialTopNavigator';
type User = {
  id_pessoa: string;
  NomeDeUsuario: string;
};
export default function Home({ navigation }) {
  const [allusers, setallusers] = useState<User[]>([])
  const [userimages, setUserImages] = useState<Record<string, string>>({});
  const [ currentid, setcurrentid] = useState<string>()
  const [refreshing, setRefreshing] = useState(false);
  const [ LoadUsers, setLoadUsers ] = useState<boolean>(false)
  const [ Loading, setLoading ] = useState<boolean>(true)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ borderBottomColor:'#ccc',flexDirection: 'row', alignItems: 'center', width:'95%',justifyContent:'space-between' }}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.text}>Chat</Text>
              <Text style={[styles.text, {color:'#007fff'}]}>Class</Text>
            </View>
            <TouchableOpacity  onPress={()=> navigation.navigate('Pesquisar')}>
              <Ionicons name="md-search-outline" size={24} color='#4fa6fd' />
            </TouchableOpacity>            
        </View>
        
        ),
      });
    }, [navigation]);
    const handleRefresh = () => {
      setRefreshing(true);
      fetchData().then(() => {
        setRefreshing(false);
      });
    };

    
    const loadUserImages = async () => {
      for (let i = 0; i < allusers.length; i++) {
        const user = allusers[i];
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
  
    };
    const getid = () =>{
      AsyncStorage.getItem('ChatClass').then(( dados: any)=>{
        setcurrentid(dados)
      })
    }
    const getallusers = async () => {
      try {
        const response = await axios.get(`${endereco[0].porta}/allFilteredusers/${currentid}`)
        setallusers(response.data)
        setLoadUsers(false)
      } catch (error) {
        return;
      }
    };

    async function Adicionar(receptor: number){
      try {
        setLoadUsers(true)
        const response = axios.post(`${endereco[0].porta}/pedido`,{Remitente: currentid,Receptor: receptor,})
        alert('adicionado');
        getallusers();
      } catch (error) {
        console.log(error)
      }
    }
    const updateStatus = async (id: string) => {
      try {
        const response = await axios.put(`${endereco[0].porta}/active/${id}`);
        console.log(`page material Status atualizado para o usuário com ID ${id}`);
      } catch (error) {
        console.log(`Erro ao atualizar status do usuário com ID ${id}:`, error);
      }
    };
    
    
    const fetchData = async () => {
      await Promise.all([getid(), updateStatus(currentid)]);
    };
    useEffect(() => {
      fetchData();
      if (currentid===''){
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
      }
    }, []);
    
    useEffect(() => {
      if (Object.keys(userimages).length < 10) {
        fetchData();
        getallusers();
      }
    }, [userimages]);
    useEffect(()=>{
      getid()
      updateStatus(currentid)
    },[currentid])
    // useEffect(() => {
    //   const update = setInterval(() => {
    //     console.log(currentid)
    //     updateStatus(currentid);
    //   }, 20000);
    //   return () => clearInterval(update);
    // },[]);
    
      
  return (
    <View style={styles.container}>
      <TopTabNavigator/>
      <StatusBar/>
    </View>
  );
}