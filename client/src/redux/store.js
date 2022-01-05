import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import audioContextReducer from "./reducers/audioContextReducer";
import noteReducer from "./reducers/noteReducer";
import waveReducer from "./reducers/waveReducer";
import chatReducer from "./reducers/chatReducer";
import drumsBufferReducer from "./reducers/drumsBufferReducer";
import touchReducer from "./reducers/touchReducer";

const rootReducer = combineReducers({
	audioCtx: audioContextReducer,
	waves: waveReducer,
	notes: noteReducer,
	chat: chatReducer,
	drumsBuffer: drumsBufferReducer,
	isTouch: touchReducer
});

export default function generateStore() {
	return createStore(rootReducer, applyMiddleware(thunk));
}
