import React,{useEffect,useState,useCallback} from "react";
import {View,Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import * as categoryActions from "../Actions/Categoriesdata";
import EventsOverview from "../Components/EventsOverview";

function NewUpdates({route,navigation})
{
    const {dname}=route.params;
    const {cname}=route.params;
    const {name}=route.params;

    const NewUpdates=useSelector(state=>state.Categories.NewUpdates);

    const [NewUpdatesUpdate,setNewUpdates]=useState(NewUpdates);
    
    const dispatch=useDispatch();

    const fetchData=useCallback(async ()=>{
        dispatch(categoryActions.fetchNewUpdates(dname,cname,name));
        setNewUpdates(NewUpdates);
        
        
    },[dispatch,setNewUpdates]);

    useEffect(()=>{
        const willFocusSub=navigation.addListener('focus',fetchData);
        return willFocusSub;
    },[fetchData]);

    useEffect(()=>{
        fetchData();
    },[dispatch,fetchData]);
    
    return <EventsOverview eventDetails={NewUpdatesUpdate===undefined?NewUpdates:NewUpdatesUpdate}/>
}

export default NewUpdates;