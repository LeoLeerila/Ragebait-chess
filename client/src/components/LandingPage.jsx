import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="landing-container">
            <h1 className="landing-title">AIChess</h1>
            <p className="landing-text">An online chess platform where you play against AI opponents.<br />Create a profile or log in to start playing</p>

            <div className="landing-buttons">
                <Link to="/start" className="landing-btn">Start playing</Link>
                <Link to="/register" className="landing-btn">Create a profile</Link>
            </div>
        </div>
    )
}

export default LandingPage