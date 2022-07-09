import React,{useState,useCallback} from "react";
import {View,TextInput,Text,StyleSheet,Button} from "react-native";
import * as categoryActions from "../Actions/Categoriesdata";
import {useDispatch} from "react-redux";


function AddEvents()
{
   const dispatch=useDispatch();
    const [showDate,setDate]=useState("");
    const [showEvent,setEvent]=useState("");
   
     function addDate(date)
  {
      setDate(date);
  }

  function addEvent(event)
  {
      setEvent(event);
  }


    return <View style={{marginTop:100}}>
        <View style={styles.inputs}>
            <Text>Enter event date</Text>
            <TextInput style={styles.inputBox} onChangeText={addDate}/>
        </View>
        <View style={styles.inputs}>
            <Text>Enter Event</Text>
        <TextInput style={{...styles.inputBox,height:100}} onChangeText={addEvent}/>
        </View>
        <View  style={styles.button} ><Button onPress={()=>{
            dispatch(categoryActions.addEvent(showDate,showEvent))}} title="Add Event"></Button></View>
    </View>
}

const styles=StyleSheet.create({
    inputs:{
        width:"80%",
        marginHorizontal:40
    },
    inputBox:{
        borderColor:'black',
        borderWidth:1,
        borderRadius:10,
        marginVertical:10
    },
    button:{
        marginHorizontal:100,
        marginTop:20
    }
    
})
export default AddEvents;