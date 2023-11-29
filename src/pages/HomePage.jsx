import  './styles/HomePage.css';
import Header from '../components/Header';
import landing from '../assets/landingImage.jpg';
export default function HomePage() {
    return (
        <>
            <Header />
            <div className='container'>
                <main style={{marginTop: '40px'}} className='row landing'>
                    <div className='col-5 m-5 image-div'>
                        <img src={landing} alt="" />
                    </div>
                    <div className='col-5 landing-info'>
                        <h3>Search for your favorite cocktail recipes </h3>
                        <div className='buttons'>
                            <button className='primary-button col-5'>Search</button>
                            <button className='secondary-button col-5'>Random Recipe</button>
                        </div>
                    </div>
                </main>
            </div> 
        </>
        
    )
}