import React, { useState } from 'react';
import {Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from './styles';
import { useNavigation} from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
export default function SignIn() {
  const navigation = useNavigation();
  const [ userEmail, setUserEmail] = useState('')
  const [ userSenha, setUserSenha] = useState('')
  const [ userNome, setUserNome] = useState('')
  const [ userTelefone, setUserTelefone] = useState('')
  const handelLogin = () =>{
    AsyncStorage.getItem('ChatClass').then((value)=>{
      console.log(value)
    })

    // const Values = [
    //     {
    //       email: userEmail,
    //       senha: userSenha
    //     }
    // ];
      
    // AsyncStorage.setItem('ChatClass',JSON.stringify(Values));
    alert('salvos')
  }


  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <View style={styles.title}>
            <Animatable.Text animation={'fadeInLeft'} delay={500} style={styles.text}>Chat</Animatable.Text>
            <Animatable.Text animation={'fadeInRight'} delay={500} style={[styles.text, {color:'#007fff'}]}>Class</Animatable.Text>
        </View>
        <Animatable.Text animation="fadeInDown" style={styles.Login}>
          Cadastre-se
        </Animatable.Text>

      </View>
      <View style={styles.InputContainer}>
        <Animatable.View animation={'fadeInLeft'} delay={250} style={styles.InputBox}>
          <Text style={styles.inputtext}>Email</Text>
          <TextInput placeholder='Insira o seu E-mail' 
            style={ styles.input}
            value={userEmail}
            onChangeText={setUserEmail}
          />
        </Animatable.View>
        <Animatable.View  animation={'fadeInLeft'} delay={500}  style={styles.InputBox}>
          <Text style={styles.inputtext}>Telefone</Text>
          <TextInput placeholder='Insira o seu numero de telefone' 
              style={ styles.input}
              value={userNome}
              onChangeText={setUserNome}
          />
        </Animatable.View>
        <Animatable.View  animation={'fadeInLeft'} delay={750}  style={styles.InputBox}>
          <Text style={styles.inputtext}>Senha</Text>
          <TextInput placeholder='Insira o seu numero' 
              style={ styles.input}
              value={userTelefone}
              secureTextEntry={true}
              onChangeText={setUserTelefone}
          />
        </Animatable.View>
        <Animatable.View  animation={'fadeInLeft'} delay={1000}  style={styles.InputBox}>
          <Text style={styles.inputtext}>Confirmar</Text>
          <TextInput placeholder='Insira a sau Senha' 
              style={ styles.input}
              value={userSenha}
              onChangeText={setUserSenha}
              secureTextEntry={true}
          />
        </Animatable.View>
        <Animatable.View animation={'fadeInLeft'} delay={1500}>
          <TouchableOpacity style={styles.login} onPress={()=> navigation.navigate('UserComfirme')}>
              <Text style={styles.logintext}>CADASTRAR</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.pass}>
            <Text>Ja tem uma conta?</Text>
            <TouchableOpacity>
                <Text style={{color:'#007fff', marginLeft:5}} 
                    onPress={()=>navigation.navigate('Login')}
                >Entrar.</Text>
            </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
}