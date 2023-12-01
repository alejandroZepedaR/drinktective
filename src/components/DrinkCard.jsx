import { useState, useEffect } from "react";


export default function DrinkCard({drink, removeFromSaved}) {
    const link = '/recipe/'+drink.idDrink;
    const [savedDrinks, setSavedDrinks] = useState([]);

    useEffect(() => {
        // Fetch saved drinks from local storage when the component mounts
        const savedDrinksFromStorage = localStorage.getItem("savedDrinks");
        if (savedDrinksFromStorage) {
            setSavedDrinks(JSON.parse(savedDrinksFromStorage));
        }
    }, []);

    function handleSave() {
        const savedDrinksFromStorage = localStorage.getItem("savedDrinks");
        let updatedSavedDrinks = [];
    
        if (savedDrinksFromStorage) {
            updatedSavedDrinks = JSON.parse(savedDrinksFromStorage);
        }
    
        if (!updatedSavedDrinks.includes(drink.idDrink)) {
            updatedSavedDrinks.push(drink.idDrink);
            setSavedDrinks(updatedSavedDrinks);
            localStorage.setItem("savedDrinks", JSON.stringify(updatedSavedDrinks));
            alert("Drink saved!");
        } else {
            alert("You already saved this drink!");
        }
    }
    

    function handleDelete(id) {
        const updatedSavedDrinks = savedDrinks.filter(savedDrinkId => savedDrinkId !== id);
        setSavedDrinks(updatedSavedDrinks);
    
        // Update the saved drinks in local storage
        localStorage.setItem("savedDrinks", JSON.stringify(updatedSavedDrinks));

        // Call the parent component's function to remove the card from the saved recipes
        removeFromSaved(id);
    }
    

    return(
        <div className="card col-10 col-md-4 col-lg-3 m-5 text-bg-dark ">
            <img className="card-img-top mt-3" src={drink.strDrinkThumb} alt={drink.strName} />
            <div className="card-body">
                <h5 className="card-title">{drink.strDrink}</h5>
                <div className="badge-container">
                <span className="badge text-bg-light">{drink.strCategory}</span>
                </div>
                <div className="buttons-div">
                    <a className="btn btn-primary" href={link} >Recipe</a>
                    {
                        savedDrinks.includes(drink.idDrink) ? (
                            <button className="btn btn-warning" onClick={() => handleDelete(drink.idDrink)}>Remove</button>
                        ) : (
                            <button onClick={() => handleSave()} className="btn btn-secondary">Save</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}