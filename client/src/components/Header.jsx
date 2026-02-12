import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="header-title">
                <h1 className="game-title">AIChess</h1>
            </div>
            {/*these buttons are supposed to have the "user" and "logout" logos like in the Figma prototype,
             but getting those isn't a priority yet */}
            <div className="header-buttons">
                <Link to="/user/4" className="header-btn">User</Link>
                <button className="header-btn">Logout</button>
            </div>
        </header>
    )
}

export default Header