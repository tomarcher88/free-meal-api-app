import React, { useContext, useEffect, useState } from "react";
import App from "./App";
import axios from 'axios'

const AppContext = React.createContext();
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const AppProvider = ({ children }) => {
  // STATE
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favourites, setFavourites] = useState(
    localStorage.getItem("favourites") ?
    JSON.parse(localStorage.getItem("favourites")) :
    []
  );

  // FUNCTIONS
  const fetchMeals = async (url) => {
    console.log(url);
    setLoading(true);
    try {
      const response = await axios(url)
      const {data} = response;
      data.meals ? setMeals(data.meals) : setMeals([])
    } catch(e) {
      console.log(e.response)
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  }

  const selectMeal = (idMeal, favouriteMeal) => {
    // Set meal as a blank variable
    let meal;
    // Search through the meals array and filter by the meal id to find the correct meal
    favouriteMeal
      ? (meal = favourites.find((meal) => meal.idMeal === idMeal))
      : (meal = meals.find((meal) => meal.idMeal === idMeal)); 
    setSelectedMeal(meal);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const addToFavourites = idMeal => {
    const alreadyFave = favourites.find(meal => meal.idMeal === idMeal);
    if (alreadyFave) return;
    const meal = meals.find(meal => meal.idMeal === idMeal);
    setFavourites(prev => [...prev, meal]);
    localStorage.setItem('favourites', JSON.stringify([...favourites, meal]))
  }
  
  const removeFromFavourites = idMeal => {
    const updatedFaves = favourites.filter(meal => meal.idMeal !== idMeal)
    setFavourites(updatedFaves);
    localStorage.setItem('favourites', JSON.stringify(updatedFaves));
  }

  // USE EFFECTS 
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, [])

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return <AppContext.Provider value={{
    meals, 
    loading, 
    setSearchTerm, 
    fetchRandomMeal, 
    showModal, 
    selectMeal, 
    selectedMeal, 
    setShowModal,
    closeModal,
    favourites,
    addToFavourites,
    removeFromFavourites,
  }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
