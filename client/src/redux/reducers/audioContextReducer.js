import {CREATE_AUDIO_CONTEXT, CREATE_MAIN_GAIN} from "../consts";

export default function audioContextReducer(state= {}, action){
    switch(action.type){
        case CREATE_AUDIO_CONTEXT:
            return {...state, audioCtx: action.payload};
        case CREATE_MAIN_GAIN:
            return {...state, masterGain: action.payload};
        default:
            return state;
    }
}