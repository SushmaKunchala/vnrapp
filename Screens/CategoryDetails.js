import React,{useEffect,useState,useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as categoryActions from "../Actions/Categoriesdata";
import ClubsOverview from "../Components/ClubsOverview";

function CategoryDetails({route,navigation})
{
    const {name}=route.params;

    const clubs=useSelector(state=>state.Categories.availableClubs);
    const heading=useSelector(state=>state.Categories.clubHeading);
    const clubsFullData=useSelector(state=>state.Categories.clubsData);

    const [clubsData,setClubs]=useState(clubs);
    const [headingText,setHeadingText]=useState(heading);
    const [clubsDataFull,setClubsData]=useState(clubsFullData);

    const dispatch=useDispatch();

    const fetchData=useCallback(async ()=>{
        dispatch(categoryActions.fetchClubData(name));
        setClubs(clubs);
        setHeadingText(heading);
        setClubsData(clubsDataFull => ({
            ...clubsDataFull,
            ...clubsFullData
          }));

    },[dispatch,setClubs,setHeadingText,setClubsData]);

    useEffect(()=>{
        const willFocusSub=navigation.addListener('focus',fetchData);
        return willFocusSub;
    },[fetchData]);

    useEffect(()=>{
        fetchData();
    },[dispatch,fetchData]);

    return <ClubsOverview heading={Object.keys(clubsDataFull).length === 0?clubsFullData.heading:clubsDataFull.heading} 
    clubslist={clubsData===undefined?clubs:clubsData} img={Object.keys(clubsDataFull).length === 0?clubsFullData['image']:clubsDataFull['image']}/>
    
}

export default CategoryDetails;