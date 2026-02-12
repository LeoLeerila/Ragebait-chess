import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing-container">
            <h1 className="landing-title">AIChess</h1>
            <p className="landing-text">An online chess platform where you play against AI opponents.<br />Create a profile or log in to start playing</p>

            <div className="landing-buttons">
                <button className="landing-btn">Start playing</button>
                <button className="landing-btn">Create a profile</button>
            </div>
        </div>
    )
}

export default LandingPage