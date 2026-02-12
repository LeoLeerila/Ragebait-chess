import './Game.css'
import { React, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Chessboard from '../models/chessgame/Chessboard';
import { initBoard } from '../models/chessgame/initBoard';
const Game = () => {
    //set the starting board so it can be used to build the start of the game
    const [board, setboard] = useState(initBoard);
    const [turn, setTurn] = useState("white");
    //const [selected, setSelected] = useState(null);
    const [history, setHistory] = useState([]);

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
                        <span className='resign-btn'>Resign ⚐</span>
                    </div>
                </div>
            </div>

            {/* CHAT WINDOW */}
            <div className="right-panel">


                <div className="chat-column">
                    {/* Top player, map the opponent details.*/}
                    <div className="player-card top-player">
                        <div className="avatar"></div>
                        <div className="player-info">
                            <div className="player-name">Evil Larry</div>
                            <div className="player-rating">1800 ELO</div>
                        </div>
                        <div className="player-icon"></div>
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
        </div>
    )
}

export default Game;