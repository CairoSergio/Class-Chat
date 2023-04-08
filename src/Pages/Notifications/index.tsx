import React, { useEffect, useState,useLayoutEffect} from 'react';
import { ScrollView, Text, View, RefreshControl,Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import {Ionicons} from '@expo/vector-icons'
import endereco from '../../../Api/Porta.json';
import axios from 'axios';
import * as Animatable from 'react-native-animatable'
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
    id_pessoa: string,
  }
  type userrecebido = {
    NomeDeUsuario: string,
    Cidade: string,
    id_pessoa: string,
  }
  type User = {
    id_pessoa: string;
    NomeDeUsuario: string;
  };
  const [pedidosRecebidos, setPedidosRecebidos] = useState(false);
  const [pedidosEnviados, setPedidosEnviados] = useState(false);
  const [allusers, setallusers] = useState<User[]>([])
  const [userimages, setUserImages] = useState<Record<string, string>>({});
  const [currentId, setCurrentId] = useState<string>();
  const [clickedid, setClickedid] = useState<string>();
  const [enviados, setEnviados] = useState<Envio[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [ LoadUsers, setLoadUsers ] = useState<boolean>(false)
  const [userEnviados, setUserEnviados] = useState<userenvios[]>([]);
  const [recebidos, setRecebidos] = useState<Recebido[]>([]);
  const [userRecebidos, setUserRecebidos] = useState<userrecebido[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loadingData, setLoadingData] = useState(true);
  const [ loadingdelet, setloadingdelete ] =useState<boolean>(false)
  const options = [
    { opcao: 'Pedidos recebidos', quantidades: userRecebidos.length},
    { opcao: 'Pedidos enviados', quantidades: userEnviados.length },
  ];

  const getId = async () => {
    try {
      const dados = await AsyncStorage.getItem('ChatClass');
      setCurrentId(dados);
    } catch (error) {
      console.error(error);
    }
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
        })
        .catch((error) => {
          console.error("Erro ao obter URL de download da imagem:", error);
          reject(error);
        });
    });

  };
  const getallusers = async () => {
    try {
      const response = await axios.get(`${endereco[0].porta}/allFilteredusers/${currentId}`)
      setallusers(response.data)
    } catch (error) {
      return;
    }
  };
  const getEnviados = async () => {
    try {
      const response = await axios.get(`${endereco[0].porta}/enviados/${currentId}`)
      setUserEnviados(response.data);
    } catch (error) {
      return;
    }
  };
  const getRecebidos = async () =>{
    try {
      const response = await axios.get(`${endereco[0].porta}/recebidos/${currentId}`)
      setUserRecebidos(response.data);
    } catch (error) {
      return;
    }
  }
  
  
  const open = (option: string) => {
    if (option === 'Pedidos recebidos') {
      setPedidosRecebidos(!pedidosRecebidos);
    }
    if (option === 'Pedidos enviados') {
      setPedidosEnviados(!pedidosEnviados);
    }
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    const data = new Date();
    try {
      const response = await axios.put(`${endereco[0].porta}/active/${currentId}`);
      const res =await  axios.put(`${endereco[0].porta}/visto/${currentId}`);
      console.log('esse')
    }catch(err){
      console.log(err)
    }
    fetchData().then(() => {
      setRefreshing(false);
    });
  };
  
  
  const loadImages = async () => {
    for (let i = 0; i < userEnviados.length; i++) {
      const user = userEnviados[i];
      await imageProfile(user.id_pessoa);
    }
    for (let i = 0; i < userRecebidos.length; i++) {
      const user = userRecebidos[i];
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
          setLoadingData(false)
        })
        .catch((error) => {
          console.log("Erro ao obter URL de download da imagem:", error);
          reject(error);
        });
    });

  };
  const addAmigo = async (id: string) =>{
    try{
      const response = await axios.post(`${endereco[0].porta}/addamigo`,{
        id_pessoa: currentId,
        id_amigo: id.toString()
      })
      const responsedelete = await axios.delete(`${endereco[0].porta}/rejectedpedido/${currentId}/${id}`)
      getRecebidos().then(()=>{
        alert("Amigo adicionado")
      })
    }catch(err){
      console.log(err)
    }
  }
  const fetchData = async () =>{
    await getId();
    await getEnviados();
    await getRecebidos();
    await loadImages();
    await getallusers();
    await loadUserImages();
  }
  
  useEffect(() => {
    fetchData();
    if (LoadUsers){
      const intervalId = setInterval(fetchData, 1000);
      try {
        const response = axios.put(`${endereco[0].porta}/active/${currentId}`);
        console.log('esse')
      }catch(err){
        console.log(err)
      }
      return () => clearInterval(intervalId);
    }
  }, []);
  
  useEffect(() => {
    if (Object.keys(userimages).length < 10) {
      fetchData();
      getallusers();
    }
  }, [userimages]);
  
  useEffect(() => {
    if (currentId) {
      fetchData();
      getallusers();
    }
  }, [currentId]);
  const cancelenvio = async (id:string) =>{
    setClickedid(id)
    setloadingdelete(true)
    try{
      const response = await axios.delete(`${endereco[0].porta}/delete/${currentId}/${id}`)
      await getallusers();
      await getEnviados();
      await fetchData().then(()=>{
        setloadingdelete(false)
        setClickedid('')
        alert('apagado')
      });
    }catch(erro){
      setClickedid('')
      setloadingdelete(false)
      alert('Erro ao canclar')
      console.log(erro)
    }
  }
  async function Adicionar(receptor: number){
    try {
      setLoadUsers(true)
      const response = axios.post(`${endereco[0].porta}/pedido`,{Remitente: currentId,Receptor: receptor,})
      alert('adicionado');
      getallusers();
      setLoadUsers(false);
      getEnviados();
    } catch (error) {
      console.log(error)
      setLoadUsers(false)
    }
  }
  const rejectpedido = async (id:string) =>{
    setClickedid(id)
    setloadingdelete(true)
    
    try{
      const response = await axios.delete(`${endereco[0].porta}/rejectedpedido/${currentId}/${id}`)
      getallusers()
      getRecebidos()
      setloadingdelete(false)
      setClickedid('')
      alert(response.data)
    }catch(erro){
      setClickedid('')
      setloadingdelete(false)
      alert('Erro ao Rejeitar')
      console.log(erro)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notificações</Text>
        <ScrollView 
        style={{width:'100%'}} 
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
            allusers.length > 0 ? (
              <Text style={{fontFamily:"noto", fontSize:12, padding:7, width:'95%'}}>Veja pessoas que você talvez conheça.</Text>
    
            ) : (<></>)
          }
          {
            allusers.length > 0 ? (
              <ScrollView horizontal style={{width:'95%', maxHeight:130}}>
                {
                  allusers.map((users:any,i)=>( 
                    <View style={{justifyContent:'center', alignContent:'center', flexDirection:'row'}} key={i}>
                      <View style={styles.userinfo}>
                        <View style={styles.fotodeperfil}>
                          {userimages[users.id_pessoa] ? (
                            <Image source={{uri: userimages[users.id_pessoa]}} style={{width:'100%', height:'100%'}}/>
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
            ) : (
              <></>
            )
          }
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
                      <TouchableOpacity onPress={()=> rejectpedido(user.id_pessoa)} style={[styles.button, { borderColor: '#f50000' }]}>
                        {
                          loadingdelet && (clickedid === user.id_pessoa) ? (
                            <Animatable.Text style={{ color: '#f50000', fontFamily: 'roboto-bold' }}>Rejeitando....</Animatable.Text>
                            ) :(
                            <Text style={{ color: '#f50000', fontFamily: 'roboto-bold' }}>Rejeitar</Text>
                          )
                        }
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>addAmigo(user.id_pessoa)} style={styles.button}>
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
                        <Text style={{ fontFamily: 'inter-regular' }}>Você enviou uma solicitação para <Text style={{ fontFamily: 'roboto-bold' }}>{user.NomeDeUsuario}.</Text></Text>
                        <Text style={{ fontFamily: 'inter-regular', color: '#646464' }}>{user.Cidade}</Text>
                      </View>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                      <TouchableOpacity onPress={() => cancelenvio(user.id_pessoa)} style={[styles.button, { width: '100%', borderColor: '#f50000' }]}>
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
