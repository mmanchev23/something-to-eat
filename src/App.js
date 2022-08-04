import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const getResult = async () => {
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(res => {
      const meal = res.meals[0];
      console.log(meal);

      setName(meal.strMeal);
      setImage(meal.strMealThumb);
    });
  }

  return (
    <div className="App">
      <h1>Feeling hungry?</h1>
      <h2>et a random meal by clicking below</h2>
      <button onClick={getResult}>Get Meal 🍔</button>
      <br />
      <h3>{name}</h3>
      <img src={image} alt=""/>
    </div>
  );
}

export default App;
