import './gameStart.css'
import Bot from './BotComponent';
import { bots } from '../assets/bot-placeholder'
import { React, useState } from 'react'
import { useNavigate } from "react-router-dom";
//get BOT LIST data

const GameStart = () => {
    const [formError, setFormError] = useState("");
    const [playerSide, setPlayerSide] = useState(null);
    const [godmode, setGodmode] = useState(false);

    const navigate = useNavigate();
    const moveToGame = (e) => {
        e.preventDefault();
        if (!selectOpponent) {
            setFormError("Please select an opponent to play against.");
            return;
        }
        setFormError("");
        navigate('/game', { 
            state: { 
                opponent: selectOpponent,
                playerSide,
                godmode 
            } 
        });
    }
    //handle bot lists, arrange the user choices (bot, position and any extras) and somehow utilize that data for the game screen
    const [selectOpponent, setSelectOpponent] = useState(null);
    const handleSelect = (bot) => {
        setSelectOpponent(bot);
    }
    return (
        <div className="game-start-base">
            <div className="top-searchBar">
                <input className="input-field" type="text" />
                <a href="" className="clickable">&#x1F50D;</a>
                {/* For now; useless. */}
                <select name="bot-filter">
                    <option value="default" disabled>Filter...</option>
                    <option value="name">By Name</option>
                    <option value="pers">By Personality</option>
                    <option value="Elo">By ELO</option>
                </select>
            </div>
            <form className="bottom-opts" onSubmit={moveToGame}>
                <ul className="bot-output">
                    {bots.map((bot) => {
                        return <Bot key={bot.id} bot={bot} onSelect={handleSelect} />
                    })}
                </ul>
                <div className="bottom-colmn">
                    <div className="bot-profile">
                        {selectOpponent && (
                            <section>
                                <img src={selectOpponent.AIPic} alt="profile picture" />
                                <h4>{selectOpponent.AIName}</h4>
                                <p className="bot-info">{selectOpponent.info}</p>
                                <p className="bot-elo">{selectOpponent.AIElo}</p>
                            </section>)}
                    </div>
                    <div className="options">
                        <div className="radio-row">
                            <input 
                                id="black-opt" 
                                type="radio" 
                                value="black" 
                                name="b-or-w" 
                                checked={playerSide === "black"}
                                onChange={(e) => setPlayerSide(e.target.value)}
                                required />
                            <label htmlFor="black-opt">&#9818; Black</label>
                        </div>
                        <div className="radio-row">
                            <input 
                                id="white-opt" 
                                type="radio" 
                                value="white" 
                                name="b-or-w"
                                checked={playerSide === "white"}
                                onChange={(e) => setPlayerSide(e.target.value)}
                                required />
                            <label htmlFor="white-opt">White &#9812; </label>
                        </div>
                        <div className="godmodeDiv">
                            <label htmlFor="godmode-toggle"> &#9760; GODMODE</label>
                            <input 
                                id="godmode-toggle" 
                                type="checkbox" 
                                value="godmode" 
                                checked={godmode}
                                onChange={(e) => setGodmode(e.target.checked)}
                                />
                            <p id="GODMODE-warning" title="GODMODE means that the chess bot will be allowed to make illegal moves. Not recommended for serious gameplay.">&#9888;</p>
                        </div>
                    </div>
                    <button type="submit" id="start-game">Start Game!</button>
                </div>
                {formError && <p className="form-error">{formError}</p>}

            </form>
        </div>
    )
}

export default GameStart