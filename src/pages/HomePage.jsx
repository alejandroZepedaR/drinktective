import  './styles/HomePage.css';
import Header from '../components/Header';
import landing from '../assets/landingImage.jpg';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();
    

    function handleRandomSearch(){
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => data.drinks[0].idDrink)
        .then(id => navigate('/recipe/'+id))
        .catch(err => console.log(err));
    }

    return (
        <>
            <Header />
            <div className='container'>
                <main style={{marginTop: '40px'}} className='row landing'>
                    <div className='col-md-5 m-3 image-div'>
                        <img src={landing} alt="" />
                    </div>
                    <div className='col-md-5 landing-info '>
                        <h2 className='text-center'>Crack the Mystery of Your Perfect Drink</h2>
                        <div className='buttons'>
                            <a href='/search' className='btn btn-danger col-5'>Start</a>
                            <button className='btn btn-secondary col-5' onClick={handleRandomSearch}>Random Recipe</button>
                        </div>
                    </div>
                </main>
            </div> 
        </>        
    )
}