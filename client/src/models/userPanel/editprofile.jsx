import "../../components/userPanel.css"


//EditProfile gets all data as a child from userpanel
// player = Player Data
function EditProfile({player, settings}){
    return(
    <div>
        <div id="sidetxt">
            <h2>Edit Profile</h2>
            <button>/edit/</button>
        </div>
        <div>
            <p>Username: {player.Name}</p>
            <p>Email: {player.EMail}</p>
            <p>Password: {player.Password}</p>
            <p>Profile picture:<br/><img src={settings.ProfilePic} alt="profilepic"/></p>
            <p>Display on profile:</p>
            <div className="user_panel_side_txt">
                <p>WIP</p>
                <p>WIP</p>
                <p>WIP</p>
            </div>
        </div>
        <div className="user_panel_side_txt">
            <p>Reset profile?</p>
            <p>Delete profile?</p>
        </div>
    </div>
    )
}

export default EditProfile