import { useGlobalContext } from "../context";
import { useState } from "react";

export default function Search() {

  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();


  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
      setText('');
    }
  }

    const handleRandom = () => {
      setSearchTerm("");
      setText("");
      fetchRandomMeal();
    };


  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Search for a meal..."
          onChange={handleChange}
          value={text}
        />
        <button className="btn" type="submit">
          Search
        </button>
        <button className="btn btn-hipster" type="button" onClick={handleRandom}>
          Surprise Me!
        </button>
      </form>
    </header>
  );
}