import { useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { CONNECTED } from "../connectionConst";
import { deleteDrum, playDrum, playNotes, stopNote } from "../redux/actions/noteActions";
import "./pianoKey.css";

export default function PianoKey({i, char, keysPressed, drumsSelected, instrumentSettings}){
    const dispatch= useDispatch();
    const [pressed, setPressed]= useState(false);
    const [mouseP, setMouseP ]= useState(false);
    const [notePlaying, setNotePlaying]= useState(false);

    const keyIndex= i + 1;
    

    useEffect(()=>{
        if(!mouseP){
            setPressed(keysPressed.includes(char));
        }
    }, [keysPressed, char, mouseP]);

    function mouseDown(){
        setMouseP(true);
        setPressed(true);
    }
    function mouseUp(){
        setMouseP(false);
        setPressed(false);
    }
    function mouseLeave(){
        if(mouseP){
            setPressed(false);
        }
    }

    //create notes
    const {room, ws}= useSelector(s=> s.chat);

    const connectionState= useSelector(s=> s.chat.connectionState);

    const sendNote= useCallback((freq, sine, square, sawtooth, triangle, vibratoGain, vibratoFrequency, 
        instrumentVolume, isPlaying)=>{
           // console.log("send")
            const message={
                room,
                message: {freq, sine, square, sawtooth, triangle, vibratoGain, vibratoFrequency, instrumentVolume, isPlaying}
            };
            const stringMessage= JSON.stringify(message);
        
            if(connectionState === CONNECTED){
                ws.send(stringMessage);
            }
    },[room, ws, connectionState]);

    const sendDrum= useCallback((drumpBuffersIndex, instrumentVolume, isPlaying)=>{
        const message={
            room,
            message:{drumpBuffersIndex, instrumentVolume, isPlaying}
        }
        const stringMessage= JSON.stringify(message);
        if(connectionState === CONNECTED){
            ws.send(stringMessage);
        }
    },[room, ws, connectionState]);

    useEffect(()=>{
        const note= i + 28;
        const freq= Math.pow(Math.pow(2, 1/12), note - 49 ) * 440.0;
        const noteId= "local" + char;
        const {sine, square, triangle, sawtooth, vibratoGain, vibratoFreq,volume }= instrumentSettings;
        if(!drumsSelected && pressed && !notePlaying){
            dispatch(playNotes(noteId, freq, sine, square, sawtooth, triangle,vibratoGain, vibratoFreq, volume, "local"));
            setNotePlaying(true);
            sendNote(freq, sine, square, sawtooth, triangle, vibratoGain, vibratoFreq, volume, true);
        }else if(!drumsSelected && !pressed && notePlaying){
            const noteId= "local" + char;
            dispatch(stopNote(noteId));
            setNotePlaying(false);
            sendNote(freq, sine, square, sawtooth, triangle, vibratoGain, vibratoFreq, volume, false);
        }else if( drumsSelected && pressed && !notePlaying){
            const drumId= "local" + char;
            dispatch(playDrum(drumId, i, instrumentSettings.volume, "local"));
            setNotePlaying(true);
            sendDrum(i, volume, true);
        }else if(drumsSelected && !pressed && notePlaying){
            const drumId= "local" + char;
            dispatch(deleteDrum(drumId));
            setNotePlaying(false);
            sendDrum(i, volume, false);
        }
    },[pressed, drumsSelected, instrumentSettings, char, i, notePlaying, dispatch, sendNote, sendDrum]);


    return(
        <button
        className={
            keyIndex % 12 === 0 || keyIndex % 12 === 1 || keyIndex % 12 === 3 ||
            keyIndex % 12 === 5 || keyIndex % 12 === 6 || keyIndex % 12 === 8 ||
            keyIndex % 12 === 10 ? "whiteKey" : "blackKey"
        }
        style={
            (keyIndex % 12 === 0 || keyIndex % 12 === 1 || keyIndex % 12 === 3 ||
            keyIndex % 12 === 5 || keyIndex % 12 === 6 || keyIndex % 12 === 8 ||
            keyIndex % 12 === 10 )&& pressed ?
            {backgroundColor: "#97a6ff"} : 
            pressed ? {backgroundColor: "#abd3ff"} : {}
        }
            onMouseDown={()=> mouseDown()}
            onMouseUp= {()=> mouseUp()}
            onMouseLeave= {()=> mouseLeave()}
        >
            {
                i % 12 === 0 ?
                (<span className="eighth">C{i / 12 + 1}</span>) : (null)
            }

            <span className="keyName">{char.toUpperCase()}</span>

        </button>
    )
}