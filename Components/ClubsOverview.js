import React from "react";
import { Text,View,StyleSheet,FlatList,Image,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

function ClubsOverview(props)
{
    const navigation = useNavigation();
    return <View>
    <View style={{marginTop:20, alignItems:'center'}}>
    <Text style={{ fontSize:20}}> {props.heading} </Text>
    </View>

    <Image style={styles.image} source={{uri : props.img}} />
 
 <FlatList data={props.clubslist} renderItem={itemData=>
 
    <TouchableOpacity   onPress={()=>{navigation.navigate('clubDetailsScreen',{dname:props.heading,name:itemData.item})}}><View style={styles.blocks}><Text style={{fontSize:20}} >{itemData.item}</Text></View>
     </TouchableOpacity>} />
     </View>
}
export default ClubsOverview;

const styles=StyleSheet.create({
    blocks:{
        backgroundColor:'#FF4949',
        marginBottom:10,
        borderRadius:20,
        alignItems:'center'
    },
    
    image:{
        width:'60%',
        height:300,
        borderRadius:20,
        marginHorizontal:80,
        marginVertical:20,
    }
});