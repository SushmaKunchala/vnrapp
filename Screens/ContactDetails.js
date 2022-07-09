import React,{useEffect,useState,useCallback} from "react";
import {View,Text,StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import * as categoryActions from "../Actions/Categoriesdata";

function ContactDetails({route,navigation})
{
    const {dname}=route.params;
    const {cname}=route.params;
    const {name}=route.params;
    const ContactDetails=useSelector(state=>state.Categories.ContactDetails);

    const [ContactDetailsUpdate,setContactDetails]=useState(ContactDetails);
    
    const dispatch=useDispatch();

    const fetchData=useCallback(async ()=>{
        dispatch(categoryActions.fetchContactDetails(dname,cname,name));
        setContactDetails(ContactDetails);
       
    },[dispatch,setContactDetails]);

    useEffect(()=>{
        const willFocusSub=navigation.addListener('focus',fetchData);
        return willFocusSub;
    },[fetchData]);

    useEffect(()=>{
        fetchData();
    },[dispatch,fetchData]);

    return <View><View  style={styles.heading}><Text style={{fontWeight: "bold"}}>Contact Details</Text></View><View style={styles.text}><Text>{ContactDetailsUpdate===undefined?ContactDetails:ContactDetailsUpdate}</Text></View></View>
}

export default ContactDetails;

const styles=StyleSheet.create({
    text:{
        margin:30
    },
    heading:{
        justifyContent:'center',
        alignItems:'center',
    }
})