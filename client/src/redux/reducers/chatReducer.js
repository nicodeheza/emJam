import { DISCONNECTED } from "../../connectionConst";
import { ADD_USER, CONNECT, DELETE_USER, RESET_CHAT, SET_ROOM, UPDATE_CONNECTION_STATE } from "../consts";


const initialState={
    ws: null, 
    connectionState: DISCONNECTED, 
    room: "", 
    users: []
}

export default function chatReducer(state=initialState, action){
    switch(action.type){
        case CONNECT:
            return {...state, ws: action.payload, connectionState: DISCONNECTED};
        case UPDATE_CONNECTION_STATE:
            return {...state, connectionState: action.payload};
        case SET_ROOM:
            return {...state, room: action.payload};
        case ADD_USER:
        case DELETE_USER:
            return {...state, users: action.payload};
        case RESET_CHAT:
            return {...action.payload};
        default: return state;
    }
}
