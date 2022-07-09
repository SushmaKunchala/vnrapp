import React,{useEffect,useState,useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as categoryActions from "../Actions/Categoriesdata";
import MembersOverview from "../Components/MembersOverview";

function Members({route,navigation})
{
    const {dname}=route.params;
    const {cname}=route.params;
    const {name}=route.params;
    
    const MemberDetails=useSelector(state=>state.Categories.MemberDetails);
    const subMemberDetails=useSelector(state=>state.Categories.subMemberDetails);

    const [MemberDetailsUpdate,setMemberDetails]=useState(MemberDetails);
    const [subMemberDetailsUpdate,setSubMemberDetails]=useState(subMemberDetails);

    const dispatch=useDispatch();

    const fetchData=useCallback(async ()=>{
        dispatch(categoryActions.fetchMemberDetails(dname,cname,name));
        setMemberDetails(MemberDetails);
        setSubMemberDetails(subMemberDetails);
       
    },[dispatch,setMemberDetails,setSubMemberDetails]);

    useEffect(()=>{
        const willFocusSub=navigation.addListener('focus',fetchData);
        return willFocusSub;
    },[fetchData]);

    useEffect(()=>{
        fetchData();
    },[dispatch,fetchData]);

    return <MembersOverview memberDetails={MemberDetailsUpdate===undefined?MemberDetails:MemberDetailsUpdate} 
    subMemberDetails={subMemberDetailsUpdate===undefined?subMemberDetails:subMemberDetailsUpdate}/>;
}


export default Members;

