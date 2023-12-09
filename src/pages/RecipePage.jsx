import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RecipePage(){
    const {id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [savedDrink, setSavedDrink] = useState(false);
    const navigate = useNavigate();

    function handleRandomSearch(){
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => data.drinks[0].idDrink)
        .then(id => navigate('/recipe/'+id))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        function getData(){
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setRecipe(data.drinks[0]);
                    return data.drinks[0];
                })
                .then(recipeData => {
                    let tempIngredients = [];
                    for(let i = 1; i < 16; i++){
                        let ingredient = recipeData[`strIngredient${i}`];
                        let measure = recipeData[`strMeasure${i}`];
                        if(ingredient !== null && ingredient !== ''){
                            tempIngredients.push({ingredient, measure});
                        }
                    }
                    setIngredients(tempIngredients);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

        getData();

    },[id]);

    function handleSave() {
        const savedDrinksFromStorage = localStorage.getItem("savedDrinks");
        let updatedSavedDrinks = [];
    
        if (savedDrinksFromStorage) {
            updatedSavedDrinks = JSON.parse(savedDrinksFromStorage);
        }
    
        if (!updatedSavedDrinks.includes(id)) {
            updatedSavedDrinks.push(id);
            localStorage.setItem("savedDrinks", JSON.stringify(updatedSavedDrinks));
            alert("Drink saved!");
        } else {
            alert("You already saved this drink!");
            setSavedDrink(true);
        }
    }

    return(
        <>
            <Header />
            <div className="container">
                <main className="row mt-5">
                    <div className="col-md-5">
                        <img  src={recipe.strDrinkThumb} alt={recipe.strDrink} />
                    </div>
                    <div className="drink-info col-md-7">
                        <h2 className="text-center">{recipe.strDrink}</h2>
                        <h3>Instructions</h3>
                        <p>{recipe.strInstructions}</p>
                        <h3>Ingredients</h3>
                        <ul>
                            {ingredients.map((ingredient, index) => {
                                return <li key={index}>{ingredient.measure} {ingredient.ingredient}</li>
                            })}
                        </ul>
                        <div className="col-12 mb-2 d-flex justify-content-center">
                        {savedDrink ? ( <button className='btn btn-primary col-4' disabled onClick={() => handleSave()}>Saved</button>) : ( <button className='btn btn-primary col-4' onClick={() => handleSave()}>Save</button>)}
                           
                        </div>
                        <div className="col-12 mb-5 d-flex justify-content-center">
                            
                            <button className='btn btn-secondary col-4' onClick={() => handleRandomSearch()}>Random Recipe</button>
                        </div>
                    </div>
                </main>
            </div>

        </>
    )
}