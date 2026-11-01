import { Link } from "react-router-dom";
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="wrapper header__wrapper">
                <h1 className="header__title">
                    <Link to="/" className="header__link">
                        QuizMaster.
                    </Link>
                </h1>
                <nav className="header__nav">
                    <Link to="/" className="header__link">Hem</Link>
                    <Link to="/highscore" className="header__link">HighScore</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;