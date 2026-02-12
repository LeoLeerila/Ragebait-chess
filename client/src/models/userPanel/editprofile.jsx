import "../../components/userPanel.css"
import React, { useEffect, useState } from "react";

//EditProfile gets all data as a child from userpanel
// player = Player Data
function EditProfile({player, settings}){
    const [openEdit, setEdit] = useState(false)
/*
    useEffect(async()=>{
        onClick={setEdit(!openEdit)}
    },[openEdit])
*/

    const onSubmit = async (e) =>{
        e.preventDefault();
        toggleEdit()
    }

    return(
    <div>
        <div id="sidetxt">
            <h2>Edit Profile</h2>
            <button className="btn_open_edit"  >/edit/</button>
        </div>
        {openEdit ?
            <div className="editModal">
                <div className="edtOverall">
                    <div className="editModal_content">
                        <form className="editForm" onSubmit={onSubmit}>
                            <h2 className="editForm_txt">Edit</h2>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email"/>
                            <button className="btn_submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>:null}
        <div>
            <p>Username: {player.Name}</p>
            <p>Email: {player.EMail}</p>
            <p>Password: {player.Password}</p>
            <p>Profile picture:<br/><img src={settings.ProfilePic} alt="profilepic"/></p>
            <p>Display on profile:</p>
            <div className="user_panel_side_txt">
                <div>
                    <label for="ShowEloRating">Elo Rating</label>
                    <input  type="checkbox" id="ShowEloRating"></input>
                </div>
                <div>
                    <label for="ShowWLcount">W/L count</label>
                    <input type="checkbox" id="ShowWLcount"></input>
                </div>
                <div>
                    <label for="ShowDate">Register date</label>
                    <input type="checkbox" id="ShowDate"></input>
                </div>
            </div>
        </div>
        <div className="user_panel_side_txt">
            <p>Reset profile?</p>
            <p>Delete profile?</p>
        </div>    
    </div>
    );
}

export default EditProfile;