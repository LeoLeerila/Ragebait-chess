import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header({ isAuthenticated, setIsAuthenticated}) {

    const handleClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);

  }
    return (
        <header>
            <div className="header-title"><Link to="/">
                <h1 className="game-title">AIChess</h1></Link>
            </div>
            {/*these buttons are supposed to have the "user" and "logout" logos like in the Figma prototype,
             but getting those isn't a priority yet */}
            <div className="header-buttons">
            {isAuthenticated && (
                <>
                <Link to="/user" className="header-btn">User</Link>
                <button onClick={handleClick} className="header-btn">Logout</button>
                </>
            )}
            {!isAuthenticated && (
                <>
                <Link to="/login" className="header-btn">Login</Link>
                <Link to="/register" className="header-btn">Register</Link>
                </>
            )}
            </div>
        </header>
    )
}

export default Header