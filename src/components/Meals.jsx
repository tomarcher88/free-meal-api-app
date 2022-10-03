import App from "../App"
import { useGlobalContext } from "../context"
import {BsHandThumbsUp} from 'react-icons/bs'


export default function Meals() {

  const {meals, loading, selectMeal, addToFavourites, removeFromFavourites} = useGlobalContext();

  if (loading) {
    return ( 
    <section className="section section-center">
      <h4>Loading...</h4>
    </section>
    )
  } else if (meals.length < 1) {
    return (
      <section className="section section-center">
      <h4>No items found...</h4>
    </section>
      )
  } else {
    return (      
    <section className="section section-center">
      {meals.map(meal => {
        const {idMeal, strMeal: title, strMealThumb: image} = meal;
        return (
        <article key={idMeal} className="single-meal">
          <img src={image} className="img" onClick={() => selectMeal(idMeal)} />
          <footer>
            <h5>{title}</h5>
            <button className="like-btn" onClick={() => addToFavourites(idMeal)}><BsHandThumbsUp /></button>
          </footer>
        </article>)
      })}
    </section>
  )
  }
}

// Timestamp: 3:07:27