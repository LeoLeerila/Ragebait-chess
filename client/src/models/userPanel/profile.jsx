import "../../components/userPanel.css"

function Profile({player, ProfilePic, ELO, WMatch, TMatch}){
    return(
       <div id="profile_txt">
        <img src={ProfilePic} alt="profilepic"/>
        <p>{player.Name}</p>
        <p>Current ELO: {ELO}</p>
        <p>Won: {WMatch} Played: {TMatch}</p>
        <p>Date of register: {player.Date}</p>
       </div> 
    );
}

export default Profile;