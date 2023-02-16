import { StyleSheet } from "react-native";
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
export default function Load (){
    let [fontsLoaded] = useFonts({
      Roboto_700Bold,
      Roboto_100Thin,
      Roboto_900Black,
    });
    
    if (!fontsLoaded) {
      return <AppLoading />;
    }
  }
export  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#fff'
    },
    text: {
      fontFamily: 'Roboto_700Bold',
    },
    perfil:{
      marginTop:5,
      height:130,
      width:130,
      borderRadius:75,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center',
      borderWidth:4,
      borderColor:'#007fff',
    },
    perfiltext:{
      fontFamily:"Roboto_700Bold",
      fontSize:20,
      marginTop:10,
    },
    InputBox:{
      height:80,
      marginBottom:5,
      marginTop:5,
      width:'90%',
    },
    input:{
      width:'100%',
      height:50,
      padding:10,
      borderRadius:7,
      borderWidth:2,
    },
    inputtext:{
      fontSize:18,
      fontFamily:'Roboto_700Bold',
      marginBottom:5
    },
    inputcontainer:{
      width:'100%',
      alignItems:'center',
      marginTop:10,
    },
    login:{
      width:'90%',
      height:50,
      backgroundColor:'#007fff',
      borderRadius:7,
      marginTop:20,
      alignItems:'center',
      justifyContent:'center'
    },
    logintext:{
      color:'#fff',
      fontFamily:'Roboto_700Bold',
      fontSize:18
    },
    FlatList:{
      position:'absolute',
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      zIndex:1000,
      top:-200,
      maxHeight:110
    }
  });