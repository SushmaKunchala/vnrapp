import React from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {NavigationMain, NavigationDrawer } from './navigation/NavigationMain'
import categoriesReducer from './Reducers/Categoriesdata.js';
import ReduxThunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';

const rootReducer=combineReducers({
  Categories:categoriesReducer,

});

const store=createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
 
  return <Provider store={store}>
   
   
    <NavigationMain />
    
  </Provider>
}



