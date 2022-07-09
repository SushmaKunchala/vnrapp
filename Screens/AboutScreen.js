import React,{useEffect,useState,useCallback} from "react";
import {View,ScrollView,Text,StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import * as categoryActions from "../Actions/Categoriesdata";

function AboutScreen({route,navigation})
{
    const {dname}=route.params;
    const {cname}=route.params;
    const {name}=route.params;
    const AboutData=useSelector(state=>state.Categories.AboutData);

    const [AboutClub,setAbout]=useState(AboutData);
    
    const dispatch=useDispatch();

    const fetchData=useCallback(async ()=>{
        dispatch(categoryActions.fetchAboutData(dname,cname,name));
        setAbout(AboutData);
    },[dispatch,setAbout]);

    useEffect(()=>{
        const willFocusSub=navigation.addListener('focus',fetchData);
        return willFocusSub;
    },[fetchData]);

    useEffect(()=>{
        fetchData();
    },[dispatch,fetchData]);
   
    return <ScrollView><View  style={styles.heading}><Text style={{fontWeight: "bold"}}>About {cname}</Text></View><View style={styles.text}><Text>{AboutClub===undefined?AboutData:AboutClub}</Text></View></ScrollView>
    
}

export default AboutScreen;

const styles=StyleSheet.create({
    text:{
        margin:30
    },
    heading:{
        justifyContent:'center',
        alignItems:'center',
    }
});