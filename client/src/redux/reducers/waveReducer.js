import {CREATE_WAVE, DELETE_WAVE, RESET_WAVES} from "../consts";

export default function waveReducer(state= {}, action){
    switch(action.type){
        case CREATE_WAVE:
            const {userId, wave}= action.payload;
            const w= {...state};
            w[userId]= wave;
            return w;
        case DELETE_WAVE:
            return {...action.payload};
        case RESET_WAVES:
            return {...action.payload};
        default:
            return state;
    }
}