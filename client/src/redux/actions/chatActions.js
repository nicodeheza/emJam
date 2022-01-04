import { DISCONNECTED } from "../../connectionConst";
import { ADD_USER, CONNECT, DELETE_USER, RESET_CHAT, SET_ROOM, UPDATE_CONNECTION_STATE } from "../consts";


export const connect=()=>(dispatch, getState)=>{
    const ws= new WebSocket("ws://localhost:8080");

    dispatch({
        type: CONNECT,
        payload: ws
    });
}

export const updateConnectionState=(state)=>(dispatch)=>{
    dispatch({
        type: UPDATE_CONNECTION_STATE, 
        payload: state
    })
}

export const setRoom=(room)=>(dispatch)=>{
    dispatch({
        type: SET_ROOM,
        payload: room 
    });
}

export const addUser=(user)=>(dispatch, getState)=>{
    const {users}= getState().chat;
    users.push(user);
    dispatch({
        type:ADD_USER, 
        payload: users
    });
}

export const deleteUser=(user)=>(dispatch, getState)=>{
    const {users}= getState().chat;
    const usersUpdated= users.filter(ele=> ele !== user);
    dispatch({
        type: DELETE_USER, 
        payload: usersUpdated
    });
}

export const resetChat=()=>(dispatch)=>{
    dispatch({
        type: RESET_CHAT, 
        payload:{
            ws: null, 
            connectionState: DISCONNECTED, 
            room: "", 
            users: []
        }
    });
}