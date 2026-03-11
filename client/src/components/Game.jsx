import './Game.css'
import { React, useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Chessboard from './Chessboard';
import { initBoard } from '../assets/initBoard';
import { getMoves, makeMove, hasLegalMoves, isInCheck } from './logic/moves';
import GameOver from './gameOver';
import ChatTxt from "./gameChat";
import useFetchBetter from "./hooks/useFetchBetter";


//these are dummydata for use before database
import { algToCoords, coordsToAlg, boardToFen } from './logic/helps';
import Piece from './Piece';

const Game = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    //useLocation: get the shit from gameStart.jsx through 'state'
    const navigate = useNavigate();
    const location = useLocation();
    const { aiId, playerSide, selectGame, godmode } = location.state || {};

    //setting up the game
    const [board, setboard] = useState(initBoard);
    const [castlingRight, setCastlingRight] = useState({
        K: true,
        Q: true,
        k: true,
        q: true
    })
    const [turn, setTurn] = useState("white");
    const [capturedWhite, setCapturedWhite] = useState([]);
    const [capturedBlack, setCapturedBlack] = useState([]);
    const [selected, setSelected] = useState(null);
    const [history, setHistory] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [method, setMethod] = useState(null);
    const [evaluate, setEval] = useState(50.0); //floati use this for the eval bar like %, i would do but i don't wanna touch css aaaaaand i did it >:(
    const [saveGameId, setSaveGameId] = useState(null);

    //Goodbye chat
    //Chat states
    const [chatH, setChatH] = useState([]); // [{Answer: "Greetings type to type here or something like that", isLLMAnswer: true},{Answer: "Greetings", isLLMAnswer: false}] 
    const [chatP, setChatP] = useState("");

    // custom hook to fetch stuff
    const { fetchData, isLoading, error } = useFetchBetter(`http://localhost:4000/api`);
    const [playerD, setPlayerD] = useState({});
    const [settingsD, setSettingsD] = useState({});
    const [statsD, setStatsD] = useState({});
    const [opponent, setOpponent] = useState({});

    //stockfish
    const [isBotThinkig, setBotThink] = useState(isLoading);
    const [isPlayerSaid, setPSaid] = useState(false);
    const [bestMove, setBestMove] = useState("");
    const [nextTurn, setNextTurn] = useState(false);

    //useEffect wall and i have done some unspeakable stuff to get this shit working, btw my soul now belongs to machine gods -oleruu
    // This load player info
    useEffect(() => {
        const fetchStuff = async () => {

            const playerData = await fetchData('/player/', "GET", token)
            const statsData = await fetchData('/stats/', "GET", token)
            const settingsData = await fetchData('/settings/', "GET", token)
            setPlayerD(playerData);
            setStatsD(statsData);
            setSettingsD(settingsData);

            if (selectGame === null) {
                setboard(initBoard)
                const opponentData = await fetchData(`/aiPreset/${aiId}`)
                setOpponent(opponentData);
                const saveGame = await fetchData("/savegame/", "POST", token, { playerId: settingsData.playerId, playerColor: playerSide, boardState: turn, moveHistory: JSON.stringify(history), board: JSON.stringify(board), chatHistory: JSON.stringify(chatH), aiPresetId: aiId })
                setSaveGameId(saveGame._id)
            } else {
                const savedGame = await fetchData(`/savegame/${selectGame}`, "GET", token)
                setboard(JSON.parse(savedGame.board))
                setTurn(savedGame.boardState)
                setHistory(JSON.parse(savedGame.moveHistory))
                setChatH(JSON.parse(savedGame.chatHistory))
            }
        }
        fetchStuff()
    }, [])

    //i dont really know what the hell am doing, but it just works -oleruu
    useEffect(() => {
        const stockfish = new Worker("./stockfish-18-single.js");
        if (playerSide !== turn) {
            setChatP("") //clear chat
            handleBotThink(true) //self explanatory. it works, trust me
            stockfish.postMessage(`position fen ${boardToFen(board, turn, castlingRight)}`);
            stockfish.postMessage(`go depth ${opponent.aistats?.Depth} Skill Level ${opponent.aistats?.Skill} movetime 10000`);
            stockfish.onmessage = (e) => {
                let data = e.data
                console.log(data)
                if (data.includes("bestmove")) {
                    data = data.split(" ")[1] //makes "bestmove c7c6 ponder b5a4" => "c7c6"
                    console.log(data)
                    setBestMove(data)
                    handleBotThink(false)   
                    stockfish.terminate() // Exterminate!, Exterminate!, Exterminate!, Exterminate!
                }
            }
        };
        updEval()
        if (saveGameId !== null){
            fetchData(`/savegame/${saveGameId}`, "PATCH", token, { playerColor: playerSide, boardState: turn, moveHistory: JSON.stringify(history), board: JSON.stringify(board), chatHistory: JSON.stringify(chatH), aiPresetId: aiId })
        }else{
            console.log("SaveGameId is null, something went wrong somewhere, don't ask idk")
        }
    }, [turn])

    useEffect(() => {
        const speakSomething = async () => {
            handleBotThink(true, "Bot is thinkig")
            if (playerSide !== turn) {
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
                        botPreset: { AiName: opponent.aiName, info: opponent.systemPrompt, botElo: opponent.aistats?.ELO },
                        playerAns: chatP,
                        playerMove: "Needs to be added"
                    })
                    await handelChatUpd(data.data.answer, true); // update chat
                };

                const start = bestMove.slice(0, 2)
                const end = bestMove.slice(2)
                
                const botStart = algToCoords(start)
                const botMove = algToCoords(end)
                const capturedPiece = board[botMove.row][botMove.col];

                if (capturedPiece) {
                    console.log("HEELPPP. HEELPP MEEE!!!! -", board[botMove.row][botMove.col])
                    if (capturedPiece === capturedPiece.toUpperCase()) {
                        setCapturedWhite(prev => [...prev, capturedPiece])
                    } else {
                        setCapturedBlack(prev => [...prev, capturedPiece])
                    }
                }

                const newBoard = makeMove(board, algToCoords(start), algToCoords(end));
                setboard(newBoard);
                const piece = board[botStart.row][botStart.col];
                trackHistory(piece, end);
                //console.log(piece)
                const newCastlingRights = updateCastlingRights(
                    castlingRight,
                    piece,
                    botStart
                )
                setCastlingRight(newCastlingRights);

                const nextTurn = turn === "white" ? "black" : "white";
                if (isInCheck(newBoard, nextTurn, newCastlingRights) && !hasLegalMoves(newBoard, nextTurn, newCastlingRights)) {
                    console.log("RAHHHHHH")
                    setGameOver(true);
                    setWinner(turn);
                    setMethod("Checkmated!")
                }

                setTurn(turn === "white" ? "black" : "white");

                setNextTurn(false)
                setChatP("") //clear
                setPSaid(false) //is player spoken
            }
        }
        handleBotThink(false)
        speakSomething()
    }, [isPlayerSaid, nextTurn])

    function updEval(){
        const stockfishEval = new Worker("./stockfish-18-single.js"); // this gets you personal eval to see how shi.. good you play
        stockfishEval.postMessage(`position fen ${boardToFen(board, turn, castlingRight)}`); // there is board to fen, but no fen to board
        stockfishEval.postMessage(`eval`);
        stockfishEval.onmessage = (e) =>{
            let data = e.data
            if(data.includes("Final")){
                const numbr = data.split(" ")[8] // hard coded stuff takes Final something => float, hmm i seem doing lot of data manipulation
                const numbre = parseFloat(numbr.slice(1)) // i wanted to do this on same line but nooooo, i need the + or some other shit
                if(numbr.includes("+")){ //there is def better way, buuuuuut i don't care.
                    setEval(evaluate + numbre) // this is some genius level math
                }else{
                    setEval(evaluate - numbre)
                }
                stockfishEval.terminate() // i will be back
            }
        }
        
    }

    //console.log(boardToFen(board, turn, castlingRight))
    //piece and move must come in the alg form to not be confusing lmao 
    function trackHistory(piece, move) {
        console.log(piece, move)
        if(piece==="P" || piece==="p") {
            setHistory(prev => [...prev, move])
        } else {
            let occurence = `${piece}${move}`;
            setHistory(prev => [...prev, occurence])
        }
        console.log(history)
    }

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
        if (playerSide === turn) {
            //convert ts back to numerical coords so the code can handle it
            const { row, col } = algToCoords(square);
            const piece = board[row][col];
            //console.log("clicked on " + square + " which has piece: " + piece);

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
                //console.log("Unselected!")
                setSelected(null);
                const avElement = document.querySelectorAll('.available');
                avElement.forEach(elem => {
                    elem.classList.remove('available');
                })
                return;
            }
            //getMoves returns the result of one of get_Moves in moves.js
            const legalMoves = getMoves(board, selected.row, selected.col, castlingRight);
            //console.log(legalMoves)
            const isLegal = legalMoves.find(
                move => move.row === row && move.col === col
            );

            if (isLegal) {
                const move = legalMoves.find(
                    m => m.row === row && m.col === col
                );
                //check if there's apiece where we're abt to move
                const capturedPiece = board[move.row][move.col];
                if (capturedPiece) {
                    console.log("HEELPPP. HEELPP MEEE!!!! -", board[move.row][move.col])
                    if (capturedPiece === capturedPiece.toUpperCase()) {
                        setCapturedWhite(prev => [...prev, capturedPiece])
                    } else {
                        setCapturedBlack(prev => [...prev, capturedPiece])
                    }
                    console.log(capturedPiece)
                }

                const newBoard = makeMove(board, selected, move);
                const piece = board[selected.row][selected.col];
                trackHistory(piece, square);
                console.log(piece)
                const newCastlingRights = updateCastlingRights(
                    castlingRight,
                    piece,
                    selected
                )
                setboard(newBoard);
                setCastlingRight(newCastlingRights);

                const nextTurn = turn === "white" ? "black" : "white";
                if (isInCheck(newBoard, nextTurn, newCastlingRights) && !hasLegalMoves(newBoard, nextTurn, newCastlingRights)) {
                    setGameOver(true);
                    setWinner(turn);
                    setMethod("Checkmated!")
                }

                setTurn(turn === "white" ? "black" : "white");
            }


            setSelected(null);
            const avElement = document.querySelectorAll('.available');
            avElement.forEach(elem => {
                elem.classList.remove('available');
            })
        }
    }



    function handleResign() {
        setGameOver(true);
        //Do not keep in final version. This is just to test the game over pop-up.
        setWinner(turn === "white" ? "black" : "white");
        setMethod("resignation");
    }

    // handle stuff, because react
    async function handelChatUpd(txt, isbot) {
        setChatH((chatH) => { return [...chatH, { answer: txt, isLLMAnswer: isbot }] }) // makes chat update instant
    };
    // handle stuff because ******* react
    async function handleBotThink(tf) {
        setBotThink(tf) //basicaly same thing as chat
    }

    //this is for the chat
    const onSubmitChat = async (e) => {
        e.preventDefault();
        if (playerSide !== turn) {
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
                    <div className="board-header">
                        {(playerSide === "white" ? capturedWhite : capturedBlack).map((p, i) => (
                            <div key={i} className="mini">
                                <Piece key={i} piece={p} />
                            </div>
                        ))}
                    </div>
                    <div className="chess-board">
                        <Chessboard board={board} squareClick={handleSquareClick} selected={selected} playAsBlack={playerSide} />
                    </div>
                    <div className="board-footer">
                        {(playerSide === "white" ? capturedBlack : capturedWhite).map((p, i) => (
                            <div key={i} className="mini">
                                <Piece key={i} piece={p} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="move-history">
                    <div className="history-row">
                        {history.map((occurence, i) => (
                            <span className="history-item">{` ${i + 1}.${occurence}`} </span>
                        ))}
                    </div>
                    <div className="game-btns">
                        {isBotThinkig ? <p>Bot is thinkig OR Make a move first</p> : <button className='next-turn-btn' onClick={(() => setNextTurn(true))}>Next turn (without LLM)</button>}
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
                            <img src={opponent.aiPic} alt={opponent.aiName} />
                        </div>
                        <div className="player-info">
                            <div className="player-name">{opponent.aiName}</div>
                            <div className="player-rating">{opponent.aistats?.ELO}</div>
                        </div>
                    </div>

                    {/* Map chat history, *TEMPORARY CODE* (permament) */}
                    <div className="chat-window">
                        {chatH.map((chat, i) => <ChatTxt key={i} chat={chat} />)}
                    </div>

                    <div className="chat-input">
                        <form onSubmit={onSubmitChat}>
                            {isBotThinkig ? <p>Bot is thinkig OR Make a move first</p> : <input type="text" value={chatP} onChange={((e) => setChatP(e.target.value))} />}
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
                    <div className="eval-fill black" style={{height: evaluate }}/>
                    <div className="eval-fill white" style={{height: (100-evaluate) }}  />
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