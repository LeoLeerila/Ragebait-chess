import './Game.css'
import { React, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Chessboard from '../models/chessgame/Chessboard';
import { initBoard } from '../models/chessgame/initBoard';
import GameOver from './gameOver';
const Game = () => {
    //useLocation: get the shit from gameStart.jsx through 'state'
    const location = useLocation();
    const { opponent, playerSide, godmode } = location.state || {};

    //set the starting board so it can be used to build the start of the game
    const [board, setboard] = useState(initBoard);
    const [turn, setTurn] = useState("white");
    const [selected, setSelected] = useState(null);
    const [history, setHistory] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [method, setMethod] = useState(null);
    const navigate = useNavigate();

    function handleResign() {
        setGameOver(true);
        //Do not keep in final version. This is just to test the game over pop-up.
        setWinner(turn === "white" ? "black" : "white");
        setMethod("resignation");
    }

    return (
        <div className="game-base">
            {/* GAME BOARD AND DISCARDED PIECES */}
            <div className="main-layout">
                <div className="board-wrapper">
                    <div className="board-header"></div>
                    <div className="chess-board">
                        <Chessboard board={board} />
                    </div>
                    <div className="board-footer"></div>
                </div>
                <div className="move-history">
                    <div className="history-row">
                        {/* Map const history */}
                    </div>
                    <div className="game-btns">
                        <span className='resign-btn' onClick={handleResign}>Resign ⚐</span>
                    </div>
                </div>
            </div>

            {/* CHAT WINDOW */}
            <div className="right-panel">
                <div className="chat-column">
                    {/* Top player, map the opponent details.*/}
                    <div className="player-card top-player">
                        <div className="avatar">
                            <img src={opponent.AIPic} alt={opponent.AIName} />
                        </div>
                        <div className="player-info">
                            <div className="player-name">{opponent.AIName}</div>
                            <div className="player-rating">{opponent.AIElo}</div>
                        </div>
                    </div>

                    {/* Map chat history, *TEMPORARY CODE* */}
                    <div className="chat-window">
                        <div className="message opponent">
                            <div className="bubble"><p>This is my evil reign!</p></div>
                        </div>

                        <div className="message user">
                            <div className="bubble" ><p>Bro chill out.</p></div>
                        </div>
                    </div>

                    <div className="chat-input">
                        <input type="text" />
                        <button className="send-button">&#11127;</button>
                    </div>

                    {/* Bottom player, map the user data*/}
                    <div className="player-card bottom-player">
                        <div className="avatar"></div>
                        <div className="player-info">
                            <div className="player-name">Goobert</div>
                            <div className="player-rating">2100 ELO</div>
                        </div>
                        <div className="player-icon"></div>
                    </div>

                </div>

                {/* Eval bar */}
                <div className="eval-bar">
                    <div className="eval-fill black" />
                    <div className="eval-fill white" />
                </div>

            </div>
            {/* GAME OVER POP-UP WHEN "gameOver" STATE IS SET TO TRUE */}
            {gameOver &&
                <GameOver
                    winner={winner}
                    byMethod={method}
                    moves={history.length}
                    directHome={() => navigate("/")}
                    directNew={() => navigate("/start")}
                    review={() => console.log("Bro just look at yo history bruh", history)}
                />
            }
        </div>
    )
}

export default Game;