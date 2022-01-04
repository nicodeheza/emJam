import { CREATE_DRUMS_BUFFERS } from "../consts";


export default function drumsBufferReducer(store=[], action){

    switch(action.type){
        case CREATE_DRUMS_BUFFERS:
            return action.payload;
        default: return store;
    }
}