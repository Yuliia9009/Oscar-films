import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <div className="container header__row">
                <Link to="/" className="brand">🏆 Oscar Films</Link>
                <nav className="nav">
                    <NavLink to="/" end className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>Каталог</NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => isActive ? "nav__link active" : "nav__link"}>Избранное</NavLink>
                </nav>
            </div>
        </header>
    );
}