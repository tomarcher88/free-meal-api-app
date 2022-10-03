import { useGlobalContext } from "../context";

export default function Favourites() {
  const { selectMeal, favourites, removeFromFavourites } = useGlobalContext();

  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favourites</h5>
        <div className="favorites-container">
          {favourites.map((meal) => {
            const { idMeal, strMealThumb: image } = meal;

            return (
              <div key={idMeal} className="favorite-item">
                <img src={image} className="favorites-img img" onClick={() => selectMeal(idMeal, true)}/>
                <button
                  className="remove-btn"
                  onClick={() => removeFromFavourites(idMeal)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
