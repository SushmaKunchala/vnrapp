
import { useDispatch } from "react-redux";
import Categories from "../Models/Categories";
import EventsClass from "../Models/EventsClass";
import MembersClass from "../Models/MembersClass";

export const getCategories="get_categories";
export const getClubs="get_clubs";
export const getClubDetails="get_ClubDetails";
export const getAboutData="get_AboutData";
export const getContactDetails="get_ContactDetails";
export const getMemberDetails="get_MemberDetails";
export const getEventDetails="get_EventDetails";
export const getNewUpdates="get_NewUpdates";
export const addEvents="add_Events";
export const DELETE_EVENT="delete_event";

export const fetchCategories=()=>{
    return async dispatch=>{
        try{
        const responseCategories=await fetch('https://vnr-app-8643d-default-rtdb.firebaseio.com/Categories.json');
        const resCategoriesData=await responseCategories.json();
        const displayedheading=resCategoriesData['heading'];
        const loadedcategories=[];
        for(const key in resCategoriesData)
        {
            if(key!=="heading")
            {
            loadedcategories.push(new Categories(resCategoriesData[key].id,resCategoriesData[key].name));
            }
        }
        dispatch({type:getCategories,categories:loadedcategories,heading:displayedheading});
    }catch(err)
    {
        console.log(err);
    }
    };
};

export const fetchClubData=(clubName)=>{
    return async dispatch=>{
        let CName=clubName.split(" ").join("");
        
        const responseClubs=await fetch(`https://vnr-app-8643d-default-rtdb.firebaseio.com/${CName}.json`);
        const resClubsData=await responseClubs.json();
        const cData={...resClubsData};
        const displayedheading=resClubsData['heading'];
        const loadedClubs=[];
        
        for(const key in resClubsData)
        {
            if(key!=="heading" && key!=="image")
            {
            loadedClubs.push(key);
            }
        }

        dispatch({type:getClubs,clubsData:cData,clubs:loadedClubs,clubHeading:displayedheading});
    };
};

export const fetchClubDetails=(clubName,dname)=>{
    return async dispatch=>{
        dname=dname.split(" ").join("");
        const responseClubs=await fetch(`https://vnr-app-8643d-default-rtdb.firebaseio.com/${dname}/${clubName}.json`);
        const resClubsData=await responseClubs.json();
        
        const resImage=resClubsData["image"];
        const loadedClubDetails=[];
        for(const key in resClubsData)
        {
            if(key!=="image")
            {
              loadedClubDetails.push(key);
            }
        }
    
        dispatch({type:getClubs,clubLogo:resImage,clubDetails:loadedClubDetails});
    };
};

export const fetchAboutData=(dname,cname,name)=>{
    return async dispatch=>{
       
        dname=dname.split(" ").join("");
        
        const responseClubs=await fetch(`https://vnr-app-8643d-default-rtdb.firebaseio.com/${dname}/${cname}/${name}.json`);
        const resAboutData=await responseClubs.json();
        const finalData=eval('`'+resAboutData+'`');
        dispatch({type:getAboutData,AboutData:finalData});
    };
};

export const fetchContactDetails=(dname,cname,name)=>{
    return async dispatch=>{
       
        dname=dname.split(" ").join("");
        
        const responseClubs=await fetch(`https://vnr-app-8643d-default-rtdb.firebaseio.com/${dname}/${cname}/${name}.json`);
        const resAboutData=await responseClubs.json();
        const finalData=eval('`'+resAboutData+'`');
        dispatch({type:getContactDetails,ContactDetails:finalData});
    };
};

export const fetchMemberDetails=(dname,cname,name)=>{
    function compare( a, b ) {
        if ( a.id < b.id ){
          return -1;
        }
        if ( a.id > b.id ){
          return 1;
        }
        return 0;
      }

    return async dispatch=>{
        dname=dname.split(" ").join("");
        const responseClubs=await fetch(`https://vnr-app-8643d-default-rtdb.firebaseio.com/${dname}/${cname}/${name}.json`);
        const resClubsData=await responseClubs.json();

        const loadedMemberDetails=[];
        for(const key in resClubsData)
        {
            if(key!=="Action Commitee")
            {
              loadedMemberDetails.push(new MembersClass(resClubsData[key]['id'],key,resClubsData[key]['name'],resClubsData[key]['image']));
            }
        }
        
        loadedMemberDetails.sort(compare);

       const loadedSubMemberDetails=[];
        for(const key in resClubsData['Action Commitee'])
        {
           loadedSubMemberDetails.push(new MembersClass(resClubsData['Action Commitee'][key]['id'],key,resClubsData['Action Commitee'][key]['name'],resClubsData['Action Commitee'][key]['image']));
        }
        loadedSubMemberDetails.sort(compare);
        dispatch({type:getMemberDetails,MemberDetails:loadedMemberDetails,subMemberDetails:loadedSubMemberDetails});
    };
};

