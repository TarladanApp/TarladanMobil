/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container:{
        margin:10,
        width:Dimensions.get("window").width/5,
    },
    image:{
        height:Dimensions.get("window").height/9,
        width:Dimensions.get("window").width/5,
        borderRadius:5,
        
    },
    title:{
        fontSize:12,
        fontWeight:"500",
        marginLeft:5,
        alignContent:"flex-start",
        color:"black"
    },
})