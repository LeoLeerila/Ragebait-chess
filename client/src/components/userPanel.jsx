//these are dummydata for use before database
import { RawPlayerData, RawSettings, RawStats } from "../assets/dummydata";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./userPanel.css";


//old stuff
//Profile
//{PlayerD.map((player)=>{return <Profile {...player} key={player.PlayerId} player={player} ProfilePic={SettingsD.map((settings)=>settings.ProfilePic)} ELO={StatsD.map((stats)=> stats.CurrentELO)} TMatch={StatsD.map((stats)=> stats.TotalMatches)} WMatch={StatsD.map((stats)=> stats.WonMatches)} />;})}
//statistic
//{StatsD.map((stats)=>{return <Statistic {...stats} key={stats.PlayerId} stats={stats} />})}
//editprofile
//{PlayerD.map((player)=>{return <EditProfile {...player} key={player.PlayerId} player={player} pfp={SettingsD.map((settings)=>settings.ProfilePic)}/> })}  

//userpanel will get playerId from other sources so yeah

function UserPanel(){
    const {PlayerId} = useParams(); 

    const [PlayerD, setPlayer] = useState(RawPlayerData);
    const [SettingsD, setSettings] = useState(RawSettings);
    const [StatsD, setStats] = useState(RawStats);
    const [openEdit, setEdit] = useState(false)



//this is temporary, when database is working it will use different method
    let t_PlayerId = ""
    let pFound = false
    for(let i = 0; i < RawPlayerData.length;) {
        if(RawPlayerData[i].PlayerId === PlayerId){
            t_PlayerId = i;
            pFound = true;
            break
        }else{
            i++;
        }
    };
    //it will throw alert when data not found in dummydata file
    if(!pFound){
        alert("player data not found")
    };



    useEffect(()=>{

        //fetch logi here


    },[])

    const onSubmit = async (e) =>{
        e.preventDefault();
        toggleEdit()
    }
    function editHandle(){
        setEdit(!openEdit)
    }


    return(
        <section className="user_panel" id="user_panel">
            <div className="user_panel_inner" id="user_panel_profile">
                <div id="profile_txt">
                    <img src={SettingsD[t_PlayerId].ProfilePic} alt="profilepic"/>
                    <p>{PlayerD[t_PlayerId].Name}</p>
                    {SettingsD[t_PlayerId].ShowProfileStats.ShowElo ? <p>Current ELO: {StatsD[t_PlayerId].CurrentELO}</p>:<p/>}
                    {SettingsD[t_PlayerId].ShowProfileStats.ShowWL ?<p>Won: {StatsD[t_PlayerId].WonMatches} Played: {StatsD[t_PlayerId].TotalMatches}</p>:<p/>}
                    {SettingsD[t_PlayerId].ShowProfileStats.ShowDate ?<p>Date of register: {PlayerD[t_PlayerId].Date}</p>:<p/>}
                </div> 
            </div>
            <div className="user_panel_lower">
                <div className="user_panel_inner" id="user_panel_stats">

                    <div className="userPanel_stats">
                        <div className="user_panel_statistic">
                            <h2 id="user_panel_statistic_header">WIN TO LOSE RATIO</h2>
                            <div className="user_panel_side_txt">
                                <p>Matches won: {StatsD[t_PlayerId].WonMatches}</p> 
                                <p>Ratio:</p>
                            </div>
                            <div className="user_panel_side_txt">
                                <p>Matches lost : {StatsD[t_PlayerId].TotalMatches - StatsD[t_PlayerId].WonMatches -StatsD[t_PlayerId].StalemateMatches}</p>
                                <p>{StatsD[t_PlayerId].WonMatches}/{StatsD[t_PlayerId].TotalMatches}</p>
                            </div>
                            <div className="user_panel_side_txt">
                                <p>Stalemates: {StatsD[t_PlayerId].StalemateMatches}</p>
                                <p>{StatsD[t_PlayerId].StalemateMatches} of {StatsD[t_PlayerId].TotalMatches} matches end in a stalemate</p>
                            </div>
                        </div>
                        <div className="user_panel_statistic">
                            <h2>Checkmates most often with : {StatsD[t_PlayerId].CheckmatePiece}</h2>
                            <p>Cool</p>
                        </div>
                        <div className="user_panel_statistic">
                            <h2>Made the AI quit: {StatsD[t_PlayerId].AIForfeit}!</h2>
                            <p> womp womp </p>
                        </div>
                        <div className="user_panel_statistic">
                            <p>Highest ELO ranking from a single match: {StatsD[t_PlayerId].HighestELO}</p>
                        </div>
                    </div>
                    <div className="Buttons">
                        <button >Back to main menu (wip)</button>
                        <button >Start a new Game (wip)</button>
                    </div>
                </div>

                <div className="user_panel_inner" id="user_panel_editprofile">

                    <div className="userPanel_edit">
                        <div id="sidetxt">
                            <h2>Edit Profile</h2>
                            <button className="btn_open_edit" onClick={editHandle}>/edit/</button>
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
                            <p>Username: {PlayerD[t_PlayerId].Name}</p>
                            <p>Email: {PlayerD[t_PlayerId].EMail}</p>
                            <p>Password: {PlayerD[t_PlayerId].Password}</p>
                            <p>Profile picture:<br/><img src={SettingsD[t_PlayerId].ProfilePic} alt="profilepic"/></p>
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
                </div>  
            </div>   
        </section>
    )
}

export default UserPanel