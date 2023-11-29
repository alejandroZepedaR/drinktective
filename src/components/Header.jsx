export default function Header() {
    return (
        <header className='navbar'>
            <div className='container'>
                <h1>Drinktective</h1>
                <nav className='col-3'>
                    <ul>
                        <li><a className="link" href="/">Home</a></li>
                        <li><a className="link" href="">Saved</a></li>
                        <li><a className="link" href="/search">Search</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}