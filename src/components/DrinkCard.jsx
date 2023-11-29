import { useState, useEffect } from "react";


export default function DrinkCard({drink}) {
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
        // Check if the drink is already saved
        if (!savedDrinks.includes(drink.idDrink)) {
            // Add the drink ID to the savedDrinks list
            const updatedSavedDrinks = [...savedDrinks, drink.idDrink];
            setSavedDrinks(updatedSavedDrinks);

            // Save the updated list to local storage
            localStorage.setItem("savedDrinks", JSON.stringify(updatedSavedDrinks));
            alert("Drink saved!");
        } else {
            alert("You already saved this drink!");
        }

        function logLocalStorageData() {
            const localStorageData = { ...localStorage };
            console.log("Data in Local Storage:", localStorageData);
        }
        logLocalStorageData();
    }

    return(
        <div className="card col-3 m-5 text-bg-dark ">
            <img src={drink.strDrinkThumb} alt={drink.strName} />
            <div className="card-body">
                <h5 className="card-title">{drink.strDrink}</h5>
                <div>
                    <a className="btn btn-primary" href={link} >Recipe</a>
                    {
                        savedDrinks.includes(drink.idDrink) ? (
                            <button className="btn btn-secondary" disabled>Saved</button>
                        ) : (
                            <button onClick={() => handleSave()} className="btn btn-secondary">Save</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}