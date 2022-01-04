import { PLAY_NOTE, STOP_NOTE, PLAY_DRUM, DELETE_DRUM } from "../consts";


export default function noteReducer(state = {}, action){
    switch(action.type){
        case PLAY_NOTE:
            const {noteId, note}= action.payload;
            state[noteId]= note;
            return state;
        case PLAY_DRUM:
            const {drumId, drum}= action.payload;
            state[drumId]= drum;
            return state;
        case STOP_NOTE:
            return action.payload;
        case DELETE_DRUM:
            return action.payload
        default:
            return state;
    }
}