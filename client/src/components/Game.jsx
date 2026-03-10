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

    //setting up the game
    const [board, setboard] = useState(initBoard);
    const [castlingRight, setCastlingRight] = useState({
        K: true,
        Q: true,
        k: true,
        q: true
    })
    const [turn, setTurn] = useState("white");
    const [selected, setSelected] = useState(null);
    const [history, setHistory] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [method, setMethod] = useState(null);

    const [playerColor, setPlayerColor] = useState("white");
    
    //Goodbye chat
    //Chat states
    const [chatH, setChatH] = useState([]); // [{Answer: "Greetings type to type here or something like that", isLLMAnswer: true},{Answer: "Greetings", isLLMAnswer: false}] 
    const [chatP, setChatP] = useState("");
    const [isLoadingTxt, setLoadingTxt] = useState("Make a move first")

    // custom hook to fetch stuff
    const { fetchData, isLoading, error } = useFetchBetter(`http://localhost:4000/api`);
    const [playerD, setPlayerD] = useState({});
    const [settingsD, setSettingsD] = useState({});
    const [statsD, setStatsD] = useState({});
    //here later will be also aipreset

    //stockfish
    const [isBotThinkig, setBotThink] = useState(isLoading);
    const [isPlayerSaid, setPSaid] = useState(false);
    const [bestMove, setBestMove] = useState("");
    const [nextTurn, setNextTurn] = useState(false);


    // This load player info
    useEffect(() => {
        const fetchStuff = async () => {
            const playerData = await fetchData('/player/', "GET", token)
            const statsData = await fetchData('/stats/', "GET", token)
            const settingsData = await fetchData('/settings/', "GET", token)

            //Do here also the Ai preset

            setPlayerD(playerData);
            setStatsD(statsData);
            setSettingsD(settingsData);
        }
        fetchStuff()
    }, [])

    //i dont really know what the hell am doing -oleruu
    useEffect(() => {
        if (playerColor !== turn) {
            setChatP("") //clear chat
            handleBotThink(true, "Bot is thinkig") //self explanatory
            const stockfish = new Worker("./stockfish-18-single.js");
            const DEPTH = 10; // number of halfmoves the engine looks ahead, in future i think LLM will decide from ready made options like min 5, max 10
            stockfish.postMessage("uci");
            stockfish.postMessage(`position fen ${boardToFen(board, turn, castlingRight)}`);
            stockfish.postMessage(`go depth ${DEPTH}`);

            stockfish.onmessage = (e) => {
                let data = e.data
                if (data.includes("bestmove")) {
                    data = data.split(" ")[1] //makes "bestmove c7c6 ponder b5a4" => "c7c6"
                    console.log(data)
                    setBestMove(data)
                    handleBotThink(false, "Make a move first")
                }
            }
        };
    }, [turn])

    useEffect(() => {
        const speakSomething = async () => {
            handleBotThink(true, "Bot is thinkig")
            if (playerColor !== turn) {
                if (isPlayerSaid) {
                    //do here the uhh the that uhh thing ... the bot
                    //this makes the fetch to backend and that then goes to LLM
                    const data = await fetchData('/ai/generate-nxt-move', "POST", token, {
                        botBoard: {
                            fen: boardToFen(board, turn, castlingRight),
                            currentMoves: bestMove,
                            history: chatH,
                            botChessC: "BLACK"
                        },
                        botPreset: {AiName:"Evil Larry",info: "A temperamental, evil cat overlord known as Larry.",botElo: "1200"},
                        playerAns: chatP,
                        playerMove: "Needs to be added"
                    })
                    console.log(data)
                    await handelChatUpd(data.data.answer, true); // update chat
                };
                
                const start = bestMove.slice(0, 2)
                const end = bestMove.slice(2)

                const newBoard = makeMove(board, algToCoords(start),algToCoords(end));
                setboard(newBoard);
                setTurn(turn === "white" ? "black" : "white");

                setNextTurn(false)
                setChatP("") //clear
                setPSaid(false) //is player spoken
            }
        }
        handleBotThink(false, "Make a move first")
        speakSomething()
    }, [isPlayerSaid, nextTurn])

    console.log(boardToFen(board, turn, castlingRight))

    function updateCastlingRights(castlingRight, piece, from) {
        const rights = { ...castlingRight };
        if (piece === "K") {
            rights.K = false;
            rights.Q = false;
        }

        if (piece === "k") {
            rights.k = false;
            rights.q = false;
        }

        if (piece === "R") {
            if (from.row === 7 && from.col === 7) rights.K = false;
            if (from.row === 7 && from.col === 0) rights.Q = false;
        }

        if (piece === "r") {
            if (from.row === 0 && from.col === 7) rights.k = false;
            if (from.row === 0 && from.col === 0) rights.q = false;
        }
        return rights;
    }

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
                const highlight = getMoves(board, row, col, castlingRight);
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
        const legalMoves = getMoves(board, selected.row, selected.col, castlingRight);
        console.log(legalMoves)
        const isLegal = legalMoves.find(
            move => move.row === row && move.col === col
        );

        if (isLegal) {
            const move = legalMoves.find(
                m => m.row === row && m.col === col
            );
            const newBoard = makeMove(board, selected, move);
            const piece = board[selected.row][selected.col];
            const newCastlingRights = updateCastlingRights(
                castlingRight,
                piece,
                selected
            )
            setboard(newBoard);
            setCastlingRight(newCastlingRights);
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
        setChatH((chatH) => { return [...chatH, { answer: txt, isLLMAnswer: isbot }] }) // makes chat update instant
    };
    // handle stuff because ******* react
    async function handleBotThink(tf, ftxt=null) {
        setBotThink(tf) //basicaly same thing as chat
        if(ftxt !== null){
            setLoadingTxt(ftxt)
        }
    }
    
    //this is for the chat
    const onSubmitChat = async (e) => {
        e.preventDefault();
        if (playerColor !== turn) {
            await handelChatUpd(chatP, false);  // chat became liiitle bit more complicated
            setPSaid(true) // is player spoken
        } else {
            setChatP("Make a move first!") //if stockfish calc not ready sets player txt to this
        }

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
                        {isBotThinkig ? <p>{isLoadingTxt}</p>:<button className='next-turn-btn' onClick={(() => setNextTurn(true))}>Next turn (without LLM)</button>}
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
                            {isBotThinkig ? <p>{isLoadingTxt}</p> : <input type="text" value={chatP} onChange={((e) => setChatP(e.target.value))} />}
                            {isBotThinkig ? null : <button className="send-button">&#11127;</button>} {/*next turn button*/}
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