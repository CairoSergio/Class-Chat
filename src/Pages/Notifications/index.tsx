import React, { useEffect, useState,useLayoutEffect} from 'react';
import { ScrollView, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import {Ionicons} from '@expo/vector-icons'
import endereco from '../../../Api/Porta.json';
import axios, { all } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../Api/Config';

export default function Notifications():JSX.Element {
  type Envio = {
    Receptor: string
  }
  type Recebido = {
    Remitente: string
  }
  type userenvios = {
    NomeDeUsuario: string,
    Cidade: string,
    id_pessoa: string
  }
  type userrecebido = {
    NomeDeUsuario: string,
    Cidade: string
    id_pessoa: string
  }
  const [pedidosRecebidos, setPedidosRecebidos] = useState(false);
  const [pedidosEnviados, setPedidosEnviados] = useState(false);
  const [currentId, setCurrentId] = useState<string>();
  const [clickedid, setClickedid] = useState<string>();
  const [enviados, setEnviados] = useState<Envio[]>([]);
  const [userEnviados, setUserEnviados] = useState<userenvios[]>([]);
  const [recebidos, setRecebidos] = useState<Recebido[]>([]);
  const [userRecebidos, setUserRecebidos] = useState<userrecebido[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loadingData, setLoadingData] = useState(true);
  const [ loadingdelet, setloadingdelete ] =useState<boolean>(false)
  const options = [
    { opcao: 'Pedidos recebidos', quantidades: recebidos.length },
    { opcao: 'Pedidos enviados', quantidades: enviados.length },
  ];

  const getId = async () => {
    try {
      const dados = await AsyncStorage.getItem('ChatClass');
      setCurrentId(dados);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getEnviados = async () => {
    try {
      const [response, responseReceived] = await Promise.all([
        axios.get(`${endereco[0].porta}/enviados/${currentId}`),
        axios.get(`${endereco[0].porta}/recebidos/${currentId}`)
      ]);
      setEnviados(response.data);
      setRecebidos(responseReceived.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getUserEnviados = async () => {
    try {
      const userEnviadosPromises = enviados.map(async (enviado) => {
        const response = await axios.get(`${endereco[0].porta}/userenvio/${enviado.Receptor}`);
        return response.data;
      });
      const userEnviados = await Promise.all(userEnviadosPromises);
      setUserEnviados(userEnviados.flat());
  
      const userRecebidosPromises = recebidos.map(async (recebido) => {
        const response = await axios.get(`${endereco[0].porta}/userenvio/${recebido.Remitente}`);
        return response.data;
      });
      const userRecebidos = await Promise.all(userRecebidosPromises);
      setUserRecebidos(userRecebidos.flat());
    } catch (error) {
      console.error(error);
    }
  };
  
  const open = (option: string) => {
    if (option === 'Pedidos recebidos') {
      setPedidosRecebidos(!pedidosRecebidos);
    }
    if (option === 'Pedidos enviados') {
      setPedidosEnviados(!pedidosEnviados);
    }
  };
  
  const loadImages = async () => {
    await Promise.all([
      ...enviados.map((user) => getImageProfile(user.Receptor)),
      ...recebidos.map((user) => getImageProfile(user.Remitente)),
    ]);
  };
  
  const getImageProfile = async (id: string) => {
    const filename = `${id}.perfil`;
    const storageRef = firebase.storage().ref().child(filename);
    try {
      const url = await storageRef.getDownloadURL().then((e)=>{
        setLoadingData(false)
        setImages((images) => ({ ...images, [id]: e }));
      });
      return url;
      
    } catch (error) {
      console.error("Erro ao obter URL de download da imagem:", error);
      throw error;
    }
  };
  
  const fetchData = async () =>{
    Promise.all([
      getId(),
      getEnviados(),
      getUserEnviados(),
      loadImages(),
    ]);
  }
  useEffect( () => {
    fetchData()
  },[]);
  useEffect(() => {
    if  (
      loadingData ||
      enviados.length !== userEnviados.length ||
      recebidos.length !== userRecebidos.length || 
      JSON.stringify([images]).length < 5) {
      const intervalId = setInterval(() => {
        getId(),
        getEnviados(),
        getUserEnviados(),
        loadImages()
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);
  if (loadingData ||
    enviados.length !== userEnviados.length ||
    recebidos.length !== userRecebidos.length || 
    JSON.stringify([images]).length < 5) {
    return (
      <View style={{justifyContent:'center', alignItems:'center', height:'90%', width:'100%'}}>
        <ActivityIndicator size={60} color='#007fff'/>
      </View>
    );
  }
  
  const cancelenvio = async (id:string) =>{
    setClickedid(id)
    setloadingdelete(true)
    try{
      const response = await axios.post(`${endereco[0].porta}/delete`,{
        Remitente: currentId,
        Receptor: id,
      })
      await fetchData().then(()=>{
        alert('apagado')
        setloadingdelete(false)
        setClickedid('')
      })
    }catch(erro){
      setClickedid('')
      setloadingdelete(false)
      alert('Erro ao canclar')
      console.log(erro)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notificações</Text>
        <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
          {
            options.map((item, i)=>(
              <View key={i} style={styles.optionview}>
                <View style={styles.header}>
                  <View style={styles.headertitle}>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontFamily:"roboto-bold",fontSize:16,marginRight:4}}>{item.opcao}</Text>
                      {
                        item.quantidades ? (
                          <View style={styles.montante}>
                            <Text style={{fontSize:13, color:'#fff',fontFamily:'roboto-bold'}}>{item.quantidades}</Text>
                          </View>
                        ) : (
                          <></>
                        )
                      }
                    </View>
                    <TouchableOpacity onPress={()=>open(item.opcao)} style={{height:30, alignItems:'center',justifyContent:'center',width:30, backgroundColor:"#007fff", borderRadius:40}}>
                      {
                        item.opcao=== 'Pedidos recebidos' ? (
                          (pedidosRecebidos && item.opcao==='Pedidos recebidos') ? (
                            <Text>
                              <Ionicons name='chevron-down' size={22} color='#fff'/>
                            </Text>
                          ) : (
                            <Text>
                              <Ionicons name='chevron-forward' size={22} color='#fff'/>
                            </Text>
                          )
                          ) : (
                            item.opcao === 'Pedidos enviados' ? (
                              (pedidosEnviados && item.opcao==='Pedidos enviados') ? (
                                <Text>
                                  <Ionicons name='chevron-down' size={22} color='#fff'/>
                                </Text>
                              ) : (
                                <Text>
                                  <Ionicons name='chevron-forward' size={22} color='#fff'/>
                                </Text>
                              )
                          ) : (
                              <Text>
                                <Ionicons name='chevron-forward' size={22} color='#fff'/>
                              </Text>

                          )
                        )
                      }
                    </TouchableOpacity>
                  </View>
                </View>
                {pedidosRecebidos && item.opcao === 'Pedidos recebidos' && userRecebidos.map((user, x) => (
                  <View key={x} style={{ width: '100%', marginTop: 15, flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <View style={styles.fotodeperfil}>
                        {images[user.id_pessoa] ? (
                          <Image source={{ uri: images[user.id_pessoa] }} style={{ width: '100%', height: '100%' }} />
                        ) : (
                          <ActivityIndicator size={25} color="#fff" />
                        )}
                      </View>
                      <View style={{ maxWidth: '75%', marginLeft: 10 }}>
                        <Text style={{ fontFamily: 'roboto-bold' }}>
                          {user.NomeDeUsuario}, <Text style={{ fontFamily: 'inter-regular' }}>Enviou-te uma solicitaçao de amizade.</Text>
                        </Text>
                        <Text style={{ fontFamily: 'inter-regular', color: '#646464' }}>{user.Cidade}</Text>
                      </View>
                    </View>
                    <View style={{ width: '95%', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                      <TouchableOpacity style={[styles.button, { borderColor: '#f50000' }]}>
                        <Text style={{ color: '#f50000', fontFamily: 'roboto-bold' }}>Rejeitar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button}>
                        <Text style={{ color: '#007fff', fontFamily: 'roboto-bold' }}>Aceitar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                {pedidosEnviados && item.opcao === 'Pedidos enviados' && userEnviados.map((user, j) => (
                  <View key={j} style={{ width: '100%', marginTop: 15, flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <View style={styles.fotodeperfil}>
                        {images[user.id_pessoa] ? (
                          <Image source={{ uri: images[user.id_pessoa] }} style={{ width: '100%', height: '100%' }} />
                        ) : (
                          <ActivityIndicator size={25} color="#fff" />
                        )}
                      </View>
                      <View style={{ maxWidth: '70%', marginLeft: 10, flexDirection: 'column' }}>
                        <Text style={{ fontFamily: 'inter-regular' }}>Voçê enviou uma solicitação para <Text style={{ fontFamily: 'roboto-bold' }}>{user.NomeDeUsuario}.</Text></Text>
                        <Text style={{ fontFamily: 'inter-regular', color: '#646464' }}>{user.Cidade}</Text>
                      </View>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                      <TouchableOpacity onPress={() => cancelenvio(user.id_pessoa)} style={[styles.button, { width: '90%', borderColor: '#f50000' }]}>
                        {
                          loadingdelet && (user.id_pessoa === clickedid) ?(
                            <Text style={{ color: '#f50000', fontFamily: 'roboto-bold' }}>Caregando.....</Text>

                          ):(

                            <Text style={{ color: '#f50000', fontFamily: 'roboto-bold' }}>Cancelar</Text>
                          )
                        }
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ))
          }
        </ScrollView>
    </View>
  );
}
