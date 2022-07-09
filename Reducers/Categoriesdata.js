import EventsClass from "../Models/EventsClass";

const initialState={
    availableCategories:[],
    heading:"",
    availableCLubs:[],
    clubsData:{},
    clubsDetails:[],
    clubLogo:"",
    AboutData:"",
    ContactDetails:"",
    MemberDetails:[],
    subMemberDetails:[],
    eventDetails:[],
    NewUpdates:[],
};

export default (state=initialState,action)=>{
  

    return {
        availableCategories:action.categories,
        heading:action.heading,
        availableClubs:action.clubs,
        clubsData:Object.assign({}, action.clubsData),
        clubDetails:action.clubDetails,
        clubLogo:action.clubLogo,
        AboutData:action.AboutData,
        ContactDetails:action.ContactDetails,
        MemberDetails:action.MemberDetails,
        subMemberDetails:action.subMemberDetails,
        EventDetails:action.EventDetails,
        NewUpdates:action.NewUpdates,
        
    };
};