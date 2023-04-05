import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'95%',
        alignSelf:"center"
    },
    header:{
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderWidth:1,
        borderColor:'#007fff',
        marginTop:15,
        borderRadius:5,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    info:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
    },
    image:{
        marginRight:10,
        height:60,
        width:60,
        borderRadius:100,
        overflow:'hidden',
    },
    username:{
        fontFamily:'roboto-bold',
        fontSize:16
    },
    usercity:{
        color:"#484848",
        fontSize:12
    }
     
})