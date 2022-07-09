import React,{useEffect,useState,useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as categoryActions from "../Actions/Categoriesdata";
import ClubDetailsOverview from "../Components/ClubDetailsOverview";

function ClubDetails({route,navigation})
{
    const {name}=route.params;
    const {dname}=route.params;

   const clubLogo=useSelector(state=>state.Categories.clubLogo);
    const clubDetails=useSelector(state=>state.Categories.clubDetails);

    const [clubLogoUpdate,setClubLogo]=useState(clubLogo);
    const [clubDetailsUpdate,setClubDetails]=useState(clubDetails);


    const dispatch=useDispatch();

    const fetchData=useCallback(async ()=>{
        dispatch(categoryActions.fetchClubDetails(name,dname));
        setClubLogo(clubLogo);
        setClubDetails(clubDetailsUpdate);
    },[dispatch,setClubLogo,setClubDetails]);

    useEffect(()=>{
        const willFocusSub=navigation.addListener('focus',fetchData);
        return willFocusSub;
    },[fetchData]);

    useEffect(()=>{
        fetchData();
    },[dispatch,fetchData]);

    
    return <ClubDetailsOverview heading={name} dname={dname} cname={name}
    clubDetails={clubDetailsUpdate===undefined?clubDetails:clubDetailsUpdate} img={clubLogoUpdate===undefined?clubLogo:clubLogoUpdate}/>
    
}

export default ClubDetails;