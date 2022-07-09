import React, { useEffect, useState,useCallback } from "react";
import {useDispatch, useSelector} from "react-redux";
import * as categoryActions from "../Actions/Categoriesdata";
import CategoryView from "../Components/CategoryView";

function Category(props)
{
    const categories=useSelector(state=>state.Categories.availableCategories);
    const heading=useSelector(state=>state.Categories.heading);

    const [CategoriesData,setCategories]=useState(categories);
    const [headingText,setHeadingText]=useState(heading);

    const dispatch=useDispatch();

    const fetchData=useCallback(async ()=>{
        dispatch(categoryActions.fetchCategories());
        setCategories(categories);
        setHeadingText(heading);

    },[dispatch,setCategories,setHeadingText]);

    useEffect(()=>{
        const willFocusSub=props.navigation.addListener('focus',fetchData);
        return willFocusSub;
    },[fetchData]);

    useEffect(()=>{
        fetchData();
    },[dispatch,fetchData]);

    
    return <CategoryView heading={headingText===undefined?heading:headingText} image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7dYCBgRkwSsa_q0cZMByVQ9cThLq9adGupa7hgGs1izjrDZ0I-mMva5aVSZ4l_-xXfK8&usqp=CAU" 
               categories={CategoriesData===undefined?categories:CategoriesData} />
}

export default Category;
