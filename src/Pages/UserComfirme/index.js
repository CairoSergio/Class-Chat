import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, TextInput, ScrollView, FlatList, Modal, StatusBar, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { Ionicons } from "@expo/vector-icons";
import Cidades from '../../Cidades.json';
import {Calendar} from 'react-native-calendars';
import { useRoute } from '@react-navigation/native'
import { useFonts, Roboto_700Bold,Roboto_100Thin,Roboto_900Black } from '@expo-google-fonts/roboto';
import axios, { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import Porta from '../../../Api/Porta.json'
export default function UserConfirme({route,onLoginSuccess}) {
  const [ userApelido, setUserApelido ] = useState('')
  const [image, setImage] = useState(null);
  const [ userNome, setUserNome]= useState('')
  const [ userCity, setUserCity]= useState('')
  const [ citylist, setcityList]= useState('')
  const [ coutrylist, setcoutryList]= useState('')
  const [ list, setList ] = useState(false)
  const [ modal, setModal]= useState(false)
  const cidades = [...Cidades]
  const Portaatual = [...Porta]
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const day = new Date().getDate().toString().padStart(2, '0');
  const month = months[new Date().getMonth()];
  const year = new Date().getFullYear().toString();
  const [ data, setData] = useState(`${day} / ${month} / ${year}`)

  // const formattedDate = `${day}   /   ${month}   /   ${year}`;
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function Handlecreate() {
    if (userCity === '' || userNome === '' || userApelido === '') {
      alert('Todos os campos são obrigatórios.');
    } else {
      for (const cidade of cidades) {
        if (`${cidade.city.toLowerCase()}, ${cidade.country.toLowerCase()}` === userCity.toLowerCase()) {
          try {
            const response = await axios.post(`${Portaatual[0].porta}/userprivateinfo`,{
              Email: route.params.Userinfo.Email,
              Telefone: route.params.Userinfo.Telefone,
              Senha: route.params.Userinfo.Senha,
              Code: route.params.Userinfo.Code,
            });
            const identidae = await axios.post(`${Portaatual[0].porta}/getid`,{
              Email: route.params.Userinfo.Email,
              Code: route.params.Userinfo.Code,
            })
            const id = identidae.data[0].id;
            const imbasse64 = await FileSystem.readAsStringAsync(image, {
              encoding: FileSystem.EncodingType.Base64,
            });
            
            
            const imageBuffer = Buffer.from(imbasse64, 'base64');
            console.log('111')
            
            await axios.post(`${Portaatual[0].porta}/userinfo`, {
              id_pessoa: id.toString(),
              NomeDeUsuario:`${userNome} ${userApelido}`,
              Cidade: userCity,
              imagem: imageBuffer,
              DataDeNascimento: data,
            }, {
              responseType: 'arraybuffer'
            });
            
            alert('Conta criada com sucesso.');
            AsyncStorage.setItem('ChatClass', id.toString()).then(()=>{
              onLoginSuccess();
            })
            return;
          } catch (error){
            console.log(error),
            alert('Erro ao criar a conta.');
            return;
            
          }
        }
      }
      alert('Sua localização não está disponível na nossa lista de localizações permitidas. Tente a capital do seu país.');
    }
  }
  
  const [filteredData, setFilteredData] = useState(cidades);

  const handleSearch = (searchText) => {
    setUserCity(searchText);
    setFilteredData(
      cidades.filter(
        (item) => 
        // removendo todos os caracters especiais para que a pesquisa seja feita mesmo sem usa-los
          item.city.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          item.country.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
    );
    if(searchText){
      setList(true)
    }else{
      setList(false)
    };
  };
  const handleverify = ({item}) =>{
    function HandleCity(){
      let cidade = item.city
      let pais = item.country
      setUserCity(`${cidade}, ${pais}`)
      setList(false)
    }
    setcityList(item.city)
    setcoutryList(item.country)

    if(userCity){
      return (
        <TouchableOpacity style={{height:40}} onPress={HandleCity}>
          <Text>{citylist}, {coutrylist}</Text>
        </TouchableOpacity>
      );
    } else {
      setcityList('')
      setcoutryList('')
      return null; // return null if userCity is not set
    }
  }
  const handleDayPress = (day) => {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const { year, month, day: selectedDay } = day;
    setData(`${selectedDay} / ${meses[month-1]} / ${year}`);
    setModal(false)
  }
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.perfil} onPress={pickImage}>
          {image ? (
            <View style={{width:'100%', height:'100%',borderRadius:100, overflow:'hidden'}}>
              <Image source={{ uri: image }} style={{ width:'100%', height: '100%' }} />
            </View>
          ) : (
            <Ionicons name="person-circle-outline" size={110} color="#ccc" />
          )}
          <View style={{position:"absolute", backgroundColor:'#fff',borderRadius:20,bottom:4, right:-4}}>
            <Ionicons name='add-circle' color='#009fff' size={34}/>
          </View>
        </TouchableOpacity>
        <Text style={styles.perfiltext} >Foto de perfil</Text>
      </View>
      <View style={styles.inputcontainer}>
        <View  animation={'fadeInLeft'} delay={500}  style={styles.InputBox}>
          <Text style={styles.inputtext}>Nome</Text>
          <TextInput placeholder='Insira o seu nome' 
            style={ styles.input}
            value={userNome}
            onChangeText={setUserNome}
          />
        </View>
        <View  animation={'fadeInLeft'} delay={500}  style={styles.InputBox}>
          <Text style={styles.inputtext}>Apelido</Text>
          <TextInput placeholder='Insira o seu nome' 
            style={ styles.input}
            value={userApelido}
            onChangeText={setUserApelido}
          />
        </View>
        <View  animation={'fadeInLeft'} delay={500}  style={styles.InputBox}>
          <Text style={styles.inputtext}>Cidade atual</Text>
          <TextInput placeholder='Insira o seu nome' 
            style={ styles.input}
            value={userCity}
            onChangeText={handleSearch}
          />
        </View>
        <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
          <View style={styles.InputBox}>
            <Text style={styles.inputtext}>Data de nascimento</Text>
            <TouchableOpacity onPress={()=>setModal(true)} style={styles.data}>
              <Text style={styles.datatext}>{data}</Text>
              <Ionicons name='calendar' size={25} style={styles.datacalendar} color='#009fff'/>
            </TouchableOpacity>

          </View>
          <TouchableOpacity style={styles.login} onPress={Handlecreate}>
              <Text style={styles.logintext}>CRIAR CONTA</Text>
          </TouchableOpacity>
          {
            list && 
              <View style={styles.FlatList}>
                <FlatList style={{width:'90%', backgroundColor:'#fff',elevation:5, borderRadius:5, padding:10}}
                  initialNumToRender={20}
                  data={filteredData}
                  renderItem={handleverify}
                  keyExtractor={(item,index) => index}
                />
              </View>
          }
          <Modal visible={modal}>
            <Calendar
              onDayPress={handleDayPress}
            />
          </Modal>
        </View>
      </View>
    </View>
  );
}