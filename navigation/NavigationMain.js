import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Category from '../Screens/Category';
import CategoryDetails from '../Screens/CategoryDetails';
import ClubDetails from "../Screens/ClubDetails";
import AboutScreen from '../Screens/AboutScreen';
import ContactDetails from "../Screens/ContactDetails";
import Events from "../Screens/Events";
import Members from "../Screens/Members";
import NewUpdates from "../Screens/NewUpdates";
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddEvents from '../Screens/AddEvents';

const Mystack=createStackNavigator();
const Mydrawer=createDrawerNavigator();



const NavigationContent=props=>{
    return <Mystack.Navigator>
           
    <Mystack.Screen name="categoryScreen" component={Category}  options={{ headerShown: false }}/>
    <Mystack.Screen name="categoryDetailsScreen" component={CategoryDetails} options={{ headerShown: false }}/>
    <Mystack.Screen name="clubDetailsScreen" component={ClubDetails} options={{ headerShown: false }}/>
    <Mystack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }}/>
    <Mystack.Screen name="ContactDetailsScreen" component={ContactDetails} options={{ headerShown: false }}/>
    <Mystack.Screen name="EventsScreen" component={Events} options={{ headerShown: false }}/>
    <Mystack.Screen name="MembersScreen" component={Members} options={{ headerShown: false }}/>
    <Mystack.Screen name="NewUpdatesScreen" component={NewUpdates} options={{ headerShown: false }}/>
   
</Mystack.Navigator>
};

const NavigationDrawer=props=>{
    return  <Mydrawer.Navigator>
            <Mystack.Screen name="Student Chapters and Clubs" component={NavigationContent} />
            <Mydrawer.Screen name="AddEvents" component={AddEvents} />
        </Mydrawer.Navigator>
};

export const NavigationMain=props=>{
    return <NavigationContainer>
      <NavigationDrawer />
    </NavigationContainer>
};

