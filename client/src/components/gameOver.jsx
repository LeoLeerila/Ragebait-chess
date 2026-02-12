const GameOver = ({ winner, byMethod, moves, directHome, directNew, review }) => {
    return (
        <div className="game-over">
            <h1>{winner} wins!</h1>
            <h3> By {byMethod}</h3>
            {/* Would look like "(X) Brilliant | (X) Best "  etc...*/}
            <p>{moves}</p>
            <button onClick={directNew}>Play Again</button>
            <button onClick={review}>Game review</button>
            <button onClick={directHome}>Exit</button>
        </div>
    )
}

export default GameOver;