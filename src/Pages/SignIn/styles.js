import { useFonts, Roboto_700Bold ,Roboto_900Black} from '@expo-google-fonts/roboto';
import { AppLoading } from 'react-native'
import { StyleSheet } from 'react-native';
export default function Load (){
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_100Thin,
    Roboto_900Black,
  });
  
  if (!Load) {
    return <AppLoading />;
  }
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  titlecontainer:{
    flex:1,
    alignItems:'center',
    marginTop:30,
  },
  title:{
    display:'flex',
    flexDirection:'row'
  },
  text: {
    fontFamily: 'Roboto_700Bold',
    fontSize:40
  },
  Login:{
    marginTop:10,
    fontSize:18,
    fontFamily:'Roboto_700Bold',
  },
  InputContainer:{
    width:'90%',
    marginTop:20,
    flex:7
  },
  InputBox:{
    height:80,
    marginBottom:5,
    marginTop:5,
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
  pass:{
    display:'flex',
    flexDirection:'row',
    marginTop:10,
    justifyContent:'center'
  },
  login:{
    width:'100%',
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
  eyes:{
    backgroundColor:'#fff',
    borderRadius:10,
    position:'absolute',
    zIndex:100,
    bottom:2,
    height:45,
    width:40,
    alignItems:'center',
    justifyContent:'center',
    right:3,
  
  }
  
});
