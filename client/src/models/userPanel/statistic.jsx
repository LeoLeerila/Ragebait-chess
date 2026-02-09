import "../../components/userPanel.css"

function Statistic({stats}){
    return(
    <div>
        <div className="user_panel_statistic">
            <h2 id="user_panel_statistic_header">WIN TO LOSE RATIO</h2>
            <div className="user_panel_side_txt">
                <p>Matches won: {stats.WonMatches}</p> 
                <p>Ratio:</p>
            </div>
            <div className="user_panel_side_txt">
                <p>Matches lost : {stats.TotalMatches - stats.WonMatches -stats.StalemateMatches}</p>
                <p>{stats.WonMatches}/{stats.TotalMatches}</p>
            </div>
            <div className="user_panel_side_txt">
                <p>Stalemates: {stats.StalemateMatches}</p>
                <p>{stats.StalemateMatches} of {stats.TotalMatches} matches end in a stalemate</p>
            </div>
        </div>
        <div className="user_panel_statistic">
            <h2>Checkmates most often with : {stats.CheckmatePiece}</h2>
            <p>Cool</p>
        </div>
        <div className="user_panel_statistic">
            <h2>Made the AI quit: {stats.AIForfeit}!</h2>
            <p> womp womp </p>
        </div>
        <div className="user_panel_statistic">
            <p>Highest ELO ranking from a single match: {stats.HighestELO}</p>
        </div>
    </div>   
)
}

export default Statistic