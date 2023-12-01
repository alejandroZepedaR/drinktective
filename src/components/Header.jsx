export default function Header() {
    return (
        <header className='navbar'>
            <div className='container'>
                <div className="col-12 col-md-5">
                    <h1 className="text-center">Drinktective</h1>
                </div>
                <nav className='col-12 col-md-5'>
                    <ul>
                        <li><a className="link" href="/">Home</a></li>
                        <li><a className="link" href="/saved">Saved</a></li>
                        <li><a className="link" href="/search">Search</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}