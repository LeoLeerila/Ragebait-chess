//these are dummydata for use before database
import EditProfile from "../models/userPanel/editprofile"
import Profile from "../models/userPanel/profile"
import Statistic from "../models/userPanel/statistic"

import { RawPlayerData, RawSettings, RawStats } from "../assets/dummydata";
import React, { useEffect, useState } from "react";
import "./userPanel.css";


//old stuff
//Profile
//{PlayerD.map((player)=>{return <Profile {...player} key={player.PlayerId} player={player} ProfilePic={SettingsD.map((settings)=>settings.ProfilePic)} ELO={StatsD.map((stats)=> stats.CurrentELO)} TMatch={StatsD.map((stats)=> stats.TotalMatches)} WMatch={StatsD.map((stats)=> stats.WonMatches)} />;})}
//statistic
//{StatsD.map((stats)=>{return <Statistic {...stats} key={stats.PlayerId} stats={stats} />})}
//editprofile
//{PlayerD.map((player)=>{return <EditProfile {...player} key={player.PlayerId} player={player} pfp={SettingsD.map((settings)=>settings.ProfilePic)}/> })}  

//userpanel will get playerId from other sources so yeah

function UserPanel(PlayerId){

    
    //find by id here 
    //use that for data


    //using rn PlayerId as a number for the array to get objects
    const [PlayerD, setPlayer] = useState(RawPlayerData);
    const [SettingsD, setSettings] = useState(RawSettings);
    const [StatsD, setStats] = useState(RawStats);




    //this is temporary, when database is working it will use different method
    //playerid is in this format {PlayerId: number}
    PlayerId = PlayerId.PlayerId;
    let pFound = false
    for(let i = 0; i < PlayerD.length;) {
        if(PlayerD[i].PlayerId == PlayerId){
            PlayerId = i;
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


    return(
        <section className="user_panel" id="user_panel">
            <div className="user_panel_inner" id="user_panel_profile">
                <Profile player={PlayerD[PlayerId]} settings={SettingsD[PlayerId]} stats={StatsD[PlayerId]}/>
            </div>
            <div className="user_panel_lower">
                <div className="user_panel_inner" id="user_panel_stats">
                    <Statistic stats={StatsD[PlayerId]}/>
                    <div className="Buttons">
                        <button>Back to main menu (wip)</button>
                        <button>Start a new Game (wip)</button>
                    </div>
                </div>
                <div className="user_panel_inner" id="user_panel_editprofile">
                    <EditProfile settings={SettingsD[PlayerId]} player={PlayerD[PlayerId]} />
                </div>
                
            </div>
        </section>
    )
}

export default UserPanel