const Bot = ({bot, onSelect}) => {
    const {aiName, aiDescription, aiPic, aistats} = bot;
    return (
        <li className="bot" onClick={() => onSelect(bot)}>
            <img src={aiPic} alt={aiPic} />
            <div className="bot-column">
                <h4>{aiName}</h4>
                <p className="bot-info">{aiDescription}</p>
                <p className="bot-elo">{aistats.ELO}</p>
            </div>
        </li>
    )
}

export default Bot;