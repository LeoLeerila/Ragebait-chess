import './Game.css'
import { React, use, useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Chessboard from './Chessboard';
import { initBoard } from '../assets/initBoard';
import { getMoves, makeMove } from './logic/moves';
import GameOver from './gameOver';
import ChatTxt from "./gameChat";
import useFetchBetter from "./hooks/useFetchBetter";

// import useFish from './hooks/useFish';

//these are dummydata for use before database
import { algToCoords, coordsToAlg, boardToFen } from './logic/helps';

const Game = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

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

    const [playerColor, setPlayerColor] = useState("white");
    const [isGameStarted, setIsGameStarted] = useState(false);
    //Goodbye chat
    //Chat states
    const [chatH, setChatH] = useState([{ ctxt: "Greetings type to type here or something like that", isbot: true }]);
    const [chatP, setChatP] = useState("");

    // custom hook to fetch stuff
    const { fetchData, isLoading, error } = useFetchBetter(`http://localhost:4000/api`);
    const [playerD, setPlayerD] = useState({});
    const [settingsD, setSettingsD] = useState({});
    const [statsD, setStatsD] = useState({});
    //here later will be also aipreset

    //stockfish
    const [isBotThinkig, setBotThink] = useState(false);
    const [isPlayerSaid, setPSaid] = useState(false);
    const [bestMove, setBestMove] = useState("");


    
    // This load player info
    useEffect(() => {
        const fetchStuff = async () => {
            const playerData = await fetchData('/player/', "GET", token)
            const statsData = await fetchData('/stats/', "GET", token)
            const settingsData = await fetchData('/settings/', "GET", token)

            setPlayerD(playerData);
            setStatsD(statsData);
            setSettingsD(settingsData);
        }
        fetchStuff()
    }, [])

    //i dont really know what the hell a am doing 
    useEffect(()=>{

        if(playerColor !== turn){
            handleBotThink(true)
            const stockfish = new Worker("./stockfish-18-single.js");
            const DEPTH = 10; // number of halfmoves the engine looks ahead
            stockfish.postMessage("uci");
            stockfish.postMessage(`position fen ${boardToFen(board, turn)}`);
            stockfish.postMessage(`go depth ${DEPTH}`);

            stockfish.onmessage = (e) => {
                console.log(e)
                let data = e.data
                if (data.includes("bestmove")){
                    data = data.split(" ")[1]
                    setBestMove(data)
                    handleBotThink(false)
                    console.log(data)
                    
                }
            }
       
        };
    },[turn])


    async function SaySomethingLLM(){

    }

    useEffect(()=>{
        const speakSomething = async () => {
            if(isPlayerSaid){
            console.log(isPlayerSaid)

            // next return data should be
            //do here the uhh the that uhh thing ... the bot
            // //temp data for testing purposes, there should be also aipreset (name & all of the stuff)
            const data = await fetchData('/ai/generate-nxt-move', "POST", token, {
                botBoard: {
                    fen: boardToFen(board, turn),
                    currenMoves: bestMove,
                    blocked: [],
                    history: chatH,
                    botChessC: "BLACK"
                },
                botPreset: {AiName:"Evil Larry",info: "A temperamental, evil cat overlord known as Larry.",botElo: "1200"},
                playerAns: chatP,
            })

            await handelChatUpd(data.data, true);
            setChatP("")
            setPSaid(false)
        }}
        speakSomething()
    },[isPlayerSaid])


    console.log(boardToFen(board, turn))

    //CODE DUMP ALERT: GAME MECHANICS YIPPEE
    function handleSquareClick(square) {
        //convert ts back to numerical coords so the code can handle it
        const { row, col } = algToCoords(square);
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
                const highlight = getMoves(board, row, col);
                Object.values(highlight).forEach(coord => {
                    const toAlg = coordsToAlg(coord.row, coord.col);
                    //console.log(coord, "->", toAlg);
                    const elem = document.getElementById(toAlg);
                    elem.classList.add('available');
                });
            }
            return;
        }
        //deselect if clicked on the same square as before.
        if (selected.row === row && selected.col === col) {
            console.log("Unselected!")
            setSelected(null);
            const avElement = document.querySelectorAll('.available');
            avElement.forEach(elem => {
                elem.classList.remove('available');
            })
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
        const avElement = document.querySelectorAll('.available');
        avElement.forEach(elem => {
            elem.classList.remove('available');
        })
    }


    function handleResign() {
        setGameOver(true);
        //Do not keep in final version. This is just to test the game over pop-up.
        setWinner(turn === "white" ? "black" : "white");
        setMethod("resignation");
    }

    // handle stuf, because react
    async function handelChatUpd(txt, isbot) {
        setChatH((chatH) => { return [...chatH, { ctxt: txt, isbot: isbot }] })
    };
    async function handleBotThink(tf) {
        setBotThink(tf)
    }

    //this is for the chat
    const onSubmitChat = async (e) => {
        e.preventDefault();

        await handelChatUpd(chatP, false);  // chat became liiitle bit more complicated

        
        console.log(bestMove)
        setPSaid(true)
    };


    return (
        <div className="game-base" >
            
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
                        {chatH.map((chat, i) => <ChatTxt key={i} chat={chat} />)}
                    </div>

                    <div className="chat-input">
                        <form onSubmit={onSubmitChat}>
                            {isBotThinkig ? <p>Bot is thinkig</p>:<input type="text" value={chatP} onChange={((e) => setChatP(e.target.value))}/>}
                            {isBotThinkig ? null:<button className="send-button">&#11127;</button>}
                        </form>
                    </div>

                    {/* Bottom player, map the user data*/}
                    <div className="player-card bottom-player">
                        <div className="avatar">
                            <img src={settingsD.ProfilePic} />
                        </div>
                        <div className="player-info">
                            <div className="player-name">{playerD.playerName}</div>
                            <div className="player-rating">{statsD.currentELO} ELO</div>
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