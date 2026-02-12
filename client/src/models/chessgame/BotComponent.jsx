const Bot = ({bot, onSelect}) => {
    const {AIName, info, AIPic, AIElo} = bot;
    return (
        <li className="bot" onClick={() => onSelect(bot)}>
            <img src={AIPic} alt={AIPic} />
            <div className="bot-column">
                <h4>{AIName}</h4>
                <p className="bot-info">{info}</p>
                <p className="bot-elo">{AIElo}</p>
            </div>
        </li>
    )
}

export default Bot;