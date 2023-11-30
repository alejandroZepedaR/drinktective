import Header from "../components/Header";
import { useState, useEffect } from "react";
import './styles/SearchPage.css';
import DrinkCard from "../components/DrinkCard";

export default function SearchPage() {
    const searchTypes = ['Drink', 'Ingredient'];

    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Drink');

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        function handleSearch(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (!data || data.drinks === null) {
                        setSearchResults([]);
                    } else {
                        setSearchResults(data.drinks);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

        if(searchType === 'Drink') {
            let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
            handleSearch(url);
        }
        
        if(searchType === 'Ingredient'){
            let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
            handleSearch(url);
        }
        
       
    }, [searchTerm]);

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }


    return(
        <>
            <Header />
            <div className="container">
                <div className="row mt-4 search-container">
                    <input type="text" placeholder="Search:" className='col-8 searchBar' onChange={handleSearch} value={searchTerm}/>
                    <select className="col-2" name="searchTypeSelect" id="searchTypeSelect" onChange={(e)=>setSearchType(e.target.value) } value={searchType}>
                        {searchTypes.map((type, index) => {
                            return <option key={index} value={type}>{type}</option>
                        })}
                    </select>
                </div>
                <main className="row mt-3 results">
                    {
                        searchResults.length > 0 ? (
                            searchResults.map((result, index) => {
                                return (
                                    <DrinkCard key={index} drink={result}/>
                                )
                            })
                        )
                        : 
                        (<h2 style={{textAlign: 'center'}}>No Results</h2>)
                    }
                </main>
            </div>
        </>
    )
}