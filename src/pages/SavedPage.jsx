import DrinkCard from "../components/DrinkCard";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function SavedPage() {
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => { 
        const savedDrinksFromStorage = localStorage.getItem("savedDrinks");
        if (savedDrinksFromStorage) {
            const parsedRecipes = JSON.parse(savedDrinksFromStorage);
            const fetchRecipes = async () => {
                try {
                    const fetchedRecipes = await Promise.all(parsedRecipes.map(id =>
                        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                            .then(response => response.json())
                            .then(data => data.drinks[0]) 
                            .catch(error => {
                                console.error('Error fetching data:', error);
                                return null;
                            })
                    ));
                    
                    setSavedRecipes(fetchedRecipes.filter(recipe => recipe !== null));
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchRecipes();
        }
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <main className="row mt-3">
                    <h2 className="text-center">Saved Recipes</h2>
                    {savedRecipes.length > 0 ? (
                        savedRecipes.map((recipe, index) => (
                            <DrinkCard drink={recipe} key={index} />
                        ))
                    ) : (
                        <p className="text-center">No saved recipes</p>
                    )}
                </main>
            </div>
        </>
    );
}
