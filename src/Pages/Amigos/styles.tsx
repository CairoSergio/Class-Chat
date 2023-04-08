import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
      width:"100%",
      flex:1,
    },
    text: {
      fontFamily: 'roboto-bold',
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
    userinfo:{
        justifyContent:'space-between',
        display:'flex',
        flexDirection:'row',
        width:'95%',
        alignSelf:'center',
        marginBottom:10,
        marginTop:10,
        alignItems:'center'
    },

});
  