import React from "react";
import {View,Text,StyleSheet,ScrollView,FlatList} from "react-native";
import Unorderedlist from 'react-native-unordered-list';

function EventsOverview(props)
{

    return <ScrollView>
        <View style={styles.heading}><Text style={{fontWeight:'bold',fontSize:20}}>Events</Text></View>
        <FlatList data={props.eventDetails} renderItem={itemData =>
        <View  style={styles.list}><Unorderedlist><Text>{itemData.item.name}</Text></Unorderedlist></View>
    }>

    </FlatList>
    </ScrollView>
}

export default EventsOverview;

const styles=StyleSheet.create({
    heading:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
    },
    list:
    {
        marginTop:20,
        marginHorizontal:30
    }

});