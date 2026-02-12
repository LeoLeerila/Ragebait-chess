import './gameStart.css'
import Bot from '../models/chessgame/BotComponent'
import { bots } from '../models/chessgame/bot-placeholder'
import { React, useState } from 'react'
import { useNavigate } from "react-router-dom";
//get BOT LIST data

const GameStart = () => {
    const navigate = useNavigate();
    const moveToGame = () => {
        navigate('/game');
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
                <select name="bot-filter">
                    <option value="default" disabled>Filter...</option>
                    <option value="name">By Name</option>
                    <option value="pers">By Personality</option>
                    <option value="Elo">By ELO</option>
                </select>
            </div>
            <form className="bottom-opts">
                <ul className="bot-output">
                    {bots.map((bot) => {
                        return <Bot key={bot.id} bot={bot} onSelect={handleSelect} />
                    })}
                </ul>
                <div className="bottom-colmn">
                    <div className="bot-profile">
                        {/* Figure out a way to display the clicked bot here.... */}
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
                            <input id="black-opt" type="radio" value="black" name="b-or-w" />
                            <label htmlFor="black-opt">&#9818; Black</label>
                        </div>
                        <div className="radio-row">
                            <input id="white-opt" type="radio" value="white" name="b-or-w" />
                            <label htmlFor="white-opt">White &#9812; </label>
                        </div>
                        <div className="godmodeDiv">
                            <label htmlFor="godmode-toggle"> &#9760; GODMODE</label>
                            <input id="godmode-toggle" type="checkbox" value="godmode" />
                            <p id="GODMODE-warning" title="GODMODE means that the chess bot will be allowed to make illegal moves. Not recommended for serious gameplay.">&#9888;</p>
                        </div>
                    </div>
                    <button type="submit" id="start-game" onClick={moveToGame}>Start Game!</button>
                </div>

            </form>
        </div>
    )
}

export default GameStart