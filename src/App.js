import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [image, setImage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [youtube, setYoutube] = useState("");
  const [ingredients] = useState([]);
  const [tags, setTags] = useState("");
  const [source, setSource] = useState("");

  const getResult = async () => {
    console.clear();

    await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(res => {
      const meal = res.meals[0];
      console.log(meal);

      setName(meal.strMeal);
      setCategory(meal.strCategory);
      setArea(meal.strArea);
      setImage(meal.strMealThumb);
      setInstructions(meal.strInstructions);
      setYoutube(`https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`);
      setTags(meal.strTags);
      setSource(meal.strSource);

      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`]) {
          ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
      }
    });
  }

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <br/>
          <h1>Feeling hungry?</h1>
          <h3>Get a random meal by clicking below</h3>
          <button onClick={getResult} className="btn btn-primary">Get Meal 🍔</button>
        </div>
      </div>
      <br/>
      <div className="row">
        <div className="col-md-6">
          {image && <img src={image} alt="" style={{borderRadius: "25%", width: "100%", height: "auto"}}/>}
          <br />
          {category && <h4>Category: {category}</h4>}
          {area && <h4>Area: {area}</h4>}
          {tags && <h4>Tags: {tags}</h4>}
          <br />
        </div>
        <div className="col-md-6">
          {name && <h3><a href={source} target="_blank">{name}</a></h3>}
          {instructions && <p>{instructions}</p>}
          <br />
          {ingredients.length > 0 && <h4>Ingredients:</h4>}
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <br />
      <div className="row">
        <iframe style={{width: "100%", height: "400px"}} src={youtube}>Video Recipe</iframe>
      </div>
      <br/>
    </div>
  );
}

export default App;
