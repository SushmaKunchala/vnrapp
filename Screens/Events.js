import React,{useEffect,useState,useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as categoryActions from "../Actions/Categoriesdata";
import EventsOverview from "../Components/EventsOverview";

function Events({route,navigation})
{

    const {dname}=route.params;
    const {cname}=route.params;
    const {name}=route.params;

    const EventDetails=useSelector(state=>state.Categories.EventDetails);

    const [EventDetailsUpdate,setEventDetails]=useState(EventDetails);
    
    const dispatch=useDispatch();

    const fetchData=useCallback(async ()=>{
        dispatch(categoryActions.fetchEventDetails(dname,cname,name));
        setEventDetails(EventDetails);
        
    },[dispatch,setEventDetails]);

    useEffect(()=>{
        const willFocusSub=navigation.addListener('focus',fetchData);
        return willFocusSub;
    },[fetchData]);

    useEffect(()=>{
        fetchData();
    },[dispatch,fetchData]);

    return <EventsOverview eventDetails={EventDetailsUpdate===undefined?EventDetails:EventDetailsUpdate}/>
}

export default Events;