export const fetchEventDetails=(dname,cname,name)=>{
    function compare( a, b ) {
        if ( a.date < b.date ){
          return 1;
        }
        if ( a.date > b.date ){
          return -1;
        }
        return 0;
      }

    return async dispatch=>{
       
        dname=dname.split(" ").join("");
        
        const responseClubs=await fetch(`https://vnr-app-8643d-default-rtdb.firebaseio.com/${dname}/${cname}/${name}.json`);
        const secondResponse=await fetch(`https://vnr-app-8643d-default-rtdb.firebaseio.com/${dname}/${cname}/New Updates.json`);
        const resEventData=await responseClubs.json();
        const secondResponseData=await secondResponse.json();
        const today=new Date().toISOString().slice(0, 10);

        const loadedEventDetails=[];
        for(const key in resEventData)
        {
            if(key!=='test'){
            loadedEventDetails.push(new EventsClass(resEventData[key]['id'],resEventData[key]['date'],resEventData[key]['eventToAdd']));
            }
        }
        let len=Object.keys(resEventData).length;
        for(const key in secondResponseData)
        {
            if(key!=='test' && secondResponseData[key]['date']<today)
            {
                 
                loadedEventDetails.push(new EventsClass(len,secondResponseData[key]['date'],secondResponseData[key]['eventToAdd']));
                len=len+1;
                
                dispatch(deleteEvent(key));
                dispatch(addEventToEvents(secondResponseData[key]['date'],secondResponseData[key]['eventToAdd']));
            }
            
        }
        loadedEventDetails.sort(compare);
       
        dispatch({type:getEventDetails,EventDetails:loadedEventDetails});
    };
};

export const fetchNewUpdates=(dname,cname,name)=>{
    
    function compare( a, b ) {
        if ( a.date < b.date ){
          return -1;
        }
        if ( a.date > b.date ){
          return 1;
        }
        return 0;
      }

    return async dispatch=>{
       
        dname=dname.split(" ").join("");
        
        const responseData=await fetch(`https://vnr-app-8643d-default-rtdb.firebaseio.com/${dname}/${cname}/${name}.json`);
        const resEventData=await responseData.json();
        
        const loadedNewUpdates=[];
        const today=new Date().toISOString().slice(0, 10);

        for(const key in resEventData)
        {
          
            if(key!=='test' && resEventData[key].date>=today)
            {
            loadedNewUpdates.push(new EventsClass(resEventData[key]['id'],resEventData[key]['date'],resEventData[key]['eventToAdd']));
            }
        }
        loadedNewUpdates.sort(compare);

        dispatch({type:getNewUpdates,NewUpdates:loadedNewUpdates});
    };
};
export const addEventToEvents=(date,eventToAdd)=>{

    return async dispatch=>{
        const responseData=await fetch('https://vnr-app-8643d-default-rtdb.firebaseio.com/StudentChapters/CSI/Events.json');
        const resEventData=await responseData.json();
        const len=Object.keys(resEventData).length; 

        const response=await fetch('https://vnr-app-8643d-default-rtdb.firebaseio.com/StudentChapters/CSI/Events.json',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:len,
                date,
                eventToAdd,
            })
            
        });
 
        dispatch({
            type:addEvents,
            eventData:{
                id:len,
                date:date,
                eventToAdd:eventToAdd
            }
        });
    };
};

export const addEvent=(date,eventToAdd)=>{

    return async dispatch=>{
        const responseData=await fetch('https://vnr-app-8643d-default-rtdb.firebaseio.com/StudentChapters/CSI/New Updates.json');
        const resEventData=await responseData.json();
        const len=Object.keys(resEventData).length; 

        const response=await fetch('https://vnr-app-8643d-default-rtdb.firebaseio.com/StudentChapters/CSI/New Updates.json',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:len,
                date,
                eventToAdd,
            })
            
        });
        dispatch({
            type:addEvents,
            eventData:{
                id:len,
                date:date,
                eventToAdd:eventToAdd
            }
        });
    };
};

export const deleteEvent=id=>{

   return async dispatch=>{
       await fetch(`https://vnr-app-8643d-default-rtdb.firebaseio.com/StudentChapters/CSI/New Updates/${id}.json`,{
           method:'DELETE',
       });
       dispatch({type:DELETE_EVENT,eid:id});
};
};