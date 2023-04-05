import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  titlecontainer:{
    flex:1,
    marginTop:30,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    display:'flex',
    flexDirection:'row'
  },
  text: {
    fontFamily: 'roboto-bold',
    fontSize:40
  },
  Login:{
    marginTop:30,
    fontSize:25,
    fontFamily:'roboto-bold',
  },
  InputContainer:{
    width:'90%',
    marginTop:50,
    flex:4
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
    overflow:'hidden'
  },
  inputtext:{
    fontSize:18,
    fontFamily:'roboto-bold',
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
    marginTop:30,
    alignItems:'center',
    justifyContent:'center'
  },
  logintext:{
    color:'#fff',
    fontFamily:'roboto-bold',
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
