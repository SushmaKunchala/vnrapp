import React from "react";
import { Text,View,StyleSheet,FlatList,Image,TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';

function CategoryView(props)
{
    const navigation = useNavigation();

    return <View>
    <View style={{marginTop:20, alignItems:'center'}}>
    <Text style={{ fontSize:20}}> {props.heading} </Text>
    </View>

    <Image style={styles.image} source={{uri : props.image}} />

 <FlatList data={props.categories} keyExtractor={item=>item.id} renderItem={itemData=>
 <TouchableOpacity onPress={()=>{navigation.navigate('categoryDetailsScreen',{name:itemData.item.name})}}><View style={styles.blocks} ><Text style={{fontSize:20}} >
     {itemData.item.name}</Text></View>
     </TouchableOpacity>} />

     </View>
}
export default CategoryView;

const styles=StyleSheet.create({
    blocks:{
        flex:1,
        backgroundColor:'#FF4949',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        margin:10,
        borderRadius:20,
    },
    
    image:{
        width:'60%',
        height:300,
        borderRadius:20,
        marginHorizontal:80,
        marginVertical:20,
    }
});