import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, TextInput, ScrollView, FlatList, Modal, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { Ionicons } from "@expo/vector-icons";
import Cidades from 'country-json/src/country-by-capital-city.json';
import {Calendar} from 'react-native-calendars';

export default function UserConfirme() {
  const [image, setImage] = useState(null);
  const [ userNome, setUserNome]= useState('')
  const [ userCity, setUserCity]= useState('')
  const [ citylist, setcityList]= useState('')
  const [ coutrylist, setcoutryList]= useState('')
  const [ list, setList ] = useState(false)
  const [ modal, setModal]= useState(false)
  const cidades = [...Cidades]
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  function Handlecreate(){
    for (var i = 0; i < cidades.length; i++){
      let cidade = `${cidades[i].city.toLowerCase()}, ${cidades[i].country.toLowerCase()}`
      // console.log(cidade,userCity.toLowerCase())
      if (cidade.includes(userCity.toLowerCase())){
        alert("certo");
        return;
      }
      alert("A sua localização não esta disponivel na nossa lista de localizações permitidas, experimente a capital do seu pais");

    }
  }
  const [filteredData, setFilteredData] = useState(cidades);

  const handleSearch = (searchText) => {
    setUserCity(searchText);
    setFilteredData(
      cidades.filter(
        (item) => {
         item.country.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        }
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
      return(
        <TouchableOpacity style={{height:40}} onPress={HandleCity}>
          <Text>{citylist}, {coutrylist}</Text>
        </TouchableOpacity>
      )

    }else{
      setcityList('')
      setcoutryList('')
    }
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
            <Ionicons name='add-circle' color='#007fff' size={34}/>
          </View>
        </TouchableOpacity>
        <Text style={styles.perfiltext} >Foto de perfil</Text>
      </View>
      <View style={styles.inputcontainer}>
        <View  animation={'fadeInLeft'} delay={500}  style={styles.InputBox}>
          <Text style={styles.inputtext}>Nome de usuario</Text>
          <TextInput placeholder='Insira o seu nome' 
            style={ styles.input}
            value={userNome}
            onChangeText={setUserNome}
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
        <View animation={'fadeInLeft'} delay={1500} style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity style={styles.login} onPress={Handlecreate}>
              <Text style={styles.logintext}>CRIAR CONTA</Text>
          </TouchableOpacity>
          {
            list && 
              <View style={styles.FlatList}>
                <ScrollView style={{width:'90%', backgroundColor:'#fff',elevation:5, borderRadius:5, padding:10}}>
                  <FlatList
                    initialNumToRender={20}
                    data={filteredData}
                    renderItem={handleverify}
                    keyExtractor={(item,index) => index}
                  />
                </ScrollView>
              </View>
          }
          <TouchableOpacity onPress={()=>setModal(true)} style={styles.login}>
            <Text style={styles.logintext}>Calendario</Text>
          </TouchableOpacity>
          <Modal visible={modal}>
            <Calendar/>
          </Modal>
        </View>
      </View>
    </View>
  );
}