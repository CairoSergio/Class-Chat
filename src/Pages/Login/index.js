import React, { useEffect, useState } from 'react';
import {Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable'
import { useNavigation} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Roboto_700Bold_Italic,Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function Login() {
    const navigation = useNavigation();
    const [ userEmail, setUserEmail] = useState('')
    const [ userSenha, setUserSenha] = useState('')
    const [eye, setEye]= useState(true)
    function handlecadastro(){
        navigation.navigate('SignIn')
    }
    let [fontsLoaded] = useFonts({
        Roboto_700Bold_Italic,
        Roboto_700Bold
      });
    
      if (!fontsLoaded) {
        return null;
    }
    const handelLogin = () =>{
        // AsyncStorage.getItem('ChatClass').then((value)=>{
        //     const Values = JSON.parse(value)
        //     console.log(Values[1].id)
        // })

        // let Values = [
        //     {
        //         email: userEmail,
        //         senha: userSenha,
        //     }
        // ]
        // Values.push({id:1})
        // AsyncStorage.setItem('ChatClass',JSON.stringify(Values));
        alert('salvos')
    }

    return (
        <View style={styles.container}>
            <View style={styles.titlecontainer}>
                <View style={styles.title}>
                    <Animatable.Text delay={900} animation={'fadeInLeft'} style={styles.text}>Chat</Animatable.Text>
                    <Animatable.Text delay={900} animation={'fadeInRight'} style={[styles.text, {color:'#007fff'}]}>Class</Animatable.Text>
                </View>
            </View>

            <Animatable.View style={styles.InputContainer} animation="bounceIn" iterationCount={1} delay={900}>
                <View style={styles.InputBox}>
                    <Text style={styles.inputtext}>Email</Text>
                    <TextInput placeholder='Insira o seu E-mail' 
                        style={ styles.input}
                        value={userEmail}
                        onChangeText={setUserEmail}
                    />
                </View>
                <View style={styles.InputBox}>
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
                    <TextInput placeholder='Insira a sau Senha' 
                        style={ styles.input}
                        value={userSenha}
                        onChangeText={setUserSenha}
                        secureTextEntry={eye}
                    />
                </View>
                <View style={styles.pass}>
                    <Text>Esqueceu a sua senha?</Text>
                    <TouchableOpacity>
                        <Text style={{color:'#007fff', marginLeft:5}}>Clique aqui.</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.login} onPress={handelLogin}>
                    <Text style={styles.logintext}>LOGIN</Text>
                </TouchableOpacity>
                <View style={[styles.pass, { top:'13%'} ]}>
                    <TouchableOpacity
                    onPress={handlecadastro}>
                        <View style={{display:'flex', flexDirection:'row'}}>
                            <Text>Não tem uma conta?</Text>
                            <Text style={{color:'#007fff', marginLeft:5}} 
                            >Criar conta.</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        <StatusBar backgroundColor='#fff' barStyle={'dark-content'}/>
        </View>
    );
}
