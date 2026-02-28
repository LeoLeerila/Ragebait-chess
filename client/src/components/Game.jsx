import './Game.css'
import { React, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Chessboard from './Chessboard';
import { initBoard } from '../assets/initBoard';
import { getMoves, makeMove } from './logic/moves';
import GameOver from './gameOver';
import ChatTxt from "./gameChat";

//these are dummydata for use before database
import { RawPlayerData, RawSettings, RawStats } from "../assets/dummydata";
import { algToCoords } from './logic/helps';

const Game = () => {
    //useLocation: get the shit from gameStart.jsx through 'state'
    const navigate = useNavigate();
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

    //Goodbye chat
    //Chat states
    const [chatH, setChatH] = useState([]);
    const [chatP, setChatP] = useState("");
    
    //semi temporary, needs to be changed after db
    const [PlayerD, setPlayer] = useState(RawPlayerData);
    const [SettingsD, setSettings] = useState(RawSettings);
    const [StatsD, setStats] = useState(RawStats);

    //this is temporary, when database is working it will use different method
    let PlayerId = "4" //temp to change player in chatbox
    let t_PlayerId = ""
    let pFound = false
    for (let i = 0; i < RawPlayerData.length;) {
        if (RawPlayerData[i].PlayerId === PlayerId) {
            t_PlayerId = i;
            pFound = true;
            break
        } else {
            i++;
        }
    };
    //it will throw alert when data not found in dummydata file
    if (!pFound) {
        alert("player data not found")
    };

    //CODE DUMP ALERT: GAME MECHANICS YIPPEE
    function handleSquareClick(square) {
        //convert ts back to numerical coords so the code can handle it
        const {row, col} = algToCoords(square);
        const piece = board[row][col];
        console.log("clicked on " + square + " which has piece: " + piece);

        if (!selected) {
            if (!piece) return;

            const isWhite = piece === piece.toUpperCase();
            //if it's the player's turn and they click on their own piece, select it. Same goes for black. 
            //This might need to be changed for when the bot can actually move their own damn pieces.
            //something like "if piece colour equal to player colour -> then do shit."
            if ((turn === "white" && isWhite) || (turn === "black" && !isWhite)) {
                setSelected({ row, col });
                console.log(getMoves(board, row, col));
            }
            return;
        }
        //deselect if clicked on the same square as before.
        if (selected.row === row && selected.col === col) {
            console.log("Unselected!")
            setSelected(null);
            return;
        }
        //getMoves returns the result of one of get_Moves in moves.js
        const legalMoves = getMoves(board, selected.row, selected.col);
        const isLegal = legalMoves.some(
            move => move.row === row && move.col === col
        );
        if (isLegal) {
            const newBoard = makeMove(board, selected, { row, col });
            setboard(newBoard);
            setTurn(turn === "white" ? "black" : "white");
        }
        setSelected(null);
    }


    function handleResign() {
        setGameOver(true);
        //Do not keep in final version. This is just to test the game over pop-up.
        setWinner(turn === "white" ? "black" : "white");
        setMethod("resignation");
    }


    const onSubmitChat = (e) =>{
        e.preventDefault();
        //temp or not, not sure yet
        const newChat ={
            ctxt:chatP,
            isbot:false
        };
        //do here the uhh the that uhh thing ... the bot
        setChatH([...chatH,newChat])
        setChatP("")
        console.log(chatH)
    };

    return (
        <div className="game-base">
            {/* GAME BOARD AND DISCARDED PIECES */}
            <div className="main-layout">
                <div className="board-wrapper">
                    <div className="board-header"></div>
                    <div className="chess-board">
                        <Chessboard board={board} squareClick={handleSquareClick} selected={selected} />
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

                    {/* Map chat history, *TEMPORARY CODE* (permament) */}
                    <div className="chat-window">
                        {chatH.map((chat, i) => <ChatTxt key={i} chat={chat}/>)}
                    </div>

                    <div className="chat-input">
                        <form onSubmit={onSubmitChat}>
                            <input type="text" value={chatP} onChange={((e)=>setChatP(e.target.value))} />
                            <button className="send-button">&#11127;</button>
                        </form>
                    </div>

                    {/* Bottom player, map the user data*/}
                    <div className="player-card bottom-player">
                        <div className="avatar">
                            <img src={SettingsD[t_PlayerId].ProfilePic} />
                        </div>
                        <div className="player-info">
                            <div className="player-name">{PlayerD[t_PlayerId].Name}</div>
                            <div className="player-rating">{StatsD[t_PlayerId].CurrentELO} ELO</div>
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