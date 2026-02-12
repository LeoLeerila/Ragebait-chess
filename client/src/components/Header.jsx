import "./Header.css";

function Header() {
    return (
        <header>
            <div className="header-title">
                <h1 className="game-title">AIChess</h1>
            </div>
            {/*these buttons are supposed to have the "user" and "logout" logos like in the Figma prototype,
             but getting those isn't a priority yet */}
            <div className="header-buttons">
                <button className="user-button">User</button>
                <button className="logout-button">Logout</button>
            </div>
        </header>
    )
}

export default Header