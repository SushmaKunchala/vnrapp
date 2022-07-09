import React from "react";
import {View,Text,StyleSheet,Image,ScrollView,FlatList} from "react-native";

function MembersOverview(props)
{
    return <View>
        <View style={styles.text}><Text style={{fontWeight: "bold",fontSize:20}}>Members</Text></View>
   <ScrollView>
   
   <FlatList data={props.memberDetails} renderItem={itemData=>
    <View style={styles.view}>
        <Image style={styles.image} source={{uri : itemData.item.image}} />
        <View style={styles.subview}>
            <Text style={{fontWeight:'bold'}}>{itemData.item.position}</Text>
            <Text style={{marginTop:20}}>{itemData.item.name}</Text>
        </View>
    </View>
    }>
    </FlatList>

    <FlatList data={props.subMemberDetails} renderItem={itemData=>
    <View style={styles.view}>
        <Image style={styles.image} source={{uri : itemData.item.image}} />
        <View style={styles.subview}>
            <Text style={{fontWeight:'bold'}}>{itemData.item.position}</Text>
            <Text style={{marginTop:20}}>{itemData.item.name}</Text>
        </View>
    </View>
    }>
    </FlatList>

   </ScrollView>
   

    </View>;
}

export default MembersOverview;

const styles=StyleSheet.create({
    subview:{
        marginHorizontal:30,
        width:200,
        flexWrap:'wrap',
        alignItems: 'flex-start',
        marginVertical:30
    },
    view:{
        flexDirection:'row',
    },
    text:{
        alignItems:'center',
        marginBottom:10
    },
    heading:{
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        width:150,
        height:220,
        borderRadius:20,
        marginStart:30,
        
        marginBottom:30
    }
});