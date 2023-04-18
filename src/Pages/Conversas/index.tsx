import React,{ useEffect, useLayoutEffect, useState, useRef } from 'react';
import { TextInput, Text, View,RefreshControl, Keyboard,ScrollView, Image, BackHandler, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles';
import porta from '../../../Api/Porta.json'
import axios from 'axios';
interface Props {
  route: {
    params: {
      nome: string;
      foto: string;
      visualizacao: number;
      is: string
    }
  }
  navigation: any
}
// 😊 - Rosto sorridente com olhos felizes
// 👍 - Polegar para cima
// ❤️ - Coração vermelho
// 🤔 - Rosto pensativo
// 🤷 - Mulher dando de ombros
// 🙏 - Mãos postas em oração
// 😂 - Rosto rindo às lágrimas
// 🤗 - Rosto abraçando
// 👋 - Mão acenando
// 🌟 - Estrela brilhantev

export default function Conversas({ route, navigation,showbar, hidebar }){
  const { nome, foto, visualizacao, id, meuid } = route.params;
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [ todasmensagens, setTodasmensagens] = useState([])
  const scrollViewRef = useRef<ScrollView>(null);
  const handleBackPress = () => {
    showbar()
    navigation.goBack()
    setTodasmensagens([])
    return true;
  };
  const getMensagem = async () => {
    try{
      const response  = await axios.get(`${porta[0].porta}/mensagens/${meuid}/${id}`)
      setTodasmensagens(response.data)
    }catch(erro){
      console.log(erro)
    }
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);
  const hide =async () => {
    console.log('hiding....')
    const respose  = await axios.put(`${porta[0].porta}/mensagemvista/${meuid}/${id}`)
    console.log(respose.data)
  }
  useEffect(()=>{
    hidebar()
    getMensagem()
    hide();
  },[])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ borderBottomColor:'#ccc',flexDirection: 'row', alignItems: 'center', width:'100%' }}> 
          <TouchableOpacity onPress={()=>handleBackPress()} style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
            <Ionicons name='arrow-back' size={27} style={{marginRight:25}}/>
          </TouchableOpacity>
            <View style={{marginLeft:-20,width:47,height:47, overflow:'hidden',backgroundColor:"#f5a", borderRadius:50}}>
              <Image style={{width:'100%', height:'100%'}} source={{uri: foto}}/>
            </View>
          <View style={{flexDirection:'column'}}>
            <Text style={{fontFamily:'roboto-bold', marginLeft:8, fontSize:16}}>{nome}</Text>
            {
              visualizacao === 'online' ?(
                <Text style={{marginLeft:8, fontSize:12, marginTop:4,fontFamily:'noto-bold', color:'#007fff'}}>
                  online
                </Text>

              ) : (
                <Text style={{marginLeft:8, fontSize:12, marginTop:2,fontFamily:'noto-bold'}}>
                  {
                    new Date(visualizacao).getDate() == new Date().getDate() - 1 ? (
                      <Text style={{fontFamily:'noto'}}>Visto por ultimo ontem às: </Text>
                      ) : (new Date(visualizacao).getDate() == new Date().getDate())?(
                        <Text style={{fontFamily:'noto'}}>Visto por ultimo hoje às: </Text>
                        ) :(
                      <Text style={{fontFamily:'noto'}}>Visto por ultimo em {new Date(visualizacao).getDate()}/
                      {(new Date(visualizacao).getMonth() + 1).toString().padStart(2, '0')}/
                      {new Date(visualizacao).getFullYear().toString().slice(-2)} às: </Text>
                    )
                  }
                  {new Date(visualizacao).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).slice(0, -3)}
                </Text>
              )
            }
          </View>
        </View>
        ),
      });
    }, [navigation]);
    const handleRefresh = async () => {
      setRefreshing(true);
      hide()
      getMensagem().then(()=>{
        setRefreshing(false);
      })
    };
  const sendmessage =  async () =>{
    if(message.trim()===''){
      setMessage('')
      return;
    }else{
      Keyboard.dismiss()
      try{
        const response = await axios.post(`${porta[0].porta}/menssagem`,{
          Remitente: meuid,
          Receptor: id.toString(),
          Menssagem: message,
          Data: new Date(),
        })
        setMessage('')
        getMensagem()
      }catch(err){
        console.log(err)
      }
    }
  }
  return (
    <View style={{flex:1,paddingBottom:70, width:'100%'}}>
      <ScrollView
      style={{width:'95%', alignSelf:'center'}}
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
      onContentSizeChange={(contentWidth, contentHeight) => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }}
      ref={scrollViewRef}
      >
        <View style={{width:'90%',alignSelf:'center', marginTop:10,marginBottom:20,padding:5, backgroundColor:'#4d4d4d78', borderRadius:10}}>
          <Text style={{fontFamily:'noto', fontSize:12,color:'#fff',textAlign:'center',maxWidth:'100%', justifyContent:'center'}}>
            Envie mensagens para seus amigos e familiares de uma form 100% segura,
            As suas mensagens sao criptografadas de ponta-a-ponta.
          </Text>
        </View>
        {
          todasmensagens.map((message, i)=>(
            message.Receptor === meuid ? (
              <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}  key={i}>
                <View style={{width:45,height:45, marginRight:5,overflow:'hidden',backgroundColor:"#f5a", borderRadius:50}}>
                  <Image style={{width:'100%', height:'100%'}} source={{uri: foto}}/>
                </View>
                <View  style={styles.remitentemensagem}>
                  <Text style={styles.remitentetext}>{message.Menssangem}</Text>
                </View>
              </View>
            ) : (
              <View key={i} style={styles.minhamensagem}>
                <Text style={styles.meutext}>{message.Menssangem}</Text>
              </View>
            )
          ))
        }
      </ScrollView>
      <View style={styles.messagebox}>
        <View style={{alignItems:'flex-end',marginBottom:10, justifyContent:'center', flexDirection:'row', width:'100%'}}>
          <TextInput         
            multiline={true}
            value={message}
            onChangeText={(e)=>setMessage(e)}
            placeholder='Escreva a sua mensagem......' style={styles.input}
          />
          <TouchableOpacity onPress={sendmessage} style={styles.send}>
            <Ionicons  name='send' color='#fff' size={20}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
