import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
container: {
        flex:1,
        alignSelf: 'center',
        width:"100%",
    },
    text: {
        fontSize:20,
        fontFamily: 'roboto-bold',
    },
    people:{
        height:30,
        width:'95%',
        alignSelf:'center',
    },
    userinfo:{
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
        width:100, 
    },
    fotodeperfil:{
        height:65, 
        width:65,
        alignItems:"center",
        justifyContent:'center',
        borderRadius:100, 
        overflow:'hidden', 
        backgroundColor:'#f50'
    }  ,
    username:{
        fontFamily:'roboto-bold', 
        fontSize:10, 
        marginTop:8
    }
})