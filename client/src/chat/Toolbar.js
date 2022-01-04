import SettingsIcon from "../svg/SettingsIcon";
import VolumenIcon from "../svg/VolumeIcon";
import UserIcon from "../svg/UserIcon";
import PianoIcon from "../svg/PianoIcon";
import DrumsIcon from "../svg/DrumsIcon"

import "./toolbar.css"
import { useState } from "react";
import { useSelector } from "react-redux";


export default function Toolbar({mainVolumen, setMainVolumen, drumsSelected, setDrumsSelected, setShowSettings}){
    const [settingAnimation, setSettingAnimation]= useState(false);
    const numOfUsers= useSelector(s=>s.chat.users.length + 1);

    function click(){
        setShowSettings(prev=> !prev);
        setSettingAnimation(true);
    }

    return(
        <nav className="toolbarMainContainer">
            <div className="toolsContainer settingsBtnContainer">
                <button 
                id="setBtn"
                onClick={()=> click()}
                onAnimationEnd={()=>setSettingAnimation(false)}
                className={settingAnimation ? "stAnimation" : ""}
                >
                    <SettingsIcon classN={"settingsIcon"}/>
                </button>
                <label htmlFor="setBtn" className="toolsLabel">Instrument Settings</label>
            </div>
            <div className="toolsContainer">
                <div className="rangeVolumenContainer">
                    <input type="range" 
                    name="main-volumen" 
                    id="main-volumen" 
                    min="0" 
                    max="100"
                    value={mainVolumen}
                    onChange={(e)=>setMainVolumen(parseFloat(e.target.value))}/>
                    <VolumenIcon classN={"volumenIcon"}/>
                </div>
                <label htmlFor="main-volumen" className="toolsLabel">Master Volumen</label>
            </div>
            <div className="connectedUsersMainContainer toolsContainer">
                <div id="connected-users" className="connectedUsersContainer">
                    <UserIcon classN={"userIcon"}/>
                    <p>{numOfUsers + "/5"}</p>
                </div>
                <label htmlFor="connected-users" className="toolsLabel">Users Connected</label>
            </div>
            <div className="toolsContainer">
                <div id="instrument-picker" className="instrumentMainContainer">
                    <button className="instrumentBtn" onClick={()=>setDrumsSelected(false)}>
                        <PianoIcon classN={drumsSelected ? "pianoIcon instrumentOff" : "pianoIcon"} />
                    </button>
                    <button className="instrumentBtn" onClick={()=>setDrumsSelected(true)}>
                        <DrumsIcon classN={drumsSelected ? "drumsIcon" : "drumsIcon instrumentOff"} />
                    </button>
                </div>
                <label htmlFor="instrument-picker" className="toolsLabel">Instrument</label>
            </div>
        </nav>
    )
}