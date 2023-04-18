import React, { useEffect, useState } from 'react';
import {Text, View, StatusBar, TextInput,Alert, TouchableOpacity,ActivityIndicator, Modal } from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable'
import { useNavigation} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import porta from '../../../Api/Porta.json'
import firebase from '../../../Api/Config'
export default function Login({onLoginSuccess}) {
    const portaatual = [...porta]
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [ userEmail, setUserEmail] = useState('')
    const [ userSenha, setUserSenha] = useState('')
    const [eye, setEye]= useState(true)
    function handlecadastro(){
        navigation.navigate('SignIn')
    }
    const handelLogin = async () =>{
        setLoading(true)
        if(userEmail==='' || userSenha===''){
            Alert.alert('Erro', 'Preecha todos os campos')
            setLoading(false)
        }else{
            setLoading(true);
            try {
                const response = await axios.post( `${portaatual[0].porta}/verify`, {
                    Email: userEmail,
                    Senha: userSenha
                });
                const id = response.data[0].id;
                const filename = `${id}.perfil`;
                const storageRef = firebase.storage().ref().child(filename);
                await storageRef.getDownloadURL().then(url => {
                    AsyncStorage.setItem('Imagem', url.toString())
                }).catch(error => {
                    console.error('Erro ao obter URL de download da imagem:', error);
                });
                setLoading(false);
                await AsyncStorage.setItem('ChatClass',id.toString()).then(()=>{
                    onLoginSuccess();
                })
            }
            catch {
                alert('Erro ao verificar');
                setLoading(false);
            }
        }
    }

    return (
        <View style={styles.container}>
        <Modal transparent visible={loading} style={{justifyContent:'center',flex:1, alignItems:'center'}}>
            <View style={{width:'100%',height:'100%',justifyContent:'center', alignItems:'center'}}>
                <View style={{padding:30,borderRadius:10,justifyContent:'center', alignItems:'center', backgroundColor:'#fff', elevation:15, width:"80%"}}>
                    <ActivityIndicator size={40} color="#007fff"/>
                    <Text style={{fontFamily:'roboto-bold',marginTop:25}}>Aguarde.....</Text>
                </View>
            </View>
        </Modal>
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
