import { useGlobalContext } from "../context";

export default function Modal() {

  const {selectedMeal, closeModal} = useGlobalContext();
  console.log(selectedMeal)
  const {strMealThumb: image, strMeal: title, strInstructions: text, strSource: source} = selectedMeal

  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src={image} className="img modal-img" alt="The finished meal" />
        <div className="modal-content">
          <h4>{title}</h4>
          <p>Cooking instructions:</p>
          <p>{text}</p>
          <a href={source} target="_blank">Original source</a>
          <button className="btn btn-hipster close-btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    </aside>
  );
}