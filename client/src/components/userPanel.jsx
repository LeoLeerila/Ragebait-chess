import EditProfile from "../models/userPanel/editprofile"
import Profile from "../models/userPanel/profile"
import Statistic from "../models/userPanel/statistic"
import { PlayerData, Settings, Stats } from "../assets/dummydata";
import React, { useState } from "react";
import "./userPanel.css";

function UserPanel(){
    const [PlayerD, setPlayer] = useState(PlayerData);
    const [SettingsD, setSettings] = useState(Settings);
    const [StatsD, setStats] = useState(Stats);

    


    return(
        <section className="user_panel" id="user_panel">
            <div className="user_panel_inner" id="user_panel_profile">
                {PlayerD.map((player)=>{return <Profile {...player} key={player.PlayerId} player={player} ProfilePic={SettingsD.map((settings)=>settings.ProfilePic)} ELO={StatsD.map((stats)=> stats.CurrentELO)} TMatch={StatsD.map((stats)=> stats.TotalMatches)} WMatch={StatsD.map((stats)=> stats.WonMatches)} />;})}
            </div>
            <div className="user_panel_lower">
                <div className="user_panel_inner" id="user_panel_stats">
                    {StatsD.map((stats)=>{return <Statistic {...stats} key={stats.PlayerId} stats={stats} />})}
                    <div className="Buttons">
                        <button>Back to main menu (wip)</button>
                        <button>Start a new Game (wip)</button>
                    </div>
                </div>
                <div className="user_panel_inner" id="user_panel_editprofile">
                  {PlayerD.map((player)=>{return <EditProfile {...player} key={player.PlayerId} player={player} pfp={SettingsD.map((settings)=>settings.ProfilePic)}/> })}  
                </div>
                
            </div>
        </section>
    )
}

export default UserPanel