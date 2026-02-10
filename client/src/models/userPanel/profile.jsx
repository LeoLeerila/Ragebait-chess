import "../../components/userPanel.css"

function Profile({player, settings, stats}){
    return(
       <div id="profile_txt">
        <img src={settings.ProfilePic} alt="profilepic"/>
        <p>{player.Name}</p>
        <p>Current ELO: {stats.CurrentELO}</p>
        <p>Won: {stats.WonMatches} Played: {stats.TotalMatches}</p>
        <p>Date of register: {player.Date}</p>
       </div> 
    );
}

export default Profile;