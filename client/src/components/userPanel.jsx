import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchBetter from "./hooks/useFetchBetter";
import { Link } from "react-router-dom";
import "./userPanel.css";



function UserPanel() {
    const [playerD, setPlayerD] = useState({});
    const [settingsD, setSettingsD] = useState({});
    const [statsD, setStatsD] = useState({});

    const { fetchData, isLoading, error } = useFetchBetter(`http://localhost:4000/api`)

    const [openEdit, setEdit] = useState(false)
    const [Name, setName] = useState("")
    const [EMail, setEmail] = useState("")
    const [Password, setPassw] = useState("")
    const [ProfilePic, setProfilePic] = useState("")
    const [ShowElo, setShowElo] = useState(Boolean)
    const [ShowWL, setShowWL] = useState(Boolean)
    const [ShowDate, setShowDate] = useState(Boolean)

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;



    useEffect(() => {
        const fetchStuff = async () => {
            const playerData = await fetchData('/player/',"GET",token)
            const statsData = await fetchData('/stats/',"GET",token)
            const settingsData = await fetchData('/settings/',"GET",token)

            setPlayerD(playerData);
            setStatsD(statsData);
            setSettingsD(settingsData);
            setShowWL(settingsData.showProfileStats.ShowWL)
            setShowElo(settingsData.showProfileStats.ShowElo)
            setShowDate(settingsData.showProfileStats.ShowDate)

            setName(playerData.playerName)
            setEmail(playerData.email)
            setProfilePic(settingsData.profilePic)

        }
        fetchStuff()
    }, [openEdit])

    const onSubmit = async (e) => {
        e.preventDefault()

        const playerUpdate = {
            playerName:Name,
            email:EMail
        }
        
        // Only include password if it's not empty
        if (Password.trim()) {
            playerUpdate.password = Password
        }

        await fetchData("/player","PATCH",token, playerUpdate)

        await fetchData("/settings/update","PATCH",token,{showProfileStats:{
            ShowElo:ShowElo,
            ShowWL:ShowWL,
            ShowDate:ShowDate
        },
        profilePic:ProfilePic
    })
        
        setEdit(!openEdit)
    }

    function editHandle() {
        setEdit(!openEdit)
    }




    return (
        <section className="user_panel" id="user_panel">
            <div className="user_panel_inner" id="user_panel_profile">
                <div id="profile_txt">
                    <img className="profile_pic" src={settingsD.profilePic} alt="profilepic" />
                    <p>{playerD.playerName}</p>
                    {ShowElo ? <p>Current ELO: {statsD.currentELO}</p> : <p />}
                    {ShowWL ? <p>Won: {statsD.wonMatches} Played: {statsD.totalMatches}</p> : <p />}
                    {ShowDate ? <p>Date of register: {playerD.createdAt}</p> : <p />}
                </div>
            </div>
            <div className="user_panel_lower">
                <div className="user_panel_inner" id="user_panel_stats">
                    <div className="userPanel_stats">
                        <div className="user_panel_statistic">
                            <h2 id="user_panel_statistic_header">WIN TO LOSE RATIO</h2>
                            <div className="user_panel_side_txt">
                                <p>Matches won: {statsD.wonMatches}</p>
                                <p>Ratio:</p>
                            </div>
                            <div className="user_panel_side_txt">
                                <p>Matches lost : {statsD.totalMatches - statsD.wonMatches - statsD.StalemateMatches}</p>
                                <p>{statsD.wonMatches}/{statsD.totalMatches}</p>
                            </div>
                            <div className="user_panel_side_txt">
                                <p>Stalemates: {statsD.StalemateMatches}</p>
                                <p>{statsD.StalemateMatches} of {statsD.totalMatches} matches end in a stalemate</p>
                            </div>
                        </div>
                        <div className="user_panel_statistic">
                            <h2>Checkmates most often with : {statsD.checkmatePiece}</h2>
                            <p>Cool</p>
                        </div>
                        <div className="user_panel_statistic">
                            <h2>Made the AI quit: {statsD.aiForfeit}!</h2>
                            <p> womp womp </p>
                        </div>
                        <div className="user_panel_statistic">
                            <p>Highest ELO ranking from a single match: {statsD.highestELO}</p>
                        </div>
                    </div>
                    <div className="Buttons">
                        <Link className="user_panel_link" to="/">Back to home</Link>
                        <Link className="user_panel_link" to="/start">Start a new Game</Link>
                    </div>
                </div>

                <div className="user_panel_inner" id="user_panel_editprofile">

                    <div className="userPanel_edit">
                        <div id="sidetxt">
                            <h2>Edit Profile</h2>
                            <button className="btn_open_edit" onClick={editHandle} >/edit/</button>
                        </div>
                        {openEdit ?
                            <div className="editModal">
                                <div className="edtOverall">
                                    <div className="editModal_content">
                                        <form className="editForm" onSubmit={onSubmit}>
                                            <h2 className="editForm_txt">Edit</h2>
                                            <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} />
                                            <input type="email" placeholder="Email" value={EMail} onChange={(e) => setEmail(e.target.value)} />
                                            <input type="password" placeholder="Password" value={Password} onChange={(e) => setPassw(e.target.value)} />
                                            <input type="url" placeholder="profile picture URL" value={ProfilePic} onChange={(e) => setProfilePic(e.target.value)}  />
                                            <button className="btn_submit" type="submit" >Submit</button>
                                        </form>
                                    </div>
                                    <div className="user_panel_side_txt">
                                        <div>
                                            <label htmlFor="ShowEloRating">Elo Rating</label>
                                            <input type="checkbox" id="ShowEloRating" checked={ShowElo} value={ShowElo} onChange={(e) => setShowElo(!ShowElo)}></input>
                                        </div>
                                        <div>
                                            <label htmlFor="ShowWLcount">W/L count</label>
                                            <input type="checkbox" id="ShowWLcount" checked={ShowWL} value={ShowWL} onChange={(e) => setShowWL(!ShowWL)}></input>
                                        </div>
                                        <div>
                                            <label htmlFor="ShowDate">Register date</label>
                                            <input type="checkbox" id="ShowDate" checked={ShowDate} value={ShowDate} onChange={(e) => setShowDate(!ShowDate)}></input>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}
                        <div>
                            <p>Username: {playerD.playerName}</p>
                            <p>Email: {playerD.email}</p>
                            {/*<p>Password: {playerD.password}</p>*/}
                            <p>Profile picture:<br /><img class="profile_pic" src={settingsD.profilePic} alt="profilepic" /></p>
                            <p>Display on profile:</p>
                        </div>
                        <div className="user_panel_side_txt">
                            <p>Reset profile?</p>
                            <p>Delete profile?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserPanel