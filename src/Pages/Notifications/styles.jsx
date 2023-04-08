import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
container: {
    flex: 1,
    alignSelf: 'center',
    width:'100%',
    alignItems:'center',
    backgroundColor:"#fff"
  },
  text: {
    fontFamily: 'roboto-bold',
    marginTop:30,
    fontSize:22,
    width:'95%',
    padding:8
  },
  fotodeperfil:{
    height:65, 
    width:65,
    alignItems:"center",
    justifyContent:'center',
    borderRadius:100, 
    overflow:'hidden', 
    backgroundColor:'#f50'
  },
  username:{
      fontFamily:'roboto-bold', 
      fontSize:10, 
      marginTop:8
  },
  userinfo:{
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    flexDirection:'column',
    width:100, 
  },
  optionview:{
    backgroundColor:'#e6e6e6',
    borderColor:'#7a7a7a99',
    width:"100%",
    borderWidth:1,
    padding:8,
    marginVertical:10,
  },
  header:{
    flexDirection:'row',
    width:'100%', 
  },
  headertitle:{
    justifyContent:'space-between',
    width:'95%', 
    alignItems:'center', 
    flexDirection:'row'
  },
  montante:{
    height:20, 
    width:20,
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:"#f50000", 
    borderRadius:20,
  },
  button:{
    marginTop:10,
    justifyContent:"center",
    width:'45%',
    height:40,
    borderRadius:5,
    borderWidth:1,
    alignItems:"center",
    borderColor:'#007fff'
  },
  fotodeperfil:{
    height:65, 
    width:65,
    alignItems:"center",
    justifyContent:'center',
    borderRadius:100, 
    overflow:'hidden', 
    backgroundColor:'#f50'
},
})