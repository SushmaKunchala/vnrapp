import React from "react";
import { Text,View,StyleSheet,FlatList,Image,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

function ClubDetailsOverview(props)
{
    const navigation=useNavigation();
    return <View>
    <View style={{marginTop:20, alignItems:'center'}}>
    <Text style={{ fontSize:20}}> {props.heading} </Text>
    </View>

    <Image style={styles.image} source={{uri : props.img}} />
 
 <FlatList data={props.clubDetails} renderItem={itemData=>
 
    <TouchableOpacity   onPress={()=>{
        switch(itemData.item)
        {
            case "About" : navigation.navigate('AboutScreen',{dname:props.dname,cname:props.cname,name:itemData.item});
                            break;
            case "Contact Details":  navigation.navigate('ContactDetailsScreen',{dname:props.dname,cname:props.cname,name:itemData.item});
                                     break;
            case "Events" : navigation.navigate('EventsScreen',{dname:props.dname,cname:props.cname,name:itemData.item}); 
                            break;
            case "Members" : navigation.navigate('MembersScreen',{dname:props.dname,cname:props.cname,name:itemData.item});
                            break;
            case "New Updates":navigation.navigate('NewUpdatesScreen',{dname:props.dname,cname:props.cname,name:itemData.item});
                                 break;
        }
    }}><View style={styles.blocks}><Text style={{fontSize:20}} >{itemData.item}</Text></View>
     </TouchableOpacity>} />
     </View>
}
export default ClubDetailsOverview;

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