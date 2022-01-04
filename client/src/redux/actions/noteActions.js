import Note from "../../Notes/Notes";
import Drum from "../../Notes/Drum";
import { PLAY_NOTE, STOP_NOTE, PLAY_DRUM, DELETE_DRUM } from "../consts";

export const playNotes=(noteId, freq, sine, square, sawtooth, triangle,vibratoGain, vibratoFrequency, instrumentVolume, userId)=>
(dispatch, getState)=>{
    const {analyser}= getState().waves[userId];
    const {audioCtx}= getState().audioCtx;
    const notes= getState().notes;

    if(!notes[noteId] || notes[noteId] === undefined){
        const note= new Note(freq, analyser, sine, square, sawtooth, triangle,
            vibratoGain, vibratoFrequency, audioCtx, instrumentVolume);
        dispatch({
            type: PLAY_NOTE,
            payload: {noteId, note}
        });
    }

}


export const stopNote= (noteId)=> (dispatch, getState)=>{
    const notes= getState().notes;
    if(notes[noteId] !== undefined && notes[noteId]){
        notes[noteId].stop();
        delete notes[noteId];
        dispatch({
            type: STOP_NOTE, 
            payload: notes
        });
    }
}

export const playDrum=(drumId, drumBufferIndex, instrumentVolume,userId)=>(dispatch, getState)=>{
    const {analyser}= getState().waves[userId];
    const {audioCtx}= getState().audioCtx;
    const drumsBuffer= getState().drumsBuffer;
    const notes= getState().notes;

    if(!notes[drumId] || notes[drumId] === undefined){
        const drum= new Drum(drumsBuffer[drumBufferIndex], analyser, audioCtx, instrumentVolume);
    
        dispatch({
            type: PLAY_DRUM, 
            payload: {drumId, drum}
        });
    }
}

export const deleteDrum=(noteId)=>(dispatch, getState)=>{
    const notes= getState().notes;

    if(notes[noteId] && notes[noteId] !== undefined){
        delete notes[noteId];
    
        dispatch({
            type: DELETE_DRUM, 
            payload: notes
        });
    }

}