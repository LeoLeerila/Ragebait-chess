const GameOver = ({ winner, byMethod, moves, directHome, directNew, review }) => {
    return (
        <>
            <div className="game-over-overlay"></div>
            <div className="game-over">
                <h1>{winner} wins!</h1>
                <h3> By {byMethod}</h3>
                {/* Would look like "(X) Brilliant | (X) Best "  etc...*/}
                <p>{moves}</p>
                <div className="game-over-buttons">
                    <button className="gameover-btn" onClick={directNew}>Play Again</button>
                    <button className="gameover-btn" onClick={review}>Game review</button>
                    <button className="gameover-btn" onClick={directHome}>Exit</button>
                </div>
            </div>
        </>
    )
}

export default GameOver;