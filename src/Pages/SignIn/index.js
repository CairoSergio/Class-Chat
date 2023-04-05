import React, { useState } from 'react';
import {Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
export default function SignIn() {
  const navigation = useNavigation();
  const [ userEmail, setUserEmail] = useState('')
  const [ userSenha, setUserSenha] = useState('')
  const [eye, setEye]= useState(true)
  const [ confirmeSenha, setConfirmeSenha] = useState('')
  const [ userTelefone, setUserTelefone] = useState('')
  function gerarNumerosAleatorios() {
    return Math.floor(Math.random() * 10);
  }
  const NumerosAleatorios1 = gerarNumerosAleatorios();
  const NumerosAleatorios2 = gerarNumerosAleatorios();
  const NumerosAleatorios3 = gerarNumerosAleatorios();
  const NumerosAleatorios4 = gerarNumerosAleatorios();
  const Numeros = `${NumerosAleatorios1}${NumerosAleatorios2}${NumerosAleatorios3}${NumerosAleatorios4}`
  const handleSignin = () =>{
    if(userEmail==='' || userSenha===''|| userTelefone==='' || confirmeSenha===''){
      alert("Preeche todos os campos, Todos os campos sao de caracter obrigatorio!")
    }else{
      if(userSenha!=confirmeSenha){
        alert('Senha e comfirmaçao diferentes, certifiquesse de colocar a mesma senha')
      }else{
        if(userSenha.length<6){
          alert('A sua senha presisa ter no minimo 6 digitos')
        }else{
          navigation.navigate('UserComfirme',{Userinfo:{Email: userEmail, Telefone: userTelefone, Senha:userSenha, Code: Numeros}})
        }
      }
    }
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
              value={userTelefone}
              onChangeText={setUserTelefone}
              keyboardType='numeric'
          />
        </Animatable.View>
        <Animatable.View  animation={'fadeInLeft'} delay={750}  style={styles.InputBox}>
          <TouchableOpacity style={styles.eyes} onPress={()=>setEye(!eye)}>
              {
                  eye?
                  (
                      <Ionicons color="#007fff" name='eye-off' size={25}/>
                      
                  ):
                  (
                      <Ionicons color="#007fff" name='eye' size={25}/>
                  )
              }
          </TouchableOpacity>
          <Text style={styles.inputtext}>Senha</Text>
          <TextInput placeholder='Insira uma senha.....' 
              style={ styles.input}
              value={userSenha}
              secureTextEntry={eye}
              onChangeText={setUserSenha}
          />
        </Animatable.View>
        <Animatable.View  animation={'fadeInLeft'} delay={1000}  style={styles.InputBox}>
          <Text style={styles.inputtext}>Confirmar</Text>
          <TextInput placeholder='Comfirme a senha' 
              style={ styles.input}
              value={confirmeSenha}
              onChangeText={setConfirmeSenha}
              secureTextEntry={true}
          />
        </Animatable.View>
        <Animatable.View animation={'fadeInLeft'} delay={1500}>
          <TouchableOpacity style={styles.login} onPress={handleSignin}>
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